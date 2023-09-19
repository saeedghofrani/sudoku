import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  solve(data: string) {
    const board = this.stringToSudokuArray(data);
    console.log(board);
    
    this.sudokuSolver(board);
    
    const solvedSudokuHtml = this.generateSudokuHtml(board);

    return solvedSudokuHtml;
  }

  // ... rest of your code remains the same ...

  generateSudokuHtml(board: string[][]) {
    const tableRows = board.map((row, rowIndex) => {
      const subgridBorder = rowIndex % 3 === 0 ? 'border-top: 2px solid black;' : '';
      return `<tr>${row.map((cell, colIndex) => {
        const subgridRightBorder = colIndex % 3 === 2 ? 'border-right: 2px solid black;' : '';
        const cellStyle = `${subgridBorder} ${subgridRightBorder}`;
        const content = cell !== '.' ? `<div style="border: 1px solid black; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">${cell}</div>` : '';
        return `<td style="${cellStyle}">${content}</td>`;
      }).join('')}</tr>`;
    }).join('');

    const sudokuHtml = `<table style="border-collapse: collapse;">${tableRows}</table>`;

    return sudokuHtml;
  }


  stringToSudokuArray(input: string) {
    const sudokuArray = [];
    let row = [];

    for (let i = 0; i < input.length; i++) {
      const digit = input.charAt(i);
      row.push(digit);

      if (row.length === 9) {
        sudokuArray.push(row.slice());
        row = [];
      }
    }
    return sudokuArray;
  }

  isValid(board: string[][], row: number, col: number, input: string) {
    for (let i = 0; i < 9; i++) {
      const subgridRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const subgridCol = 3 * Math.floor(col / 3) + i % 3;
      if (board[row][i] === input || board[i][col] === input || board[subgridRow][subgridCol] === input) {
        return false;
      }
    }
    return true;
  }

  sudokuSolver(board: string[][]) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === '.') {
          for (let input = 1; input <= 9; input++) {
            if (this.isValid(board, row, col, `${input}`)) {
              board[row][col] = `${input}`;
              if (this.sudokuSolver(board)) {
                return true;
              } else {
                board[row][col] = '.';
              }
            }
          }
          return false;
        }
      }
    }
    console.table("board solved");
    console.table(board);
    return true;
  }
}