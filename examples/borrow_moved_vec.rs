#![allow(unused)]
fn main() {
    let b : Vec<u32> = vec!(1, 1);
    drop2(b);
    println!("{:?}", b);
}

fn drop2(val: Vec<u32>) {
    return ();
}
