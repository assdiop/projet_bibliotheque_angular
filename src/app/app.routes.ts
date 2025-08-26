import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AddCategoriesComponent } from './pages/categories/add-categories/add-categories.component';
import { ListCategorieComponent } from './pages/categories/list-categorie/list-categorie.component';
import { AddLivreComponent } from './pages/livres/add-livre/add-livre.component';
import { ListLivreComponent } from './pages/livres/list-livre/list-livre.component';
import { AddUtilisateurComponent } from './pages/utilisateur/add-utilisateur/add-utilisateur.component';
import { ListUtilisateurComponent } from './pages/utilisateur/list-utilisateur/list-utilisateur.component';
import { AddAuteurComponent } from './pages/auteur/add-auteur/add-auteur.component';
import { ListAuteurComponent } from './pages/auteur/list-auteur/list-auteur.component';
import { AddEmpruntComponent } from './pages/emprunt/add-emprunt/add-emprunt.component';
import { ListEmpruntComponent } from './pages/emprunt/list-emprunt/list-emprunt.component';
import { AddEmpruntUserComponent } from './pages/simple-user/emprunt/add-emprunt-user/add-emprunt-user.component';
import { ListEmpruntUserComponent } from './pages/simple-user/emprunt/list-emprunt-user/list-emprunt-user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UpdateAuteurComponent } from './pages/auteur/update-auteur/update-auteur.component';


export const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    children:  [

        {
          path: '',
          component: AccueilComponent
        },

        {
          path: 'ajoutCategorie',
          component: AddCategoriesComponent
        },

        {
          path: 'listesCategories',
            component: ListCategorieComponent
        },

        {
          path: 'ajoutLivre',
          component: AddLivreComponent
        },

        {
          path: 'listLivres',
          component: ListLivreComponent
        },

        {
          path: 'addUtilisateur',
          component: AddUtilisateurComponent
        },

        {
          path: 'listUtilisateur',
          component: ListUtilisateurComponent
        },

        {
          path: 'addAuteur',
          component: AddAuteurComponent
        },

        {
          path: 'updateAuteur/:id',
          component: UpdateAuteurComponent,
        },


        {
          path: 'listAuteur',
          component: ListAuteurComponent
        },

        {
          path: 'addEmprunt',
          component: AddEmpruntComponent
        },

        {
          path: 'listEmprunt',
          component: ListEmpruntComponent
        },

        {
          path: 'addUserEmprunt',
          component: AddEmpruntUserComponent
        },

        {
          path: 'listUserEmprunt',
          component: ListEmpruntUserComponent
        },


      ]
  }


];
