export enum Tag {
  FREE = 0,
  NUMBER = 1, // Primitive
  BOOLEAN = 2, // Primitive
  STRING = 3, // Heap allocated
  CLOSURE = 4, // Primitive, stack allocated 
  CAPTURED_CLOSURE = 5,

  // Environments are structured as follows: [Tag, Size, ParentAddr, numBindings, [keyLen, key, tag, valueSize, value/addr]...] 
  // all except key are 1 byte long. Value may be a heap address or primitive depending on tag
  // key is keyLen bytes long
  ENVIRONMENT = 6, // Heap allocated 
  UNIT = 7,
  ARRAY = 8, // Heap allocated
  TUPLE = 9, // Heap allocated
  RANGE = 10, // Primitive
  REF = 11, // Reference to a value

  // TODO: Add tuples (only if there is time to do so and find out about how rust manages the memory of tuples)
  //TUPLE = 4, // Heap allocated 
  //// Tuples are structured as follows: [Tag, Size, Addresses...]
}

export function is_primitive(tag: Tag): boolean {
  return tag === Tag.NUMBER || tag === Tag.BOOLEAN || tag === Tag.UNIT || tag === Tag.CLOSURE;
}

// Heap stores values as fat pointers
const WORD_SIZE = 4;
const HEADER_SIZE = 2; // Header size for each heap allocated item, 1 byte for tag, 1 byte for size
export class Heap {
  private data: ArrayBuffer;
  private heapSize: number;
  private dataView: DataView;
  private freeList: number[];

  constructor(heapSize = 256) {
    this.heapSize = heapSize;
    this.data = new ArrayBuffer(heapSize);
    this.dataView = new DataView(this.data);

    // Allocate whole heap as free manually
    this.freeList = [0];
    this.set_tag(this.freeList[0], Tag.FREE);
    this.set_size(this.freeList[0], this.heapSize - HEADER_SIZE);
  }

  // Each allocated Item takes a contiguous chunk of memory on 
  // the heap. 
  // [1 byte tag, 1 byte size, numSize bytes data]
  // The chunk of memory above will be padded by unused bytes if it 
  // is not a multiple of word size.
  //
  // Children can be declared as offsets to data and each byte 
  // of the child is an address to an Item that is a child of the object.
  //
  // allocate() should not be used for primitives, those can be directly
  // constructed as Items. 
  //
  // size parameter does not refer to total size on heap, only size of data
  allocate(tag: Tag, size: number, childOffsets: number[] = []): Item {
    // Loop through free list to find a free item that can fit the new 
    // allocation
    let freeAddr = -1;
    let freeIdx: number;
    for (freeIdx = 0; freeIdx < this.freeList.length; ++freeIdx) {
      if (this.get_size(this.freeList[freeIdx]) >= size) {
        freeAddr = this.freeList[freeIdx];
        break;
      }
    }

    if (freeAddr == -1) {
      throw new Error("Not enough space on heap!");
    }

    // if there are extra words free after allocation
    if (this.get_size(freeAddr) - size >= WORD_SIZE) {
      const paddingSize = (size + HEADER_SIZE) % WORD_SIZE;

      // Replace the free node in the array
      const newFreeAddr = freeAddr + HEADER_SIZE + size + paddingSize;
      const newFreeSize = this.get_size(freeAddr) - size - paddingSize;

      this.set_tag(newFreeAddr, Tag.FREE);
      this.set_size(newFreeAddr, newFreeSize);
      this.freeList[freeIdx] = newFreeAddr;
    } else {
      // If no extra words, remove the free node's address from freeList
      this.freeList.splice(freeIdx, 1);
    }

    // Set tag and size of allocated memory
    const allocatedAddr = freeAddr;
    this.set_tag(allocatedAddr, tag);
    this.set_size(allocatedAddr, size);

    return new Item(tag, size, allocatedAddr, childOffsets);
  }

  get_tag(addr: number): Tag {
    return this.data[addr];
  }

  set_tag(addr: number, tag: Tag) {
    this.data[addr] = tag;
  }

  // addr is the address of the start of a word 
  // Does not include header size 
  get_size(addr: number): number {
    return this.data[addr + 1];
  }

  // addr is the address of the start of a word
  // Does not include header size
  set_size(addr: number, size: number) {
    this.data[addr + 1] = size;
  }


  addr_to_JS_value(addr: number): any {
    const tag = this.get_tag(addr);
    const size = this.get_size(addr);
    const item = new Item(tag, size, addr); // For heap-allocated, value is addr
    
    // Special handling for environments to avoid circular references
    if (tag === Tag.ENVIRONMENT) {
      const env = this.get_data(item) as EnvironmentValue;
      const jsEnv: Record<string, any> = {};
      
      // Convert Map to a plain object for JSON serialization
      for (const [key, bindingItem] of env.bindings.entries()) {
        // For primitive values, just use the value directly
        if (is_primitive(bindingItem.tag)) {
          jsEnv[key] = bindingItem.value;
        } else if (bindingItem.tag === Tag.STRING) {
          // For strings, get the actual string value
          jsEnv[key] = this.get_data(bindingItem);
        } else {
          // For other heap objects, just use a reference description to avoid circularity
          jsEnv[key] = `<${Tag[bindingItem.tag]}>`;
        }
      }
      
      // Include parent reference but avoid circular references
      if (env.parentAddr !== null) {
        jsEnv.__parent = `<Parent Environment>`;
      } else {
        jsEnv.__parent = null;
      }
      
      return jsEnv;
    }
    
    return this.get_data(item);
  }

  get_data(item: Item) {
    const offset = item.value + HEADER_SIZE; // item.value contains an address
    let ptr = offset;

    switch (item.tag) {
      case Tag.STRING:
        let chars: string[] = [];
        for (let i = 0; i < item.size; ++i) {
          const code = this.dataView.getUint8(offset + i);
          chars.push(String.fromCharCode(code));
        }
        return chars.join('');
      case Tag.ENVIRONMENT:
        const env: EnvironmentValue = {
          parentAddr: null,
          bindings: new Map<string, Item>(),
        };

        const parentAddr = this.dataView.getUint8(ptr++);
        env.parentAddr = parentAddr !== 0xFF ? parentAddr : null;

        const numBindings = this.dataView.getUint8(ptr++);
        for (let i = 0; i < numBindings; ++i) {
          const keyLen = this.dataView.getUint8(ptr++);
          let key = '';
          for (let j = 0; j < keyLen; ++j) {
            key += String.fromCharCode(this.dataView.getUint8(ptr++));
          }

          const tag: Tag = this.dataView.getUint8(ptr++);
          const valueSize: number = this.dataView.getUint8(ptr++);
          let value: any;
          if (tag === Tag.NUMBER || tag === Tag.BOOLEAN) {
            value = this.dataView.getUint8(ptr++); // Assume 1-byte values for simplicity
          } else if (tag === Tag.CLOSURE) {
            value = {
              funcAddr: this.dataView.getUint8(ptr++),
              captureNames: [],
              paramNames: []
            };
          } else if (tag === Tag.CAPTURED_CLOSURE) {
            value = {
              funcAddr: this.dataView.getUint8(ptr++),
              capturedVars: new Map<string, Item>(),
              paramNames: []
            };
          } else {
            value = this.dataView.getUint8(ptr++); // Get heap addr
          }

          env.bindings.set(key, new Item(tag, valueSize, value));
        }

        return env;
    }

  }

  // To allocate an environment with n bindings (where the name of the ith binding has a
  // size of b_i) and set its data, do
  // const env = heap.allocEnv(2 + sum(b_i + 2)); -> To allocate the appropriate amount of data 
  // heap.set_data(env, {parentAddr: parentEnvironmentAddress, bindings: [[name, address], ...]}); 
  //
  // Note: parentEnvironmentAddress is undefined for global scope 0xFF
  set_data(item: Item, value: any) {
    const offset = item.value + HEADER_SIZE; // item.value contains an address
    let ptr = offset;
    switch (item.tag) {
      case Tag.STRING:
        for (let i = 0; i < value.length; ++i) {
          this.dataView.setUint8(offset + i, value.charCodeAt(i));
        }
        break;
      case Tag.ENVIRONMENT:
        // children[0] is offset of parent environment
        // children[1] is the offset for numBindings
        // children[i] for i > 1 is the offset for each binding 
        const { parentAddr, bindings } = value; // bindings is Map<string, Item>

        // Store parent address
        this.dataView.setUint8(ptr++, parentAddr ?? 0xFF); // 0xFF = null
        this.dataView.setUint8(ptr++, bindings.size); // Store number of bindings

        const children: number[] = [0]; // Offset of parent is 0
        for (const [key, item] of bindings) {
          this.dataView.setUint8(ptr++, key.length); // key length

          for (let i = 0; i < key.length; ++i) {
            this.dataView.setUint8(ptr++, key.charCodeAt(i)); // key chars
          }

          // Write tag and size 
          this.dataView.setUint8(ptr++, item.tag);
          this.dataView.setUint8(ptr++, item.size);

          // Write value 
          if (item.tag === Tag.NUMBER || item.tag === Tag.BOOLEAN) {
            this.dataView.setUint8(ptr++, item.value);
          } else if (item.tag === Tag.CLOSURE) {
            this.dataView.setUint8(ptr++, item.value.funcAddr);
          } else if (item.tag === Tag.CAPTURED_CLOSURE) {
            this.dataView.setUint8(ptr++, item.value.funcAddr);
          } else {
            this.dataView.setUint8(ptr++, item.value);    // Store heap addr
          }

          children.push(ptr - offset); // Save offset relative to data section, each child points to the keyLen
        }

        item.children = children;
        break;
    }

  }

  free(addr: number) {
    const paddingSize = (this.get_size(addr) + HEADER_SIZE) % WORD_SIZE;
    const totalSize = this.get_size(addr) + paddingSize + HEADER_SIZE;

    // Check if addr to be freed is adjacent to a free location in memory
    let freeAddr = -1;
    let freeIdx: number;
    for (freeIdx = 0; freeIdx < this.freeList.length; ++freeIdx) {
      freeAddr = this.freeList[freeIdx];
      if (freeIdx !== 0 &&
        this.freeList[freeIdx - 1] +
        this.get_size(this.freeList[freeIdx - 1]) + HEADER_SIZE === addr &&
        freeAddr === addr + totalSize) {
        // Address freed is in the middle of 2 nodes in the free list

        const freeAddrPaddingSize = (this.get_size(freeAddr) + HEADER_SIZE) % WORD_SIZE;
        const freeAddrTotalSize = this.get_size(freeAddr) + freeAddrPaddingSize + HEADER_SIZE;

        this.set_size(this.freeList[freeIdx - 1],
          this.get_size(this.freeList[freeIdx - 1]) + totalSize + freeAddrTotalSize);

        this.freeList.splice(freeIdx, 1); // Remove the behind node from freeList

      } else if (freeAddr + this.get_size(freeAddr) + HEADER_SIZE === addr) {
        // Address freed is at the back of a node in free list

        this.set_size(freeAddr, this.get_size(freeAddr) + totalSize);
        return;
      } else if (freeAddr === addr + totalSize) {
        // Address freed is at the front of an node in free list, replace the node with the address being freed

        const freeAddrPaddingSize = (this.get_size(freeAddr) + HEADER_SIZE) % WORD_SIZE;
        const freeAddrTotalSize = this.get_size(freeAddr) + freeAddrPaddingSize + HEADER_SIZE;

        this.set_tag(addr, Tag.FREE);
        this.set_size(addr, this.get_size(addr) + paddingSize + freeAddrTotalSize);
        this.freeList[freeIdx] = addr;
        return;
      }
    }

    // No adjacent free location found, prepend addr to front of free list
    this.set_size(addr, this.get_size(addr) + paddingSize);
    this.set_tag(addr, Tag.FREE);
    this.freeList.push(addr);
    this.freeList.sort((a, b) => a - b); // Sort freeList
  }

  // Allocate an environment
  allocEnv(frameSize: number): Item {
    return this.allocate(Tag.ENVIRONMENT, frameSize);
  }
}

export interface EnvironmentValue {
  parentAddr: number | null;
  bindings: Map<string, Item>; // Item may be primitive or heap allocated
}

export interface ClosureValue {
  funcAddr: number;
  captureNames: string[];
  paramNames: string[]; // Args should be reassigned to these param names inside the function body 
}

export interface CapturedClosureValue {
  funcAddr: number;
  capturedVars: Map<string, Item>;
  paramNames: string[]; // Args should be reassigned to these param names inside the function body 
}

// Type containing either a primitive or an address depending on the tag
// Primitives will have no children.
export class Item {
  public tag: Tag;
  public size: number;
  public children: number[]; // Address offsets for children of the heap item

  // For Tag.NUMBER, value has type number representing the literal value of the item
  // For Tag.STRING, Tag.ENVIRONMENT, value has type number representing the address of the item on the heap.
  // For Tag.BOOLEAN, value has type boolean representing literal value of the item 
  // For Tag.CLOSURE, value has type Closure with similar members as below
  // For Tag.CAPTURED_CLOSURE, value has type CapturedClosureValue, where funcAddr is an index to an array of all compiled instructions and envAddr is the address of the environment on the heap the closure is declared in  
  // For Tag.ENVIRONMENT, value has type EnvironmentValue
  // For Tag.UNIT, value is not used and can be set to any value. A UNIT also has size 0
  public value: any;

  constructor(tag: Tag, size: number, value: any, children: number[] = []) {
    this.tag = tag;
    this.size = size; // Not relevant for primitive types
    this.children = children;
    this.value = value;
  }

  to_JS_value(heap: Heap): any {
    if (is_primitive(this.tag)) {
      return this.value;
    } else if (this.tag === Tag.CLOSURE) {
      return {
        type: "Closure",
        funcAddr: this.value.funcAddr,
        paramNames: this.value.paramNames,
        captureNames: this.value.captureNames
      };
    } else if (this.tag === Tag.CAPTURED_CLOSURE) {
      // Create a safe representation of captured vars without circular references
      const capturedVarsObj: Record<string, any> = {};
      for (const [name, item] of this.value.capturedVars.entries()) {
        if (is_primitive(item.tag)) {
          capturedVarsObj[name] = item.value;
        } else {
          capturedVarsObj[name] = `<${Tag[item.tag]}>`;
        }
      }
      
      return {
        type: "CapturedClosure",
        funcAddr: this.value.funcAddr,
        paramNames: this.value.paramNames,
        capturedVars: capturedVarsObj
      };
    } else if (this.tag === Tag.ARRAY || this.tag === Tag.TUPLE) {
      // For arrays and tuples, map the elements to safe representations
      return this.value.map((item: Item) => {
        if (is_primitive(item.tag)) {
          return item.value;
        } else if (item.tag === Tag.STRING) {
          return heap.get_data(item);
        } else {
          return `<${Tag[item.tag]}>`;
        }
      });
    } else if (this.tag === Tag.RANGE) {
      return {
        type: "Range",
        start: this.value.start,
        end: this.value.end
      };
    } else {
      // For other heap objects, use addr_to_JS_value
      return heap.addr_to_JS_value(this.value);
    }
  }
  
  // Add toJSON method to handle JSON.stringify directly on Item
  toJSON(): any {
    return {
      tag: Tag[this.tag],
      size: this.size,
      value: is_primitive(this.tag) ? this.value : `<${Tag[this.tag]}>`
    };
  }
}

export function get_item_data(item: Item, heap?: Heap) {
  switch (item.tag) {
    case Tag.NUMBER: // Fallthrough
    case Tag.BOOLEAN: // Fallthrough
    case Tag.CLOSURE: // Fallthrough
    case Tag.CAPTURED_CLOSURE: // Fallthrough
      return item.value; // Stack allocated, just get value of item directly
    case Tag.STRING: // Fallthrough
    case Tag.ENVIRONMENT:
      return heap.get_data(item);
    case Tag.UNIT:
      throw new Error("Getting data of unit type");
    default:
      throw new Error("Unsupported object type");
  }
}

export function set_item_data(item: Item, value: any, heap?: Heap) {
  switch (item.tag) {
    case Tag.NUMBER: // Fallthrough
    case Tag.BOOLEAN: // Fallthrough
      item.value = value; // Stack allocated, just set value of item directly
      break;
    case Tag.CLOSURE:
      item.value = value as ClosureValue; // Stack allocated, just set value of item directly
      break;
    case Tag.CAPTURED_CLOSURE:
      item.value = value as CapturedClosureValue; // Stack allocated, just set value of item directly
      break;
    case Tag.STRING: // Fallthrough
    case Tag.ENVIRONMENT:
      heap.set_data(item, value);
      break;
    case Tag.UNIT:
      throw new Error("Setting data of unit type");
    default:
      throw new Error("Unsupported object type");
  }
}

export function JS_value_to_Item(heap: Heap, v: any): Item {
  if (typeof v === "number") return new Item(Tag.NUMBER, 1, v);
  if (typeof v === "boolean") return new Item(Tag.BOOLEAN, 1, v);
  if (typeof v === "string") {
    const it = heap.allocate(Tag.STRING, v.length);
    set_item_data(it, v, heap);
    return it;
  }
  if (v === undefined) return new Item(Tag.UNIT, 0, 0);
  throw new Error("Cannot convert JS value to Item: " + v);
}

export function addr_to_Item(heap: Heap, addr: number): Item {
  const tag = heap.get_tag(addr);
  const size = heap.get_size(addr);
  return new Item(tag, size, addr);
}
