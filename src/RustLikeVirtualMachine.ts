import { Tag, Heap, Item, is_primitive, JS_value_to_Item, addr_to_Item, EnvironmentValue, CapturedClosureValue, ClosureValue } from "./Heap"

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
  ASSIGN = 20, // Assign the value on the operand stack 
  FREE = 21,
  LDCC = 22, // Load constant closure
  RET = 23,
  DECL = 24, // Declare identifier 
  NEW_ARRAY = 25, // Create new array from elements on stack
  NEW_TUPLE = 26, // Create new tuple from elements on stack
  NEW_RANGE = 27, // Create new range from start and end
  INDEX = 28, // Index into array/string
  REF = 29, // Create a reference to a value
  DEREF = 30, // Dereference a reference
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
  [Bytecode.LDCC]: 1,
  [Bytecode.RET]: 0,
  [Bytecode.DECL]: 0, // Operand: { name: string, type: RustLikeType }
  [Bytecode.NEW_ARRAY]: 1, // Operand: number of elements
  [Bytecode.NEW_TUPLE]: 1, // Operand: number of elements
  [Bytecode.NEW_RANGE]: 0, // Takes start and end from stack
  [Bytecode.INDEX]: 0, // Takes array/string and index from stack
  [Bytecode.REF]: 0, // Takes value from stack, creates reference
  [Bytecode.DEREF]: 0, // Takes reference from stack, gets value
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
  private trace: { trc: string };
  private TRACE_BUFFER_SIZE: number = 10_000; // Avoid insane strings

  private pushTrace(line: string) {
    if (this.isDebug && this.trace.trc.length < this.TRACE_BUFFER_SIZE)
      this.trace.trc += line + "\n";
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
      case Bytecode.LDPS: { // This should only be used to load closures! (uncaptured) 
        // Call LDCC after to capture appropriate values.
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
        try {
          if (this.OS.length === 0) {
            throw new Error("Stack underflow: Cannot call with empty stack");
          }

          const fnItem = this.OS[this.OS.length - 1];
          if (!fnItem || (fnItem.tag !== Tag.CLOSURE && fnItem.tag !== Tag.CAPTURED_CLOSURE)) {
            throw new Error(`Cannot call non-function value: ${fnItem ? Tag[fnItem.tag] : 'undefined'}`);
          }

          let funcAddr: number;
          let paramNames: string[];
          let capturedVars: Map<string, Item> = new Map();

          if (fnItem.tag === Tag.CLOSURE) {
            // Handle regular closure
            const closureData = fnItem.value as ClosureValue;
            funcAddr = closureData.funcAddr;
            paramNames = closureData.paramNames;
          } else {
            // Handle captured closure
            const capturedClosureData = fnItem.value as CapturedClosureValue;
            funcAddr = capturedClosureData.funcAddr;
            paramNames = capturedClosureData.paramNames;
            capturedVars = capturedClosureData.capturedVars;
          }

          const numParams = paramNames.length;
          if (this.OS.length < numParams + 1) {
            throw new Error(`Not enough arguments for function call: expected ${numParams}, got ${this.OS.length - 1}`);
          }

          // Save current environment and PC
          const returnPC = this.PC + 1; // Save the next instruction after the call
          const oldEnv = this.E;

          // Pop arguments and the function
          const args: Item[] = [];
          for (let i = 0; i < numParams; i++) {
            args.unshift(this.OS.pop()!); // Get in reverse order
          }
          this.OS.pop(); // Remove function

          // Create new frame for return
          const frame: Frame = {
            __return_pc: returnPC,
            __old_env: oldEnv,
            bindings: new Map()
          };
          this.RTS.push(frame);

          // Create new environment bindings
          const allBindings = new Map<string, Item>();

          // Add captured variables
          for (const [name, value] of capturedVars.entries()) {
            allBindings.set(name, value);
          }

          // Add parameters
          for (let i = 0; i < numParams; i++) {
            allBindings.set(paramNames[i], args[i]);
          }

          // Create and set new environment
          this.E = JS_value_to_Item(this.heap, {
            parentAddr: oldEnv.value,
            bindings: allBindings
          });

          // Jump to function body
          this.PC = funcAddr - 1; // -1 because PC gets incremented after each step

        } catch (error) {
          console.error("Error in CALL instruction:", error);
          throw error;
        }
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
      case Bytecode.LDCC: { // This has to be followed by a CALL instruction and be after a LDPS instruction
        // captureNames: string[], paramNames: string[]
        // captureNames contain all names used in the function
        const { funcAddr, captureNames, paramNames } = this.OS.pop()!.value as ClosureValue;
        const captureMap = new Map<string, Item>();
        for (const name of captureNames) {
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

        const closure = new Item(Tag.CAPTURED_CLOSURE, 0, {
          funcAddr,
          captures: captureMap,
          paramNames
        });

        this.OS.push(closure);
        break;
      }
      case Bytecode.RET: {
        // Pop the return value
        const retVal = this.OS.pop()!;

        // Pop the frame
        const frame = this.RTS.pop()!;

        // Restore environment
        this.E = frame.__old_env;

        // Jump back to caller
        this.PC = frame.__return_pc - 1; // -1 because PC gets incremented after each step

        // Push return value back onto the stack
        this.OS.push(retVal);
        break;
      }
      case Bytecode.DECL: {
        const { name, rustLikeType } = inst.operand!;
        if (rustLikeType.tag === Tag.CLOSURE) {
          // If a closure is being declared, push its instruction address value to the OS as a primitive first 
          const it = this.OS.pop()!;

          if (it.tag !== Tag.NUMBER)
            throw new Error("New function declared but no instruction access given")

          const currFrame: Frame = this.RTS[this.RTS.length - 1];
          currFrame.bindings.set(name, new Item(Tag.CLOSURE, 0, <ClosureValue>{
            funcAddr: it.value, captureNames: rustLikeType.captureNames, paramNames: rustLikeType.paramNames
          }));

        } else {
          const curEnv = this.heap.get_data(this.E) as EnvironmentValue;
          curEnv.bindings.set(name, undefined);
        }
      }
      case Bytecode.NEW_ARRAY: {
        const numElements = inst.operand as number;
        const elements: Item[] = [];
        for (let i = 0; i < numElements; i++) {
          elements.unshift(this.OS.pop()!);
        }
        const array = new Item(Tag.ARRAY, 0, elements);
        this.OS.push(array);
        break;
      }
      case Bytecode.NEW_TUPLE: {
        const numElements = inst.operand as number;
        const elements: Item[] = [];
        for (let i = 0; i < numElements; i++) {
          elements.unshift(this.OS.pop()!);
        }
        const tuple = new Item(Tag.TUPLE, 0, elements);
        this.OS.push(tuple);
        break;
      }
      case Bytecode.NEW_RANGE: {
        const end = this.OS.pop()!;
        const start = this.OS.pop()!;
        const range = new Item(Tag.RANGE, 0, { start: start.value, end: end.value });
        this.OS.push(range);
        break;
      }
      case Bytecode.INDEX: {
        const index = this.OS.pop()!;
        const container = this.OS.pop()!;

        if (container.tag === Tag.ARRAY || container.tag === Tag.TUPLE) {
          const elements = container.value as Item[];
          if (index.value < 0 || index.value >= elements.length) {
            throw new Error(`Index ${index.value} out of bounds for ${container.tag}`);
          }
          this.OS.push(elements[index.value]);
        } else if (container.tag === Tag.STRING) {
          const str = container.value as string;
          if (index.value < 0 || index.value >= str.length) {
            throw new Error(`Index ${index.value} out of bounds for string`);
          }
          this.OS.push(new Item(Tag.STRING, 0, str[index.value]));
        } else {
          throw new Error(`Cannot index into ${container.tag}`);
        }
        break;
      }
      case Bytecode.REF: {
        const value = this.OS.pop()!;
        // Create a reference to the value
        const ref = new Item(Tag.REF, 0, value);
        this.OS.push(ref);
        break;
      }
      case Bytecode.DEREF: {
        const ref = this.OS.pop()!;
        if (ref.tag !== Tag.REF) {
          throw new Error("Cannot dereference non-reference value");
        }
        // Get the value being referenced
        this.OS.push(ref.value);
        break;
      }
    }
  }

  // Run program
  runInstrs(instrs: Inst[], isDebug: boolean = true, trace = { trc: "" }): any {
    this.isDebug = isDebug;
    this.instrs = instrs;
    this.trace = trace;
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
        ["print!",
          new Item(Tag.CLOSURE,
            0,
            <ClosureValue>{ funcAddr: 0, captureNames: ['x'], paramNames: ['x'] })], // TODO: Add primitive implementation of print! into instrs from compiler, will require new opcodes
      ])
    };

    this.RTS.push(global_frame);

    // Main loop to step through program
    while (this.instrs[this.PC].opcode != Bytecode.DONE) {
      this.step();
      this.PC += 1; // increment program counter
    }

    // Get the result from the operand stack
    let result = { value: "()", debugTrace: this.trace.trc };

    if (this.OS.length > 0) {
      const resultItem = this.OS[this.OS.length - 1];
      if (is_primitive(resultItem.tag)) {
        // For primitive values, return them directly
        result.value = resultItem.value.toString();
      } else {
        // For heap-allocated values, convert to JS value
        result.value = JSON.stringify(this.heap.addr_to_JS_value(resultItem.value));
      }
    }

    return result;
  }

}

export class Inst {
  constructor(public opcode: Bytecode, public operand?: any) { }
}
