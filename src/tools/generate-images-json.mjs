
import fs from "node:fs";
import path from "node:path";

const imagesFolder = path.resolve("src/img/foods");
const outputFile = path.resolve("src/data/images.json");

const images = fs.readdirSync(imagesFolder)
  .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
  .map(file => ({
    code: path.parse(file).name,
    image: `./img/foods/${file}`
  }));

fs.writeFileSync(
  outputFile,
  JSON.stringify(images, null, 2),
  "utf8"
);

console.log(`Нийт ${images.length} зураг бүртгэлээ.`);
