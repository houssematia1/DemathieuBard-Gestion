import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlanService } from '../../../core/services/plan.service';
import { Plan, STATUT_PLAN, TYPE_PLAN, TypePlan, StatutPlan, getStatutPlan } from '../../../core/models/plan.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-plan-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatTooltipModule,
  ],
  template: `
<div class="page-wrap">

  <!-- Header -->
  <div class="page-header">
    <div>
      <h1 class="page-title">Plans</h1>
      <p class="page-sub">Circuit émission → contrôle → visa</p>
    </div>
  </div>

  <!-- Filters -->
  <div class="filters-row">
    <div class="filter-group">
      <span class="filter-label">Type</span>
      <div class="filter-chips">
        <button class="chip" [class.active]="filterType() === null" (click)="setType(null)">Tous</button>
        @for (t of typePlanKeys; track t) {
          <button class="chip type-chip"
                  [class.active]="filterType() === t"
                  [style.color]="filterType() === t ? TYPE_PLAN[t].color : ''"
                  [style.background]="filterType() === t ? TYPE_PLAN[t].bg : ''"
                  [style.borderColor]="filterType() === t ? TYPE_PLAN[t].color + '66' : ''"
                  (click)="setType(t)">
            {{ t }}
          </button>
        }
      </div>
    </div>
    <div class="filter-group">
      <span class="filter-label">Statut</span>
      <div class="filter-chips">
        <button class="chip" [class.active]="filterStatut() === null" (click)="setStatut(null)">Tous</button>
        @for (s of statutPlanKeys; track s) {
          <button class="chip"
                  [class.active]="filterStatut() === s"
                  (click)="setStatut(s)">
            {{ STATUT_PLAN[s].label }}
          </button>
        }
      </div>
    </div>
  </div>

  <!-- Table -->
  @if (loading()) {
    <div class="loader-wrap"><mat-spinner diameter="36" /></div>
  } @else {
    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Nom du plan</th>
            <th class="col-type">Type</th>
            <th class="col-indice">Indice</th>
            <th>Statut</th>
            <th class="col-date">Créé le</th>
            <th class="col-actions"></th>
          </tr>
        </thead>
        <tbody>
          @for (p of filtered(); track p.id) {
            <tr class="data-row" [routerLink]="['/plans', p.id]">
              <td>
                <div class="plan-cell">
                  <span class="plan-nom">{{ p.nom }}</span>
                  <span class="plan-affaire">Affaire {{ p.affaireId }}</span>
                </div>
              </td>
              <td class="col-type">
                <span class="type-badge"
                      [style.color]="TYPE_PLAN[p.typePlan].color"
                      [style.background]="TYPE_PLAN[p.typePlan].bg">
                  {{ p.typePlan }}
                </span>
              </td>
              <td class="col-indice">
                @if (p.derniereVersion) {
                  <div class="indice-cell">
                    <span class="indice-circle">{{ p.derniereVersion.indice }}</span>
                    <span class="ver-num">v{{ p.derniereVersion.numeroVersion }}</span>
                  </div>
                } @else {
                  <span class="text-muted">—</span>
                }
              </td>
              <td>
                <div class="statut-left-border"
                     [style.borderLeftColor]="getStatutPlan(p.statut).color">
                  <span class="statut-label" [style.color]="getStatutPlan(p.statut).color">
                    {{ getStatutPlan(p.statut).label }}
                  </span>
                </div>
              </td>
              <td class="col-date text-muted">{{ p.dateCreation | date:'dd/MM/yyyy' }}</td>
              <td class="col-actions" (click)="$event.stopPropagation()">
                <div class="row-actions">
                  <button class="action-btn" [routerLink]="['/plans', p.id]">
                    <mat-icon>chevron_right</mat-icon>
                  </button>
                </div>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="6" class="empty-row">
                <mat-icon>description</mat-icon>
                <span>Aucun plan trouvé</span>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  }
</div>
  `,
  styles: [`
    .page-wrap { max-width: 1200px; }
    .page-header {
      display: flex; align-items: flex-start; justify-content: space-between;
      margin-bottom: 20px;
    }
    .page-title { font-size: 1.5rem; font-weight: 700; color: var(--db-text); margin: 0; }
    .page-sub { font-size: .85rem; color: var(--db-text-secondary); margin: 4px 0 0; }

    .filters-row { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
    .filter-group { display: flex; align-items: center; gap: 10px; }
    .filter-label {
      font-size: .75rem; font-weight: 700; color: var(--db-text-secondary);
      text-transform: uppercase; letter-spacing: .06em; white-space: nowrap; width: 44px;
    }
    .filter-chips { display: flex; gap: 6px; flex-wrap: wrap; }
    .chip {
      border: 1px solid var(--db-border); border-radius: 20px;
      padding: 4px 12px; font-size: .78rem; font-weight: 500;
      cursor: pointer; background: #fff; color: var(--db-text-secondary);
      transition: all .12s;
      &:hover { border-color: var(--db-navy); color: var(--db-navy); }
      &.active { background: var(--db-navy); color: #fff; border-color: var(--db-navy); }
      &.type-chip.active { font-family: 'Courier New', monospace; font-weight: 700; }
    }

    .loader-wrap { display: flex; justify-content: center; padding: 60px; }
    .table-card {
      background: #fff; border: 1px solid var(--db-border);
      border-radius: 8px; overflow: hidden;
    }
    .data-table { width: 100%; border-collapse: collapse; font-size: .875rem; }
    thead tr { background: #F8FAFC; border-bottom: 1px solid var(--db-border); }
    th {
      padding: 10px 16px; font-size: .73rem; font-weight: 600;
      color: var(--db-text-secondary); text-transform: uppercase;
      letter-spacing: .06em; text-align: left;
    }
    .data-row {
      border-bottom: 1px solid var(--db-border); cursor: pointer; transition: background .1s;
      &:last-child { border-bottom: none; }
      &:hover { background: #F8FAFC; }
      &:hover .row-actions { opacity: 1; }
    }
    td { padding: 11px 16px; vertical-align: middle; }
    .col-type { width: 80px; }
    .col-indice { width: 90px; }
    .col-date { width: 110px; }
    .col-actions { width: 60px; }

    .plan-cell { display: flex; flex-direction: column; gap: 2px; }
    .plan-nom { font-weight: 500; color: var(--db-text); }
    .plan-affaire { font-size: .75rem; color: var(--db-text-secondary); }

    .type-badge {
      font-family: 'Courier New', monospace; font-size: .8rem; font-weight: 700;
      padding: 2px 8px; border-radius: 4px; display: inline-block;
    }

    .indice-cell { display: flex; align-items: center; gap: 6px; }
    .indice-circle {
      width: 28px; height: 28px; border-radius: 50%;
      background: var(--db-navy); color: #fff;
      font-weight: 800; font-size: .9rem;
      display: flex; align-items: center; justify-content: center;
    }
    .ver-num { font-size: .75rem; color: var(--db-text-secondary); }

    .statut-left-border {
      padding-left: 10px; border-left: 3px solid;
    }
    .statut-label { font-size: .82rem; font-weight: 600; }

    .text-muted { color: var(--db-text-secondary); font-size: .82rem; }
    .row-actions {
      display: flex; justify-content: flex-end;
      opacity: 0; transition: opacity .1s;
    }
    .action-btn {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: 4px; border: none;
      background: transparent; cursor: pointer; color: var(--db-text-secondary);
      mat-icon { font-size: 1.1rem; width: 18px; height: 18px; }
      &:hover { background: #EFF6FF; color: var(--db-navy); }
    }
    .empty-row {
      text-align: center; padding: 60px 16px !important;
      color: var(--db-text-secondary);
      mat-icon { font-size: 1.8rem; opacity: .4; display: block; margin: 0 auto 8px; }
    }
  `]
})
export class PlanListComponent implements OnInit {
  private svc = inject(PlanService);
  private auth = inject(AuthService);

  plans = signal<Plan[]>([]);
  loading = signal(true);
  filterType = signal<TypePlan | null>(null);
  filterStatut = signal<StatutPlan | null>(null);

  readonly TYPE_PLAN = TYPE_PLAN;
  readonly STATUT_PLAN = STATUT_PLAN;
  readonly getStatutPlan = getStatutPlan;
  readonly typePlanKeys = Object.keys(TYPE_PLAN) as TypePlan[];
  readonly statutPlanKeys = Object.keys(STATUT_PLAN) as StatutPlan[];

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.svc.search(
      this.filterType() ?? undefined,
      this.filterStatut() ?? undefined
    ).subscribe({
      next: p => { this.plans.set(p); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  filtered(): Plan[] { return this.plans(); }

  setType(t: TypePlan | null): void { this.filterType.set(t); this.load(); }
  setStatut(s: StatutPlan | null): void { this.filterStatut.set(s); this.load(); }
}
