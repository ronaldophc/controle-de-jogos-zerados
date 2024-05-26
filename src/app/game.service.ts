import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = 'https://api.rawg.io/api/games';
  private apiKey = 'ee1a7db18d154c5ea67d77c6afd59e5d';
  private jsonUrl = 'http://localhost:3000/games';

  constructor(private http: HttpClient) {}

  async searchGames(query: string) {
    try {
      const response = await fetch(
        `${this.apiUrl}?key=${this.apiKey}&search=${query}`
      );
      if (!response.ok) {
        throw new Error('Erro ao buscar jogos ' + Error(response.statusText));
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  addGame(game: any) {
    this.http.post(this.jsonUrl, game).subscribe((data) => {
      console.log(data);
    });
  }
}
