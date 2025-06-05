import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  imports: [CommonModule, CellComponent],
})
export class BoardComponent {
  @Input() board: string[][] = [];
  @Input() winningCells: { x: number; y: number }[] = [];

  @Output() playCell = new EventEmitter<{ x: number; y: number }>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Board reçu :', this.board);
    if (changes['board'] && this.board) {
      this.columns = `repeat(${this.board.length}, 1fr)`;
    }
  }

  handleClick(x: number, y: number) {
    this.playCell.emit({ x, y });
  }

  isWinningCell(x: number, y: number): boolean {
    return this.winningCells.some((cell) => cell.x === x && cell.y === y);
  }

  get flatBoard() {
    return this.board.flatMap((row, x) =>
      row.map((cell, y) => ({ cell, x, y }))
    );
  }

  columns: string = '';

}
