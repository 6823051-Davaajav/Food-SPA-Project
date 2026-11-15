
const fs = require("fs");

const data = JSON.parse(
  fs.readFileSync("./src/data/nutritions.json", "utf8")
);

// Хүнсний бүлгүүдийг давхардалгүй авах
const uniqueFields = [
  ...new Set(data.map((item) => item.group).filter(Boolean)),
];

console.log("Хүнсний бүлгүүд:");
console.log(uniqueFields);
console.log("Нийт бүлгийн тоо:", uniqueFields.length);
