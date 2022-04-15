import { triangleFactory } from "./index";

describe("triangle factory (2, 6, 10)", () => {
  const triangle = triangleFactory(2, 6, 10);
  test("argument: 8, equal to 0.5", () => {
    expect(triangle(8)).toBe(0.5);
  });
  test("argument: 6, equal to 1", () => {
    expect(triangle(6)).toBe(1);
  });
  test("argument: 2, equal to 0", () => {
    expect(triangle(2)).toBe(0);
  });
  test("argument: 10, equal to 0", () => {
    expect(triangle(10)).toBe(0);
  });
});
