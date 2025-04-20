//import { Tag, Operand } from "./Heap";
import { Inst } from "./RustLikeVirtualMachine";

export class RustCompiler {
  private WC: number; // Write counter
  private instrs: Inst[];

  constructor() {
    this.WC = 0;
    this.instrs = [];
  }

  // TODO:
  scan_for_locals() {

  }

  // TODO:
  compile_sequence() {

  }

  //TODO: 
  compile_comp(comp) {
  }
}
