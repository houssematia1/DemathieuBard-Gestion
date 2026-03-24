import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Controle, TypeControle } from '../models/controle.model';

export interface CreateControlePayload {
  planId: string;
  versionId?: string;
  indiceExterneImpacte?: string;
  typeControle: TypeControle;
  controleurId?: string;
  projeteurId?: string;     // Projeteur du plan (pour les notifications)
  reference?: string;
}

export interface DecisionPayload {
  /** Avis : VSO (approuvé) | VAC (avec commentaires) | VAO (corrections requises) */
  decision: 'VSO' | 'VAC' | 'VAO';
  remarque?: string;    // obligatoire si VAO
  fichierPDF?: string;  // URL du rapport PDF (optionnel)
}

export interface CommentairePayload {
  contenu: string;
}

@Injectable({ providedIn: 'root' })
export class ControleService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/api/controles`;

  getByPlan(planId: string): Observable<Controle[]> {
    const params = new HttpParams().set('planId', planId);
    return this.http.get<any>(this.base, { params }).pipe(
      map(r => Array.isArray(r) ? r : (r.content ?? []))
    );
  }

  getById(id: string): Observable<Controle> {
    return this.http.get<Controle>(`${this.base}/${id}`);
  }

  getEnAttente(controleurId: string): Observable<Controle[]> {
    const params = new HttpParams().set('controleurId', controleurId);
    return this.http.get<Controle[]>(`${this.base}/en-attente`, { params });
  }

  getMes(controleurId: string): Observable<Controle[]> {
    const params = new HttpParams().set('controleurId', controleurId);
    return this.http.get<Controle[]>(`${this.base}/mes`, { params });
  }

  create(payload: CreateControlePayload): Observable<Controle> {
    return this.http.post<Controle>(this.base, payload);
  }

  applyDecision(id: string, payload: DecisionPayload): Observable<Controle> {
    return this.http.put<Controle>(`${this.base}/${id}/decision`, payload);
  }

  addCommentaire(id: string, payload: CommentairePayload): Observable<Controle> {
    return this.http.post<Controle>(`${this.base}/${id}/commentaires`, payload);
  }
}
