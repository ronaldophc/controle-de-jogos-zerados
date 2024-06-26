import { AuthService } from './../../services/auth.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() name!: string;
  @Input() email!: string;
  
  constructor(private router: Router, private authService: AuthService) {  }
  
  goToAccount(id: number) {
    this.router.navigate(['/account', id]);
  }


}
