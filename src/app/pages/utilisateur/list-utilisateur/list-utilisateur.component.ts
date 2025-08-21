import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-list-utilisateur',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-utilisateur.component.html',
  styleUrl: './list-utilisateur.component.css'
})
export class ListUtilisateurComponent {

  items = [
    { nom: 'SY', prenom: 'Awa', email: 'awa.sy@unchk.edu.sn', role: 'ADMIN'},
    { nom: 'SOUGANE', prenom: 'Abdallah', email: 'abdallah.sougane@unchk.edu.sn', role: 'USER'},
    { nom: 'SY', prenom: 'Awa', email: 'awa.sy@unchk.edu.sn', role: 'ADMIN'},

  ];

}
