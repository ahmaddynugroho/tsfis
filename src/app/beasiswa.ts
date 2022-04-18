import { inferenceSystemSugeno } from "../index";

const fuzzyVarB = {
  ipk: {
    buruk: [0, 2, 2.75],
    cukup: [2, 2.75, 3.25],
    bagus: [2.75, 3.25, 4],
  },
  gaji: {
    kecil: [0, 1, 3],
    sedang: [1, 3, 6],
    besar: [4, 7, 12],
    sangatbesar: [7, 12, 13],
  },
  kelayakan: {
    rendah: [50],
    tinggi: [80],
  },
};
const ruleB = [
  "ipk = cukup AND gaji = besar THEN kelayakan = rendah",
  "ipk = cukup AND gaji = sangatbesar THEN kelayakan = rendah",
  "ipk = bagus AND gaji = besar THEN kelayakan = tinggi",
  "ipk = bagus AND gaji = sangatbesar THEN kelayakan = rendah",

  "ipk = cukup AND gaji = kecil THEN kelayakan = tinggi",
  "ipk = cukup AND gaji = sedang THEN kelayakan = rendah",
  "ipk = bagus AND gaji = kecil THEN kelayakan = tinggi",
  "ipk = bagus AND gaji = sedang THEN kelayakan = tinggi",
];
const inputValB = {
  ipk: 3,
  gaji: 10,
};
const inputValBB = {
  ipk: 2.99,
  gaji: 1,
};
inferenceSystemSugeno(fuzzyVarB, ruleB, inputValB);
inferenceSystemSugeno(fuzzyVarB, ruleB, inputValBB);
