export const toggleArray = (prev: string[], value: string) =>
  prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
