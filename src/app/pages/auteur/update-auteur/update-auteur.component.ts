import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auteur } from '../../../models/auteur.model';
import { ToastrService } from 'ngx-toastr';
import { AuteurService } from '../../../services/auteur.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-auteur',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './update-auteur.component.html',
  styleUrl: './update-auteur.component.css'
})
export class UpdateAuteurComponent {

  auteur: Auteur = {};
  dateError: boolean = false;

  ngOnInit(): void {
    this.recuperationAuteur();

  const idAuteur = this.activatedRoute.snapshot.paramMap.get('id');
  if (idAuteur) {
    const id = Number(idAuteur); // convertir en number
    this.auteurService.getAuteurById(id).subscribe({
      next: (auteur) => {
        if (auteur) {
          this.auteur = {
            ...auteur,
            dateNaissance: auteur.dateNaissance
              ? new Date(auteur.dateNaissance).toISOString().substring(0, 10)
              : ''
          };
        }
      },
      error: (err) => console.error("Erreur lors de la récupération de l'auteur", err)
    });
  }
}

constructor(private toastr: ToastrService,
    private auteurService: AuteurService,
    private activatedRoute: ActivatedRoute) {}


  recuperationAuteur(){

}


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

        this.auteurService.updateAuteur(this.auteur.id!, this.auteur).subscribe({
          next: (response) => {
            console.log("Auteur modifier : ", response);
            // Affichage du toast après succès
            this.toastr.warning("L'auteur est modifié avec succès");

            // Réinitialiser le formulaire et les champs
            form.resetForm();
            this.auteur = {};
            this.dateError = false;
          },
          error: (err) => {
            console.error("Erreur lors de la modification :", err);
            this.toastr.error("Erreur lors de la modification", "Erreur");
          }
        });
      }
  }


}
