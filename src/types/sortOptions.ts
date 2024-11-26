import { Product } from "types/productType";

// sortOptions.ts 또는 해당 파일
export type SortOption =
  | "amountDesc"
  | "amountAsc"
  | "lengthDesc"
  | "lengthAsc"
  | "earningRateDesc"
  | "earningRateAsc";

export const sortOptions: Record<
  SortOption,
  { label: string; sortFunc: (a: Product, b: Product) => number }
> = {
  amountDesc: {
    label: "금액 높은 순",
    sortFunc: (a, b) => b.amount - a.amount,
  },
  amountAsc: {
    label: "금액 낮은 순",
    sortFunc: (a, b) => a.amount - b.amount,
  },
  lengthDesc: {
    label: "기간 높은 순",
    sortFunc: (a, b) => b.length - a.length,
  },
  lengthAsc: {
    label: "기간 낮은 순",
    sortFunc: (a, b) => a.length - b.length,
  },
  earningRateDesc: {
    label: "수익률 높은 순",
    sortFunc: (a, b) => b.earningRate - a.earningRate,
  },
  earningRateAsc: {
    label: "수익률 낮은 순",
    sortFunc: (a, b) => a.earningRate - b.earningRate,
  },
};
