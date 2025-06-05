import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { AiService } from '../../services/ai.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [AiService]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('GameComponent Logic', () => {
  let component: GameComponent;

  beforeEach(() => {
    component = new GameComponent(new AiService());
    component.size = 3;
    component.alignToWin = 3;
    component.board = Array.from({ length: 3 }, () => Array(3).fill(''));
  });

  it('should detect a horizontal win', () => {
    component.board = [
      ['X', 'X', 'X'],
      ['', '', ''],
      ['', '', '']
    ];
    const result = component.checkWinner('X');
    expect(result).toBeTrue();
    expect(component.winningCells.length).toBe(3);
  });

  it('should detect a vertical win', () => {
    component.board = [
      ['O', '', ''],
      ['O', '', ''],
      ['O', '', '']
    ];
    const result = component.checkWinner('O');
    expect(result).toBeTrue();
  });

  it('should detect a diagonal win (\\)', () => {
    component.board = [
      ['X', '', ''],
      ['', 'X', ''],
      ['', '', 'X']
    ];
    const result = component.checkWinner('X');
    expect(result).toBeTrue();
  });

  it('should detect a diagonal win (/)', () => {
    component.board = [
      ['', '', 'O'],
      ['', 'O', ''],
      ['O', '', '']
    ];
    const result = component.checkWinner('O');
    expect(result).toBeTrue();
  });

  it('should detect a draw', () => {
    component.board = [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X']
    ];
    const result = component.isBoardFull();
    expect(result).toBeTrue();
  });

  it('should prevent move if cell is not empty', () => {
    component.status = 'playing';
    component.currentPlayer = component.player = 'X';
    component.board[0][0] = 'X';
    component.play(0, 0); 
    expect(component.board[0][0]).toBe('X');
  });

  it('should setup correctly on startGame', () => {
    component.selectedSize = 4;
    component.startGame('O');
    expect(component.size).toBe(4);
    expect(component.board.length).toBe(4);
    expect(component.board[0].length).toBe(4);
    expect(component.player).toBe('O');
    expect(component.ai).toBe('X');
    expect(component.status).toBe('playing');
  });
});
