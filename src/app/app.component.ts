import { Component } from '@angular/core';
import { GameComponent } from './pages/game/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameComponent],
  template: `<app-game></app-game>`,
  styles: [`
    :host {
      display: block;
      background-color: #121212;
      color: #f5f5f5;
      min-height: 100vh;
      font-family: 'Inter', sans-serif;
    }
  `]
})
export class AppComponent {}
