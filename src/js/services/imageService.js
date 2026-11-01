
const IMAGES_URL = "./data/images.json";

export async function getImages() {
  const response = await fetch(IMAGES_URL);

  if (!response.ok) {
    throw new Error("Зургийн мэдээлэл уншихад алдаа гарлаа.");
  }

  return await response.json();
}

export function getFoodImages(images, foodId) {
  return images.filter(
    item => String(item.code) === String(foodId)
  );
}
