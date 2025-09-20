import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

   apiURL: string = 'http://localhost:8081/users';

  constructor(private http : HttpClient) { }

  // GET : Récupérer tous les utilisateur
  getAllUtilisateur(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiURL}/all`);
  }

  desactiverUtilisateur(id: number) {
  return this.http.put<Utilisateur>(`${this.apiURL}/desactiver/${id}`, {});
}

  activerUtilisateur(id: number) {
    return this.http.put<Utilisateur>(`${this.apiURL}/activer/${id}`, {});
}

deleteUtilisateur(id: number) {
  return this.http.delete<void>(`${this.apiURL}/delete/${id}`);
}

addRoleToUser(username: string, rolename: string) {
  return this.http.post<Utilisateur>(`${this.apiURL}/addRole/${username}/roles/${rolename}`, {});
}

removeRoleFromUser(username: string, rolename: string) {
  return this.http.delete<Utilisateur>(`${this.apiURL}/removeRole/${username}/roles/${rolename}`);
}




}
