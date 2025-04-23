import {
  Tag,
  Heap,
  Item,
  is_primitive,
  JS_value_to_Item,
  addr_to_Item,
  EnvironmentValue,
  CapturedClosureValue,
  ClosureValue,
} from "./Heap";

/*  ───────────── Byte-code set ───────────── */

export enum Bytecode {
  // To be put on operand stack
  NOP = 0, // No op
  POP = 1,
  DONE = 2,

  /* constants */
  LDCI = 3, // Load constant integer
  LDCB = 4, // Load constant boolean
  LDCS = 5, // Load constant string

  /* arithmetic */
  PLUS = 6,
  TIMES = 7,
  NOT = 8,
  AND = 9,
  OR = 10,
  LT = 11, // Less than
  EQ = 12, // Equal

  /* control-flow */
  JOF = 13, // Jump on false
  GOTO = 14,

  /* symbols & calls */
  LDHS = 15, // Load heap symbolic (for strings and functions)
  LDPS = 16, // Load primitive symbolic
  CALL = 17,

  /* scopes */
  ENTER_SCOPE = 18,
  EXIT_SCOPE = 19,

  ASSIGN = 20, // Assign the value on the operand stack
  FREE = 21,

  /* closures */
  LDCC = 22, // Load constant closure
  RET = 23,
  DECL = 24, // Declare identifier

  /*  new in this patch  */
  MINUS = 25,
  DIV = 26,
  MOD = 27,
  LE = 28,
  GE = 29,
  NE = 30,
}

/*  Numbers of items *popped* from the operand stack.
    (Binary ops show “0” because they pop two items
    *inside* the micro-code, not via an explicit operand.)               */
export const BytecodeArity: Record<Bytecode, number> = {
  [Bytecode.NOP]: 0,
  [Bytecode.POP]: 0,
  [Bytecode.DONE]: 0,

  [Bytecode.LDCI]: 1,
  [Bytecode.LDCB]: 1,
  [Bytecode.LDCS]: 1,

  [Bytecode.PLUS]: 0,
  [Bytecode.TIMES]: 0,
  [Bytecode.MINUS]: 0,
  [Bytecode.DIV]: 0,
  [Bytecode.MOD]: 0,

  [Bytecode.NOT]: 0,
  [Bytecode.AND]: 0,
  [Bytecode.OR]: 0,

  [Bytecode.LT]: 0,
  [Bytecode.LE]: 0,
  [Bytecode.GE]: 0,
  [Bytecode.EQ]: 0,
  [Bytecode.NE]: 0,

  [Bytecode.JOF]: 1,
  [Bytecode.GOTO]: 1,

  [Bytecode.LDHS]: 1,
  [Bytecode.LDPS]: 1,
  [Bytecode.CALL]: 1,

  [Bytecode.ENTER_SCOPE]: 1,
  [Bytecode.EXIT_SCOPE]: 1,

  [Bytecode.ASSIGN]: 0,
  [Bytecode.FREE]: 1,

  [Bytecode.LDCC]: 1,
  [Bytecode.RET]: 0,

  [Bytecode.DECL]: 0,
};

/*  ───────────── Runtime types ───────────── */

export interface Frame {
  __return_pc: number;
  __old_env: Item;
  bindings: Map<string, Item>; // For closure bindings
}

/*  ───────────── Virtual Machine ───────────── */

export class RustLikeVirtualMachine {
  private instrs: Inst[];
  private OS: Item[]; // Operand stack
  private PC: number;
  private E: Item; // Current environment (heap pointer)
  private RTS: Frame[];
  private heap: Heap;

  private isDebug = false;
  private trace = "";
  private readonly TRACE_BUFFER_SIZE = 10_000; // Avoid insane strings

  private pushTrace(line: string) {
    if (this.isDebug && this.trace.length < this.TRACE_BUFFER_SIZE)
      this.trace += line + "\n";
  }

  /*  One micro-step  */
  private step() {
    const inst = this.instrs[this.PC];

    if (this.isDebug)
      this.pushTrace(
        `[${String(this.PC).padStart(3)}] ${Bytecode[inst.opcode].padEnd(7)} ${
          inst.operand ?? ""
        }  OS→ ${this.OS.map((it) =>
          is_primitive(it.tag) ? it.value : `<${Tag[it.tag]}>`
        ).join(" ")}`
      );

    switch (inst.opcode) {
      /* ───── trivial stack ops ───── */
      case Bytecode.NOP:
        return;

      case Bytecode.POP:
        this.OS.pop();
        return;

      case Bytecode.DONE:
        return;

      /* ───── constants ───── */
      case Bytecode.LDCI:
        if (typeof inst.operand !== "number") throw new Error("Non integer found");
        this.OS.push(JS_value_to_Item(this.heap, inst.operand));
        return;

      case Bytecode.LDCB:
        if (typeof inst.operand !== "boolean") throw new Error("Non boolean found");
        this.OS.push(JS_value_to_Item(this.heap, inst.operand));
        return;

      case Bytecode.LDCS:
        if (typeof inst.operand !== "string") throw new Error("Non string found");
        this.OS.push(JS_value_to_Item(this.heap, inst.operand));
        return;

      /* ───── arithmetic ───── */
      case Bytecode.PLUS: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, a.value + b.value));
        break;
      }
      case Bytecode.MINUS: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, a.value - b.value));
        break;
      }
      case Bytecode.TIMES: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, a.value * b.value));
        break;
      }
      case Bytecode.DIV: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, Math.floor(a.value / b.value)));
        break;
      }
      case Bytecode.MOD: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, a.value % b.value));
        break;
      }

      /* ───── boolean / comparison ───── */
      case Bytecode.NOT: {
        const v = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, !v.value));
        break;
      }
      case Bytecode.AND: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, a.value && b.value));
        break;
      }
      case Bytecode.OR: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, a.value || b.value));
        break;
      }

      case Bytecode.LT: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, a.value < b.value));
        break;
      }
      case Bytecode.LE: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, a.value <= b.value));
        break;
      }
      case Bytecode.GE: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, a.value >= b.value));
        break;
      }
      case Bytecode.EQ: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, a.value === b.value));
        break;
      }
      case Bytecode.NE: {
        const b = this.OS.pop()!;
        const a = this.OS.pop()!;
        this.OS.push(JS_value_to_Item(this.heap, a.value !== b.value));
        break;
      }

      /* ───── control-flow ───── */
      case Bytecode.GOTO:
        this.PC = inst.operand! - 1; // -1 because PC++ after step()
        return;

      /* ───── symbol look-ups ───── */
      case Bytecode.LDHS: {
        /* … unchanged … */
        const name = inst.operand as string;

        let envItem = this.E;
        while (envItem.value !== 0xff) {
          const env = this.heap.get_data(envItem) as EnvironmentValue;
          if (env.bindings.has(name)) {
            this.OS.push(env.bindings.get(name)!);
            return;
          }
          envItem = addr_to_Item(this.heap, env.parentAddr);
        }

        throw new Error(`Unbound symbol in heap scope: ${name}`);
      }

      case Bytecode.LDPS: {
        /* … identical to previous version … */
        const name = inst.operand as string;
        for (let i = this.RTS.length - 1; i >= 0; i--) {
          const frame = this.RTS[i];
          if (frame.bindings.has(name)) {
            this.OS.push(frame.bindings.get(name)!);
            return;
          }
        }
        throw new Error(`Unbound primitive symbol: ${name}`);
      }

      /* ───── calls / closures ───── */
      case Bytecode.CALL: {
        /* … existing call logic unchanged … */
        /* (omitted for brevity – the body is the same as in the user’s file) */
        break;
      }

      /* ───── scopes ───── */
      case Bytecode.ENTER_SCOPE: {
        /* use operand as the requested environment size, or a
           sensible default when the compiler passes “undefined” */
        const requested = typeof inst.operand === "number" ? inst.operand : 128;
        const newEnv = this.heap.allocEnv(requested);
        this.heap.set_data(newEnv.value, {
          parentAddr: this.E,
          bindings: new Map<string, Item>(),
        });
        this.E = newEnv.value;
        break;
      }

      case Bytecode.EXIT_SCOPE: {
        const cur = this.heap.get_data(this.E) as EnvironmentValue;
        if (cur.parentAddr === null)
          throw new Error("Cannot exit global scope");
        this.E = addr_to_Item(this.heap, cur.parentAddr);
        break;
      }

      /* ───── assignment & declaration ───── */
      case Bytecode.DECL: {
        /*  first allocate a slot in the *current* environment.
            If the variable ends up holding a closure the runtime
            will update RTS instead (see ASSIGN).                         */
        const { name, rustLikeType } = inst.operand!;
        if (rustLikeType.tag === Tag.CLOSURE) {
          /* function declaration handled elsewhere                      */
        } else {
          const env = this.heap.get_data(this.E) as EnvironmentValue;
          env.bindings.set(name, undefined);
        }
        break;
      }

      case Bytecode.ASSIGN: {
        const name = inst.operand as string;
        const val = this.OS.pop()!;

        /* First try RTS (for stack-resident closures) */
        for (let i = this.RTS.length - 1; i >= 0; i--) {
          const f = this.RTS[i];
          if (f.bindings.has(name)) {
            const existing = f.bindings.get(name)!;
            if (existing.tag === Tag.CLOSURE) {
              f.bindings.set(name, val);
              return;
            }
          }
        }

        /* … otherwise write into the nearest heap environment … */
        let envItem = this.E;
        while (envItem.value !== 0xff) {
          const env = this.heap.get_data(envItem) as EnvironmentValue;
          if (env.bindings.has(name)) {
            env.bindings.set(name, val);
            return;
          }
          envItem = addr_to_Item(this.heap, env.parentAddr);
        }
        throw new Error(`Unbound variable on ASSIGN: ${name}`);
      }

      /* ───── remaining op-codes unchanged ───── */
      case Bytecode.FREE:
      case Bytecode.LDCC:
      case Bytecode.RET:
        /*  … identical to the user file, omitted for brevity … */
        break;
    }
  }

  /* ───────────── public API ───────────── */

  // Run program
  runInstrs(instrs: Inst[], debug = true) {
    this.isDebug = debug;
    this.instrs = instrs;
    return this.run();
  }

  private run() {
    /* … identical bootstrap as before … */
    this.PC = 0;
    this.heap = new Heap(2048);
    this.OS = [];
    this.RTS = [];

    /*  global env & frame identical to previous version … */

    /* main loop */
    while (this.instrs[this.PC].opcode !== Bytecode.DONE) {
      this.step();
      this.PC += 1;
    }

    const res = this.OS.pop();
    return {
      value: res ? JSON.stringify(res.value) : "()",
      debugTrace: this.trace,
    };
  }
}

/*  Simple wrapper object  */
export class Inst {
  constructor(public opcode: Bytecode, public operand?: any) {}
}
