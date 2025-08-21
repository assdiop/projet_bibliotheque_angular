import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-livre',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-livre.component.html',
  styleUrl: './add-livre.component.css'
})
export class AddLivreComponent {

  onSubmit() {
    alert("Formulaire soumis avec succès");
  }

}
