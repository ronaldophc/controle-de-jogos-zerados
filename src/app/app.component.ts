import { AuthService } from './services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  email: string = '';
  name: string = '';
  
  constructor(private authService: AuthService) {
    this.email = this.authService.getCurrentUser().email;
    this.name = this.authService.getCurrentUser().name;
  }
  ngOnInit(): void {
    initFlowbite();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
