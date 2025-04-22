import { Tag, Heap, Item, is_primitive, JS_value_to_Item, addr_to_Item, EnvironmentValue, ClosureValue } from "./Heap"

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
  LDCC = 22, // Load constant closure
  RET = 23,
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
  [Bytecode.LDHS]: 1, // Load from heap scope
  [Bytecode.LDPS]: 1, // Load primitive symbolic from stack (only primitive symbolic in the machine is a closure)
  [Bytecode.CALL]: 1,
  [Bytecode.ENTER_SCOPE]: 1, // Operand: Size of scope
  [Bytecode.EXIT_SCOPE]: 1,
  [Bytecode.ASSIGN]: 0,
  [Bytecode.FREE]: 1,
  [Bytecode.LDCC]: 1, // Operand: { funcAddr: number, captures: string[], paramNames: string[] } type, where captures are names of arguments to the function
  [Bytecode.RET]: 0,
}

export interface Frame {
  __return_pc: number;
  __old_env: Item;
  bindings: Map<string, Item>; // For closure bindings
}

export class RustLikeVirtualMachine {
  private instrs: Inst[];

  private OS: Item[]; // Item stack 
  private PC: number;
  private E: Item; // Heap address
  private RTS: Frame[];
  private heap: Heap;

  private isDebug: boolean; // Set to false in runInstrs to run without debug 
  private trace: string;
  private TRACE_BUFFER_SIZE: number = 10_000; // Avoid insane strings

  private pushTrace(line: string) {
    if (this.isDebug && this.trace.length < this.TRACE_BUFFER_SIZE)
      this.trace += line + "\n";
  }

  private step() {
    const inst = this.instrs[this.PC];

    if (this.isDebug)
      this.pushTrace(
        `[${String(this.PC).padStart(3)}] ${Bytecode[inst.opcode].padEnd(7)} ${inst.operand ?? ""
        }  OS→ ${this.OS.map(it =>
          is_primitive(it.tag) ? it.value : `<${Tag[it.tag]}>`
        ).join(" ")
        }`
      );

    switch (inst.opcode) {
      case Bytecode.NOP: {
        // Nothing, NOP
        return;
      }
      case Bytecode.POP: {
        this.OS.pop()!;
        return;
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
        return;
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
          throw new Error("Non string found");
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
          const env = this.heap.get_data(envItem) as EnvironmentValue;
          if (env.bindings.has(name)) {
            const item = env.bindings.get(name)!;
            this.OS.push(item); // Item may be primitive or heap allocated
            break;
          }
          envItem = addr_to_Item(this.heap, env.parentAddr);
        }

        throw new Error(`Unbound symbol in heap scope: ${name}`);
      }
      case Bytecode.LDPS: { // This should only be used to load closures!
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
        // Current closure implementation assumes no names are declared within closures themselves
        // ^ This is related to one TODO below

        const fnItem = this.OS.pop()!;
        if (fnItem.tag !== Tag.CLOSURE) {
          throw new Error("CALL expects a closure");
        }

        const { funcAddr, capturedVars, paramNames } = fnItem.value as ClosureValue;

        // Pop args in reverse order
        const args: Item[] = [];
        for (let i = 0; i < paramNames.length; i++) {
          args.unshift(this.OS.pop()!); // reverse order
        }

        const allBindings = new Map<string, Item>();

        // Insert captures into newBindings
        for (const [name, item] of capturedVars.entries()) {
          allBindings.set(name, item);
        }

        // Insert args (or shadow captures if same name) into newBindings
        for (let i = 0; i < paramNames.length; i++) {
          const name = paramNames[i];
          allBindings.set(name, args[i]);
        }

        // TODO: add bindings declared in the function here after scanning them 

        // Split bindings into bindings of stack allocated and heap allocated objects
        const heapBindings = new Map<string, Item>();
        const stackBindings = new Map<string, Item>(); // Only closures should be here

        for (const [name, item] of allBindings) {
          if (item.tag === Tag.CLOSURE) {
            stackBindings.set(name, item);
          } else {
            heapBindings.set(name, item);
          }
        }

        // Create a new environment that extends the function's environment
        // TODO/Extension: possibly allocate based on amount of space needed for the closure, 
        // this can be scanned during compilation
        const newEnv: Item = this.heap.allocEnv(128);
        const envData = {
          parentAddr: newEnv,
          bindings: heapBindings,
        };
        this.heap.set_data(newEnv, envData);

        // Save current environment and PC onto RTS
        const newFrame: Frame = {
          __return_pc: this.PC,
          __old_env: this.E,
          bindings: stackBindings,
        }
        this.RTS.push(newFrame);

        this.E = newEnv.value;
        this.PC = funcAddr - 1; // -1 because PC is incremented after step()
        break;
      }
      case Bytecode.ENTER_SCOPE: {
        const newEnv = this.heap.allocEnv(128);
        const newEnvData = {
          parentAddr: this.E,
          bindings: new Map<string, Item>()
        };
        this.heap.set_data(newEnv.value, newEnvData);
        this.E = newEnv.value;
        break;
      }
      case Bytecode.EXIT_SCOPE: {
        const currentEnv = this.heap.get_data(this.E) as EnvironmentValue;
        if (currentEnv.parentAddr === null) {
          throw new Error("Cannot exit global scope");
        }
        this.E = addr_to_Item(this.heap, currentEnv.parentAddr);
        break;
      }
      case Bytecode.ASSIGN: { // OS should contain an Item bound on either RTS or Environment, inst.operand should be a string identifier to assign the Item to 
        const name = inst.operand as string;
        const val = this.OS.pop()!;

        // Assign to RTS if name refers to a closure Item
        for (let i = this.RTS.length - 1; i >= 0; i--) {
          const frame = this.RTS[i];
          if ('bindings' in frame && frame.bindings.has(name)) {
            const existing = frame.bindings.get(name)!;
            if (existing.tag === Tag.CLOSURE) {
              frame.bindings.set(name, val); // Only update if it's a closure
              return;
            }
          }
        }

        // Otherwise, assign to environment
        let envItem = this.E;
        while (envItem !== null) {
          const env = this.heap.get_data(envItem) as EnvironmentValue;
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
      case Bytecode.LDCC: { // This has to be followed by a CALL instruction
        // captures: string[], paramNames: string[]
        // captures can contain all names used in the function
        const { funcAddr, captures, paramNames } = inst.operand;
        const captureMap = new Map<string, Item>();
        for (const name of captures) {
          if (paramNames.includes(name)) {
            continue; // Don't capture, param shadows this variable
          }

          let envItem = this.E;

          let foundInHeap: boolean = false;
          while (envItem.value !== 0xFF) {
            const env = this.heap.get_data(envItem) as EnvironmentValue;
            if (env.bindings.has(name)) {
              const capturedItem = env.bindings.get(name)!;
              if (!is_primitive(capturedItem.tag)) {
                env.bindings.delete(name); // Move: remove from current env if variable is heap allocated
              }

              this.heap.set_data(envItem, env); // TODO: Possible Optimization: Shrink size of environment

              captureMap.set(name, capturedItem);
              foundInHeap = true;
              break;
            }
            envItem = addr_to_Item(this.heap, env.parentAddr);
          }

          if (foundInHeap) continue;

          // Not found in heap, check RTS but do not move values from RTS 
          // Search top-down in RTS (treat as an environment stack)
          let foundInRTS = false;
          for (let i = this.RTS.length - 1; i >= 0; i--) {
            const frame = this.RTS[i];
            if (frame instanceof Map && frame.has(name)) {
              const capturedItem = frame.get(name); // Do not delete from RTS, copy value
              captureMap.set(name, capturedItem);
              foundInRTS = true;
              break;
            }
          }

          // Not found in RTS or Heap, throw runtime error
          if (!foundInRTS && !foundInHeap) {
            // For debug purposes, should not appear in implementation since the compiler should 
            // keep track of move semantics/ownership and unbound names/lifetimes
            throw new Error(`Argument '${name}' to function not found in heap or RTS`);
          }
        }

        const closure = new Item(Tag.CLOSURE, 0, {
          funcAddr,
          captures: captureMap
        });

        this.OS.push(closure);
        break;
      }
      case Bytecode.RET: {
        const returnValue = this.OS.pop(); // Pop return value (if any)
        const currentFrame = this.RTS.pop(); // Pop RTS frame
        if (!currentFrame) throw new Error("Runtime stack underflow on RET");

        // Restore PC and E 
        this.PC = currentFrame.__return_pc;
        this.E = currentFrame.__old_env;

        if (returnValue !== undefined) {
          this.OS.push(returnValue); // Push return value back on OS
        } else {
          this.OS.push(new Item(Tag.UNIT, 0, undefined));
        }
        return;
      }
    }
  }

  // Run program
  runInstrs(instrs: Inst[], isDebug: boolean = true): any {
    this.isDebug = isDebug;
    this.instrs = instrs;
    return this.run();
  }

  run(): any {
    // Initialize
    this.PC = 0;
    this.heap = new Heap(2048);
    this.OS = [];
    this.RTS = [];
    this.E = this.heap.allocEnv(32); // TODO: Base the value here off the number of variables allocated in the global environment 

    const global_frame: Frame = {
      __return_pc: -1,
      __old_env: undefined,
      bindings: new Map<string, Item>([  // Add global frame
        ["println!",
          new Item(Tag.CLOSURE,
            0,
            <ClosureValue>{ funcAddr: 0, capturedVars: new Map<string, Item>(), paramNames: ['x'] })], // TODO: Add primitive implementation of println into instrs from compiler
      ])
    };

    this.RTS.push(global_frame);

    // Main loop to step through program
    while (this.instrs[this.PC].opcode != Bytecode.DONE) {
      this.step();
      this.PC += 1; // increment program counter
    }

    const resultItem: Item = this.OS.pop();

    let result = ""; // Always return a string as a result of execution
    if (this.isDebug) result += "DEBUG: " + this.trace + "\n\n -------------------------- \n";

    // Always return a string as a result of execution
    if (!resultItem) { // Nothing on heap, return unit type
      result += "()"; // Return unit type
    } else if (is_primitive(resultItem.tag)) {
      result += JSON.stringify(resultItem.value);
    } else {
      result += JSON.stringify(this.heap.addr_to_JS_value(resultItem.value));
    }

    return result;
  }

}

export class Inst {
  constructor(public opcode: Bytecode, public operand?: any) { }
}
