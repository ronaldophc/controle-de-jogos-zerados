import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = 'https://api.rawg.io/api/games';
  private apiKey = 'ee1a7db18d154c5ea67d77c6afd59e5d';
  private jsonUrl = 'http://localhost:3000/games';

  constructor(private http: HttpClient) {}

  async checkIfGameExists(id: number) {
    try {
      const response = await fetch(`${this.jsonUrl}?id=${id}`);
      return await response.json().then((data) => {
        if (data.length > 0) {
          return true;
        } else {
          return false;
        }
      });
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

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

  updateGame(game: any): Observable<any> {
    return this.http
      .put<any>(`${this.jsonUrl}/${game.id}`, game)
      .pipe(catchError(this.handleError));
  }

  addGame(game: any): Observable<any> {
    return this.http
      .post<any>(this.jsonUrl, game)
      .pipe(catchError(this.handleError));
  }

  removeGame(gameId: string): Observable<any> {
    return this.http
      .delete<any>(`${this.jsonUrl}/${gameId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Something went wrong; please try again later.');
  }

  async getGame(gameId: string): Promise<any> {
    return await fetch(`${this.apiUrl}/${gameId}?key=${this.apiKey}`);
  }

  async getGameImage(gameId: string): Promise<void> {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games/${gameId}?key=${this.apiKey}`
      );
      if (!response.ok) {
        throw new Error('Erro ao buscar os detalhes do jogo');
      }
      const game = await response.json();
      return game.background_image;
    } catch (error) {
      console.error('Erro ao buscar os detalhes do jogo:', error);
    }
  }

  async getGames() {
    try {
      const response = await fetch(this.jsonUrl);
      if (!response) {
        throw new Error('Erro ao buscar jogos ' + Error(response));
      }
      const teste = await response.json();
      return teste;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }
}
