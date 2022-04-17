// feat:
// 1. fuzzy inference system
// 2. modify fuzzy sets and variable
// 3. stick with triangle function
// 4. modular: easily add new membership function
// 5. tsukamoto
//
// todo:
// 1. function membership (done)
// 2. fuzzy sets
// 3. variable
// 4. tsukamoto inference
//
// component:
// 1. input variables
// 2. rules
// 3. output variable
//
// flow:
// 1. input variables
// 2. rules
// 3. input
// 4. infer

type MembershipFunction = (x: number) => number;
type InferenceMethod = "sugeno" | "mamdani" | "tsukamoto";
type TriangularBorder = [number, number, number];
type TrapezoidalBorder = [number, number, number, number];

export interface Domain {
  name: string;
  border: TriangularBorder | TrapezoidalBorder;
  shape: "triangular" | "trapezoidal";
}
export interface Variable {
  name: string;
  value: number;
  set: Domain[];
}
export interface InferenceSystemData {
  method: InferenceMethod;
  variable: Variable[];
  rule: any[];
}

export function triangleFactory(
  a: number,
  b: number,
  c: number
): MembershipFunction {
  return (x: number): number => {
    if (x < a || x > c) return 0;
    if (x < b) return (x - a) / (b - a);
    if (x <= c) return (c - x) / (c - b);
  };
}

// debug is used in jest
// TODO: add return type
export function inferenceSystem(method: InferenceMethod) {
  const data: InferenceSystemData = {
    method,
    variable: [],
    rule: [],
  };
  const addVariable = (name: string, set: Domain[]): Variable[] => {
    data.variable.push({
      name,
      value: 0,
      set,
    });
    return data.variable;
  };
  const addSet = (variableName: string, domain: Domain): Variable => {
    let modifiedVarIndex = 0;
    let found = false;
    data.variable.forEach((v, i) => {
      if (v.name === variableName) {
        v.set.push(domain);
        modifiedVarIndex = i;
        found = true;
      }
    });
    if (!found) console.error("variable:", variableName, "not found");
    return data.variable[modifiedVarIndex];
  };

  return {
    addVariable,
    addSet,
  };
}
