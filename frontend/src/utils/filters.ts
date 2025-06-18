export function filterByTags<T extends { tags?: string[] }>(
  list: T[],
  tags: string[]
): T[] {
  if (tags.length === 0) return list;
  return list.filter(item => tags.some(tag => item.tags?.includes(tag)));
}
