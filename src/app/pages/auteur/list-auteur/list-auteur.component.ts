import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auteur } from '../../../models/auteur.model';
import { AuteurService } from '../../../services/auteur.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-auteur',
  standalone: true,
 imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './list-auteur.component.html',
  styleUrl: './list-auteur.component.css'
})
export class ListAuteurComponent {

  listeAuteurs: Array<Auteur> = [
     {id: 1, nom: 'TALL',biographie: 'Écrivain Guinéen', dateNaissance: '2000-02-11' },
    // {id: 2, nom: 'SOW', biographie: 'Poétesse Malienne', dateNaissance: '1995-07-05'},
     {id: 3, nom: 'DIALLO', biographie: 'Historien Sénégalais', dateNaissance: '1980-09-12'},
    // {id: 4, nom: 'KEITA',biographie: 'Romancière Ivoirienne', dateNaissance: '1975-03-23' },
    // {id: 5, nom: 'BA', biographie: 'Auteur Sénégalaise', dateNaissance: '1929-11-10' },
    // {id: 6, nom: 'Issa', biographie: 'Écrivain Malien', dateNaissance: '1985-06-15'},
    // {id: 7, nom: 'KONE', biographie: 'Poétesse Ivoirienne', dateNaissance: '1992-02-03' },
    // {id: 8, nom: 'CAMARA', biographie: 'Auteur Guinéen', dateNaissance: '1970-10-08' },
  ];

  ngOnInit(): void {
    this.afficherLesAuteurs();

  }

   constructor(private toastr: ToastrService,
      private router : Router, private auteurService : AuteurService){}

  //Affichage de la listes des auteurs
  afficherLesAuteurs(): void {
     this.auteurService.getAllAuteurs().subscribe({
       next: (data) => this.listeAuteurs = data,
       error: (err) => console.error('Erreur lors de la récupération des auteurs', err)
     });
  }

  //Modification de l'auteur
  modifierAuteur(id?:number): void{
    this.router.navigate(['updateAuteur',id]);
  }


  //Suppression de l'auteur
  suppressionAuteur(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auteurService.deleteAuteur(id).subscribe({
          next: () => {
            Swal.fire(
              'Supprimé !',
              "L'auteur a été supprimé avec succès.",
              'success'
            );
            //this.toastr.info("Auteur supprimé avec succès");
            this.afficherLesAuteurs(); // recharge la liste
          },
          error: (err) => {
            console.error("Erreur suppression :", err);
            Swal.fire(
              'Erreur',
              "Impossible de supprimer l'auteur",
              'error'
            );
          }
        });
      }
    });
  }


  //DEBUT PAGINATION
  currentPage = 1;
  itemsPerPage = 5;

  // Retourne uniquement les éléments de la page actuelle
  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.listeAuteurs.slice(start, start + this.itemsPerPage);
  }

  // Calcule le nombre total de pages
  get totalPages() {
    return Math.ceil(this.listeAuteurs.length / this.itemsPerPage);
  }

  // Change la page
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  changePageSafe(p: number | string) {
  if (typeof p === 'number') {
    this.changePage(p);
  }
}

  // Génère les numéros de page à afficher (style Google)
  get pagesToDisplay(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: (number | string)[] = [];

    if (total <= 5) {
      // Si peu de pages, on les affiche toutes
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      // Toujours afficher la 1ère page
      pages.push(1);

      if (current > 3) {
        pages.push('...'); // Ellipse avant
      }

      // Pages autour de la page courante
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push('...'); // Ellipse après
      }

      // Toujours afficher la dernière page
      pages.push(total);
    }

    return pages;
  }

}
