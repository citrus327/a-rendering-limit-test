import _random from "lodash/random";

export type Struct = { count: number };
export const rng = () => _random(0, 100);

export const generate2DArray = (size: number): Struct[][] => {
  const row = Array<Struct[]>(size).fill(null!);
  return row.map((_) => {
    return Array(size).fill({ count: rng() });
  });
};
