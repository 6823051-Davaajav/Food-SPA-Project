
const fs = require("fs");

const filePath = "./src/data/nutritions.json";
const outputPath = "./src/data/nutritions-bilingual.json";

const data = JSON.parse(
  fs.readFileSync(filePath, "utf8")
);

const groupEnMap = {
  "Сүүн бүтээгдэхүүн": "Milk and Milk products",
  "Мах, махан бүтээгдэхүүн": "Meat and Meat products",
  "Үр тариа": "Cereals and Cereal products",
};

// Өмнөх хөрвүүлсэн файл дахь нэмэлт мэдээллийг хадгалах
let existingData = [];

if (fs.existsSync(outputPath)) {
  existingData = JSON.parse(
    fs.readFileSync(outputPath, "utf8")
  );
}

const existingMap = new Map(
  existingData.map(food => [food.id, food])
);

const converted = data.map(food => {
  const previous = existingMap.get(food.id) || {};

  return {
    ...food,
    groupEn: groupEnMap[food.group] || food.group,

    collection_information:
      previous.collection_information ??
      food.collection_information ?? {
        collection_area: null,
        collection_date: null,
        sample_selection: null,
        additional_information: null
      }
  };
});

fs.writeFileSync(
  outputPath,
  JSON.stringify(converted, null, 2),
  "utf8"
);

console.log("Хөрвүүлэлт амжилттай!");
console.log("Нийт хүнс:", converted.length);
console.log("Цуглуулсан мэдээлэл хадгалагдсан.");
