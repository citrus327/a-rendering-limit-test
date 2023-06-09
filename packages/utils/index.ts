import { v1 } from "uuid";

export type Struct = { count: string; id: string };
export const generate2DArray = (size: number) => {
  const row = Array<Struct[]>(size).fill(null!);

  return row.map((_) => {
    const struct: Struct = { count: (Math.random() * 100).toFixed(), id: v1() };
    return Array(size).fill(struct);
  });
};
