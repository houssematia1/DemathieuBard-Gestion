import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from '../../core/auth/auth.service';
import { UserService } from '../../core/services/user.service';
import { AffaireService } from '../../core/services/affaire.service';
import { PlanService } from '../../core/services/plan.service';
import { ControleService } from '../../core/services/controle.service';
import { ROLE_LABELS, UtilisateurDto } from '../../core/models/user.model';

interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: string;
  trendUp?: boolean;
  subtitle?: string;
}

interface TypeProgress {
  code: string;
  label: string;
  count: number;
  total: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatIconModule, MatButtonModule,
    MatProgressBarModule, MatChipsModule,
  ],
  template: `
    <div class="dashboard">

      <!-- ── Welcome Header ─────────────────────────────────── -->
      <div class="welcome-section">
        <div class="welcome-text">
          <div class="welcome-eyebrow">Tableau de bord</div>
          <h1 class="welcome-title">Bonjour, {{ firstName() }}</h1>
          <p>Système de Gestion des Affaires BTP — <strong>Demathieu &amp; Bard</strong></p>
        </div>
        <div class="welcome-right">
          <span class="role-badge {{ auth.userRole() }}">{{ roleLabel() }}</span>
          <div class="welcome-date">
            <mat-icon>today</mat-icon>
            {{ today | date:'EEEE d MMMM yyyy':'':'fr' }}
          </div>
        </div>
      </div>

      <!-- ── Stats Cards ────────────────────────────────────── -->
      <div class="stats-grid">
        @for (stat of stats; track stat.label) {
          <div class="stat-card" [style.--accent]="stat.color">
            <div class="stat-left">
              <div class="stat-icon" [style.background]="stat.color + '15'">
                <mat-icon [style.color]="stat.color">{{ stat.icon }}</mat-icon>
              </div>
            </div>
            <div class="stat-body">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
              @if (stat.subtitle) {
                <span class="stat-subtitle">{{ stat.subtitle }}</span>
              }
            </div>
            @if (stat.trend) {
              <div class="stat-trend" [class.up]="stat.trendUp" [class.down]="!stat.trendUp">
                <mat-icon>{{ stat.trendUp ? 'trending_up' : 'trending_down' }}</mat-icon>
                {{ stat.trend }}
              </div>
            }
          </div>
        }
      </div>

      <!-- ── Main Grid ──────────────────────────────────────── -->
      <div class="main-grid">

        <!-- Colonne gauche -->
        <div class="left-col">

          <!-- Activité récente -->
          <div class="db-card activity-card">
            <div class="card-header">
              <h3>Activité récente</h3>
              <span class="card-subtitle">Flux du workflow BTP</span>
            </div>
            <div class="activity-list">
              @for (item of activities; track item.id) {
                <div class="activity-item">
                  <div class="act-icon" [style.background]="item.color + '15'">
                    <mat-icon [style.color]="item.color">{{ item.icon }}</mat-icon>
                  </div>
                  <div class="act-body">
                    <span class="act-title">{{ item.title }}</span>
                    <span class="act-sub">{{ item.subtitle }}</span>
                  </div>
                  <div class="act-right">
                    <span class="act-time">{{ item.time }}</span>
                    <span class="act-tag" [style.background]="item.color + '15'" [style.color]="item.color">
                      {{ item.tag }}
                    </span>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Avancement par type de plan (KPI BTP) -->
          <div class="db-card avancement-card">
            <div class="card-header">
              <h3>Avancement par type de plan</h3>
              <span class="card-subtitle">Plans visés / total</span>
            </div>
            <div class="avancement-list">
              @for (tp of typesProgress; track tp.code) {
                <div class="av-row">
                  <div class="av-left">
                    <span class="av-code" [style.color]="tp.color">{{ tp.code }}</span>
                    <span class="av-label">{{ tp.label }}</span>
                  </div>
                  <div class="av-bar-wrap">
                    <div class="av-bar">
                      <div class="av-fill" [style.width.%]="tp.total > 0 ? (tp.count / tp.total * 100) : 0"
                           [style.background]="tp.color"></div>
                    </div>
                    <span class="av-pct">{{ tp.total > 0 ? (tp.count / tp.total * 100 | number:'1.0-0') : 0 }}%</span>
                  </div>
                </div>
              }
            </div>
          </div>

        </div>

        <!-- Panel droit -->
        <div class="right-panels">

          <!-- Accès rapides -->
          <div class="db-card quick-card">
            <div class="card-header">
              <h3>Navigation rapide</h3>
            </div>
            <div class="quick-grid">
              @for (action of quickActions; track action.label) {
                <a class="quick-btn" [routerLink]="action.route">
                  <div class="qbtn-icon" [style.background]="action.color + '12'">
                    <mat-icon [style.color]="action.color">{{ action.icon }}</mat-icon>
                  </div>
                  <span class="qbtn-label">{{ action.label }}</span>
                  <mat-icon class="qbtn-arrow">chevron_right</mat-icon>
                </a>
              }
            </div>
          </div>

          <!-- Utilisateurs récents (ADMIN) -->
          @if (auth.hasRole('ADMIN')) {
            <div class="db-card users-mini-card">
              <div class="card-header">
                <h3>Équipe projet</h3>
                <a routerLink="/users" class="card-link">Gérer →</a>
              </div>
              @if (recentUsers().length > 0) {
                <div class="users-mini-list">
                  @for (user of recentUsers(); track user.id) {
                    <div class="user-mini-item">
                      <div class="user-mini-avatar">
                        {{ (user.prenom[0] + user.nom[0]).toUpperCase() }}
                      </div>
                      <div class="user-mini-info">
                        <span class="user-mini-name">{{ user.prenom }} {{ user.nom }}</span>
                        <span class="role-badge {{ user.role }} small">{{ ROLE_LABELS[user.role] }}</span>
                      </div>
                      <div class="status-dot" [class.actif]="user.actif" [title]="user.actif ? 'Actif' : 'Inactif'"></div>
                    </div>
                  }
                </div>
              } @else {
                <div class="empty-state">
                  <mat-icon>group</mat-icon>
                  <span>Chargement...</span>
                </div>
              }
            </div>
          }

          <!-- Workflow BTP Reminder -->
          <div class="db-card workflow-card">
            <div class="card-header">
              <h3>Workflow BTP</h3>
            </div>
            <div class="workflow-steps">
              @for (step of workflowSteps; track step.label) {
                <div class="wf-step">
                  <div class="wf-dot" [style.background]="step.color"></div>
                  <div class="wf-content">
                    <span class="wf-label">{{ step.label }}</span>
                    <span class="wf-role">{{ step.role }}</span>
                  </div>
                </div>
                @if (!$last) { <div class="wf-line"></div> }
              }
            </div>
          </div>

        </div>
      </div>

      <!-- ── Phases Banner ──────────────────────────────────── -->
      

    </div>
  `,
  styles: [`
    .dashboard { display: flex; flex-direction: column; gap: 24px; }

    /* ── Welcome ─────────────────────────────────────────────── */
    .welcome-section {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 16px;
      background: linear-gradient(135deg, var(--db-navy) 0%, #0F2540 100%);
      border-radius: 12px;
      padding: 24px 32px;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
        background-size: 32px 32px;
        pointer-events: none;
      }

      &::after {
        content: '';
        position: absolute;
        right: -40px;
        top: -40px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(232,68,14,.15) 0%, transparent 70%);
        pointer-events: none;
      }
    }

    .welcome-text {
      position: relative;
      z-index: 1;
    }

    .welcome-eyebrow {
      font-size: .72rem;
      font-weight: 600;
      color: var(--db-orange);
      text-transform: uppercase;
      letter-spacing: .12em;
      margin-bottom: 6px;
    }

    .welcome-title {
      font-family: var(--db-font-display, 'Barlow Condensed', sans-serif);
      font-size: 2.2rem;
      font-weight: 800;
      color: #fff;
      margin: 0 0 6px;
      letter-spacing: .01em;
      text-transform: uppercase;
      line-height: 1;
    }

    .welcome-section p {
      margin: 0;
      color: rgba(255,255,255,.6);
      font-size: .875rem;

      strong { color: rgba(255,255,255,.85); font-weight: 600; }
    }

    .welcome-right {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
    }

    .welcome-date {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: .8rem;
      color: rgba(255,255,255,.5);
      text-transform: capitalize;

      mat-icon { font-size: 1rem; width: 16px; height: 16px; }
    }

    /* ── Stat Cards ──────────────────────────────────────────── */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 14px;
    }

    .stat-card {
      background: #fff;
      border-radius: 10px;
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      box-shadow: 0 1px 4px rgba(0,0,0,.05);
      border: 1px solid var(--db-border);
      border-top: 3px solid var(--accent);
      transition: box-shadow .2s, transform .2s;
      &:hover { box-shadow: var(--db-shadow-md); transform: translateY(-1px); }
    }

    .stat-left { flex-shrink: 0; }

    .stat-icon {
      width: 46px;
      height: 46px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      mat-icon { font-size: 1.35rem; width: 1.35rem; height: 1.35rem; }
    }

    .stat-body { flex: 1; min-width: 0; }

    .stat-value {
      display: block;
      font-family: var(--db-font-display, 'Barlow Condensed', sans-serif);
      font-size: 2rem;
      font-weight: 800;
      color: var(--db-text);
      letter-spacing: -.02em;
      line-height: 1;
    }

    .stat-label {
      font-size: .78rem;
      color: var(--db-text-secondary);
      font-weight: 600;
      margin-top: 3px;
      display: block;
      text-transform: uppercase;
      letter-spacing: .04em;
    }

    .stat-subtitle {
      font-size: .72rem;
      color: var(--db-text-light);
      display: block;
      margin-top: 2px;
    }

    .stat-trend {
      display: flex;
      align-items: center;
      gap: 2px;
      font-size: .72rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 20px;
      white-space: nowrap;

      mat-icon { font-size: .85rem; width: .85rem; height: .85rem; }
      &.up   { color: #065F46; background: #D1FAE5; }
      &.down { color: #991B1B; background: #FEE2E2; }
    }

    /* ── Main grid ───────────────────────────────────────────── */
    .main-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 20px;
      align-items: start;
    }

    .left-col { display: flex; flex-direction: column; gap: 16px; }

    .db-card {
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 1px 3px rgba(0,0,0,.05);
      border: 1px solid var(--db-border);
      overflow: hidden;
    }

    .card-header {
      padding: 16px 20px 13px;
      border-bottom: 1px solid #F0F4F8;
      display: flex;
      justify-content: space-between;
      align-items: baseline;

      h3 {
        font-family: var(--db-font-display, 'Barlow Condensed', sans-serif);
        font-size: 1rem;
        font-weight: 700;
        color: var(--db-text);
        margin: 0;
        text-transform: uppercase;
        letter-spacing: .05em;
      }
    }

    .card-subtitle { font-size: .78rem; color: var(--db-text-secondary); }
    .card-link { font-size: .78rem; color: var(--db-orange); font-weight: 600; text-decoration: none; &:hover { text-decoration: underline; } }

    /* Activity */
    .activity-list { padding: 4px 0; }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 20px;
      transition: background .1s;
      &:hover { background: #F8FAFC; }
    }

    .act-icon {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      mat-icon { font-size: 1rem; width: 1rem; height: 1rem; }
    }

    .act-body { flex: 1; display: flex; flex-direction: column; }
    .act-title { font-size: .85rem; font-weight: 600; color: var(--db-text); }
    .act-sub   { font-size: .77rem; color: var(--db-text-secondary); margin-top: 1px; }

    .act-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }

    .act-time  { font-size: .72rem; color: var(--db-text-light); white-space: nowrap; }
    .act-tag {
      font-size: .65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .06em;
      padding: 1px 6px;
      border-radius: 4px;
      white-space: nowrap;
    }

    /* Avancement par type */
    .avancement-list { padding: 14px 20px; display: flex; flex-direction: column; gap: 12px; }

    .av-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .av-left {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 140px;
      flex-shrink: 0;
    }

    .av-code {
      font-family: 'Courier New', monospace;
      font-size: .8rem;
      font-weight: 800;
      min-width: 36px;
    }

    .av-label {
      font-size: .78rem;
      color: var(--db-text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .av-bar-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .av-bar {
      flex: 1;
      height: 7px;
      background: #EDF2F7;
      border-radius: 4px;
      overflow: hidden;
    }

    .av-fill {
      height: 100%;
      border-radius: 4px;
      transition: width .4s ease;
    }

    .av-pct {
      font-size: .75rem;
      font-weight: 700;
      color: var(--db-text-secondary);
      min-width: 34px;
      text-align: right;
    }

    /* Right panels */
    .right-panels { display: flex; flex-direction: column; gap: 14px; }

    /* Quick nav */
    .quick-grid {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 8px;
    }

    .quick-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 12px;
      border-radius: 8px;
      border: none;
      background: transparent;
      cursor: pointer;
      text-decoration: none;
      transition: background .12s;

      &:hover {
        background: #F3F7FC;
        .qbtn-arrow { opacity: 1; transform: translateX(2px); }
      }
    }

    .qbtn-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      mat-icon { font-size: 1.15rem; width: 1.15rem; height: 1.15rem; }
    }

    .qbtn-label { font-size: .875rem; font-weight: 600; color: var(--db-text); flex: 1; }

    .qbtn-arrow {
      font-size: 1rem;
      color: var(--db-text-light);
      opacity: 0;
      transition: all .15s;
    }

    /* Users mini */
    .users-mini-list { padding: 4px 0; }

    .user-mini-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 16px;
      transition: background .1s;
      &:hover { background: #F8FAFC; }
    }

    .user-mini-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--db-navy);
      color: #fff;
      font-size: .72rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .user-mini-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .user-mini-name { font-size: .82rem; font-weight: 500; color: var(--db-text); }

    .role-badge.small { font-size: .62rem; padding: 1px 6px; }

    .status-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #D1D5DB;
      flex-shrink: 0;
      &.actif { background: #22C55E; }
    }

    /* Workflow BTP */
    .workflow-steps { padding: 14px 20px; display: flex; flex-direction: column; }

    .wf-step {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .wf-dot {
      width: 10px; height: 10px; border-radius: 50%;
      flex-shrink: 0; z-index: 1;
    }

    .wf-content { display: flex; flex-direction: column; }
    .wf-label { font-size: .82rem; font-weight: 600; color: var(--db-text); }
    .wf-role { font-size: .72rem; color: var(--db-text-secondary); }

    .wf-line {
      width: 2px; height: 20px;
      background: var(--db-border);
      margin-left: 4px;
      flex-shrink: 0;
    }

    .empty-state {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: var(--db-text-light);
      font-size: .85rem;
      mat-icon { font-size: 1.8rem; width: 1.8rem; height: 1.8rem; opacity: .3; }
    }

    /* ── Phases banner ───────────────────────────────────────── */
    .phases-banner {
      display: flex;
      align-items: center;
      gap: 0;
      background: var(--db-navy-darker, #091B2E);
      border-radius: 10px;
      padding: 14px 20px;
      overflow-x: auto;
      border: 1px solid rgba(255,255,255,.05);
    }

    .phase-title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: .72rem;
      font-weight: 700;
      color: rgba(255,255,255,.4);
      text-transform: uppercase;
      letter-spacing: .08em;
      padding-right: 16px;
      border-right: 1px solid rgba(255,255,255,.1);
      margin-right: 16px;
      white-space: nowrap;
      flex-shrink: 0;
      mat-icon { font-size: .9rem; width: .9rem; height: .9rem; }
    }

    .phase-item {
      display: flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
      font-size: .78rem;
      font-weight: 600;
      padding: 0 12px;

      mat-icon { font-size: .95rem; width: .95rem; height: .95rem; }

      &.done    { color: #4ADE80; }
      &.current { color: var(--db-orange); }
      &:not(.done):not(.current) { color: rgba(255,255,255,.3); }
    }

    .phase-separator {
      width: 24px;
      height: 1px;
      background: rgba(255,255,255,.15);
      flex-shrink: 0;
    }

    @media (max-width: 1100px) {
      .main-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .stats-grid { grid-template-columns: 1fr 1fr; }
      .welcome-section { flex-direction: column; align-items: flex-start; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  auth            = inject(AuthService);
  private userSvc = inject(UserService);
  private affaireSvc = inject(AffaireService);
  private planSvc    = inject(PlanService);
  private controleSvc = inject(ControleService);

  ROLE_LABELS = ROLE_LABELS;
  recentUsers = signal<UtilisateurDto[]>([]);
  today = new Date();

  stats: StatCard[] = [
    { label: 'Affaires actives',     value: '—', icon: 'domain',        color: '#1B3A5C', subtitle: 'en préparation ou en cours' },
    { label: 'Plans émis',           value: '—', icon: 'description',   color: '#E8440E', subtitle: 'total toutes affaires'      },
    { label: 'Plans visés',          value: '—', icon: 'verified',      color: '#15803D', subtitle: 'prêts pour exécution'       },
    { label: 'Contrôles en attente', value: '—', icon: 'pending_actions',color: '#B45309', subtitle: 'nécessitent une décision'  },
  ];

  // Avancement par type de plan (KPI BTP — CLAUDE-METIER.md §6)
  typesProgress: TypeProgress[] = [
    { code: 'COF',  label: 'Coffrage',       count: 0, total: 0, color: '#92400E' },
    { code: 'FER',  label: 'Ferraillage',    count: 0, total: 0, color: '#1E40AF' },
    { code: 'NCAL', label: 'Note de calcul', count: 0, total: 0, color: '#5B21B6' },
    { code: 'EXE',  label: 'Exécution',      count: 0, total: 0, color: '#065F46' },
    { code: 'SYN',  label: 'Synthèse',       count: 0, total: 0, color: '#831843' },
    { code: 'FND',  label: 'Fondation',      count: 0, total: 0, color: '#7C3AED' },
    { code: 'ARCH', label: 'Architecture',   count: 0, total: 0, color: '#0E7490' },
  ];

  activities = [
    { id: 1, icon: 'verified',       color: '#15803D', title: 'Plan COF-RDC-001 visé',          subtitle: 'Coffrage RDC — Indice B validé',        time: 'il y a 2h',   tag: 'VISA'     },
    { id: 2, icon: 'cancel',         color: '#B91C1C', title: 'Plan FER-ETG1-002 rejeté',        subtitle: 'Correction demandée par contrôleur CI',  time: 'il y a 4h',   tag: 'CONTRÔLE' },
    { id: 3, icon: 'upload_file',    color: '#1D4ED8', title: 'Nouvelle version (Indice C)',      subtitle: 'COF-SS1-003 — corrigé par Y. Alami',    time: 'hier',        tag: 'INDICE'   },
    { id: 4, icon: 'check_circle',   color: '#065F46', title: 'Contrôle interne BPE',             subtitle: 'NCAL-GEN-001 — conforme aux normes',    time: 'hier',        tag: 'BPE'      },
    { id: 5, icon: 'send',           color: '#E8440E', title: 'Plan émis en Indice A',            subtitle: 'SYN-ETG2-001 — envoyé en contrôle',     time: 'il y a 2j',   tag: 'ÉMISSION' },
    { id: 6, icon: 'business',       color: '#1B3A5C', title: 'Affaire AFF-2025-008 créée',      subtitle: 'Construction Villa R+2 — Lot Structure', time: 'il y a 3j',   tag: 'AFFAIRE'  },
  ];

  quickActions = [
    { label: 'Affaires',      icon: 'domain',           color: '#1B3A5C', route: '/affaires'      },
    { label: 'Plans',         icon: 'description',      color: '#E8440E', route: '/plans'          },
    { label: 'Contrôles',     icon: 'fact_check',       color: '#B45309', route: '/controles'      },
    { label: 'Notifications', icon: 'notifications',    color: '#F59E0B', route: '/notifications'  },
    { label: 'Utilisateurs',  icon: 'group',            color: '#3B82F6', route: '/users'          },
    { label: 'Mon profil',    icon: 'person_outline',   color: '#8B5CF6', route: '/profile'        },
  ];

  // Workflow BTP (résumé de CLAUDE-METIER.md)
  workflowSteps = [
    { label: 'Création du plan',       role: 'Projeteur',          color: '#6B7280' },
    { label: 'Émission (Indice A)',     role: 'Émetteur',           color: '#3B82F6' },
    { label: 'Contrôle interne',       role: 'Contrôleur CI',      color: '#B45309' },
    { label: 'Contrôle externe',       role: 'Bureau de contrôle', color: '#7C3AED' },
    { label: 'Visa final',             role: 'Resp. Visa',          color: '#15803D' },
  ];

  // Phases PFE — tout est construit
  phases = [
    { label: 'Infrastructure',     done: true,  current: false },
    { label: 'User Service',       done: true,  current: false },
    { label: 'Affaire Service',    done: true,  current: false },
    { label: 'Plan Service',       done: true,  current: false },
    { label: 'Contrôle Service',   done: true,  current: false },
    { label: 'Notification Svc',   done: true,  current: false },
    { label: 'Frontend Complet',   done: true,  current: false },
  ];

  firstName() { return this.auth.currentUser()?.prenom ?? 'Utilisateur'; }
  roleLabel()  { const r = this.auth.userRole(); return r ? ROLE_LABELS[r] : ''; }

  ngOnInit(): void {
    // Charger les affaires actives (EN_PREPARATION + EN_COURS)
    // On charge EN_COURS d'abord, puis on additionne EN_PREPARATION
    this.affaireSvc.search(undefined, 'EN_COURS', 0, 1).subscribe({
      next: p => {
        const enCours = p.totalElements;
        this.affaireSvc.search(undefined, 'EN_PREPARATION', 0, 1).subscribe({
          next: p2 => { this.stats[0].value = enCours + p2.totalElements; },
          error: () => { this.stats[0].value = enCours; }
        });
      },
      error: () => {}
    });

    // Charger les plans (total + par type)
    this.planSvc.search(undefined, undefined).subscribe({
      next: plans => {
        this.stats[1].value = plans.length;
        const vises = plans.filter(p => p.statut === 'VISE').length;
        this.stats[2].value = vises;
        // Calculer avancement par type
        this.typesProgress = this.typesProgress.map(tp => {
          const total = plans.filter(p => p.typePlan === tp.code).length;
          const count = plans.filter(p => p.typePlan === tp.code && p.statut === 'VISE').length;
          return { ...tp, total, count };
        });
      },
      error: () => {}
    });

    // Contrôles en attente
    const userId = this.auth.currentUser()?.userId ?? '';
    if (userId) {
      this.controleSvc.getEnAttente(userId).subscribe({
        next: cs => { this.stats[3].value = cs.length; },
        error: () => {}
      });
    }

    // Utilisateurs (Admin uniquement)
    if (this.auth.hasRole('ADMIN')) {
      this.userSvc.getAll(0, 5).subscribe({
        next: page => { this.recentUsers.set(page.content); },
        error: () => {}
      });
    }
  }
}
