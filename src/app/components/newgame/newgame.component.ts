import { GameService } from './../../game.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.component.html',
  styleUrls: ['./newgame.component.css'],
})
export class NewgameComponent implements OnInit {
  query: string = '';
  gameslist: any[] = [];
  selectedGame: any = null;
  errorMessage: string | null = null;

  constructor(private gameService: GameService) {}

  gameForm = new FormGroup({
    game: new FormControl(''),
    search: new FormControl(''),
    platform: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    playTime: new FormControl(''),
  });

  onSubmit() {
    if (this.gameForm.valid) {
      //mudar a variavel game para o nome do game e criar uma variavel id para o id do game na api
      this.selectedGame = this.gameForm.value;
      this.selectedGame.id = this.gameForm.value.game;
      this.selectedGame.status = 'finished';
      this.selectedGame.game = this.gameslist.find((game) => game.id == this.gameForm.value.game).name;
      this.gameService.getGameImage(this.selectedGame.id).then((response) => {
        this.selectedGame.image = response;
        this.gameService.addGame(this.selectedGame).subscribe(
          (response) => {
            console.log('Data posted successfully:', response);
            window.location.reload();
          },
          (error) => {
            console.error('Error:', error);
            window.location.reload();
          }
        );
      });
            
    }
  }

  ngOnInit(): void {}

  async onSearch() {
    try {
      const data = await this.gameService.searchGames(this.query);
      this.gameslist = data.results;
      this.errorMessage = null;
    } catch (error) {
      this.errorMessage = 'Erro ao carregar jogos ' + error;
      this.gameslist = [];
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
