import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Plan, Version } from '../models/plan.model';

export interface CreatePlanPayload {
  affaireId: string;
  nom: string;
  typePlan: string;
  niveau?: string;
  lot?: string;
  projeteurId?: string;
  commentaire?: string;
  fichierUrl?: string;
}

export interface AddVersionPayload {
  commentaire?: string;
  fichierUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class PlanService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/api/plans`;

  getByAffaire(affaireId: string): Observable<Plan[]> {
    const params = new HttpParams().set('affaireId', affaireId);
    return this.http.get<any>(this.base, { params }).pipe(
      map(resp => Array.isArray(resp) ? resp : (resp?.content ?? []))
    );
  }

  search(typePlan?: string, statut?: string): Observable<Plan[]> {
    let params = new HttpParams();
    if (typePlan) params = params.set('typePlan', typePlan);
    if (statut) params = params.set('statut', statut);
    return this.http.get<any>(this.base, { params }).pipe(
      map(resp => Array.isArray(resp) ? resp : (resp?.content ?? []))
    );
  }

  getById(id: string): Observable<Plan> {
    return this.http.get<Plan>(`${this.base}/${id}`);
  }

  create(payload: CreatePlanPayload): Observable<Plan> {
    return this.http.post<Plan>(this.base, payload);
  }

  update(id: string, payload: Partial<CreatePlanPayload>): Observable<Plan> {
    return this.http.put<Plan>(`${this.base}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  addVersion(id: string, payload: AddVersionPayload): Observable<Plan> {
    return this.http.post<Plan>(`${this.base}/${id}/versions`, payload);
  }

  getVersions(id: string): Observable<Version[]> {
    return this.http.get<Version[]>(`${this.base}/${id}/versions`);
  }

  /** Émet officiellement un plan (BROUILLON → EMIS, assigne l'indice). */
  emettre(id: string): Observable<Plan> {
    return this.http.post<Plan>(`${this.base}/${id}/emettre`, {});
  }

  /** Soumet un plan EMIS au contrôle interne (EMIS → EN_CONTROLE_INTERNE). */
  soumettre(id: string): Observable<Plan> {
    return this.http.post<Plan>(`${this.base}/${id}/soumettre`, {});
  }

  getHistorique(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/${id}/historique`);
  }

  /** Upload un fichier PDF, retourne l'URL relative du fichier stocké. */
  uploadFile(file: File): Observable<{ fichierUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ fichierUrl: string }>(`${this.base}/upload`, formData);
  }
}
