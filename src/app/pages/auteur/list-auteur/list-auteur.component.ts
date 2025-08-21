import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-list-auteur',
  standalone: true,
 imports: [CommonModule, RouterModule],
  templateUrl: './list-auteur.component.html',
  styleUrl: './list-auteur.component.css'
})
export class ListAuteurComponent {

  items = [
    { nom: 'TALL', prenom: 'Madani', biographie: 'Ecrivant Guinnéen', dateNaissance: '11/02/2000'},
  ];

}
