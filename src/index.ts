function triangleFactory(a: number, b: number, c: number) {
  return (x: number): number => {
    if (x < a || x > c) return 0;
    if (x < b) return (x - a) / (b - a);
    return (c - x) / (c - b);
  };
}

function inferSugeno(operator, fuzzyMFMap, ruleLeft, ruleRight, inputVal) {
  const membershipVal = ruleLeft
    .map((el) =>
      el.map((el) => {
        const varNameSet = el.split("=");
        const [a, b, c] = fuzzyMFMap[varNameSet.join("")];
        return triangleFactory(a, b, c)(inputVal[varNameSet[0]]);
      })
    )
    .map((el) => operator(...el));

  const namedZ = ruleRight.map((el) => {
    const varNameSet = el.split("=");
    return [varNameSet[1], fuzzyMFMap[varNameSet.join("")][0]];
  });
  const z = ruleRight.map((el) => {
    const varNameSet = el.split("=");
    return fuzzyMFMap[varNameSet.join("")][0];
  });

  const numerator = z.reduce((p, c, i) => p + c * membershipVal[i], 0);
  const denominator = membershipVal.reduce((p, c) => p + c, 0);
  const crisp = numerator / denominator;
  let crispSet = namedZ[0][0];
  let crispSetN = namedZ[0][1];
  namedZ.forEach((el) => {
    const distance = Math.abs(crisp - el[1]);
    if (distance < crispSetN) {
      crispSet = el[0];
      crispSetN = distance;
    }
  });
  return [crispSet, crisp];
}

export const inferenceSystem = (fuzzyVar, rule, inputVal) => {
  let operator = Math.min;

  const fuzzyMFMap = {};
  function makeMap(emptyMap, fuzzyVar) {
    for (const p in fuzzyVar) {
      for (const pr in fuzzyVar[p]) {
        const key = p + pr;
        emptyMap[key] = fuzzyVar[p][pr];
      }
    }
  }
  makeMap(fuzzyMFMap, fuzzyVar);

  // [
  //   [ 'luas=kecil', 'keharuman=bau' ],
  //   [ 'luas=kecil', 'keharuman=normal' ],
  //   [ 'luas=kecil', 'keharuman=wangi' ]
  // ]
  const ruleLeft = rule
    .map((rule) => rule.split(" ").join("").split("THEN"))
    .map((el) => el[0])
    .map((el: string) => {
      if (el.includes("AND")) {
        return el.split("AND");
      }
      operator = Math.max;
      return el.split("OR");
    });

  const ruleRight = rule
    .map((rule) => rule.split(" ").join("").split("THEN"))
    .map((el) => el[1]);

  const [crispSet, crisp] = inferSugeno(
    operator,
    fuzzyMFMap,
    ruleLeft,
    ruleRight,
    inputVal
  );
  console.log(crispSet, crisp);
};
