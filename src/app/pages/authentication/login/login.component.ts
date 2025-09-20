import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Utilisateur } from '../../../models/utilisateur.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
 imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: Utilisateur = {};
  err:number = 0;
  message : string = "login ou mot de passe erronés..";


  constructor(private authService: AuthService, private router: Router){}

  onSubmit(form: NgForm) {
    if(form.valid){
      this.onLoggedin1();
    }

  }

  onLoggedin() {

    { this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      }, error: (err: any) => { this.err = 1; } });

    }
  }

  onLoggedin1() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      }, error: (err) => {
        this.err = 1;
        if (err.error.errorCause=='disabled'){
          this.message="l'utilisateur " + this.user.username + " est désactivé, Veuillez contacter votre Administrateur";
        }

        }
      });
    }

}
