import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/models/notification.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-notification-panel',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatIconModule, MatButtonModule, MatProgressSpinnerModule,
    MatTooltipModule, MatSnackBarModule,
  ],
  template: `
<div class="page-wrap">

  <!-- Header -->
  <div class="page-header">
    <div>
      <h1 class="page-title">Notifications</h1>
      <p class="page-sub">
        @if (unread()) { <span class="unread-count">{{ unread() }} non lue{{ unread() > 1 ? 's' : '' }}</span> }
        @else { Tout est lu }
      </p>
    </div>
    @if (unread() > 0) {
      <button class="btn-read-all" (click)="markAllRead()">
        <mat-icon>done_all</mat-icon> Tout marquer comme lu
      </button>
    }
  </div>

  <!-- Filter tabs -->
  <div class="tab-bar">
    <button class="tab" [class.active]="showAll()" (click)="showAll.set(true)">
      Toutes
      <span class="tab-count">{{ notifications().length }}</span>
    </button>
    <button class="tab" [class.active]="!showAll()" (click)="showAll.set(false)">
      Non lues
      <span class="tab-count">{{ unread() }}</span>
    </button>
  </div>

  @if (loading()) {
    <div class="loader-wrap"><mat-spinner diameter="36" /></div>
  } @else {
    <div class="notif-list">
      @for (n of displayed(); track n.id) {
        <div class="notif-row" [class.unread]="!n.lu" (click)="markRead(n)">
          <div class="notif-icon-wrap" [class.type-both]="n.type === 'BOTH'"
               [class.type-email]="n.type === 'EMAIL'">
            <mat-icon class="notif-icon">
              {{ n.type === 'EMAIL' ? 'email' : n.type === 'BOTH' ? 'notifications_active' : 'notifications' }}
            </mat-icon>
          </div>
          <div class="notif-body">
            <p class="notif-msg">{{ n.message }}</p>
            <div class="notif-meta">
              @if (n.typeEntite) {
                <span class="entite-tag">{{ n.typeEntite }}</span>
              }
              <span class="notif-date">{{ n.dateEnvoi | date:'dd/MM/yyyy HH:mm' }}</span>
            </div>
          </div>
          <div class="notif-right">
            @if (!n.lu) {
              <span class="unread-dot"></span>
            }
            @if (n.referenceEntite) {
              <a [routerLink]="entityRoute(n)" class="notif-link" (click)="$event.stopPropagation()"
                 matTooltip="Voir l'élément">
                <mat-icon>open_in_new</mat-icon>
              </a>
            }
          </div>
        </div>
      } @empty {
        <div class="empty-state">
          <mat-icon>notifications_none</mat-icon>
          <span>Aucune notification</span>
          <small>Vous serez notifié des changements importants ici.</small>
        </div>
      }
    </div>
  }

</div>
  `,
  styles: [`
    .page-wrap { max-width: 800px; }
    .page-header {
      display: flex; align-items: flex-start; justify-content: space-between;
      margin-bottom: 20px;
    }
    .page-title { font-size: 1.5rem; font-weight: 700; color: var(--db-text); margin: 0; }
    .page-sub { font-size: .85rem; color: var(--db-text-secondary); margin: 4px 0 0; }
    .unread-count {
      color: var(--db-orange); font-weight: 700;
    }
    .btn-read-all {
      display: flex; align-items: center; gap: 6px;
      border: 1px solid var(--db-border); border-radius: 6px;
      padding: 8px 14px; background: #fff; cursor: pointer;
      font-size: .82rem; font-weight: 500; color: var(--db-text-secondary);
      mat-icon { font-size: 1rem; width: 16px; height: 16px; }
      &:hover { background: #F3F4F6; color: var(--db-text); }
    }

    .tab-bar {
      display: flex; gap: 0; border-bottom: 2px solid var(--db-border); margin-bottom: 16px;
    }
    .tab {
      display: flex; align-items: center; gap: 8px;
      padding: 9px 20px; border: none; background: none; cursor: pointer;
      font-size: .875rem; font-weight: 500; color: var(--db-text-secondary);
      border-bottom: 2px solid transparent; margin-bottom: -2px;
      transition: all .15s;
      &:hover { color: var(--db-navy); }
      &.active { color: var(--db-navy); border-bottom-color: var(--db-navy); font-weight: 600; }
    }
    .tab-count {
      background: #F3F4F6; color: var(--db-text-secondary);
      font-size: .7rem; font-weight: 600; padding: 1px 7px; border-radius: 10px;
    }

    .loader-wrap { display: flex; justify-content: center; padding: 60px; }

    /* Notification list */
    .notif-list {
      display: flex; flex-direction: column;
      background: #fff; border: 1px solid var(--db-border); border-radius: 8px;
      overflow: hidden;
    }
    .notif-row {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 16px 20px; border-bottom: 1px solid var(--db-border);
      cursor: pointer; transition: background .1s;
      &:last-child { border-bottom: none; }
      &:hover { background: #F8FAFC; }
      &.unread { background: #FFFBF5; border-left: 3px solid var(--db-orange); }
    }

    .notif-icon-wrap {
      width: 38px; height: 38px; border-radius: 50%;
      background: #EFF6FF; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      &.type-email { background: #F0FDF4; }
      &.type-both { background: #FFFBEB; }
    }
    .notif-icon {
      font-size: 1.2rem; color: var(--db-navy);
      .type-email & { color: #15803D; }
      .type-both & { color: #B45309; }
    }

    .notif-body { flex: 1; min-width: 0; }
    .notif-msg {
      margin: 0 0 6px; font-size: .875rem; color: var(--db-text);
      line-height: 1.4;
      .unread & { font-weight: 500; }
    }
    .notif-meta { display: flex; align-items: center; gap: 8px; }
    .entite-tag {
      display: inline-block; padding: 1px 8px; border-radius: 10px;
      background: #EFF6FF; color: var(--db-navy);
      font-size: .7rem; font-weight: 600; text-transform: uppercase; letter-spacing: .04em;
    }
    .notif-date { font-size: .78rem; color: var(--db-text-secondary); }

    .notif-right {
      display: flex; align-items: center; gap: 8px; flex-shrink: 0;
    }
    .unread-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--db-orange);
    }
    .notif-link {
      display: flex; align-items: center; justify-content: center;
      color: var(--db-text-secondary); text-decoration: none;
      mat-icon { font-size: 1rem; width: 16px; height: 16px; }
      &:hover { color: var(--db-navy); }
    }

    /* Empty */
    .empty-state {
      display: flex; flex-direction: column; align-items: center;
      padding: 72px 24px; gap: 10px; text-align: center;
      color: var(--db-text-secondary);
      mat-icon { font-size: 3rem; opacity: .25; }
      span { font-size: .9rem; font-weight: 500; }
      small { font-size: .8rem; opacity: .7; }
    }
  `]
})
export class NotificationPanelComponent implements OnInit {
  private svc = inject(NotificationService);
  private auth = inject(AuthService);
  private snack = inject(MatSnackBar);

  notifications = signal<Notification[]>([]);
  loading = signal(true);
  showAll = signal(true);

  get unread(): ReturnType<typeof signal<number>> { return this.svc.unreadCount; }

  displayed(): Notification[] {
    return this.showAll()
      ? this.notifications()
      : this.notifications().filter(n => !n.lu);
  }

  ngOnInit(): void {
    const userId = this.auth.currentUser()?.userId ?? '';
    if (!userId) { this.loading.set(false); return; }
    this.svc.getByUser(userId).subscribe({
      next: ns => {
        this.notifications.set(ns);
        this.svc.unreadCount.set(ns.filter(n => !n.lu).length);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  markRead(n: Notification): void {
    if (n.lu) return;
    this.svc.marquerLue(n.id).subscribe({
      next: updated => {
        this.notifications.update(list => list.map(x => x.id === n.id ? updated : x));
        this.svc.unreadCount.update(v => Math.max(0, v - 1));
      },
      error: () => {}
    });
  }

  markAllRead(): void {
    const userId = this.auth.currentUser()?.userId ?? '';
    this.svc.marquerToutesLues(userId).subscribe({
      next: () => {
        this.notifications.update(list => list.map(n => ({ ...n, lu: true })));
        this.svc.unreadCount.set(0);
        this.snack.open('Toutes les notifications marquées comme lues', 'OK', { duration: 3000 });
      },
      error: () => {}
    });
  }

  entityRoute(n: Notification): string[] {
    const id = n.referenceEntite ?? '';
    switch (n.typeEntite) {
      case 'PLAN':     return ['/plans', id];
      case 'CONTROLE': return ['/controles'];
      case 'AFFAIRE':  return ['/affaires', id];
      default:         return ['/notifications'];
    }
  }
}
