import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Notification } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/api/notifications`;

  unreadCount = signal(0);

  getByUser(userId: string): Observable<Notification[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Notification[]>(this.base, { params });
  }

  getNonLues(userId: string): Observable<Notification[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Notification[]>(`${this.base}/non-lues`, { params });
  }

  getCount(userId: string): Observable<{ count: number }> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<{ count: number }>(`${this.base}/count`, { params }).pipe(
      tap(r => this.unreadCount.set(r.count))
    );
  }

  marquerLue(id: string): Observable<Notification> {
    return this.http.put<Notification>(`${this.base}/${id}/lue`, {});
  }

  marquerToutesLues(userId: string): Observable<void> {
    const params = new HttpParams().set('userId', userId);
    return this.http.put<void>(`${this.base}/tout-lire`, {}, { params }).pipe(
      tap(() => this.unreadCount.set(0))
    ) as Observable<void>;
  }
}
