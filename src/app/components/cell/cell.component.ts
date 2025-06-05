import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  standalone : true,
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  imports: [CommonModule],
})
export class CellComponent {
  @Input() value: string = '';
}
