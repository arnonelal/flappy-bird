/**
 * @param items first item must be the default item
 * @param seed between 0-(1)
 * @returns 
 */


export function getItemFromSeed<T>(
  items: T[],
  seed: number, //
): T {
  const index = Math.floor(seed * items.length);
  return items[index];
}