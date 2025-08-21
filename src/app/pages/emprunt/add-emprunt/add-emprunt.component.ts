import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-emprunt',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-emprunt.component.html',
  styleUrl: './add-emprunt.component.css'
})
export class AddEmpruntComponent {

  onSubmit() {
    alert("Formulaire soumis avec succès");
  }

}
