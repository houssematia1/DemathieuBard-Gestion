import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest, UtilisateurDto } from '../models/user.model';

const TOKEN_KEY = 'db_token';
const USER_KEY  = 'db_user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http   = inject(HttpClient);
  private router = inject(Router);

  /* Signals réactifs pour l'état d'authentification */
  private _currentUser = signal<AuthResponse | null>(this.loadUserFromStorage());
  readonly currentUser  = this._currentUser.asReadonly();
  readonly isLoggedIn   = computed(() => !!this._currentUser());
  readonly userRole     = computed(() => this._currentUser()?.role ?? null);
  readonly userName     = computed(() => {
    const u = this._currentUser();
    return u ? `${u.prenom} ${u.nom}` : '';
  });

  /* ── Auth ─────────────────────────────────────────────────── */

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/login`, payload).pipe(
      tap(response => this.saveSession(response))
    );
  }

  register(payload: RegisterRequest): Observable<UtilisateurDto> {
    return this.http.post<UtilisateurDto>(`${environment.apiUrl}/api/auth/register`, payload);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  /* ── Token ────────────────────────────────────────────────── */

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  hasRole(...roles: string[]): boolean {
    const role = this.userRole();
    return role ? roles.includes(role) : false;
  }

  /* ── Private ──────────────────────────────────────────────── */

  private saveSession(response: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response));
    this._currentUser.set(response);
  }

  private loadUserFromStorage(): AuthResponse | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
