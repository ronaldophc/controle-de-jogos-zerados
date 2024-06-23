import { GameService } from './../../game.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private gameService: GameService, private authService: AuthService, private router: Router) {}

  gameForm = new FormGroup({
    game: new FormControl('', Validators.required),
    search: new FormControl(''),
    platform: new FormControl('', Validators.required),
    startDate: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]),
    endDate: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]),
    playTime: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  async onSubmit() {
    if (this.gameForm.valid) {
      
      this.selectedGame = this.gameForm.value;
      const teste = await this.gameService.checkIfGameExists(this.selectedGame.game);
      if(teste) {
        this.errorMessage = 'Jogo já cadastrado';
        return;
      }
      this.errorMessage = null;
      this.selectedGame.id = this.gameForm.value.game;
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
