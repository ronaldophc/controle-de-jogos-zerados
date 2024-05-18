import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  user = 'Marcos';
  ngOnInit(): void {
    initFlowbite();
  }
}
