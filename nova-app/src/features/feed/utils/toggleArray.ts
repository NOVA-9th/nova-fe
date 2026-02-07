export const toggleArray = <T>(prev: T[], value: T): T[] =>
  prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
