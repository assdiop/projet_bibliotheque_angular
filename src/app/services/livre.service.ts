import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Livre } from '../models/livre.model';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  private apiUrl = environment.apiBaseUrl

  constructor(private http : HttpClient) { }

  // POST : Créer un nouveau Livre
  createLivre(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(`${this.apiUrl}/api/livres`, livre);
  }


  // GET : Récupérer tous les livres
  getAllLivres(): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.apiUrl}/api/livres`);
  }


  // GET : Récupérer un seul livre par ID
  getLivreById(id: any): Observable<Livre> {
     return this.http.get<Livre>(`${this.apiUrl}/api/livres/${id}`);
  }


  //DELETE : Supprimer un auteur
  deleteLivre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/livres/${id}`);
  }

  // UPDATE
  updateLivre(id: number, livre: Livre): Observable<Livre> {
    return this.http.put<Livre>(`${this.apiUrl}/api/livres/${id}`, livre);
  }


}
