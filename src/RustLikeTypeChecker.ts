import { AbstractParseTreeVisitor, ParserRuleContext, ParseTree, TerminalNode } from "antlr4ng";
import { Tag } from "./Heap";
import { RustLikeVisitor } from "./parser/grammar/RustLikeVisitor";
import { BinaryOpExprContext, Block_exprContext, Block_stmtContext, Bool_exprContext, CallExprContext, Continue_stmtContext, DeclContext, Expr_stmtContext, ExprContext, Fn_declContext, If_exprContext, If_stmtContext, IndexExprContext, LogicalExprContext, Print_stmtContext, ProgContext, RustLikeParser, Str_exprContext, TypeContext, U32_exprContext, UnaryExprContext, While_loopContext, Stmt_listContext } from "./parser/grammar/RustLikeParser";

type UnitType = { tag: Tag.UNIT };
type U32Type = { tag: Tag.NUMBER; val: number }; // Value stored for compile time checks 
type BoolType = { tag: Tag.BOOLEAN; val: boolean };
type StringType = { tag: Tag.STRING; isMoved: boolean };
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
const U32_TYPE: U32Type = { tag: Tag.NUMBER, val: 1 }; // value initialized to be 1
const BOOL_TYPE: BoolType = { tag: Tag.BOOLEAN, val: false }; // value initalized to false
const STRING_TYPE: StringType = { tag: Tag.STRING, isMoved: false };
const MOVED_STRING_TYPE: StringType = { tag: Tag.STRING, isMoved: true };

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

export function typeToString(rlType: RustLikeType): string {
  if (typeEqual(rlType, UNIT_TYPE)) {
    return ' () ';
  } else if (typeEqual(rlType, U32_TYPE)) {
    const u32Type = rlType as U32Type;
    return ' ' + u32Type.val + ':u32 ';
  } else if (typeEqual(rlType, BOOL_TYPE)) {
    const boolType = rlType as BoolType;
    return ' ' + boolType.val + ' ';
  } else if (typeEqual(rlType, STRING_TYPE)) {
    return ' String ';
  } else { // Can only be a function type here 
    const fnType = rlType as FnType;
    return ' fn (' + fnType.paramTypes.reduce(
      (acc, paramType) => acc + typeToString(paramType) + ',', '')
      + ') ->' + typeToString(fnType.retType);
  }
}

export function parseType(ctx: TypeContext): RustLikeType {
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
      paramTypes: ctx.type_list_opt().type_().map(t => parseType(t)),
      retType: this.parseType(ctx.type()),
    }
  }
}

// A new ScopedScannerVisitor needs to be created for every scope to scan its declareds
export class ScopedScannerVisitor extends AbstractParseTreeVisitor<ScanResult> implements RustLikeVisitor<ScanResult> {
  scanContext: ParserRuleContext;
  constructor(ctx: ParserRuleContext) {
    super();
    this.scanContext = ctx;
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
    const fnRetType = parseType(ctx.type());
    let paramNames = [];
    let paramTypes = [];
    if (ctx.param_list_opt().param_list() !== null) {
      ctx.param_list_opt().param_list().param().forEach((param) => {
        paramNames.push(param.IDENTIFIER().getText());
        paramTypes.push(parseType(param.type()));
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
    const type = parseType(ctx.type());
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

  extend(locals: ScanResult = null): TypeEnvironment {
    const extendedEnv: TypeEnvironment = new TypeEnvironment(locals);
    extendedEnv.parent = this;
    if (locals !== null) {
      for (let i = 0; i < locals.names.length; i++) {
        if (this.types.has(locals.names[i])) {
          if (typeEqual(locals.types[i], STRING_TYPE)) // String types are the only movable values
            this.types.set(locals.names[i], MOVED_STRING_TYPE);
          if (locals.types[i].tag === Tag.CLOSURE) {
            extendedEnv.types.delete(locals.names[i]); // Closures should not be copied 
          }
        }
      }
    }
    return extendedEnv;
  }

  lookUpType(name: string): RustLikeType {  // This may be a lookup of an already moved value!
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
  isDebug: boolean;

  constructor(isDebug = true) {
    super();
    this.typeEnv = new TypeEnvironment();
    this.isDebug = isDebug;
  }

  protected defaultResult(): RustLikeType {
    return UNIT_TYPE;
  }

  visitProg(ctx: ProgContext): RustLikeType {
    const scanRes: ScanResult = new ScopedScannerVisitor(ctx).visit(ctx);
    this.typeEnv = this.typeEnv.extend(scanRes);

    const resType: RustLikeType = this.visit(ctx.stmt_list());
    if (!typeEqual(resType, UNIT_TYPE))
      throw new Error("Program returned non-unit type");
    return UNIT_TYPE; // All programs are statement lists, and statements all return Unit type 
  }

  visitStmt_list(ctx: Stmt_listContext): RustLikeType {
    ctx.stmt().forEach((s) => this.visit(s));
    return UNIT_TYPE;
  }

  //
  // Visit expressions
  //

  visitIf_expr(ctx: If_exprContext): RustLikeType {
    let predType = this.visit(ctx.expr());

    if (!typeEqual(predType, BOOL_TYPE))
      throw new Error(`Expected boolean predicate for if expression.`);

    predType = predType as BoolType;

    let consType = this.visit(ctx.block_expr()[0]);
    let altType = this.visit(ctx.block_expr()[1]);

    if (!typeEqual(consType, altType))
      throw new Error(`Mismatched types in if-statement consequent and alternative.`);

    return predType.val ? consType : altType;
  }

  visitBlock_expr(ctx: Block_exprContext): RustLikeType {
    this.typeEnv = this.typeEnv.extend(null);
    this.visit(ctx.stmt_list()); // Visit all statements
    const exprType = this.visit(ctx.expr()); // visit the final expression
    this.typeEnv = this.typeEnv.parent;
    return exprType;
  }

  visitBool_expr(ctx: Bool_exprContext): RustLikeType {
    return { tag: Tag.BOOLEAN, val: ctx.getText() === "true" };
  }

  visitU32_expr(ctx: U32_exprContext): RustLikeType {
    return { tag: Tag.NUMBER, val: parseInt(ctx.getText()) };
  }

  visitStr_expr(ctx: Str_exprContext): RustLikeType {
    return STRING_TYPE;
  }

  visitIndexExpr(ctx: IndexExprContext): RustLikeType {
    // TODO: Future implementation
    return UNIT_TYPE;
  }

  // Unary boolean op (Only possible operation is !)
  visitUnaryExpr(ctx: UnaryExprContext): RustLikeType {
    let type1 = this.visit(ctx.expr());
    if (!typeEqual(type1, BOOL_TYPE))
      throw new Error(`Expected bool for ! operator, got ${typeToString(type1)}.`);
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
            throw new Error(`${typeToString(type1)}-${typeToString(type2)} operation will cause u32 to overflow.`);
          return { tag: Tag.NUMBER, val: type1.val - type2.val };
        case '*':
          return { tag: Tag.NUMBER, val: type1.val * type2.val };
        case '/':
          if (type2.val === 0)
            throw new Error(`${typeToString(type1)}/${typeToString(type2)} operation will cause division by zero error.`);
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
          throw new Error(`Expected u32 types for binary operation ${op}, got ${typeToString(type1)} and ${typeToString(type2)}.`);
      }
    } else {
      throw new Error(`Expected u32 or boolean types for binary operation ${op} got ${typeToString(type1)} and ${typeToString(type2)}.`);
    }
  }

  visitLogicalExpr(ctx: LogicalExprContext): RustLikeType {
    let type1 = this.visit(ctx.expr()[0]);
    let type2 = this.visit(ctx.expr()[1]);
    const op = ctx.BOOL_BINOP().getText();
    if (!typeEqual(type1, type2))
      throw new Error(`Mismatched types in logical binary operation.`);

    if (!typeEqual(type1, BOOL_TYPE))
      throw new Error(`Expected bool types for binary operation ${op}, got ${typeToString(type1)} and ${typeToString(type2)}.`);

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
      throw new Error(`Expected function type for ${fnName}, found ${typeToString(idType)}.`);
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
        throw new Error(`Mismatched types, expected ${typeToString(fnType.paramTypes[i])} at index ${i}, found ${typeToString(argTypes[i])}.`);
      }
    }

    return fnType.retType;
  }

  visitTerminal(_node: TerminalNode): RustLikeType {
    switch (_node.getSymbol().type) {
      case RustLikeParser.IDENTIFIER: {
        const retType = this.typeEnv.lookUpType(_node.getText()); // This may be a lookup of an already moved value!
        if (retType === MOVED_STRING_TYPE) throw new Error(`Borrow of moved String ${_node.getText()}.`);
        return retType;
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
          tag: Tag.STRING,
          isMoved: false
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
    const name = ctx.IDENTIFIER().getText();
    const declType = parseType(ctx.type());
    const exprType = this.visit(ctx.expr());
    if (!typeEqual(declType, exprType))
      throw new Error(`Expected type ${typeToString(declType)} in declaration for ${name}, got ${typeToString(exprType)}.`);
    this.typeEnv.types.set(name, exprType);
    return UNIT_TYPE;
  }

  visitFn_decl(ctx: Fn_declContext): RustLikeType {
    const name = ctx.IDENTIFIER().getText();
    const block = ctx.block_expr() === null ? ctx.block_stmt() : ctx.block_expr();
    let fnType: FnType;

    // Get argument types
    const paramNames = [];
    const paramTypes = [];
    const paramList = ctx.param_list_opt().param_list();
    if (paramList !== null) {
      paramList.param().forEach(
        (param) => {
          paramNames.push(param.IDENTIFIER().getText());
          paramTypes.push(parseType(param.type()));
        });
    }

    // Get capture types 
    const scanRes: ScanResult = new ScopedScannerVisitor(block).visit(block);

    // Enter scope
    this.typeEnv = this.typeEnv.extend(scanRes);

    // Check return types
    const retType = parseType(ctx.type());
    const bodyType: RustLikeType = this.visit(block);
    if (!typeEqual(retType, bodyType))
      throw new Error(`Expected return type ${typeToString(retType)} in function declaration for ${name}, got ${typeToString(bodyType)}.`);

    // Exit scope
    this.typeEnv = this.typeEnv.parent;

    // Initalize fnType with values
    fnType = {
      tag: Tag.CLOSURE,
      captureNames: scanRes.names,
      captureTypes: scanRes.types,
      paramNames: paramNames,
      paramTypes: paramTypes,
      retType: bodyType,
    };

    // Add declaration
    this.typeEnv.types.set(name, fnType);
    return UNIT_TYPE;
  }

  visitPrint_stmt(ctx: Print_stmtContext): RustLikeType {
    const exprType = this.visit(ctx.expr());
    if (!typeEqual(exprType, STRING_TYPE))
      throw new Error(`print! expected String, got ${typeToString(exprType)}.`);

    return UNIT_TYPE;
  }

  visitIf_stmt(ctx: If_stmtContext): RustLikeType {
    let predType = this.visit(ctx.expr());

    if (!typeEqual(predType, BOOL_TYPE))
      throw new Error(`Expected boolean predicate for if statement.`);

    this.visit(ctx.block_stmt()[0]);
    this.visit(ctx.block_stmt()[1]);

    // No need to check cons and alt, stmts produce unit
    return UNIT_TYPE;
  }

  visitWhile_loop(ctx: While_loopContext): RustLikeType {
    let predType = this.visit(ctx.expr());

    if (!typeEqual(predType, BOOL_TYPE))
      throw new Error(`Expected boolean predicate for while loop.`);

    this.visit(ctx.block_stmt());
    return UNIT_TYPE;
  }

  visitContinue_stmt(ctx: Continue_stmtContext): RustLikeType {
    // TODO: Not implemented
    return UNIT_TYPE;
  }

  visitExpr_stmt(ctx: Expr_stmtContext): RustLikeType {
    this.visit(ctx.expr());
    return UNIT_TYPE;
  }

  visitBlock_stmt(ctx: Block_stmtContext): RustLikeType {
    this.typeEnv = this.typeEnv.extend(null);
    this.visit(ctx.stmt_list());
    this.typeEnv = this.typeEnv.parent;
    return UNIT_TYPE;
  }
}

