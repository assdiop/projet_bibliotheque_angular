import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auteur } from '../../../models/auteur.model';
import { ToastrService } from 'ngx-toastr';
import { AuteurService } from '../../../services/auteur.service';
import { HttpClientModule } from '@angular/common/http';
import { Livre } from '../../../models/livre.model';
import { LivreService } from '../../../services/livre.service';

@Component({
  selector: 'app-update-livre',
  standalone: true,
imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './update-livre.component.html',
  styleUrl: './update-livre.component.css'
})
export class UpdateLivreComponent {

    livre: Livre = {};
    dateError: boolean = false;
    listeAuteurs: Array<Auteur> = [];

ngOnInit(): void {

  this.recuperationLivre();
  this.afficherLesAuteurs();

}

constructor(private toastr: ToastrService, private router: Router,private livreService: LivreService,
    private auteurService: AuteurService,
    private activatedRoute: ActivatedRoute) {}


  recuperationLivre(){
  const idLivre = this.activatedRoute.snapshot.paramMap.get('id');
  if (idLivre) {
    const id = Number(idLivre); // convertir en number
    this.livreService.getLivreById(id).subscribe({
      next: (data) => {
        if (data) {
          this.livre = {
            ...data,
            datePublication: data.datePublication
              ? new Date(data.datePublication).toISOString().substring(0, 10)
              : ''
          };

        }
      },
      error: (err) => console.error("Erreur lors de la récupération de l'auteur", err)
    });
  }
}


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

        this.livreService.updateLivre(this.livre.id!, this.livre).subscribe({
          next: (response) => {
            console.log("Livre modifier :", response);

            // Affichage du toast après succès
            this.toastr.warning("Le livre est modifier avec succès");
            // Redirection vers la liste
            this.router.navigate(['/listLivres']);

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
