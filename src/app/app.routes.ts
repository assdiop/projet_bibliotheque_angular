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
import { UpdateLivreComponent } from './pages/livres/update-livre/update-livre.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { myGuardGuard } from './my-guard.guard';
import { roleGuardGuard } from './role-guard.guard';
import { loginGuardGuard } from './login-guard.guard';
import { RegisterComponent } from './pages/authentication/register/register.component';


export const routes: Routes = [

  {
      path: 'login',
      component: LoginComponent,
      canActivate: [loginGuardGuard],
  },

  {
      path: 'register',
      component: RegisterComponent,
      //canActivate: [loginGuardGuard],
  },

  {path: 'app-forbidden',
    component: ForbiddenComponent
  },

  {
    path: '',
    component: DashboardComponent,
    canActivate: [myGuardGuard],
    children:  [

        {
          path: '',
          component: AccueilComponent,
          canActivate: [myGuardGuard],
        },

        {
          path: 'ajoutCategorie',
          component: AddCategoriesComponent,
          canActivate: [myGuardGuard,roleGuardGuard],
        },

        {
          path: 'listesCategories',
            component: ListCategorieComponent,
            canActivate: [myGuardGuard,roleGuardGuard],
        },

        {
          path: 'ajoutLivre',
          component: AddLivreComponent,
          canActivate: [myGuardGuard,roleGuardGuard],

        },

        {
          path: 'listLivres',
          component: ListLivreComponent,
          canActivate: [myGuardGuard],
        },
        {
          path: 'updateLivre/:id',
          component: UpdateLivreComponent,
          canActivate: [myGuardGuard,roleGuardGuard],
        },

        {
          path: 'addUtilisateur',
          component: AddUtilisateurComponent,
          canActivate: [myGuardGuard,roleGuardGuard],
        },

        {
          path: 'listUtilisateur',
          component: ListUtilisateurComponent,
          canActivate: [myGuardGuard,roleGuardGuard],
        },

        {
          path: 'addAuteur',
          component: AddAuteurComponent,
          canActivate: [myGuardGuard,roleGuardGuard],
        },

        {
          path: 'updateAuteur/:id',
          component: UpdateAuteurComponent,
          canActivate: [myGuardGuard,roleGuardGuard],
        },


        {
          path: 'listAuteur',
          component: ListAuteurComponent,
          canActivate: [myGuardGuard,roleGuardGuard],
        },

        {
          path: 'addEmprunt',
          component: AddEmpruntComponent,
          canActivate: [myGuardGuard,roleGuardGuard],
        },

        {
          path: 'listEmprunt',
          component: ListEmpruntComponent,
          canActivate: [myGuardGuard,roleGuardGuard],
        },

        {
          path: 'addUserEmprunt',
          component: AddEmpruntUserComponent,
          canActivate: [myGuardGuard],
        },

        {
          path: 'listUserEmprunt',
          component: ListEmpruntUserComponent,
          canActivate: [myGuardGuard],
        },


      ]
  }


];
