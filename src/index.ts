// feat:
// 1. fuzzy inference system
// 2. modify fuzzy sets and variable
// 3. stick with triangle function
// 4. modular: easily add new membership function
// 5. tsukamoto
//
// todo:
// 1. function membership
// 2. fuzzy sets
// 3. variable
// 4. tsukamoto inference

// Triangle membership function
export function triangleFactory(
  a: number,
  b: number,
  c: number
): (x: number) => number {
  return (x: number): number => {
    if (x < a || x > c) return 0;
    if (x < b) return (x - a) / (b - a);
    if (x < c) return (c - x) / (c - b);
  };
}

const triangle = triangleFactory(2, 6, 10);
console.log(triangle(8));
console.log(triangle(6));
console.log(triangle(2));
console.log(triangle(10));
