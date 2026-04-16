import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Plan, PlanArchive, TypePrestation, Version } from '../models/plan.model';

export interface CreatePlanPayload {
  numeroPlan?: string;
  affaireId: string;
  nom: string;
  typePlan: string;
  typePrestation?: TypePrestation;
  niveau?: string;
  lot?: string;
  auteur?: string;
  projeteurId?: string;
  nombrePlanches?: number;
  dateEngagement?: string;
  commentaire?: string;
  fichierUrl?: string;
}

export interface UpdatePlanPayload {
  nom?: string;
  typePrestation?: TypePrestation;
  niveau?: string;
  lot?: string;
  auteur?: string;
  projeteurId?: string;
  nombrePlanches?: number;
  dateEngagement?: string;
}

export interface AddVersionPayload {
  commentaire?: string;
  fichierUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class PlanService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/plans`;

  getByAffaire(affaireId: string): Observable<Plan[]> {
    const params = new HttpParams().set('affaireId', affaireId);
    return this.http.get<any>(this.base, { params }).pipe(
      map(resp => Array.isArray(resp) ? resp : (resp?.content ?? []))
    );
  }

  search(typePlan?: string, statut?: string): Observable<Plan[]> {
    let params = new HttpParams();
    if (typePlan) params = params.set('typePlan', typePlan);
    if (statut)   params = params.set('statut', statut);
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

  update(id: string, payload: UpdatePlanPayload): Observable<Plan> {
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

  addFichier(id: string, fichierUrl: string): Observable<Plan> {
    return this.http.post<Plan>(`${this.base}/${id}/fichiers`, { fichierUrl });
  }

  emettre(id: string): Observable<Plan> {
    return this.http.post<Plan>(`${this.base}/${id}/emettre`, {});
  }

  soumettre(id: string): Observable<Plan> {
    return this.http.post<Plan>(`${this.base}/${id}/soumettre`, {});
  }

  getArchives(id: string): Observable<PlanArchive[]> {
    return this.http.get<PlanArchive[]>(`${this.base}/${id}/archives`);
  }

  getHistorique(id: string): Observable<any> {
    return this.http.get<any>(`${this.base}/${id}/historique`);
  }

  uploadFile(file: File): Observable<{ fichierUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ fichierUrl: string }>(`${this.base}/upload`, formData);
  }
}
