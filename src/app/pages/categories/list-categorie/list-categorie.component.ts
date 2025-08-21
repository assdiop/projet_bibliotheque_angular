import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, } from '@angular/router';

@Component({
  selector: 'app-list-categorie',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-categorie.component.html',
  styleUrl: './list-categorie.component.css'
})
export class ListCategorieComponent {

  items = [
    { titre: 'Angular avancé'},
    { titre: 'Spring Boot 3'},
    { titre: 'Design UX'},
  ];

}
