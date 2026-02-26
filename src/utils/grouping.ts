/**
 * Partitions an array into a Map of arrays by a key derived from each item.
 */
export function partitionBy<T>(
  items: T[],
  getKey: (item: T) => string,
): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const k = getKey(item);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(item);
  }
  return map;
}
