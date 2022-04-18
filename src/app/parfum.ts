import { inferenceSystemSugeno } from "../index";

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
const rule = [
  "luas = kecil AND keharuman = bau THEN volume = sedikit",
  "luas = kecil AND keharuman = normal THEN volume = sedikit",
  "luas = kecil AND keharuman = wangi THEN volume = sedikit",

  "luas = sedang AND keharuman = bau THEN volume = banyak",
  "luas = sedang AND keharuman = normal THEN volume = sedikit",
  "luas = sedang AND keharuman = wangi THEN volume = sedikit",

  "luas = besar AND keharuman = bau THEN volume = banyak",
  "luas = besar AND keharuman = normal THEN volume = banyak",
  "luas = besar AND keharuman = wangi THEN volume = sedikit",
];
const inputVal = {
  luas: 30,
  keharuman: 10,
};

inferenceSystemSugeno(fuzzyVar, rule, inputVal);
