import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ControleService, DecisionPayload } from '../../../core/services/controle.service';
import { Controle, DECISION_META, TYPE_CONTROLE_META } from '../../../core/models/controle.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-controle-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatIconModule, MatButtonModule, MatProgressSpinnerModule,
    MatTooltipModule, MatSnackBarModule,
  ],
  template: `
<div class="page-wrap">

  <div class="page-header">
    <div>
      <h1 class="page-title">Contrôles</h1>
      <p class="page-sub">{{ controles().length }} contrôle{{ controles().length !== 1 ? 's' : '' }} en attente d'avis</p>
    </div>
  </div>

  <div class="tab-bar">
    <button class="tab" [class.active]="activeTab() === 'en-attente'" (click)="setTab('en-attente')">
      En attente
      @if (controles().length) {
        <span class="tab-badge">{{ controles().length }}</span>
      }
    </button>
    <button class="tab" [class.active]="activeTab() === 'tous'" (click)="setTab('tous')">
      Tous mes contrôles
    </button>
  </div>

  @if (loading()) {
    <div class="loader-wrap"><mat-spinner diameter="36" /></div>
  } @else {
    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Plan</th>
            <th class="col-type">Type</th>
            <th class="col-decision">Avis</th>
            <th>Remarque</th>
            <th class="col-date">Date</th>
            <th class="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (c of controles(); track c.id) {
            <tr class="data-row">
              <td>
                <a [routerLink]="['/plans', c.planId]" class="plan-link"
                   (click)="$event.stopPropagation()">
                  <mat-icon class="link-icon">description</mat-icon>
                  {{ c.reference ?? (c.planId | slice:0:12) }}…
                </a>
              </td>
              <td class="col-type">
                <span class="type-tag"
                      [style.color]="TYPE_CONTROLE_META[c.typeControle].color"
                      [style.background]="TYPE_CONTROLE_META[c.typeControle].bg"
                      [matTooltip]="TYPE_CONTROLE_META[c.typeControle].label">
                  <mat-icon class="type-icon">{{ TYPE_CONTROLE_META[c.typeControle].icon }}</mat-icon>
                  {{ c.typeControle.replace('CONTROLE_', '') }}
                </span>
              </td>
              <td class="col-decision">
                <span class="decision-badge"
                      [style.color]="DECISION_META[c.decision].color"
                      [style.background]="DECISION_META[c.decision].color + '1A'">
                  <mat-icon class="dec-icon">{{ DECISION_META[c.decision].icon }}</mat-icon>
                  {{ DECISION_META[c.decision].label }}
                </span>
              </td>
              <td class="rem-cell">{{ c.remarque || '—' }}</td>
              <td class="col-date text-muted">{{ c.dateControle | date:'dd/MM/yyyy' }}</td>
              <td class="col-actions" (click)="$event.stopPropagation()">
                @if (canDecide(c)) {
                  <div class="inline-actions">
                    <!-- VSO : approuvé sans observation -->
                    <button class="dec-btn vso" matTooltip="VSO — Visa Sans Observation" (click)="decide(c, 'VSO')">
                      <mat-icon>check_circle</mat-icon> VSO
                    </button>
                    <!-- VAC : approuvé avec commentaires -->
                    <button class="dec-btn vac" matTooltip="VAC — Visa Avec Commentaire" (click)="decide(c, 'VAC')">
                      <mat-icon>task_alt</mat-icon> VAC
                    </button>
                    <!-- VAO : corrections requises (remarque obligatoire) -->
                    <button class="dec-btn vao" matTooltip="VAO — Observations (remarque obligatoire)" (click)="openRemarque(c)">
                      <mat-icon>edit_note</mat-icon>
                    </button>
                  </div>
                } @else {
                  <span class="text-muted">—</span>
                }
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="6" class="empty-row">
                <mat-icon>fact_check</mat-icon>
                <span>Aucun contrôle en attente</span>
                <small>Tous les plans sont traités.</small>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  }

</div>

<!-- Dialog VAO (remarque obligatoire) -->
@if (showRemarkDialog()) {
  <div class="dialog-backdrop" (click)="cancelDecision()">
    <div class="dialog-box" (click)="$event.stopPropagation()">
      <div class="dialog-header">
        <h2>VAO — Observations (remarque obligatoire)</h2>
        <button class="dialog-close" (click)="cancelDecision()"><mat-icon>close</mat-icon></button>
      </div>
      <div class="dialog-form">
        <div class="field-group">
          <label>Observations à corriger</label>
          <textarea class="field-input field-textarea" rows="4" #remarkInput
                    placeholder="Décrire les corrections à apporter…"></textarea>
        </div>
        <div class="dialog-actions">
          <button class="btn-cancel" (click)="cancelDecision()">Annuler</button>
          <button class="btn-submit refuse"
                  (click)="confirmVAO(remarkInput.value)"
                  [disabled]="submitting() || !remarkInput.value.trim()">
            @if (submitting()) { <mat-spinner diameter="16" /> }
            Confirmer VAO
          </button>
        </div>
      </div>
    </div>
  </div>
}
  `,
  styles: [`
    .page-wrap { max-width: 1100px; }
    .page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; }
    .page-title { font-size: 1.5rem; font-weight: 700; color: var(--db-text); margin: 0; }
    .page-sub { font-size: .85rem; color: var(--db-text-secondary); margin: 4px 0 0; }

    .tab-bar { display: flex; gap: 0; border-bottom: 2px solid var(--db-border); margin-bottom: 20px; }
    .tab {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 20px; border: none; background: none; cursor: pointer;
      font-size: .875rem; font-weight: 500; color: var(--db-text-secondary);
      border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all .15s;
      &:hover { color: var(--db-navy); }
      &.active { color: var(--db-navy); border-bottom-color: var(--db-navy); font-weight: 600; }
    }
    .tab-badge {
      background: var(--db-orange); color: #fff;
      font-size: .65rem; font-weight: 700; padding: 1px 7px; border-radius: 10px;
    }
    .loader-wrap { display: flex; justify-content: center; padding: 60px; }

    .table-card { background: #fff; border: 1px solid var(--db-border); border-radius: 8px; overflow: hidden; }
    .data-table { width: 100%; border-collapse: collapse; font-size: .875rem; }
    thead tr { background: #F8FAFC; border-bottom: 1px solid var(--db-border); }
    th { padding: 10px 16px; font-size: .73rem; font-weight: 600; color: var(--db-text-secondary); text-transform: uppercase; letter-spacing: .06em; text-align: left; }
    .data-row {
      border-bottom: 1px solid var(--db-border);
      &:last-child { border-bottom: none; }
      &:hover { background: #F8FAFC; }
    }
    td { padding: 12px 16px; vertical-align: middle; }

    .col-type { width: 140px; }
    .col-decision { width: 190px; }
    .col-date { width: 110px; }
    .col-actions { width: 200px; }

    .plan-link {
      display: inline-flex; align-items: center; gap: 4px;
      color: var(--db-navy); text-decoration: none; font-family: 'Courier New', monospace; font-size: .82rem;
      &:hover { text-decoration: underline; }
    }
    .link-icon { font-size: 1rem; width: 16px; height: 16px; }

    .type-tag {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 8px; border-radius: 4px;
      font-size: .78rem; font-weight: 700;
    }
    .type-icon { font-size: .9rem; width: 14px; height: 14px; }

    .decision-badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; border-radius: 12px; font-size: .78rem; font-weight: 600;
    }
    .dec-icon { font-size: .9rem; width: 14px; height: 14px; }

    .rem-cell { font-size: .82rem; color: var(--db-text-secondary); max-width: 200px; }
    .text-muted { color: var(--db-text-secondary); font-size: .82rem; }

    .inline-actions { display: flex; align-items: center; gap: 4px; }
    .dec-btn {
      display: inline-flex; align-items: center; gap: 4px;
      border: none; border-radius: 5px; padding: 5px 10px;
      font-size: .78rem; font-weight: 600; cursor: pointer; transition: all .12s;
      mat-icon { font-size: .9rem; width: 14px; height: 14px; }
      &.vso { background: #D1FAE5; color: #15803D; &:hover { background: #A7F3D0; } }
      &.vac { background: #ECFEFF; color: #0E7490; &:hover { background: #CFFAFE; } }
      &.vao { background: #FEE2E2; color: #B91C1C; padding: 5px; &:hover { background: #FECACA; } }
    }

    .empty-row {
      text-align: center; padding: 64px 16px !important; color: var(--db-text-secondary);
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      mat-icon { font-size: 2.4rem; opacity: .3; }
      small { font-size: .8rem; opacity: .7; }
    }

    .dialog-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.45); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .dialog-box { background: #fff; border-radius: 10px; width: 460px; max-width: 95vw; box-shadow: 0 20px 60px rgba(0,0,0,.2); }
    .dialog-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px 0; h2 { margin: 0; font-size: 1.05rem; font-weight: 700; color: var(--db-text); } }
    .dialog-close { border: none; background: none; cursor: pointer; color: var(--db-text-secondary); padding: 4px; border-radius: 4px; display: flex; &:hover { background: #F3F4F6; } }
    .dialog-form { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 14px; }
    .field-group { display: flex; flex-direction: column; gap: 6px; }
    .field-group label { font-size: .8rem; font-weight: 600; color: var(--db-text-secondary); }
    .field-input { border: 1px solid var(--db-border); border-radius: 6px; padding: 9px 12px; font-size: .875rem; color: var(--db-text); outline: none; font-family: inherit; background: #fff; &:focus { border-color: var(--db-navy); } }
    .field-textarea { resize: vertical; min-height: 80px; }
    .dialog-actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 16px; border-top: 1px solid var(--db-border); }
    .btn-cancel { border: 1px solid var(--db-border); border-radius: 6px; padding: 9px 18px; background: #fff; cursor: pointer; font-size: .875rem; color: var(--db-text-secondary); &:hover { background: #F3F4F6; } }
    .btn-submit { display: flex; align-items: center; gap: 8px; background: var(--db-navy); color: #fff; border: none; border-radius: 6px; padding: 9px 20px; font-size: .875rem; font-weight: 600; cursor: pointer; &.refuse { background: #B91C1C; } &:disabled { opacity: .5; cursor: not-allowed; } }
  `]
})
export class ControleListComponent implements OnInit {
  private svc = inject(ControleService);
  private auth = inject(AuthService);
  private snack = inject(MatSnackBar);

  controles = signal<Controle[]>([]);
  loading = signal(true);
  activeTab = signal<'en-attente' | 'tous'>('en-attente');
  showRemarkDialog = signal(false);
  pendingControle = signal<Controle | null>(null);
  submitting = signal(false);

  readonly DECISION_META = DECISION_META;
  readonly TYPE_CONTROLE_META = TYPE_CONTROLE_META;

  get userId(): string { return this.auth.currentUser()?.userId ?? ''; }
  get role(): string { return this.auth.userRole() ?? ''; }

  canDecide(c: Controle): boolean {
    if (c.decision !== 'EN_ATTENTE') return false;
    if (this.role === 'ADMIN') return true;
    return c.controleurId === this.userId;
  }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    const userId = this.auth.currentUser()?.userId ?? '';
    const obs$ = this.activeTab() === 'tous'
      ? this.svc.getMes(userId)
      : this.svc.getEnAttente(userId);
    obs$.subscribe({
      next: cs => { this.controles.set(cs); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  setTab(tab: 'en-attente' | 'tous'): void {
    this.activeTab.set(tab);
    this.load();
  }

  decide(c: Controle, decision: 'VSO' | 'VAC'): void {
    this.submitDecision(c, decision, undefined);
  }

  openRemarque(c: Controle): void {
    this.pendingControle.set(c);
    this.showRemarkDialog.set(true);
  }

  cancelDecision(): void {
    this.showRemarkDialog.set(false);
    this.pendingControle.set(null);
  }

  confirmVAO(remarque: string): void {
    const c = this.pendingControle();
    if (!c) return;
    this.submitDecision(c, 'VAO', remarque || undefined);
  }

  private submitDecision(c: Controle, decision: 'VSO' | 'VAC' | 'VAO', remarque?: string): void {
    this.submitting.set(true);
    const payload: DecisionPayload = { decision, remarque };
    this.svc.applyDecision(c.id, payload).subscribe({
      next: updated => {
        this.snack.open(`Avis ${decision} enregistré`, 'OK', { duration: 3000 });
        this.showRemarkDialog.set(false);
        this.pendingControle.set(null);
        this.submitting.set(false);
        if (this.activeTab() === 'en-attente') {
          this.controles.update(list => list.filter(x => x.id !== c.id));
        } else {
          this.controles.update(list => list.map(x => x.id === c.id ? updated : x));
        }
      },
      error: () => {
        this.snack.open('Erreur lors de la décision', 'Fermer', { duration: 4000 });
        this.submitting.set(false);
      }
    });
  }
}
