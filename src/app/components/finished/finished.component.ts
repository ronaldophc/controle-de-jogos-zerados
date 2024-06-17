import { Component, OnInit } from '@angular/core';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrl: './finished.component.css',
})
export class FinishedComponent {
  games: Promise<any[]> = this.gameService.getGames();

  constructor(private gameService: GameService) {}

  deleteGame(gameId: string): void {
    this.gameService.removeGame(gameId).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.error(`Error deleting game with id ${gameId}:`, err);
      }
    });
  }
}
