import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-utilisateur',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-utilisateur.component.html',
  styleUrl: './add-utilisateur.component.css'
})
export class AddUtilisateurComponent {

  onSubmit() {
    alert("Formulaire soumis avec succès");
  }

}
