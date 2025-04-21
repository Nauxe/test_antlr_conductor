import { Tag, Heap, Item, is_primitive, JS_value_to_Item, addr_to_Item } from "./Heap"

export enum Bytecode { // To be put on operand stack
  NOP = 0, // No op
  POP = 1,
  DONE = 2,
  LDCI = 3, // Load constant integer 
  LDCB = 4, // Load constant boolean
  LDCS = 5, // Load constant string
  PLUS = 6,
  TIMES = 7,
  NOT = 8,
  AND = 9,
  OR = 10,
  LT = 11, // Less than
  EQ = 12, // Equal
  JOF = 13, // Jump on false
  GOTO = 14,
  LDHS = 15, // Load heap symbolic (for strings and functions)
  LDPS = 16, // Load primitive symbolic
  CALL = 17,
  ENTER_SCOPE = 18,
  EXIT_SCOPE = 19,
  ASSIGN = 20,
  FREE = 21,
}

// Represents numbers of elements popped from OS to run the instruction 
export const BytecodeArity: Record<Bytecode, number> = {
  [Bytecode.NOP]: 0, // No op
  [Bytecode.POP]: 0,
  [Bytecode.DONE]: 0,
  [Bytecode.LDCI]: 1, // Load constant integer 
  [Bytecode.LDCB]: 1, // Load constant boolean
  [Bytecode.LDCS]: 1,
  [Bytecode.PLUS]: 0,
  [Bytecode.TIMES]: 0,
  [Bytecode.NOT]: 0,
  [Bytecode.AND]: 0,
  [Bytecode.OR]: 0,
  [Bytecode.LT]: 0, // Less than
  [Bytecode.EQ]: 0, // Equal
  [Bytecode.JOF]: 1, // Jump on false
  [Bytecode.GOTO]: 1,
  [Bytecode.LDHS]: 1, // Load heap symbolic
  [Bytecode.LDPS]: 1, // Load primitive symbolic
  [Bytecode.CALL]: 1,
  [Bytecode.ENTER_SCOPE]: 1, // Operand: Size of scope
  [Bytecode.EXIT_SCOPE]: 1,
  [Bytecode.ASSIGN]: 0,
  [Bytecode.FREE]: 1,
}

export class RustLikeVirtualMachine {
  private instrs: Inst[];

  private OS: Item[]; // Item stack 
  private PC: number;
  private E: Item; // Heap address
  private RTS: Map<string, any>[];
  private heap: Heap;

  step() {
    const inst = this.instrs[this.PC];

    switch (inst.opcode) {
      case Bytecode.NOP:
      // Nothing, NOP
      case Bytecode.POP: {
        this.OS.pop()!;
        break;
      }
      case Bytecode.DONE: {
        return; // Should not reach this point
      }
      case Bytecode.LDCI: {
        if (typeof inst.operand === 'number') {
          this.OS.push(JS_value_to_Item(this.heap, inst.operand));
        } else {
          throw new Error("Non integer found");
        }
        break;
      }
      case Bytecode.LDCB: {
        if (typeof inst.operand === 'boolean') {
          this.OS.push(JS_value_to_Item(this.heap, inst.operand));
        } else {
          throw new Error("Non boolean found");
        }
        break;
      }
      case Bytecode.LDCS: {
        if (typeof inst.operand === 'string') {
          this.OS.push(JS_value_to_Item(this.heap, inst.operand));
        } else {
          throw new Error("Non boolean found");
        }
        break;
      }
      case Bytecode.PLUS: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        const res = JS_value_to_Item(this.heap, a.value + b.value);
        this.OS.push(res);
        break;
      }
      case Bytecode.TIMES: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        const res = JS_value_to_Item(this.heap, a.value * b.value);
        this.OS.push(res);
        break;
      }
      case Bytecode.NOT: {
        const item = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, !item.value));
        break;
      }
      case Bytecode.AND: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        const res = JS_value_to_Item(this.heap, a.value && b.value);
        this.OS.push(res);
        break;
      }
      case Bytecode.OR: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        const res = JS_value_to_Item(this.heap, a.value || b.value);
        this.OS.push(res);
        break;
      }
      case Bytecode.LT: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        const res = JS_value_to_Item(this.heap, a.value < b.value);
        this.OS.push(res);
        break;
      }
      case Bytecode.EQ: { // Should work on heap allocated objects too since value can be either a pointer or a primitive
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        const res = JS_value_to_Item(this.heap, a.value === b.value);
        this.OS.push(res);
        break;
      }
      case Bytecode.GOTO: {
        this.PC = inst.operand! - 1; // -1 since PC is incremented every step
        return
      }
      case Bytecode.LDHS: {
        const name = inst.operand as string;

        let envItem = this.E;
        while (envItem.value !== 0xFF) {
          const env = this.heap.get_data(envItem) as { parentAddr: number | null, bindings: Map<string, number> };
          if (env.bindings.has(name)) {
            const valAddr = env.bindings.get(name)!;
            this.OS.push(addr_to_Item(this.heap, valAddr));
            break;
          }
          envItem = addr_to_Item(this.heap, env.parentAddr);
        }
        break;
      }
      case Bytecode.LDPS: {
        const name = inst.operand as string;

        // Search top-down in RTS (treat as an environment stack)
        for (let i = this.RTS.length - 1; i >= 0; i--) {
          const frame = this.RTS[i];
          if (frame instanceof Map && frame.has(name)) {
            const value = frame.get(name);
            this.OS.push(JS_value_to_Item(this.heap, value));
            return;
          }
        }

        throw new Error(`Unbound primitive symbol: ${name}`);
      }
      case Bytecode.CALL: {
        // TODO: Broken, make sure it works with RTS
        const fnItem = this.OS.pop()!;
        const arg = this.OS.pop()!;

        if (typeof fnItem.value === 'string') {
          // Look up in RTS by symbol
          const symbolName = fnItem.value;

          for (let i = this.RTS.length - 1; i >= 0; i--) {
            const frame = this.RTS[i];
            if (frame instanceof Map && frame.has(symbolName)) {
              const fn = frame.get(symbolName);

              if (typeof fn === 'function') {
                const result = fn(arg.value);
                this.OS.push(JS_value_to_Item(this.heap, result));
                return;
              } else {
                throw new Error(`Symbol '${symbolName}' is not a function`);
              }
            }
          }

          throw new Error(`Unbound function symbol: ${symbolName}`);
        } else {
          throw new Error("CALL expects a function symbol on the stack");
        }
      }
      case Bytecode.ENTER_SCOPE: {
        // TODO: Broken, make sure it works with RTS
        const newEnv = this.heap.allocEnv(8);
        const newEnvData = {
          parentAddr: this.E,
          bindings: new Map<string, number>()
        };
        this.heap.set_data(newEnv.value, newEnvData);
        this.E = newEnv.value;
        break;
      }
      case Bytecode.EXIT_SCOPE: {
        // TODO: Broken, make sure it works with RTS
        const currentEnv = this.heap.get_data(this.E) as { parentAddr: number | null, bindings: Map<string, number> };
        if (currentEnv.parentAddr === null) {
          throw new Error("Cannot exit global scope");
        }
        this.E = addr_to_Item(this.heap, currentEnv.parentAddr);
        break;
      }
      case Bytecode.ASSIGN: {
        // TODO: Broken, make sure it works with RTS primitives
        const name = inst.operand as string;
        const val = this.OS.pop()!;

        let envItem = this.E;
        while (envItem !== null) {
          const env = this.heap.get_data(envItem) as { parentAddr: number | null, bindings: Map<string, number> };
          if (env.bindings.has(name)) {
            env.bindings.set(name, val.value);
            this.heap.set_data(envItem, env);
            break;
          }
          envItem = addr_to_Item(this.heap, env.parentAddr);
        }
        break;
      }
      case Bytecode.FREE: {
        const item = this.OS.pop()!;
        if (!is_primitive(item.tag)) { // Assume item on OS is heap allocated
          this.heap.free(item.value);
        }
        break;
      }
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

    this.RTS.push(new Map<string, Item>([
      ["println!", new Item(Tag.CLOSURE, 0, { funcAddr: 0, envAddr: this.E.value })], // TODO: Add primitive implementation of println
    ])); // Add global frame

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
  constructor(public opcode: Bytecode, public operand?: any) { }
}
