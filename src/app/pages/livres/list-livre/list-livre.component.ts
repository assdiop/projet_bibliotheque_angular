import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auteur } from '../../../models/auteur.model';
import { AuteurService } from '../../../services/auteur.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Livre } from '../../../models/livre.model';
import { LivreService } from '../../../services/livre.service';
@Component({
  selector: 'app-list-livre',
  standalone: true,
   imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './list-livre.component.html',
  styleUrl: './list-livre.component.css'
})
export class ListLivreComponent {

  listAuteurs: Array<Auteur> = [];

  auteurAff: Auteur={};

  listeLivres: Array<Livre> = [
    // {id:1, titre: 'La chèvre de ma mère', genre: 'Roman', datePublication: '18/08/2025', auteurId: 1, disponible : true},
    // {id:2, titre: 'Le combat', genre: 'Roman', datePublication: '18/08/2025', auteurId: 2, disponible : false},
    // {id:3, titre: 'Heros', genre: 'Roman', datePublication: '18/08/2025', auteurId: 3, disponible : true},
    // {id:4, titre: 'Enfant noir', genre: 'Roman', datePublication: '18/08/2025', auteurId: 4, disponible : false},
    // {id:1, titre: 'La chèvre de ma mère', genre: 'Roman', datePublication: '18/08/2025', auteurId: 1, disponible : true},
    // {id:1, titre: 'La chèvre de ma mère', genre: 'Roman', datePublication: '18/08/2025', auteurId: 1, disponible : true},
    // {id:5, titre: 'La chèvre de ma mère', genre: 'Roman', datePublication: '18/08/2025', auteurId: 1, disponible : true},
    // {id:2, titre: 'Le combat', genre: 'Roman', datePublication: '18/08/2025', auteurId: 2, disponible : false},
    // {id:3, titre: 'Heros', genre: 'Roman', datePublication: '18/08/2025', auteurId: 3, disponible : true},
    // {id:4, titre: 'Enfant noir', genre: 'Roman', datePublication: '18/08/2025', auteurId: 4, disponible : false},
    // {id:1, titre: 'La chèvre de ma mère', genre: 'Roman', datePublication: '18/08/2025', auteurId: 1, disponible : true},
    // {id:1, titre: 'La chèvre de ma mère', genre: 'Roman', datePublication: '18/08/2025', auteurId: 1, disponible : true},

  ];

  ngOnInit(): void {
    this.afficherLesLivres();
    this.afficherLesAuteurs(); // ✅ récupérer tous les auteurs
  }


     constructor(private toastr: ToastrService, private livreService: LivreService,
        private router : Router, private auteurService : AuteurService){}

    //Affichage de la listes des livres
    afficherLesLivres(): void {
       this.livreService.getAllLivres().subscribe({
         next: (data) => this.listeLivres = data,
         error: (err) => console.error('Erreur lors de la récupération des auteurs', err)
       });
    }

    //Récupération des auteurs (une seule fois)
    afficherLesAuteurs(): void {
      this.auteurService.getAllAuteurs().subscribe({
        next: (data) => this.listAuteurs = data,
        error: (err) => console.error('Erreur lors de la récupération des auteurs', err)
      });
    }

   //Trouver le nom de l’auteur via son id
  getNomAuteur(idAuteur: number | undefined): string {
    if (!idAuteur) return "—";
    const auteur = this.listAuteurs.find(a => a.id === idAuteur);
    return auteur ? auteur.nom! : "Inconnu";
  }

  //Modifier un livre
  modifierLivre(id?: number): void {
    this.router.navigate(['updateLivre', id]);
  }


    //Suppression de le livre
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
          this.livreService.deleteLivre(id).subscribe({
            next: () => {
              Swal.fire(
                'Supprimé !',
                "Le livre a été supprimé avec succès.",
                'success'
              );
              //this.toastr.info("Auteur supprimé avec succès");
              this.afficherLesLivres(); // recharge la liste
            },
            error: (err) => {
              console.error("Erreur suppression :", err);
              Swal.fire(
                'Erreur',
                "Impossible de supprimer le livre",
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
      return this.listeLivres.slice(start, start + this.itemsPerPage);
    }

    // Calcule le nombre total de pages
    get totalPages() {
      return Math.ceil(this.listeLivres.length / this.itemsPerPage);
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
