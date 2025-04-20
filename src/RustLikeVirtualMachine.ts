import { Tag, Heap, Item, is_primitive } from "./Heap"

export enum Bytecode { // To be put on operand stack
  NOP = 0, // No op
  POP = 1,
  DONE = 2,
  LDCI = 3, // Load constant integer 
  LDCB = 4, // Load constant boolean
  PLUS = 5,
  TIMES = 6,
  NOT = 7,
  AND = 8,
  OR = 9,
  LT = 10, // Less than
  EQ = 11, // Equal
  JOF = 12, // Jump on false
  GOTO = 13,
  LDS = 14, // Load symbolic
  LDFS = 15, // Load function symbolic
  CALL = 16,
  ENTER_SCOPE = 17,
  EXIT_SCOPE = 18,
  ASSIGN = 19,
  FREE = 20,
  PRINT = 0x10
}

export const BytecodeArity: Record<Bytecode, number> = {
  [Bytecode.NOP]: 0, // No op
  [Bytecode.POP]: 0,
  [Bytecode.DONE]: 0,
  [Bytecode.LDCI]: 1, // Load constant integer 
  [Bytecode.LDCB]: 1, // Load constant boolean
  [Bytecode.PLUS]: 2,
  [Bytecode.TIMES]: 2,
  [Bytecode.NOT]: 1,
  [Bytecode.AND]: 2,
  [Bytecode.OR]: 2,
  [Bytecode.LT]: 2, // Less than
  [Bytecode.EQ]: 2, // Equal
  [Bytecode.JOF]: 1, // Jump on false
  [Bytecode.GOTO]: 1,
  [Bytecode.LDS]: 1, // Load symbolic
  [Bytecode.LDFS]: 1, // Load function symbolic
  [Bytecode.CALL]: 1,
  [Bytecode.ENTER_SCOPE]: 1,
  [Bytecode.EXIT_SCOPE]: 1,
  [Bytecode.ASSIGN]: 2,
  [Bytecode.FREE]: 1,

}

export class RustLikeVirtualMachine {
  private instrs: Inst[];

  private OS: Item[]; // Item stack 
  private PC: number;
  private E: Item; // Heap address
  private RTS: number[];
  private heap: Heap;

  step() {
    const inst = this.instrs[this.PC];

    // TODO: fill out switch case
    switch (inst.opcode) {
      case Bytecode.NOP:
      // Nothing, NOP
      case Bytecode.POP:

      case Bytecode.DONE:
      case Bytecode.LDCI:
      case Bytecode.LDCB:
      case Bytecode.PLUS:
      case Bytecode.TIMES:
      case Bytecode.NOT:
      case Bytecode.AND:
      case Bytecode.OR:
      case Bytecode.LT:
      case Bytecode.EQ:
      case Bytecode.JOF:
      case Bytecode.GOTO:
      case Bytecode.LDS:
      case Bytecode.LDFS:
      case Bytecode.CALL:
      case Bytecode.ENTER_SCOPE:
      case Bytecode.EXIT_SCOPE:
      case Bytecode.ASSIGN:
      case Bytecode.FREE:
    }
    this.PC += 1; // increment program counter
  }

  runInstrs(instrs: Inst[]): any {
    this.instrs = instrs;
    return this.run();
  }

  run(): any {
    this.PC = 0;
    this.heap = new Heap(2048);
    this.OS = [];
    this.RTS = [];
    this.E = this.heap.allocEnv(32); // TODO: Base the value here off the number of variables allocated (find out during compile time)

    while (this.instrs[this.PC].opcode != Bytecode.DONE) {
      this.step();
    }

    const resultItem: Item = this.OS.pop();
    if (is_primitive(resultItem.tag)) {
      return resultItem.value;
    } else {
      return this.heap.addr_to_JS_value(resultItem.value);
    }
  }

}

export class Inst {
  constructor(public opcode: Bytecode, public operand?: any) {}
}
