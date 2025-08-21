import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-livre',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-livre.component.html',
  styleUrl: './list-livre.component.css'
})
export class ListLivreComponent {

  items = [
    { titre: 'La chèvre de ma mère', genre: 'Roman', date: '18/08/2025', auteur: 'Awa', emprunte : true},
    { titre: 'Le combat', genre: 'Roman', date: '18/08/2025', auteur: 'Awa', emprunte : false},
    { titre: 'Heros', genre: 'Roman', date: '18/08/2025', auteur: 'Abdallah', emprunte : true},
    { titre: 'Enfant noir', genre: 'Roman', date: '18/08/2025', auteur: 'Awa', emprunte : false},

  ];

}
