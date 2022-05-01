import { EMPTY_CELL } from "./constants";

export type Cell = typeof EMPTY_CELL | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Row = Cell[];
export type Sudoku = Row[];
export type Position = { row: number, column: number }