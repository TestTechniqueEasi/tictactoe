import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  getRandomMove(board: string[][]): { x: number, y: number } | null {
    const emptyCells: { x: number, y: number }[] = [];

    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        if (board[x][y] === '') emptyCells.push({ x, y });
      }
    }

    if (emptyCells.length === 0) return null;

    const index = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[index];
  }
}