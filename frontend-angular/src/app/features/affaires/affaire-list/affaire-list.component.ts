import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AffaireService, CreateAffairePayload } from '../../../core/services/affaire.service';
import { Affaire, STATUT_AFFAIRE, StatutAffaire } from '../../../core/models/affaire.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-affaire-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule,
    MatIconModule, MatButtonModule, MatTooltipModule,
    MatDialogModule, MatSnackBarModule, MatProgressSpinnerModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
  ],
  template: `
<div class="page-wrap">

  <!-- ── Header ──────────────────────────────────────────────── -->
  <div class="page-header">
    <div>
      <h1 class="page-title">Affaires</h1>
      <p class="page-sub">{{ total() }} chantier{{ total() !== 1 ? 's' : '' }} — suivi de cycle de vie complet</p>
    </div>
    @if (canManage()) {
      <button class="btn-create" (click)="openCreateDialog()">
        <mat-icon>add</mat-icon> Nouvelle affaire
      </button>
    }
  </div>

  <!-- ── Filters ──────────────────────────────────────────────── -->
  <div class="filters-row">
    <div class="search-wrap">
      <mat-icon class="search-icon">search</mat-icon>
      <input class="search-input" placeholder="Rechercher par nom…"
             #searchInput (input)="onSearch(searchInput.value)" />
    </div>
    <div class="filter-chips">
      @for (s of statutKeys; track s) {
        <button class="chip"
                [class.active]="filterStatut() === s"
                (click)="setFilter(s)">
          {{ STATUT_AFFAIRE[s].label }}
        </button>
      }
      <button class="chip" [class.active]="filterStatut() === null" (click)="setFilter(null)">
        Tous
      </button>
    </div>
  </div>

  <!-- ── Table ─────────────────────────────────────────────────── -->
  @if (loading()) {
    <div class="loader-wrap"><mat-spinner diameter="36" /></div>
  } @else {
    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th class="col-ref">Référence</th>
            <th class="col-nom">Nom</th>
            <th class="col-statut">Statut</th>
            <th class="col-date">Début</th>
            <th class="col-date">Fin</th>
            <th class="col-actions"></th>
          </tr>
        </thead>
        <tbody>
          @for (a of affaires(); track a.id) {
            <tr class="data-row" [routerLink]="['/affaires', a.id]">
              <td class="col-ref">
                <span class="ref-code">{{ a.reference }}</span>
              </td>
              <td class="col-nom">
                <span class="nom-text">{{ a.nom }}</span>
                @if (a.description) {
                  <span class="desc-text">{{ a.description | slice:0:60 }}{{ a.description!.length > 60 ? '…' : '' }}</span>
                }
              </td>
              <td class="col-statut">
                <span class="statut-pill"
                      [style.color]="STATUT_AFFAIRE[a.statut].color"
                      [style.background]="STATUT_AFFAIRE[a.statut].bg">
                  {{ STATUT_AFFAIRE[a.statut].label }}
                </span>
              </td>
              <td class="col-date">{{ a.dateDebut | date:'dd/MM/yyyy' }}</td>
              <td class="col-date">{{ a.dateFin ? (a.dateFin | date:'dd/MM/yyyy') : '—' }}</td>
              <td class="col-actions" (click)="$event.stopPropagation()">
                <div class="row-actions">
                  <button class="action-btn" matTooltip="Voir le détail"
                          [routerLink]="['/affaires', a.id]">
                    <mat-icon>chevron_right</mat-icon>
                  </button>
                  @if (canManage()) {
                    <button class="action-btn danger" matTooltip="Supprimer"
                            (click)="confirmDelete(a)">
                      <mat-icon>delete_outline</mat-icon>
                    </button>
                  }
                </div>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="6" class="empty-row">
                <mat-icon>inbox</mat-icon>
                <span>Aucune affaire trouvée</span>
              </td>
            </tr>
          }
        </tbody>
      </table>

      <!-- Pagination -->
      @if (totalPages() > 1) {
        <div class="pagination">
          <button class="page-btn" [disabled]="page() === 0" (click)="goPage(page() - 1)">
            <mat-icon>chevron_left</mat-icon>
          </button>
          <span class="page-info">Page {{ page() + 1 }} / {{ totalPages() }}</span>
          <button class="page-btn" [disabled]="page() >= totalPages() - 1" (click)="goPage(page() + 1)">
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>
      }
    </div>
  }

</div>

<!-- ── Create Dialog ─────────────────────────────────────────── -->
@if (showDialog()) {
  <div class="dialog-backdrop" (click)="closeDialog()">
    <div class="dialog-box" (click)="$event.stopPropagation()">
      <div class="dialog-header">
        <h2>Nouvelle affaire</h2>
        <button class="dialog-close" (click)="closeDialog()"><mat-icon>close</mat-icon></button>
      </div>
      <form [formGroup]="form" (ngSubmit)="submitCreate()" class="dialog-form">
        <div class="field-group">
          <label>Nom <span class="req">*</span></label>
          <input formControlName="nom" class="field-input" placeholder="Ex: Construction Tour A" />
          @if (form.get('nom')?.invalid && form.get('nom')?.touched) {
            <span class="field-error">Nom requis</span>
          }
        </div>
        <div class="field-group">
          <label>Description</label>
          <textarea formControlName="description" class="field-input field-textarea"
                    placeholder="Description de l'affaire…" rows="3"></textarea>
        </div>
        <div class="field-row">
          <div class="field-group">
            <label>Date début <span class="req">*</span></label>
            <input formControlName="dateDebut" type="date" class="field-input" />
          </div>
          <div class="field-group">
            <label>Date fin prévue</label>
            <input formControlName="dateFin" type="date" class="field-input" />
          </div>
        </div>
        <div class="dialog-actions">
          <button type="button" class="btn-cancel" (click)="closeDialog()">Annuler</button>
          <button type="submit" class="btn-submit" [disabled]="form.invalid || submitting()">
            @if (submitting()) { <mat-spinner diameter="16" /> }
            Créer l'affaire
          </button>
        </div>
      </form>
    </div>
  </div>
}
  `,
  styles: [`
    .page-wrap { max-width: 1200px; }

    /* Header */
    .page-header {
      display: flex; align-items: flex-start; justify-content: space-between;
      margin-bottom: 24px;
    }
    .page-title { font-size: 1.5rem; font-weight: 700; color: var(--db-text); margin: 0; }
    .page-sub { font-size: .85rem; color: var(--db-text-secondary); margin: 4px 0 0; }

    .btn-create {
      display: flex; align-items: center; gap: 6px;
      background: var(--db-navy); color: #fff;
      border: none; border-radius: 6px;
      padding: 10px 18px; font-size: .875rem; font-weight: 600;
      cursor: pointer; white-space: nowrap;
      transition: background .15s;
      mat-icon { font-size: 1.1rem; width: 18px; height: 18px; }
      &:hover { background: var(--db-navy-darker, #091B2E); }
    }

    /* Filters */
    .filters-row {
      display: flex; align-items: center; gap: 16px;
      margin-bottom: 16px; flex-wrap: wrap;
    }
    .search-wrap {
      position: relative; display: flex; align-items: center;
    }
    .search-icon {
      position: absolute; left: 10px; font-size: 1.1rem;
      color: var(--db-text-secondary); pointer-events: none;
    }
    .search-input {
      border: 1px solid var(--db-border); border-radius: 6px;
      padding: 8px 12px 8px 36px; font-size: .875rem;
      width: 260px; outline: none; background: #fff;
      color: var(--db-text);
      &:focus { border-color: var(--db-navy); }
    }
    .filter-chips { display: flex; gap: 6px; flex-wrap: wrap; }
    .chip {
      border: 1px solid var(--db-border); border-radius: 20px;
      padding: 4px 14px; font-size: .8rem; font-weight: 500;
      cursor: pointer; background: #fff; color: var(--db-text-secondary);
      transition: all .12s;
      &:hover { border-color: var(--db-navy); color: var(--db-navy); }
      &.active { background: var(--db-navy); color: #fff; border-color: var(--db-navy); }
    }

    /* Table */
    .loader-wrap { display: flex; justify-content: center; padding: 60px; }
    .table-card {
      background: #fff; border: 1px solid var(--db-border);
      border-radius: 8px; overflow: hidden;
    }
    .data-table {
      width: 100%; border-collapse: collapse; font-size: .875rem;
    }
    thead tr {
      background: #F8FAFC; border-bottom: 1px solid var(--db-border);
    }
    th {
      padding: 10px 16px; font-size: .75rem; font-weight: 600;
      color: var(--db-text-secondary); text-transform: uppercase;
      letter-spacing: .06em; text-align: left; white-space: nowrap;
    }
    .data-row {
      border-bottom: 1px solid var(--db-border); cursor: pointer;
      transition: background .1s;
      &:last-child { border-bottom: none; }
      &:hover { background: #F8FAFC; }
      &:hover .row-actions { opacity: 1; }
    }
    td { padding: 12px 16px; vertical-align: middle; }

    .col-ref { width: 160px; }
    .col-statut { width: 140px; }
    .col-date { width: 120px; }
    .col-actions { width: 80px; }

    .ref-code {
      font-family: 'Courier New', monospace; font-size: .82rem;
      font-weight: 600; color: var(--db-navy);
      background: #EFF6FF; padding: 2px 8px; border-radius: 4px;
    }
    .col-nom { display: flex; flex-direction: column; gap: 2px; }
    .nom-text { font-weight: 500; color: var(--db-text); }
    .desc-text { font-size: .78rem; color: var(--db-text-secondary); }

    .statut-pill {
      display: inline-block; padding: 2px 10px; border-radius: 12px;
      font-size: .75rem; font-weight: 600;
    }

    /* Actions */
    .row-actions {
      display: flex; gap: 4px; justify-content: flex-end;
      opacity: 0; transition: opacity .1s;
    }
    .action-btn {
      display: flex; align-items: center; justify-content: center;
      width: 30px; height: 30px; border-radius: 4px; border: none;
      background: transparent; cursor: pointer; color: var(--db-text-secondary);
      transition: all .12s;
      mat-icon { font-size: 1.1rem; width: 18px; height: 18px; }
      &:hover { background: #EFF6FF; color: var(--db-navy); }
      &.danger:hover { background: #FEF2F2; color: #B91C1C; }
    }

    /* Empty */
    .empty-row {
      text-align: center; padding: 60px 16px !important;
      color: var(--db-text-secondary);
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      mat-icon { font-size: 2rem; opacity: .4; }
    }

    /* Pagination */
    .pagination {
      display: flex; align-items: center; justify-content: center;
      gap: 12px; padding: 12px; border-top: 1px solid var(--db-border);
    }
    .page-btn {
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px; border: 1px solid var(--db-border);
      border-radius: 6px; background: #fff; cursor: pointer;
      color: var(--db-text-secondary);
      &:disabled { opacity: .4; cursor: not-allowed; }
      &:not(:disabled):hover { border-color: var(--db-navy); color: var(--db-navy); }
    }
    .page-info { font-size: .82rem; color: var(--db-text-secondary); }

    /* Dialog */
    .dialog-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,.45);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000;
    }
    .dialog-box {
      background: #fff; border-radius: 10px; width: 520px; max-width: 95vw;
      box-shadow: 0 20px 60px rgba(0,0,0,.2);
    }
    .dialog-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 24px 0;
      h2 { margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--db-text); }
    }
    .dialog-close {
      border: none; background: none; cursor: pointer;
      color: var(--db-text-secondary); padding: 4px; border-radius: 4px;
      display: flex;
      &:hover { background: #F3F4F6; }
    }
    .dialog-form { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 16px; }
    .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .field-group { display: flex; flex-direction: column; gap: 6px; }
    .field-group label { font-size: .8rem; font-weight: 600; color: var(--db-text-secondary); }
    .req { color: #B91C1C; }
    .field-input {
      border: 1px solid var(--db-border); border-radius: 6px;
      padding: 9px 12px; font-size: .875rem; color: var(--db-text);
      outline: none; font-family: inherit;
      &:focus { border-color: var(--db-navy); }
    }
    .field-textarea { resize: vertical; min-height: 72px; }
    .field-error { font-size: .75rem; color: #B91C1C; }

    .dialog-actions {
      display: flex; justify-content: flex-end; gap: 10px;
      margin-top: 4px; padding-top: 16px;
      border-top: 1px solid var(--db-border);
    }
    .btn-cancel {
      border: 1px solid var(--db-border); border-radius: 6px;
      padding: 9px 18px; background: #fff; cursor: pointer;
      font-size: .875rem; color: var(--db-text-secondary);
      &:hover { background: #F3F4F6; }
    }
    .btn-submit {
      display: flex; align-items: center; gap: 8px;
      background: var(--db-navy); color: #fff;
      border: none; border-radius: 6px; padding: 9px 20px;
      font-size: .875rem; font-weight: 600; cursor: pointer;
      &:disabled { opacity: .5; cursor: not-allowed; }
      &:not(:disabled):hover { background: var(--db-navy-darker, #091B2E); }
    }
  `]
})
export class AffaireListComponent implements OnInit {
  private svc = inject(AffaireService);
  private auth = inject(AuthService);
  private snack = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  affaires = signal<Affaire[]>([]);
  loading = signal(true);
  total = signal(0);
  page = signal(0);
  totalPages = signal(1);
  filterStatut = signal<StatutAffaire | null>(null);
  searchNom = signal('');
  showDialog = signal(false);
  submitting = signal(false);

  readonly STATUT_AFFAIRE = STATUT_AFFAIRE;
  readonly statutKeys = Object.keys(STATUT_AFFAIRE) as StatutAffaire[];

  form = this.fb.group({
    nom: ['', Validators.required],
    description: [''],
    dateDebut: ['', Validators.required],
    dateFin: [''],
  });

  canManage(): boolean {
    const r = this.auth.userRole();
    return r === 'ADMIN' || r === 'CHEF_PROJET';
  }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    const nom = this.searchNom();
    const statut = this.filterStatut() ?? undefined;
    const obs = (nom || statut)
      ? this.svc.search(nom || undefined, statut, this.page(), 20)
      : this.svc.getAll(this.page(), 20);

    obs.subscribe({
      next: r => {
        this.affaires.set(r.content);
        this.total.set(r.totalElements);
        this.totalPages.set(r.totalPages);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onSearch(val: string): void {
    this.searchNom.set(val);
    this.page.set(0);
    this.load();
  }

  setFilter(s: StatutAffaire | null): void {
    this.filterStatut.set(s);
    this.page.set(0);
    this.load();
  }

  goPage(p: number): void { this.page.set(p); this.load(); }

  openCreateDialog(): void {
    this.form.reset();
    this.showDialog.set(true);
  }

  closeDialog(): void { this.showDialog.set(false); }

  submitCreate(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const v = this.form.value;
    const payload: CreateAffairePayload = {
      nom: v.nom!,
      description: v.description || undefined,
      dateDebut: v.dateDebut!,
      dateFin: v.dateFin || undefined,
    };
    this.svc.create(payload).subscribe({
      next: () => {
        this.snack.open('Affaire créée avec succès', 'OK', { duration: 3000 });
        this.closeDialog();
        this.page.set(0);
        this.load();
        this.submitting.set(false);
      },
      error: () => {
        this.snack.open('Erreur lors de la création', 'Fermer', { duration: 4000 });
        this.submitting.set(false);
      }
    });
  }

  confirmDelete(a: Affaire): void {
    if (!confirm(`Supprimer l'affaire ${a.reference} ?`)) return;
    this.svc.delete(a.id).subscribe({
      next: () => {
        this.snack.open('Affaire supprimée', 'OK', { duration: 3000 });
        this.load();
      },
      error: () => this.snack.open('Erreur lors de la suppression', 'Fermer', { duration: 4000 })
    });
  }
}
