import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() user?: string;
  constructor(private router: Router) {  }
  
  goToAccount() {
    this.router.navigate(['/account', 1]);
  }
}
