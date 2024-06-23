import { GameService } from './../game.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private gameService: GameService) { }

  // Método simples para verificar se o usuário está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  login(email: string, password: string): boolean {
    // Aqui você faria uma chamada HTTP real para a API de login
    // Para simplificar, estamos apenas salvando um valor no localStorage
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (email === users.email && password === users.password) {
      localStorage.setItem('currentUser', JSON.stringify({email: users.email, name: users.name, password: users.password}));
      return true;
    }
    return false;
  }

  register(id: number, email: string, name: string, password: string): boolean {
    // Aqui você faria uma chamada HTTP real para a API de registro
    // Para simplificar, estamos apenas salvando um valor no localStorage
    localStorage.setItem('users', JSON.stringify({ id, email, name, password }));
    return true;
  }

  edit(id: number, email: string, name: string, password: string) {
    // Aqui você faria uma chamada HTTP real para a API de registro
    // Para simplificar, estamos apenas salvando um valor no localStorage
    localStorage.setItem('currentUser', JSON.stringify({ id, email, name, password }));
    window.location.reload();
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
