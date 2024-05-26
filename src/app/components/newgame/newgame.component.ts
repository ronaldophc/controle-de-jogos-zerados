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
  games: any[] = [];
  selectedGame: any = null;
  errorMessage: string | null = null;

  constructor(private gameService: GameService) {}

  gameForm = new FormGroup({
    game: new FormControl('', Validators.required),
    platform: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    playTime: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  onSubmit() {
    if (this.gameForm.valid) {
      console.log(this.gameForm.value);
      //mudar a variavel game para o nome do game e criar uma variavel id para o id do game na api
      this.selectedGame = this.gameForm.value;
      this.selectedGame.id = this.gameForm.value.game;
      this.selectedGame.game = this.games.find((game) => game.id == this.gameForm.value.game).name;
      this.gameService.addGame(this.selectedGame);
    }
  }

  ngOnInit(): void {}

  async onSearch() {
    try {
      const data = await this.gameService.searchGames(this.query);
      //Filtrar jogos que são da store itch.io para não aparecer
      data.results = data.results.filter((game: any) =>
        game.stores.some((store: any) => store.store.name != 'itch.io')
      );
      this.games = data.results;
      console.log(this.games);
      this.errorMessage = null;
    } catch (error) {
      this.errorMessage = 'Erro ao carregar jogos ' + error;
      this.games = [];
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
