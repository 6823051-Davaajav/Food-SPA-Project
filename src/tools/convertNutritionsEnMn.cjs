
const fs = require("fs");

const filePath = "./src/data/nutritions.json";
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const groupEnMap = {
  "Сүүн бүтээгдэхүүн": "Milk and Milk products",
  "Мах, махан бүтээгдэхүүн": "Meat and Meat products",
  "Үр тариа": "Cereals and Cereal products",
};

const converted = data.map((food) => ({
  ...food,
  groupEn: groupEnMap[food.group] || food.group,
}));

fs.writeFileSync(
  "./src/data/nutritions-bilingual.json",
  JSON.stringify(converted, null, 2),
  "utf8"
);

console.log("Хөрвүүлэлт амжилттай!");
console.log("Нийт хүнс:", converted.length);
console.log("Хадгалсан: src/data/nutritions-bilingual.json");
