import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-emprunt-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-emprunt-user.component.html',
  styleUrl: './add-emprunt-user.component.css'
})
export class AddEmpruntUserComponent {

  onSubmit() {
    alert("Formulaire soumis avec succès");
  }

}
