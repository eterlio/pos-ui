export function pushOrReplaceSortValues(arr: string[], item: string): string[] {
  const items = item.split("-");
  const itemExists = items.length > 1 ? items[1] : items[0];

  const itemIndex = arr.findIndex((f) => f.includes(itemExists));

  if (itemIndex !== -1) {
    arr[itemIndex] = items.length > 1 ? items.join("-") : itemExists;
  } else {
    arr.push(item);
  }

  return arr;
}
