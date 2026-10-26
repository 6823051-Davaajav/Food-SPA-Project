
const DATA_URL = "./src/data/nutritions.json";

export async function getNutritions() {
  const response = await fetch(DATA_URL);

  if (!response.ok) {
    throw new Error("Хүнсний мэдээлэл уншихад алдаа гарлаа");
  }

  return await response.json();
}

export async function searchNutritions(keyword = "") {
  const nutritions = await getNutritions();

  return nutritions.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase()) ||
    item.nameEn.toLowerCase().includes(keyword.toLowerCase())
  );
}
