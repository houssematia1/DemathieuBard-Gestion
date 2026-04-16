import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PageResponse, UpdateRoleRequest, UpdateUserRequest, UtilisateurDto } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/users`;

  getAll(page = 0, size = 20): Observable<PageResponse<UtilisateurDto>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponse<UtilisateurDto>>(this.base, { params });
  }

  getByRole(role: string): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(`${this.base}/role/${role}`);
  }

  getMe(): Observable<UtilisateurDto> {
    return this.http.get<UtilisateurDto>(`${this.base}/me`);
  }

  getById(id: string): Observable<UtilisateurDto> {
    return this.http.get<UtilisateurDto>(`${this.base}/${id}`);
  }

  update(id: string, payload: UpdateUserRequest): Observable<UtilisateurDto> {
    return this.http.put<UtilisateurDto>(`${this.base}/${id}`, payload);
  }

  updateRole(id: string, payload: UpdateRoleRequest): Observable<UtilisateurDto> {
    return this.http.put<UtilisateurDto>(`${this.base}/${id}/role`, payload);
  }

  desactiver(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  reactiver(id: string): Observable<UtilisateurDto> {
    return this.http.put<UtilisateurDto>(`${this.base}/${id}/reactiver`, {});
  }
}
