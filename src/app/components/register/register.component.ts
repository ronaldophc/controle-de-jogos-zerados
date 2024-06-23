import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  name: string = '';
  password: string = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.errorMessage = '';
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
      this.errorMessage = 'Email invalido';
      return;
    }
    if(this.password.length < 6) {
      this.errorMessage = 'A senha deve conter no minímo 6 caracteres';
      return;
    }
    if(this.name.length < 3) {
      this.errorMessage = 'O nome deve conter no minímo 3 caracteres';
      return;
    }
    if (this.authService.register(1, this.email, this.name, this.password)) {
      this.router.navigate(['/login']);
    }
  }
}
