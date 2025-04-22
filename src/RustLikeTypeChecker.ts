import { AbstractParseTreeVisitor } from "antlr4ng";
import { Tag } from "./Heap";

type UnitType = { tag: Tag.UNIT };
type U32Type = { tag: Tag.NUMBER; val: number }; // Value stored for compile time checks 
type BoolType = { tag: Tag.BOOLEAN };
type StringType = { tag: Tag.STRING };
type FnType = {
  tag: Tag.CLOSURE;
  captureNames: string[];
  paramNames: string[];
  captureTypes: RustLikeType[];
  paramTypes: RustLikeType[];
  retType: RustLikeType;
};
export type RustLikeType = UnitType | U32Type | BoolType | StringType | FnType;

export function typeEqual(a: RustLikeType, b: RustLikeType): boolean {
  return a === b
    ? true
    : a.tag !== b.tag
      ? false
      : a.tag === Tag.CLOSURE && b.tag === Tag.CLOSURE // if a.tag is closure b.tag has to be closure here
        ? a.paramTypes.length !== b.paramTypes.length ||
          a.captureTypes.length !== b.captureTypes.length
          ? false
          : a.paramTypes.every((rtype, idx) => typeEqual(rtype, b.paramTypes[idx])) &&
          a.captureTypes.every((rtype, idx) => typeEqual(rtype, b.captureTypes[idx]))
        : true; // Should not reach here, but if it does it is a primitive type where a.tag === b.tag
}

export class RustTypeCheckerVisitor extends AbstractParseTreeVisitor<RustLikeType> {

}
