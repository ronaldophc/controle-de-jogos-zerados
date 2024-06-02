import { Component, OnInit } from '@angular/core';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrl: './finished.component.css',
})
export class FinishedComponent {
  games: any[] = [];

  constructor(private gameService: GameService) {
    this.gameService.getGames().then((games) => {
      games.image = this.gameService.getGameImage(games.id);
      this.games = games;
    });
    
  }

}
