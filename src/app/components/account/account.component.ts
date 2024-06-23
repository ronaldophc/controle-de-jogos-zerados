import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  email: string = '';
  name: string = '';
  
  constructor(private authService: AuthService) {
    this.email = this.authService.getCurrentUser().email;
    this.name = this.authService.getCurrentUser().name;
  }

  onSubmit() {
    // Atualiza o usuário no localStorage
    this.authService.register(this.email, this.name, this.authService.getCurrentUser().password);
  }
}
