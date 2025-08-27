import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuteurService } from '../../../services/auteur.service';
import { HttpClientModule } from '@angular/common/http';
import { Livre } from '../../../models/livre.model';
import { LivreService } from '../../../services/livre.service';
import { Auteur } from '../../../models/auteur.model';

@Component({
  selector: 'app-add-livre',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './add-livre.component.html',
  styleUrl: './add-livre.component.css'
})
export class AddLivreComponent {

  livre: Livre = {};
  dateError: boolean = false;
  listeAuteurs: Array<Auteur> = [];

  ngOnInit(): void {
    this.afficherLesAuteurs();

  }

  constructor(private toastr: ToastrService, private auteurService: AuteurService,
    private livreService: LivreService) {}

    checkPastDate(value: string) {
    if (!value) {
      this.dateError = false;
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0); // ignore heure
    const inputDate = new Date(value);
    this.dateError = inputDate > today; // true si futur
  }


  onSubmit(form: NgForm) {
      if (form.valid && !this.dateError) {

        this.livreService.createLivre(this.livre).subscribe({
          next: (response) => {
            console.log("Livre soumis :", response);

            // Affichage du toast après succès
            this.toastr.success("Le livre est ajouté avec succès");

            // Réinitialiser le formulaire et les champs
            form.resetForm();
            this.livre = {};
            this.dateError = false;
          },
          error: (err) => {
            console.error("Erreur lors de l'ajout :", err);
            this.toastr.error("Erreur lors de l'ajout de livre ", "Erreur");
          }
        });
      }
  }

  //Affichage de la listes des auteurs
  afficherLesAuteurs(): void {
     this.auteurService.getAllAuteurs().subscribe({
       next: (data) => this.listeAuteurs = data,
       error: (err) => console.error('Erreur lors de la récupération des auteurs', err)
     });
  }

}
