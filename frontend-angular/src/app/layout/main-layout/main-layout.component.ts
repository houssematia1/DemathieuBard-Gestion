import { Component, inject, signal, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { ROLE_LABELS } from '../../core/models/user.model';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
  badge?: number;
  disabled?: boolean;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, RouterModule, RouterLink, RouterLinkActive,
    MatToolbarModule, MatSidenavModule, MatListModule,
    MatIconModule, MatButtonModule, MatMenuModule,
    MatTooltipModule, MatDividerModule, MatBadgeModule,
  ],
  template: `
    <mat-sidenav-container class="layout-container" autosize>

      <!-- ═══════════════════ SIDEBAR ═══════════════════ -->
      <mat-sidenav
        #sidenav
        mode="side"
        opened
        class="db-sidenav">

        <!-- Logo DB -->
        <div class="sidenav-logo">
          <div class="logo-box">
            <span class="logo-d">D</span><span class="logo-b">B</span>
          </div>
          <div class="logo-text">
            <span class="logo-main">DEMATHIEU</span>
            <span class="logo-sep">&amp;</span>
            <span class="logo-main">BARD</span>
          </div>
        </div>

        <div class="sidenav-subtitle">Gestion des Affaires BTP</div>

        <mat-divider class="sidenav-divider" />

        <!-- Navigation -->
        <nav class="sidenav-nav">
          @for (item of visibleNavItems(); track item.route) {
            <a
              [routerLink]="item.disabled ? null : item.route"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{exact: item.route === '/'}"
              class="nav-item"
              [class.disabled]="item.disabled"
              [matTooltip]="item.disabled ? 'Bientôt disponible' : ''"
              matTooltipPosition="right">
              <mat-icon class="nav-icon">{{ item.icon }}</mat-icon>
              <span class="nav-label">{{ item.label }}</span>
              @if (item.badge) {
                <span class="nav-badge">{{ item.badge }}</span>
              }
              @if (item.disabled) {
                <span class="nav-soon">soon</span>
              }
            </a>
          }
        </nav>

        <mat-divider class="sidenav-divider" />

        <!-- User info bas de sidebar -->
        <div class="sidenav-user">
          <div class="user-avatar">
            {{ userInitials() }}
          </div>
          <div class="user-info">
            <span class="user-name">{{ auth.userName() }}</span>
            <span class="user-role">{{ roleLabel() }}</span>
          </div>
        </div>

      </mat-sidenav>

      <!-- ═══════════════════ MAIN CONTENT ═══════════════════ -->
      <mat-sidenav-content class="layout-content">

        <!-- NAVBAR -->
        <mat-toolbar class="db-navbar">
          <button mat-icon-button class="menu-toggle" (click)="toggleSidenav()">
            <mat-icon>menu</mat-icon>
          </button>

          <!-- Page title breadcrumb area -->
          <div class="navbar-brand">
            <span class="navbar-title">Tableau de Bord</span>
          </div>

          <span class="spacer"></span>

          <!-- Right actions -->
          <div class="navbar-actions">
            <!-- Notifications -->
            <button mat-icon-button class="navbar-icon-btn"
                    matTooltip="Notifications"
                    routerLink="/notifications"
                    [matBadge]="notifSvc.unreadCount() || null"
                    matBadgeColor="warn"
                    matBadgeSize="small">
              <mat-icon>notifications_none</mat-icon>
            </button>

            <!-- User menu -->
            <button mat-button [matMenuTriggerFor]="userMenu" class="user-menu-btn">
              <div class="navbar-avatar">{{ userInitials() }}</div>
              <span class="navbar-username">{{ auth.userName() }}</span>
              <mat-icon>expand_more</mat-icon>
            </button>

            <mat-menu #userMenu="matMenu" xPosition="before" class="user-dropdown">
              <div class="menu-header">
                <strong>{{ auth.userName() }}</strong>
                <small>{{ auth.currentUser()?.email }}</small>
              </div>
              <mat-divider />
              <button mat-menu-item routerLink="/profile">
                <mat-icon>person_outline</mat-icon> Mon profil
              </button>
              <button mat-menu-item (click)="auth.logout()" class="logout-btn">
                <mat-icon>logout</mat-icon> Se déconnecter
              </button>
            </mat-menu>
          </div>
        </mat-toolbar>

        <!-- Page content -->
        <div class="page-content">
          <router-outlet />
        </div>

      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    /* ── Layout Container ────────────────────────────────────── */
    .layout-container {
      height: 100vh;
    }

    /* ── Sidebar ─────────────────────────────────────────────── */
    .db-sidenav {
      width: 264px;
      background: linear-gradient(180deg, #060E18 0%, #091B2E 40%, #0D2140 100%);
      border-right: none;
      display: flex;
      flex-direction: column;
    }

    .sidenav-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 20px 12px;
    }

    .logo-box {
      width: 40px;
      height: 40px;
      background: var(--db-orange);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 900;
      font-size: 1.05rem;
      letter-spacing: -1px;
      color: #fff;
      flex-shrink: 0;
      box-shadow: 0 3px 12px rgba(232,68,14,.35);
    }

    .logo-d { font-size: 1rem; }
    .logo-b { font-size: 1rem; }

    .logo-text {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }

    .logo-main {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: .82rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: .16em;
      text-transform: uppercase;
      line-height: 1.1;
    }

    .logo-sep {
      font-size: .6rem;
      color: var(--db-orange);
      font-weight: 700;
      letter-spacing: .08em;
      line-height: 1.2;
      opacity: .85;
    }

    .sidenav-subtitle {
      padding: 0 20px 16px;
      font-size: .65rem;
      color: rgba(255,255,255,.35);
      letter-spacing: .08em;
      text-transform: uppercase;
      font-weight: 500;
    }

    .sidenav-divider {
      border-color: rgba(255,255,255,.08) !important;
      margin: 0 16px !important;
    }

    /* ── Navigation Items ────────────────────────────────────── */
    .sidenav-nav {
      flex: 1;
      padding: 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow-y: auto;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 6px;
      color: rgba(255,255,255,.65);
      text-decoration: none;
      font-size: .875rem;
      font-weight: 500;
      transition: all .15s ease;
      position: relative;
      cursor: pointer;

      &:hover:not(.disabled) {
        background: rgba(255,255,255,.08);
        color: #fff;
      }

      &.active {
        background: rgba(232,68,14,.15);
        color: var(--db-orange) !important;
        font-weight: 600;

        .nav-icon { color: var(--db-orange) !important; }
      }

      &.disabled {
        opacity: .4;
        cursor: not-allowed;
        pointer-events: none;
      }
    }

    .nav-icon {
      font-size: 1.2rem;
      width: 20px;
      height: 20px;
      color: rgba(255,255,255,.5);
      flex-shrink: 0;
    }

    .nav-label { flex: 1; }

    .nav-badge {
      background: var(--db-orange);
      color: #fff;
      font-size: .65rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 10px;
      min-width: 20px;
      text-align: center;
    }

    .nav-soon {
      font-size: .6rem;
      font-weight: 600;
      background: rgba(255,255,255,.15);
      color: rgba(255,255,255,.5);
      padding: 2px 7px;
      border-radius: 10px;
      text-transform: uppercase;
      letter-spacing: .05em;
    }

    /* ── Sidebar User ────────────────────────────────────────── */
    .sidenav-user {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      margin-top: auto;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(232,68,14,.25);
      color: var(--db-orange);
      font-weight: 700;
      font-size: .85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .user-name {
      font-size: .8rem;
      font-weight: 600;
      color: rgba(255,255,255,.9);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role {
      font-size: .7rem;
      color: rgba(255,255,255,.4);
      white-space: nowrap;
    }

    /* ── Navbar ──────────────────────────────────────────────── */
    .db-navbar {
      background: var(--db-bg-white, #fff) !important;
      color: var(--db-text) !important;
      height: 64px;
      box-shadow: 0 1px 0 var(--db-border) !important;
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 0 16px 0 8px;
    }

    .menu-toggle {
      color: var(--db-text-secondary);
      margin-right: 8px;
    }

    .navbar-brand { display: flex; align-items: center; }
    .navbar-title {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--db-text);
      letter-spacing: .04em;
      text-transform: uppercase;
    }

    .spacer { flex: 1; }

    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .navbar-icon-btn {
      color: var(--db-text-secondary) !important;
    }

    .user-menu-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px !important;
      height: 44px;
      border-radius: 8px !important;
      color: var(--db-text) !important;
    }

    .navbar-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--db-navy);
      color: #fff;
      font-weight: 700;
      font-size: .8rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .navbar-username {
      font-weight: 500;
      font-size: .875rem;
      color: var(--db-text);
    }

    /* ── Content ─────────────────────────────────────────────── */
    .layout-content {
      display: flex;
      flex-direction: column;
      background: var(--db-bg);
    }

    .page-content {
      flex: 1;
      padding: 28px 32px;
      overflow-y: auto;
    }

    /* ── Menu dropdown ───────────────────────────────────────── */
    .menu-header {
      padding: 12px 16px;
      display: flex;
      flex-direction: column;

      strong { font-size: .9rem; color: var(--db-text); }
      small  { font-size: .8rem; color: var(--db-text-secondary); margin-top: 2px; }
    }

    .logout-btn { color: var(--db-error) !important; }

    /* ── Responsive ──────────────────────────────────────────── */
    @media (max-width: 768px) {
      .page-content { padding: 16px; }
      .navbar-username { display: none; }
    }
  `]
})
export class MainLayoutComponent implements OnInit {
  auth = inject(AuthService);
  notifSvc = inject(NotificationService);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  ngOnInit(): void {
    const userId = this.auth.currentUser()?.userId;
    if (userId) {
      this.notifSvc.getCount(userId).subscribe();
    }
  }

  readonly navItems: NavItem[] = [
    { label: 'Tableau de bord', icon: 'dashboard',        route: '/dashboard' },
    { label: 'Affaires',        icon: 'business',         route: '/affaires' },
    { label: 'Plans',           icon: 'description',      route: '/plans' },
    { label: 'Contrôles',       icon: 'fact_check',       route: '/controles' },
    { label: 'Notifications',   icon: 'notifications',    route: '/notifications' },
    { label: 'Utilisateurs',    icon: 'group',            route: '/users',     roles: ['ADMIN'] },
    { label: 'Mon profil',      icon: 'person_outline',   route: '/profile' },
  ];

  visibleNavItems() {
    const role = this.auth.userRole();
    return this.navItems.filter(item =>
      !item.roles || (role && item.roles.includes(role))
    );
  }

  userInitials(): string {
    const u = this.auth.currentUser();
    if (!u) return 'DB';
    return (u.prenom.charAt(0) + u.nom.charAt(0)).toUpperCase();
  }

  roleLabel(): string {
    const role = this.auth.userRole();
    return role ? ROLE_LABELS[role] : '';
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
