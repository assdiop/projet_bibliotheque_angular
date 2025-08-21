import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-auteur',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-auteur.component.html',
  styleUrl: './add-auteur.component.css'
})
export class AddAuteurComponent {

  onSubmit() {
    alert("Formulaire soumis avec succès");
  }

}
