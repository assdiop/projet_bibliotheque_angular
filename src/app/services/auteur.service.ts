import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Auteur } from '../models/auteur.model';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  private apiUrl = environment.apiBaseUrl

  constructor(private http : HttpClient) { }


  // POST : Créer un nouveau Auteur
  createAuteur(auteur: Auteur): Observable<Auteur> {
    return this.http.post<Auteur>(`${this.apiUrl}/api/auteurs`, auteur);
  }


  // GET : Récupérer tous les auteurs
  getAllAuteurs(): Observable<Auteur[]> {
    return this.http.get<Auteur[]>(`${this.apiUrl}/api/auteurs`);
  }


  // GET : Récupérer un seul auteur par ID
  getAuteurById(id: any): Observable<Auteur> {
     return this.http.get<Auteur>(`${this.apiUrl}/api/auteurs/${id}`);
  }


  //DELETE : Supprimer un auteur
  deleteAuteur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/auteurs/${id}`);
  }

  // UPDATE
  updateAuteur(id: number, auteur: Auteur): Observable<Auteur> {
    return this.http.put<Auteur>(`${this.apiUrl}/api/auteurs/${id}`, auteur);
  }

}
