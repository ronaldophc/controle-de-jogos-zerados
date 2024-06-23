import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from '../../game.service';
import { EditGameModalComponent } from '../edit-game-modal/edit-game-modal.component';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.css'],
})
export class FinishedComponent implements OnInit {
  games: Promise<any[]> = this.gameService.getGames();

  constructor(private gameService: GameService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  deleteGame(gameId: any): void {
    this.gameService.removeGame(gameId).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.error(`Error deleting game with id ${gameId}:`, err);
      }
    });
  }

  editGame(game: any): void {
    const dialogRef = this.dialog.open(EditGameModalComponent, {
      width: '400px',
      data: { game }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
