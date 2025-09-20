import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Utilisateur } from '../../../models/utilisateur.model';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from '../../../services/utilisateur.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-utilisateur',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-utilisateur.component.html',
  styleUrl: './list-utilisateur.component.css'
})
export class ListUtilisateurComponent {

  items : Array<Utilisateur> = [
    // { nom: 'SY', prenom: 'Awa', email: 'awa.sy@unchk.edu.sn', role: 'ADMIN'},
    // { nom: 'SOUGANE', prenom: 'Abdallah', email: 'abdallah.sougane@unchk.edu.sn', role: 'USER'},
    // { nom: 'SY', prenom: 'Awa', email: 'awa.sy@unchk.edu.sn', role: 'ADMIN'},

  ];

  ngOnInit(): void {
      this.afficherLesUtilisateurs();

    }

  constructor(private toastr: ToastrService,
    private router : Router, private utilisateurService : UtilisateurService){}

  //Affichage de la listes des utilisateurs
  afficherLesUtilisateurs(): void {
  this.utilisateurService.getAllUtilisateur().subscribe({
    next: (data: any[]) => {
      this.items = data.map(u => ({
        ...u,
        // devient ["ADMIN","USER"...]
        roles: (u?.roles ?? []).map((r: any) => r?.role ?? r)
      }));
    },
    error: (err) => console.error('Erreur lors de la récupération des utilisateur', err)
  });
}

  desactiver(id?: number) {
  if (!id) return;
  this.utilisateurService.desactiverUtilisateur(id).subscribe({
    next: () => {
      this.toastr.success("Utilisateur désactivé avec succès");
      this.afficherLesUtilisateurs();
    },
    error: () => this.toastr.error("Erreur lors de la désactivation")
  });
}

activer(id?: number) {
  if (!id) return;
  this.utilisateurService.activerUtilisateur(id).subscribe({
    next: () => {
      this.toastr.success("Utilisateur activé avec succès");
      this.afficherLesUtilisateurs();
    },
    error: () => this.toastr.error("Erreur lors de l’activation")
  });
}

//SUPPRESSION
  supprimer(id: number): void {
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
          this.utilisateurService.deleteUtilisateur(id).subscribe({
          next: () => {
            this.toastr.success("Utilisateur supprimé avec succès");
            // Retire localement pour éviter un 2e appel réseau
            this.items = this.items.filter(u => u.user_id !== id);
            // Optionnel: corriger la page si elle devient vide
            if ((this.currentPage - 1) * this.itemsPerPage >= this.items.length && this.currentPage > 1) {
              this.currentPage--;
            }
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


  //AJOUT DU ROLES
  ajouterRole(username: string, rolename: string) {
  this.utilisateurService.addRoleToUser(username, rolename).subscribe({
    next: (res) => {
      this.toastr.success(`Rôle ${rolename} ajouté à ${username}`);
      this.afficherLesUtilisateurs();
    },
    error: () => {
      this.toastr.error("Erreur lors de l'ajout du rôle");
    }
  });
}

//SUPPRESSION
retirerRole(username: string, rolename: string) {
  this.utilisateurService.removeRoleFromUser(username, rolename).subscribe({
    next: (res) => {
      this.toastr.info(`Rôle ${rolename} retiré de ${username}`);
      this.afficherLesUtilisateurs();
    },
    error: () => this.toastr.error("Erreur lors du retrait du rôle")
  });
}



  //DEBUT PAGINATION
  currentPage = 1;
  itemsPerPage = 5;

  // Retourne uniquement les éléments de la page actuelle
  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.items.slice(start, start + this.itemsPerPage);
  }

  // Calcule le nombre total de pages
  get totalPages() {
    return Math.ceil(this.items.length / this.itemsPerPage);
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
