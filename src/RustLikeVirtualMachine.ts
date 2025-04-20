import { Tag, Heap, HeapItem } from "./Heap"

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
}

export class RustLikeVirtualMachine {
  private instrs: Inst[];

  private OS: HeapItem[]; // HeapItem stack 
  private PC: number;
  private E: number; // Heap address
  private RTS: number[];
  private heap: Heap;

  step() {
    const inst = this.instrs[this.PC];

    // TODO: fill out switch case
    switch (inst.bytecode) {
      case Bytecode.NOP:
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

  run() {
    this.PC = 0;
    this.heap = new Heap();
    this.OS = [];
    this.RTS = [];
    this.E = this.heap.allocEnv(10000); // TODO: Base the value here off the number of variables allocated (find out during compile time)

    while (this.instrs[this.PC].bytecode != Bytecode.DONE) {
      this.step();
    }
  }

}

export class Inst {
  public bytecode: Bytecode;
  public args: HeapItem[];

  constructor(bytecode: Bytecode, ...args: HeapItem) {
    this.bytecode = bytecode;
    for (let i = 0; i < args.length; i++) {
      this.args[i] = args[i]
    }
  }
}
