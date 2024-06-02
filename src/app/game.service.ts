import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = 'https://api.rawg.io/api/games';
  private apiKey = 'ee1a7db18d154c5ea67d77c6afd59e5d';
  private jsonUrl = 'http://localhost:3000/games';
  private image: any[] = [];

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

  addGame(game: any): Observable<any> {
    return this.http
      .post<any>(this.jsonUrl, game)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse) {
    // Lógica de tratamento de erro
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }

  async getGame(gameId: string): Promise<any> {
    console.log(`teste`);
    return await fetch(`${this.apiUrl}/${gameId}?key=${this.apiKey}`);
  }

  async getGameImage(gameId: string) {
    this.image = await this.getGame(gameId);
    console.log(this.image);
    return this.image;
  }

  async getGames() {
    try {
      const response = await fetch(this.jsonUrl);
      if (!response) {
        throw new Error('Erro ao buscar jogos ' + Error(response));
      }
      return response.json();
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }
}
