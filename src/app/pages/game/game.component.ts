import { Component } from '@angular/core';
import { BoardComponent } from '../../components/board/board.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../services/ai.service';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, BoardComponent, FormsModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  constructor(private aiService: AiService) {}

  size: number = 3;
  alignToWin = 3;
  selectedSize = 3;
  board: string[][] = [];
  status: 'init' | 'playing' | 'won' | 'draw' = 'init';
  player: 'X' | 'O' = 'X';
  ai: 'X' | 'O' = 'O';
  currentPlayer: 'X' | 'O' = 'X';
  winner: 'X' | 'O' | null = null;
  winningCells: { x: number, y: number }[] = [];
  readonly sizes = [3, 4, 5];

  startGame(choice: 'X' | 'O') {
    this.winningCells = [];
    this.size = +this.selectedSize;
    this.alignToWin = this.size;
    this.player = choice;
    this.ai = choice === 'X' ? 'O' : 'X';
    this.currentPlayer = this.ai;
    this.status = 'playing';
    this.board = Array.from({ length: this.size }, () => Array(this.size).fill(''));
    if (this.currentPlayer === this.ai) this.aiMove();
  }

  play(x: number, y: number) {
    if (this.status !== 'playing') return;
    if (this.board[x][y] !== '') return;
    if (this.currentPlayer !== this.player) return;

    this.board[x][y] = this.player;
    if (this.checkWinner(this.player)) {
      this.status = 'won';
      this.winner = this.player;
      return;
    }

    if (this.isBoardFull()) {
      this.status = 'draw';
      return;
    }

    this.currentPlayer = this.ai;
    setTimeout(() => this.aiMove(), 300);
  }

  aiMove() {
    if (this.status !== 'playing') return;

    const move = this.aiService.getRandomMove(this.board);
    if (!move) {
      this.status = 'draw';
      return;
    }

    this.board[move.x][move.y] = this.ai;

    if (this.checkWinner(this.ai)) {
      this.status = 'won';
      this.winner = this.ai;
      return;
    }

    if (this.isBoardFull()) {
      this.status = 'draw';
      return;
    }

    this.currentPlayer = this.player;
  }

  checkWinner(symbol: 'X' | 'O'): boolean {
    const directions = [
      { dx: 1, dy: 0 }, // horizontal
      { dx: 0, dy: 1 }, // vertical
      { dx: 1, dy: 1 }, // diagonale \
      { dx: 1, dy: -1 } // diagonale /
    ];

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (this.board[x][y] !== symbol) continue;

        for (const { dx, dy } of directions) {
          const line = [{ x, y }];
          let nx = x + dx;
          let ny = y + dy;

          while (
            nx >= 0 && nx < this.size &&
            ny >= 0 && ny < this.size &&
            this.board[nx][ny] === symbol
          ) {
            line.push({ x: nx, y: ny });
            if (line.length >= this.alignToWin) {
              this.winningCells = line;
              return true;
            }
            nx += dx;
            ny += dy;
          }
        }
      }
    }

    return false;
  }


  isBoardFull(): boolean {
    return this.board.every(row => row.every(cell => cell !== ''));
  }

  resetGame() {
    this.winningCells = [];
    this.status = 'playing';
    this.board = Array.from({ length: this.size }, () => Array(this.size).fill(''));
    this.currentPlayer = 'X';
    if (this.currentPlayer === this.ai) this.aiMove();
  }

  backToStart() {
    this.status = 'init';
    this.winner = null;
    this.winningCells = [];
  }
}
