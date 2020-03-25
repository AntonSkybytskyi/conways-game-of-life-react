export function sortItems(items: number[] = []) {
  if (!Array.isArray(items)) {
    throw new Error('Incorrect data');
  }
  return items.sort((a: number, b: number) => a - b)
}
