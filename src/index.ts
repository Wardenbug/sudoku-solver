import { POSSIBLE_NUMBERS } from "./constants";
import { Row, Cell, Sudoku, Position } from "./types";

const hasValueInRow = (value: Cell, row: Row): boolean => row.includes(value);

const hasValueInColumn = (sudoku: Sudoku, column: Position['column'], value: Cell) => {
    const col = sudoku.map((col) => col[column]);
    return col.includes(value);
}

const hasValueInSquare = (sudoku: Sudoku, position: Position, value: Cell): boolean => {
    const allSquare = [];
    const squareOriginRowCoord = Math.floor(position.row / 3) * 3;
    const squareOriginColCoord = Math.floor(position.column / 3) * 3;

    for (let i = squareOriginRowCoord; i < squareOriginRowCoord + 3; i++) {
        for (let j = squareOriginColCoord; j < squareOriginColCoord + 3; j++) {
            allSquare.push(sudoku[i][j])
        }
    }
    return allSquare.includes(value);
};

const isValid = (sudoku: Sudoku, position: Position, value: Cell): boolean => {
    const isPossibleInRow = hasValueInRow(value, sudoku[position.row]);
    const isPossibleInColumn = hasValueInColumn(sudoku, position.column, value);
    const isPossibleInSquare = hasValueInSquare(sudoku, position, value);

    return (!isPossibleInRow && !isPossibleInColumn && !isPossibleInSquare);
}

const findEmptyCell = (sudoku: Sudoku): Position => {
    for (let i = 0; i < sudoku.length; i++) {
        for (let j = 0; j < sudoku[i].length; j++) {
            if (sudoku[i][j] === -1) {
                return { row: i, column: j };
            }
        }
    }
}



/**
 * Example usage 
 * const sudoku = [
    [-1, 9, -1, -1, 4, 2, 1, 3, 6],
    [-1, -1, -1, 9, 6, -1, 4, 8, 5],
    [-1, -1, -1, 5, 8, 1, -1, -1, -1],
    [-1, -1, 4, -1, -1, -1, -1, -1, -1],
    [5, 1, 7, 2, -1, -1, 9, -1, -1],
    [6, -1, 2, -1, -1, -1, 3, 7, -1],
    [1, -1, -1, 8, -1, 4, -1, 2, -1],
    [7, -1, 6, -1, -1, -1, 8, 1, -1],
    [3, -1, -1, -1, 9, -1, -1, -1, -1],
    ]
 * solveSudoku(sudoku, (sudoku) => console.log(sudoku))
 */
const solveSudoku = (sudoku: Sudoku, callback?) => {
    const emptyCell = findEmptyCell(sudoku);

    if (!emptyCell) {
        callback && callback(sudoku);
        return sudoku;
    }

    POSSIBLE_NUMBERS.forEach((num) => {
        const valid = isValid(sudoku, emptyCell, num);
        if (valid) {
            sudoku[emptyCell.row][emptyCell.column] = num;
            const solved = solveSudoku(sudoku, callback && callback);
            if (solved) return solved;
        }

        if (!valid) {
            sudoku[emptyCell.row][emptyCell.column] = -1;
        }
    })

    return sudoku;
}



export { solveSudoku }