import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Notification } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/api/notifications`;

  unreadCount = signal(0);

  getByUser(_userId: string): Observable<Notification[]> {
    return this.http.get<any>(this.base).pipe(
      map(r => Array.isArray(r) ? r : (r?.content ?? []))
    );
  }

  getNonLues(_userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.base}/non-lues`);
  }

  getCount(_userId: string): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.base}/count`).pipe(
      tap(r => this.unreadCount.set(r.count))
    );
  }

  marquerLue(id: string): Observable<Notification> {
    return this.http.put<Notification>(`${this.base}/${id}/lue`, {});
  }

  marquerToutesLues(_userId: string): Observable<void> {
    return this.http.put<void>(`${this.base}/tout-lire`, {}).pipe(
      tap(() => this.unreadCount.set(0))
    ) as Observable<void>;
  }
}
