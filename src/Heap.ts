export enum Tag {
  FREE = 0,
  PARTIAL = 1, // A partial section of memory that is being used for large size data
  NUMBER = 2, // Primitive
  BOOLEAN = 3, // Primitive
  TUPLE = 4, // Heap allocated
  ENVIRONMENT = 5, // Heap allocated
}

// Heap stores values as tagged lists
// TODO: Can consider storing values as fat pointers instead 
const WORD_SIZE = 8;
export class Heap {
  private data: ArrayBuffer;
  private heapSize: number;
  private dataView: DataView;
  private free: number;

  constructor(heapSize = 256) {
    this.heapSize = heapSize;
    this.data = new ArrayBuffer(heapSize);
    this.dataView = new DataView(this.data);

    this.free = 0; // -1 if no more space
    this.set_tag(this.free, Tag.FREE);
    this.set_child(this.free, 0, -1);

    // Initialize free list
    for (let i: number = WORD_SIZE; i < heapSize; i += WORD_SIZE) {
      this.set_tag(i, Tag.FREE);
      this.set_child(i, 0, this.free);
      this.free = i;
    }
  }

  // Word size is 8
  // [1 byte tag, 4 bytes data, 2 bytes children, 1 byte unused]
  // If 4 bytes is not enough for the size required, more words
  // are used on the heap and the second child will point to the 
  // heap memory address of the next part of the data
  allocate(tag: Tag, size: number): HeapItem {
    if (this.free == -1 && this.get_tag(this.free) == Tag.FREE) {
      throw new Error("No more space on heap!");
    }

    const op = new HeapItem(tag, this.free);
    for (let i = 4; i < size; i += 4) {
      this.free = this.get_child(this.free, 0);
      if (this.free == -1 && this.get_tag(this.free) == Tag.FREE) {
        throw new Error("No more space on heap!");
      }
      this.set_tag(this.free, Tag.PARTIAL);
    }
    this.free = this.get_child(this.free, 0);
    return op;
  }

  get_tag(addr: number): Tag {
    return this.data[addr];
  }

  set_tag(addr: number, tag: Tag) {
    this.data[addr] = tag;
  }

  // addr is the address of the start of a word
  set_child(addr: number, childID: number, value: number) {
    this.data[addr + 5 + childID] = value;
  }

  // addr is the address of the start of a word
  get_child(addr: number, childID: number): number {
    return this.data[addr + 5 + childID];
  }

  // Allocate an environment
  allocEnv(frameSize: number): HeapItem {
    return this.allocate(Tag.ENVIRONMENT, frameSize);
  }

}

// Type containing either a primitive or an address depending on the tag
export class HeapItem {
  public tag: Tag;
  public operand: number;

  constructor(tag: Tag, operand: number) {
    this.tag = tag;
    this.operand = operand;
  }
}
