function triangleFactory(a: number, b: number, c: number) {
  return (x: number): number => {
    if (x < a || x > c) return 0;
    if (x < b) return (x - a) / (b - a);
    return (c - x) / (c - b);
  };
}

const fuzzyVar = {
  luas: {
    kecil: [0, 10, 20],
    sedang: [15, 25, 36],
    besar: [25, 40, 48],
  },
  keharuman: {
    bau: [0, 5, 10],
    normal: [5, 10, 20],
    wangi: [15, 20, 25],
  },
  volume: {
    sedikit: [200],
    banyak: [400],
  },
};
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
const rule = [
  "luas = kecil AND keharuman = bau THEN volume = sedikit",
  "luas = kecil AND keharuman = normal THEN volume = sedikit",
  "luas = kecil AND keharuman = wangi THEN volume = sedikit",
];
const inputVal = {
  luas: 5,
  keharuman: 10,
};
const ruleLeft = rule
  .map((rule) => rule.split(" ").join("").split("THEN"))
  .map((el) => el[0])
  .map((el) => el.split("AND"));
// .map((el) => el.map((el) => el.split("=").join("")));
const membershipVal = ruleLeft
  .map((el) =>
    el.map((el) => {
      const varNameSet = el.split("=");
      const [a, b, c] = fuzzyMFMap[varNameSet.join("")];
      return triangleFactory(a, b, c)(inputVal[varNameSet[0]]);
    })
  )
  .map((el) => Math.min(...el));
const denominator = membershipVal.reduce((p, c) => p + c, 0);
const ruleRight = rule
  .map((rule) => rule.split(" ").join("").split("THEN"))
  .map((el) => el[1]);
const z = ruleRight.map((el) => {
  const varNameSet = el.split("=");
  return fuzzyMFMap[varNameSet.join("")][0];
});
const numerator = z.reduce((p, c, i) => p + c * membershipVal[i], 0);
const crisp = numerator / denominator;
console.log(ruleLeft);
console.log(membershipVal);
console.log(denominator);
console.log(ruleRight);
console.log(z);
console.log(numerator);
console.log(crisp);
