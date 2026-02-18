export type WeightedItem<T> = { item: T; weight: number };

export const weightedPickIndex = <T,>(items: WeightedItem<T>[]) => {
  const total = items.reduce((acc, cur) => acc + Math.max(0, cur.weight), 0);
  if (total <= 0) return 0;

  let r = Math.random() * total;

  for (let i = 0; i < items.length; i++) {
    r -= Math.max(0, items[i].weight);
    if (r <= 0) return i;
  }

  return items.length - 1;
};
