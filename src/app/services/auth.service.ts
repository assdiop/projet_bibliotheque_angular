import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../models/utilisateur.model';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = 'http://localhost:8081/users';
  token!:string;

  private helper = new JwtHelperService();

  loggedUser!: string;
  isloggedIn: Boolean = false;
  roles!: string[];

  constructor(private router: Router, private http : HttpClient) { }

  login(user : Utilisateur) {
    return this.http.post<Utilisateur>(this.apiURL+'/login', user , {observe:'response'});
  }

  saveToken(jwt:any){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }



  decodeJWT() {
    if (this.token == undefined){
      return;
    }

    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    localStorage.setItem('roles', JSON.stringify(this.roles));
    console.log("roles : " +this.roles);
    this.loggedUser = decodedToken.sub;
    localStorage.setItem('loggedUser',this.loggedUser);
    console.log("valeur loggedUser : " +this.loggedUser)
  }

  loadToken() {
    this.token == localStorage.getItem('jwt');
    this.decodeJWT();
  }

  isAdmin():Boolean{
    if (!this.roles) {
      return false;
    }
    return this.roles.indexOf('ADMIN') >=0;
  }

  getToken():string {
    const tok = localStorage.getItem('jwt');
    this.token = tok ?? '';
    return this.token;
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token= undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }


  isUserLoggedAndAccessTokenValid(): boolean {
    if (typeof localStorage != 'undefined') {
        if(localStorage.getItem('jwt')){
          this.isloggedIn = true;
          const log = localStorage.getItem('loggedUser')
          console.log("TEST " +log)
          this.loggedUser = log ?? '';
          return true
        }
    }
    this.router.navigate(['login']);
    return false;
  }

  isAdminGuard():Boolean{
    // Récupération
    const stored = localStorage.getItem('roles');
    this.roles = stored ? JSON.parse(stored) : [];
    if (!this.roles) {
      return false;
    }
    return this.roles.indexOf('ADMIN') >=0;
  }

  isTokenExpired(): Boolean {
    const tok = localStorage.getItem('jwt');
    this.token = tok ?? '';
    return this.helper.isTokenExpired(this.token);
  }


  registerUser(user :Utilisateur){
    return this.http.post<Utilisateur>(this.apiURL+'/register', user,
      {observe:'response'});
  }

}
