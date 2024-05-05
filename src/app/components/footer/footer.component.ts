import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  year: number;
  constructor() {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    
  }
}
