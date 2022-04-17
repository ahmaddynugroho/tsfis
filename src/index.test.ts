import { Domain, inferenceSystem, triangleFactory } from "./index";

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

describe("check fuzzy sets", () => {
  const area: Domain[] = [
    {
      name: "kecil",
      border: [2, 6, 10],
      shape: "triangular",
    },
  ];
  test("domain membership function", () => {
    const [a, b, c] = area[0].border;
    expect(triangleFactory(a, b, c)(8)).toBe(0.5);
  });
});

describe("inferenceSystem factory", () => {
  test("add variable", () => {
    const FS = inferenceSystem("sugeno");
    FS.addVariable("luas", [
      {
        name: "kecil",
        border: [0, 10, 20],
        shape: "triangular",
      },
    ]);
    const vars = FS.addVariable("keharuman", [
      {
        name: "bau",
        border: [0, 5, 10],
        shape: "triangular",
      },
    ]);

    expect(vars[0].name).toBe("luas");
    expect(vars[0].value).toBe(0);
    expect(vars[0].set).toEqual([
      {
        name: "kecil",
        border: [0, 10, 20],
        shape: "triangular",
      },
    ]);
    expect(vars[1].name).toBe("keharuman");
    expect(vars[1].value).toBe(0);
    expect(vars[1].set).toEqual([
      {
        name: "bau",
        border: [0, 5, 10],
        shape: "triangular",
      },
    ]);
  });

  test("add empty variable", () => {
    const FS = inferenceSystem("sugeno", true);
    FS.addVariable("luas", []);

    expect(FS.data.variable[0]).toEqual({
      name: "luas",
      value: 0,
      set: [],
    });
  });

  test("add set", () => {
    const FS = inferenceSystem("sugeno");
    FS.addVariable("luas", [
      {
        name: "kecil",
        border: [0, 10, 20],
        shape: "triangular",
      },
    ]);

    const setLuas = FS.addSet("luas", {
      name: "sedang",
      border: [15, 25, 36],
      shape: "triangular",
    });
    expect(setLuas.name).toBe("luas");
    expect(setLuas.set.pop()).toEqual({
      name: "sedang",
      border: [15, 25, 36],
      shape: "triangular",
    });
  });
  test("throw console.error on variable typo", () => {
    const spyMock = jest
      .spyOn(console, "error")
      .mockImplementationOnce(() => {});
    const FS = inferenceSystem("sugeno");
    FS.addVariable("luas", [
      {
        name: "kecil",
        border: [0, 10, 20],
        shape: "triangular",
      },
    ]);
    const err = FS.addSet("luass", {
      name: "sedang",
      border: [15, 25, 36],
      shape: "triangular",
    });

    expect(spyMock).toHaveBeenCalled();
    expect(err).not.toEqual({
      name: "sedang",
      border: [15, 25, 36],
      shape: "triangular",
    });
  });
});
