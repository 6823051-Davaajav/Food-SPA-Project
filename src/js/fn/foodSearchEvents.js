
export function filterFoods(foods, keyword = "", selectedGroups = []) {
  const searchText = keyword.trim().toLowerCase();

  return foods.filter((food) => {
    const matchesName =
      (food.name ?? "").toLowerCase().includes(searchText) ||
      (food.nameEn ?? "").toLowerCase().includes(searchText);

    const matchesGroup =
      selectedGroups.length === 0 ||
      selectedGroups.includes(food.group);

    return matchesName && matchesGroup;
  });
}
