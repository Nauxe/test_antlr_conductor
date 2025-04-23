import { AbstractParseTreeVisitor, ParserRuleContext, ParseTree, TerminalNode } from "antlr4ng";
import { Tag } from "./Heap";
import { RustLikeVisitor } from "./parser/grammar/RustLikeVisitor";
import { Frame } from "./RustLikeVirtualMachine";
import { BinaryOpExprContext, Block_exprContext, Block_stmtContext, Bool_exprContext, Break_stmtContext, CallExprContext, Continue_stmtContext, DeclContext, Expr_stmtContext, ExprContext, Fn_declContext, If_exprContext, If_stmtContext, IndexExprContext, LogicalExprContext, Print_stmtContext, ProgContext, RustLikeParser, Str_exprContext, TypeContext, U32_exprContext, UnaryExprContext, While_loopContext } from "./parser/grammar/RustLikeParser";
import { types } from "util";

type UnitType = { tag: Tag.UNIT };
type U32Type = { tag: Tag.NUMBER; val: number }; // Value stored for compile time checks 
type BoolType = { tag: Tag.BOOLEAN; val: boolean };
type StringType = { tag: Tag.STRING };
type FnType = {
  tag: Tag.CLOSURE;
  captureNames: string[];
  captureTypes: RustLikeType[];
  paramNames: string[];
  paramTypes: RustLikeType[];
  retType: RustLikeType;
};
export type RustLikeType = UnitType | U32Type | BoolType | StringType | FnType;

const UNIT_TYPE: UnitType = { tag: Tag.UNIT };
const U32_TYPE: U32Type = { tag: Tag.NUMBER, val: 0 }; // value initialized to be 0
const BOOL_TYPE: BoolType = { tag: Tag.BOOLEAN, val: false }; // value initalized to false
const STRING_TYPE: StringType = { tag: Tag.STRING };

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
        : true; // Should not reach here, but if it does it is a type where a.tag === b.tag
}

export type ScanResult = { names: string[]; types: RustLikeType[] };

// A new ScopedScannerVisitor needs to be created for every scope to scan its declareds
export class ScopedScannerVisitor extends AbstractParseTreeVisitor<ScanResult> implements RustLikeVisitor<ScanResult> {
  scanContext: ParserRuleContext;
  constructor(ctx: ParserRuleContext) {
    super();
    this.scanContext = ctx;
  }

  private parseType(ctx: TypeContext): RustLikeType {
    if (ctx.getText() === '()') {
      return UNIT_TYPE;
    } else if (ctx.getText() === 'u32') {
      return U32_TYPE;
    } else if (ctx.getText() === 'bool') {
      return BOOL_TYPE;
    } else if (ctx.getText() === 'string') {
      return STRING_TYPE;
    } else { // Can only be a function type here
      return {
        tag: Tag.CLOSURE,
        captureNames: [], // Dummy value 
        captureTypes: [], // Dummy value 
        paramNames: [], // Dummy value 
        paramTypes: ctx.type_list_opt().type_().map(t => this.parseType(t)),
        retType: this.parseType(ctx.type()),
      }
    }
  }

  protected defaultResult(): ScanResult {
    return { names: [], types: [] }; // Return empty scan results
  }

  protected aggregateResult(aggregate: ScanResult, nextResult: ScanResult): ScanResult {
    return {
      names: aggregate.names.concat(nextResult.names),
      types: aggregate.types.concat(nextResult.types)
    };
  }

  visitFn_decl(ctx: Fn_declContext): ScanResult {
    const fnName = ctx.IDENTIFIER().getText();
    const fnRetType = this.parseType(ctx.type());
    let paramNames = [];
    let paramTypes = [];
    if (ctx.param_list_opt().param_list() !== null) {
      ctx.param_list_opt().param_list().param().forEach((param) => {
        paramNames.push(param.IDENTIFIER().getText());
        paramTypes.push(this.parseType(param.type()));
      });
    }

    return {
      names: [fnName],
      types: [{
        tag: Tag.CLOSURE,
        captureNames: [], // To be initialized in other visitors 
        captureTypes: [], // To be initalized in other visitors
        paramNames: paramNames,
        paramTypes: paramTypes,
        retType: fnRetType,
      }
      ]
    };
  }

  visitBlock_stmt(ctx: Block_stmtContext): ScanResult {
    if (ctx !== this.scanContext)
      return this.defaultResult(); // Stop scanning, no longer in scope
    return this.visitChildren(ctx);
  }


  visitBlock_expr(ctx: Block_exprContext): ScanResult {
    if (ctx !== this.scanContext)
      return this.defaultResult(); // Stop scanning, no longer in scope
    return this.visitChildren(ctx);
  }

  visitDecl(ctx: DeclContext): ScanResult {
    const name = ctx.IDENTIFIER().getText();
    const type = this.parseType(ctx.type());
    return {
      names: [name],
      types: [type]
    };
  }
}

class TypeEnvironment {
  parent: TypeEnvironment;
  types: Map<string, RustLikeType> = new Map<string, RustLikeType>;

  constructor(locals: ScanResult | null = null) {
    this.parent = null;
    if (locals !== null) {
      for (let i = 0; i < locals.names.length; i++) {
        this.types.set(locals.names[i], locals.types[i]);
      }
    }
  }

  extend(locals: ScanResult): TypeEnvironment {
    const extendedEnv: TypeEnvironment = new TypeEnvironment(locals);
    extendedEnv.parent = this;
    return extendedEnv;
  }

  lookUpType(name: string): RustLikeType {
    if (this.types.has(name)) return this.types.get(name);

    let curEnv: TypeEnvironment = this;
    while (curEnv.parent !== null) {
      curEnv = curEnv.parent;
      if (curEnv.types.has(name)) return curEnv.types.get(name);
    }

    throw new Error(`Unbound name: ${name}`);
  }
}

export class RustLikeTypeCheckerVisitor extends AbstractParseTreeVisitor<RustLikeType> implements RustLikeVisitor<RustLikeType> {
  typeEnv: TypeEnvironment; // Has a parent address and a map for bindings

  constructor() {
    super();
    this.typeEnv = new TypeEnvironment();
  }

  protected defaultResult(): RustLikeType {
    return UNIT_TYPE;
  }

  visitProg(ctx: ProgContext): RustLikeType {
    const scanRes: ScanResult = new ScopedScannerVisitor(ctx).visit(ctx);
    this.typeEnv = this.typeEnv.extend(scanRes);

    const resType: RustLikeType = this.visitChildren(ctx);
    if (!typeEqual(resType, UNIT_TYPE))
      throw new Error("Program returned non-unit type");
    return UNIT_TYPE; // All programs are statement lists, and statements all return Unit type 
  }

  //
  // Visit expressions
  //

  visitIf_expr(ctx: If_exprContext): RustLikeType {
    return UNIT_TYPE; // temporary
  }

  visitBlock_expr(ctx: Block_exprContext): RustLikeType {
    return UNIT_TYPE; // temporary
  }

  visitBool_expr(ctx: Bool_exprContext): RustLikeType {
    return UNIT_TYPE; // temporary
  }

  visitU32_expr(ctx: U32_exprContext): RustLikeType {
    return UNIT_TYPE; // temporary
  }

  visitStr_expr(ctx: Str_exprContext): RustLikeType {
    return UNIT_TYPE; // temporary
  }

  visitIndexExpr(ctx: IndexExprContext): RustLikeType {
    return UNIT_TYPE; // temporary
  }

  // Unary boolean op (Only possible operation is !)
  visitUnaryExpr(ctx: UnaryExprContext): RustLikeType {
    let type1 = this.visit(ctx.expr());
    if (!typeEqual(type1, BOOL_TYPE))
      throw new Error(`Expected bool for ! operator, got ${type1}.`);
    type1 = type1 as BoolType;
    return { tag: type1.tag, val: !type1.val };
  }

  // Binary op
  visitBinaryOpExpr(ctx: BinaryOpExprContext): RustLikeType {
    let type1 = this.visit(ctx.expr()[0]);
    let type2 = this.visit(ctx.expr()[1]);
    const op = ctx.INT_OP().getText();
    if (!typeEqual(type1, type2))
      throw new Error(`Mismatched types in integer binary operation.`);

    if (typeEqual(type1, U32_TYPE)) {
      // Safe to cast now
      type1 = type1 as U32Type;
      type2 = type2 as U32Type;

      // conduct checks for - and / to prevent overflow of unsigned int and divide by zero
      switch (op) {
        case '+':
          return { tag: Tag.NUMBER, val: type1.val + type2.val };
        case '-':
          if (type1.val < type2.val)
            throw new Error(`${type1.val}-${type2.val} operation will cause u32 to overflow.`);
          return { tag: Tag.NUMBER, val: type1.val - type2.val };
        case '*':
          return { tag: Tag.NUMBER, val: type1.val * type2.val };
        case '/':
          if (type2.val === 0)
            throw new Error(`${type1.val}/${type2.val} operation will cause division by zero error.`);
          return { tag: Tag.NUMBER, val: type1.val / type2.val };
        case '!=':
          return { tag: Tag.BOOLEAN, val: type1.val !== type2.val };
        case '==':
          return { tag: Tag.BOOLEAN, val: type1.val === type2.val };
        case '<':
          return { tag: Tag.BOOLEAN, val: type1.val < type2.val };
        case '<=':
          return { tag: Tag.BOOLEAN, val: type1.val <= type2.val };
        case '>':
          return { tag: Tag.BOOLEAN, val: type1.val > type2.val };
        case '>=':
          return { tag: Tag.BOOLEAN, val: type1.val >= type2.val };
      }
    } else if (typeEqual(type1, BOOL_TYPE)) {
      // Safe to cast now
      type1 = type1 as BoolType;
      type2 = type2 as BoolType;

      // conduct checks for - and / to prevent overflow of unsigned int and divide by zero
      switch (op) {
        case '!=':
          return { tag: Tag.BOOLEAN, val: type1.val !== type2.val };
        case '==':
          return { tag: Tag.BOOLEAN, val: type1.val === type2.val };
        case '<':
          return { tag: Tag.BOOLEAN, val: type1.val < type2.val };
        case '<=':
          return { tag: Tag.BOOLEAN, val: type1.val <= type2.val };
        case '>':
          return { tag: Tag.BOOLEAN, val: type1.val > type2.val };
        case '>=':
          return { tag: Tag.BOOLEAN, val: type1.val >= type2.val };
        default:
          throw new Error(`Expected u32 types for binary operation ${op}, got ${type1} and ${type2}.`);
      }
    } else {
      throw new Error(`Expected u32 or boolean types for binary operation ${op} got ${type1} and ${type2}.`);
    }
  }

  visitLogicalExpr(ctx: LogicalExprContext): RustLikeType {
    let type1 = this.visit(ctx.expr()[0]);
    let type2 = this.visit(ctx.expr()[1]);
    const op = ctx.BOOL_BINOP().getText();
    if (!typeEqual(type1, type2))
      throw new Error(`Mismatched types in logical binary operation.`);

    if (!typeEqual(type1, BOOL_TYPE))
      throw new Error(`Expected bool types for binary operation ${op}, got ${type1} and ${type2}.`);

    // Safe to cast now
    type1 = type1 as BoolType;
    type2 = type2 as BoolType;

    switch (op) {
      case '||':
        return { tag: Tag.BOOLEAN, val: type1.val || type2.val };
      case '&&':
        return { tag: Tag.BOOLEAN, val: type1.val && type2.val };
    }
  }


  visitCallExpr(ctx: CallExprContext): RustLikeType {
    const fnName: string = ctx.expr().getText();
    const idType: RustLikeType = this.typeEnv.lookUpType(fnName);
    if (idType.tag !== Tag.CLOSURE) {
      throw new Error(`Expected function type for ${fnName}, found ${idType}`);
    }

    const fnType: FnType = idType;
    const argTypes =
      ctx.arg_list_opt() === null
        ? []
        : ctx.arg_list_opt().expr().map(
          (arg: ExprContext) => this.visit(arg)
        );

    if (argTypes.length !== fnType.paramTypes.length) {
      throw new Error(`Function takes ${fnType.paramTypes.length} arguments but ${argTypes.length} were supplied.`);
    }

    for (let i = 0; i < argTypes.length; i++) {
      if (!typeEqual(argTypes[i], fnType.paramTypes[i])) {
        throw new Error(`Mismatched types, expected ${JSON.stringify(fnType.paramTypes[i])}, found ${JSON.stringify(argTypes[i])}.`);
      }
    }

    return fnType.retType;
  }

  visitTerminal(_node: TerminalNode): RustLikeType {
    switch (_node.getSymbol().type) {
      case RustLikeParser.IDENTIFIER: {
        return this.typeEnv.lookUpType(_node.getText());
      }
      case RustLikeParser.U32: {
        return {
          tag: Tag.NUMBER,
          val: parseInt(_node.getText())
        };
      }
      case RustLikeParser.BOOL: {
        return {
          tag: Tag.BOOLEAN,
          val: _node.getText() === "true"
        };
      }
      case RustLikeParser.STRING: {
        return {
          tag: Tag.STRING
        };
      }
      default: {
        //TODO: Future implementation can add types for + and -
        return UNIT_TYPE;
      }
    }
  }

  //
  // Visit statements
  // 
  // All statements should return Unit type
  //

  visitDecl(ctx: DeclContext): RustLikeType {
    return UNIT_TYPE;
  }

  visitFn_decl(ctx: Fn_declContext): RustLikeType {
    return UNIT_TYPE;
  }

  visitPrint_stmt(ctx: Print_stmtContext): RustLikeType {
    return UNIT_TYPE;
  }

  visitIf_stmt(ctx: If_stmtContext): RustLikeType {
    return UNIT_TYPE;
  }

  visitWhile_loop(ctx: While_loopContext): RustLikeType {
    return UNIT_TYPE;
  }

  visitContinue_stmt(ctx: Continue_stmtContext): RustLikeType {
    return UNIT_TYPE;
  }

  visitExpr_stmt(ctx: Expr_stmtContext): RustLikeType {
    return UNIT_TYPE;
  }

  visitBlock_stmt(ctx: Block_stmtContext): RustLikeType {
    return UNIT_TYPE;
  }
}



