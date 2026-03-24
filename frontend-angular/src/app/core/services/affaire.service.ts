import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Affaire, Page } from '../models/affaire.model';

export interface CreateAffairePayload {
  nom: string;
  description?: string;
  client?: string;       // Maître d'ouvrage
  localisation?: string; // Ville / adresse du chantier
  chefProjetId?: string; // userId du chef de projet
  dateDebut: string;
  dateFin?: string;
}

export interface UpdateAffairePayload {
  nom?: string;
  description?: string;
  client?: string;
  localisation?: string;
  chefProjetId?: string;
  dateDebut?: string;
  dateFin?: string;
  statut?: string;
}

@Injectable({ providedIn: 'root' })
export class AffaireService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/api/affaires`;

  getAll(page = 0, size = 20): Observable<Page<Affaire>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<Affaire>>(this.base, { params });
  }

  search(nom?: string, statut?: string, page = 0, size = 20): Observable<Page<Affaire>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (nom) params = params.set('nom', nom);
    if (statut) params = params.set('statut', statut);
    return this.http.get<Page<Affaire>>(`${this.base}/search`, { params });
  }

  getById(id: string): Observable<Affaire> {
    return this.http.get<Affaire>(`${this.base}/${id}`);
  }

  create(payload: CreateAffairePayload): Observable<Affaire> {
    return this.http.post<Affaire>(this.base, payload);
  }

  update(id: string, payload: UpdateAffairePayload): Observable<Affaire> {
    return this.http.put<Affaire>(`${this.base}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  updateConfig(id: string, payload: {
    pourcentagesParEtat?: Record<string, number>;
    coefficientsParType?: Record<string, number>;
    avancement?: number;
  }): Observable<Affaire> {
    return this.http.put<Affaire>(`${this.base}/${id}/config`, payload);
  }

  getHistorique(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/${id}/historique`);
  }
}
