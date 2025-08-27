import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auteur } from '../../../models/auteur.model';
import { ToastrService } from 'ngx-toastr';
import { AuteurService } from '../../../services/auteur.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-auteur',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './add-auteur.component.html',
  styleUrl: './add-auteur.component.css'
})
export class AddAuteurComponent {

  auteur: Auteur = {};
  dateError: boolean = false;

  constructor(private toastr: ToastrService,
    private auteurService: AuteurService,) {}

  checkPastDate(value: string) {
    if (!value) {
      this.dateError = false;
      return;
    }
    const today = new Date();
    const inputDate = new Date(value);
    this.dateError = inputDate >= today; // true si futur
  }

  onSubmit(form: NgForm) {
      if (form.valid && !this.dateError) {

        this.auteurService.createAuteur(this.auteur).subscribe({
          next: (response) => {
            console.log("Auteur soumis :", response);

            // Affichage du toast après succès
            this.toastr.success("L'auteur est ajouté avec succès");

            // Réinitialiser le formulaire et les champs
            form.resetForm();
            this.auteur = {};
            this.dateError = false;
          },
          error: (err) => {
            console.error("Erreur lors de l'ajout :", err);
            this.toastr.error("Erreur lors de l'ajout de l'auteur", "Erreur");
          }
        });
      }
  }

}
