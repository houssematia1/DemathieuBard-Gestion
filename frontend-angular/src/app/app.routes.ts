import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  /* ── Auth (public) ────────────────────────────────────────── */
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  /* ── App (protégé) ────────────────────────────────────────── */
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },

      /* ── Affaires ─────────────────────────────────────── */
      {
        path: 'affaires',
        loadComponent: () =>
          import('./features/affaires/affaire-list/affaire-list.component').then(m => m.AffaireListComponent)
      },
      {
        path: 'affaires/:id',
        loadComponent: () =>
          import('./features/affaires/affaire-detail/affaire-detail.component').then(m => m.AffaireDetailComponent)
      },

      /* ── Plans ────────────────────────────────────────── */
      {
        path: 'plans',
        loadComponent: () =>
          import('./features/plans/plan-list/plan-list.component').then(m => m.PlanListComponent)
      },
      {
        path: 'plans/:id',
        loadComponent: () =>
          import('./features/plans/plan-detail/plan-detail.component').then(m => m.PlanDetailComponent)
      },

      /* ── Contrôles ────────────────────────────────────── */
      {
        path: 'controles',
        loadComponent: () =>
          import('./features/controles/controle-list/controle-list.component').then(m => m.ControleListComponent)
      },

      /* ── Notifications ────────────────────────────────── */
      {
        path: 'notifications',
        loadComponent: () =>
          import('./features/notifications/notification-panel/notification-panel.component').then(m => m.NotificationPanelComponent)
      },

      /* ── Users ────────────────────────────────────────── */
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/user-list/user-list.component').then(m => m.UserListComponent),
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/users/user-profile/user-profile.component').then(m => m.UserProfileComponent)
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: '/dashboard' }
];
