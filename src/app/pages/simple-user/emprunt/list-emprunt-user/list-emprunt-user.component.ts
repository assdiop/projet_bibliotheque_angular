import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-emprunt-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-emprunt-user.component.html',
  styleUrl: './list-emprunt-user.component.css'
})
export class ListEmpruntUserComponent {

  items = [
    { livre: 'Nom livre', utilisateur: 'Bigool', dateEmprunt: '18/08/2025', dateRetour: '19/08/2025', emprunte : false},
    { livre: 'Nom livre 2', utilisateur: 'utilisateur 1', dateEmprunt: '18/08/2025', dateRetour: '19/08/2025', emprunte : true},

  ];

}
