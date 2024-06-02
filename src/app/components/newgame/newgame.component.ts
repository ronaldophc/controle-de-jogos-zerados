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
      this.selectedGame.status = 'finished';
      this.selectedGame.game = this.gameslist.find((game) => game.id == this.gameForm.value.game).name;
      this.gameService.addGame(this.selectedGame).subscribe(
        (response) => {
          console.log('Data posted successfully:', response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
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
      this.gameslist = data.results;
      console.log(this.gameslist);
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
