import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../../../core/services/user.service';
import { ROLE_LABELS, Role, UtilisateurDto } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatMenuModule, MatSelectModule,
    MatDialogModule, MatSnackBarModule, MatTooltipModule,
    MatProgressBarModule, MatChipsModule, MatDividerModule,
  ],
  template: `
    <div class="user-list-page">

      <!-- ── Header ─────────────────────────────────────────── -->
      <div class="page-header">
        <div>
          <h1>Gestion des Utilisateurs</h1>
          <p>{{ totalElements() }} utilisateur(s) enregistré(s) dans le système</p>
        </div>
        <button mat-raised-button class="db-btn-primary" (click)="openRegisterDialog()">
          <mat-icon>person_add</mat-icon>
          Nouvel utilisateur
        </button>
      </div>

      <!-- ── Filtres ─────────────────────────────────────────── -->
      <div class="filters-bar db-card">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Rechercher</mat-label>
          <input matInput (input)="applyFilter($event)" placeholder="Nom, email...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline" class="role-filter">
          <mat-label>Rôle</mat-label>
          <mat-select (selectionChange)="filterByRole($event.value)">
            <mat-option value="">Tous les rôles</mat-option>
            @for (entry of roleEntries; track entry.value) {
              <mat-option [value]="entry.value">{{ entry.label }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="status-filter">
          <mat-label>Statut</mat-label>
          <mat-select (selectionChange)="filterByStatus($event.value)">
            <mat-option value="">Tous</mat-option>
            <mat-option value="true">Actifs</mat-option>
            <mat-option value="false">Inactifs</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <!-- ── Table ──────────────────────────────────────────── -->
      @if (loading()) {
        <mat-progress-bar mode="indeterminate" color="accent" />
      }

      <div class="table-wrapper db-card">
        <mat-table [dataSource]="dataSource" matSort>

          <!-- Avatar + Nom -->
          <ng-container matColumnDef="nom">
            <mat-header-cell *matHeaderCellDef mat-sort-header>Utilisateur</mat-header-cell>
            <mat-cell *matCellDef="let user">
              <div class="user-cell">
                <div class="table-avatar">
                  {{ (user.prenom[0] + user.nom[0]).toUpperCase() }}
                </div>
                <div class="user-cell-info">
                  <span class="user-full-name">{{ user.prenom }} {{ user.nom }}</span>
                  <span class="user-email">{{ user.email }}</span>
                </div>
              </div>
            </mat-cell>
          </ng-container>

          <!-- Rôle -->
          <ng-container matColumnDef="role">
            <mat-header-cell *matHeaderCellDef>Rôle</mat-header-cell>
            <mat-cell *matCellDef="let user">
              <span class="role-badge {{ user.role }}">{{ getRoleLabel(user.role) }}</span>
            </mat-cell>
          </ng-container>

          <!-- Statut -->
          <ng-container matColumnDef="actif">
            <mat-header-cell *matHeaderCellDef>Statut</mat-header-cell>
            <mat-cell *matCellDef="let user">
              <span class="status-badge" [class]="user.actif ? 'actif' : 'inactif'">
                <span class="dot"></span>
                {{ user.actif ? 'Actif' : 'Inactif' }}
              </span>
            </mat-cell>
          </ng-container>

          <!-- Date création -->
          <ng-container matColumnDef="dateCreation">
            <mat-header-cell *matHeaderCellDef mat-sort-header>Créé le</mat-header-cell>
            <mat-cell *matCellDef="let user">
              <span class="date-cell">{{ user.dateCreation | date:'dd/MM/yyyy' }}</span>
            </mat-cell>
          </ng-container>

          <!-- Actions -->
          <ng-container matColumnDef="actions">
            <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
            <mat-cell *matCellDef="let user">
              <button mat-icon-button [matMenuTriggerFor]="actionMenu"
                      [matMenuTriggerData]="{user: user}"
                      matTooltip="Actions">
                <mat-icon>more_vert</mat-icon>
              </button>
            </mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="displayedColumns" />
          <mat-row *matRowDef="let row; columns: displayedColumns;" />

          <!-- Empty state -->
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell no-data-cell" [attr.colspan]="displayedColumns.length">
              <div class="empty-state">
                <mat-icon>group_off</mat-icon>
                <span>Aucun utilisateur trouvé</span>
              </div>
            </td>
          </tr>
        </mat-table>

        <mat-paginator
          [length]="totalElements()"
          [pageSize]="pageSize"
          [pageSizeOptions]="[10, 20, 50]"
          (page)="onPageChange($event)"
          showFirstLastButtons />
      </div>

    </div>

    <!-- Action Menu -->
    <mat-menu #actionMenu="matMenu">
      <ng-template matMenuContent let-user="user">
        <button mat-menu-item (click)="openEditDialog(user)">
          <mat-icon>edit</mat-icon> Modifier
        </button>
        <button mat-menu-item (click)="openRoleDialog(user)">
          <mat-icon>manage_accounts</mat-icon> Changer le rôle
        </button>
        <mat-divider />
        @if (user.actif) {
          <button mat-menu-item class="menu-danger" (click)="toggleStatus(user)">
            <mat-icon>person_off</mat-icon> Désactiver
          </button>
        } @else {
          <button mat-menu-item class="menu-success" (click)="toggleStatus(user)">
            <mat-icon>person</mat-icon> Réactiver
          </button>
        }
      </ng-template>
    </mat-menu>
  `,
  styles: [`
    .user-list-page { display: flex; flex-direction: column; gap: 20px; }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      h1 {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--db-navy);
        margin: 0 0 4px;
      }

      p { color: var(--db-text-secondary); margin: 0; font-size: .9rem; }
    }

    /* Filters */
    .filters-bar {
      display: flex;
      gap: 16px;
      padding: 16px 20px;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-field { flex: 1; min-width: 200px; }
    .role-filter  { width: 200px; }
    .status-filter{ width: 140px; }

    mat-form-field { margin-bottom: -1.25em; }

    /* Table */
    .table-wrapper {
      overflow: hidden;
      border-radius: 10px;
    }

    .user-cell {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 4px 0;
    }

    .table-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--db-navy);
      color: #fff;
      font-size: .8rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .user-cell-info { display: flex; flex-direction: column; }
    .user-full-name { font-weight: 600; font-size: .875rem; color: var(--db-text); }
    .user-email     { font-size: .78rem; color: var(--db-text-secondary); }

    .date-cell { font-size: .85rem; color: var(--db-text-secondary); }

    .status-badge .dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 5px;
    }
    .status-badge.actif   .dot { background: #22C55E; }
    .status-badge.inactif .dot { background: #EF4444; }

    .no-data-cell { padding: 0 !important; }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 40px;
      color: var(--db-text-light);

      mat-icon { font-size: 2.5rem; width: 2.5rem; height: 2.5rem; opacity: .4; }
      span { font-size: .9rem; }
    }

    .menu-danger  { color: var(--db-error)   !important; }
    .menu-success { color: var(--db-success)  !important; }

    @media (max-width: 768px) {
      .page-header { flex-direction: column; gap: 12px; }
      .filters-bar { flex-direction: column; }
      .role-filter, .status-filter { width: 100%; }
    }
  `]
})
export class UserListComponent implements OnInit {
  private userSvc  = inject(UserService);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ROLE_LABELS = ROLE_LABELS;
  dataSource  = new MatTableDataSource<UtilisateurDto>();
  displayedColumns = ['nom', 'role', 'actif', 'dateCreation', 'actions'];

  loading       = signal(false);
  totalElements = signal(0);
  pageSize      = 20;
  currentPage   = 0;

  roleEntries = (Object.keys(ROLE_LABELS) as Role[]).map(v => ({ value: v, label: ROLE_LABELS[v] }));

  ngOnInit(): void { this.loadUsers(); }

  loadUsers(): void {
    this.loading.set(true);
    this.userSvc.getAll(this.currentPage, this.pageSize).subscribe({
      next: page => {
        this.dataSource.data = page.content;
        this.totalElements.set(page.totalElements);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  applyFilter(event: Event): void {
    const val = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (user, filter) =>
      `${user.nom} ${user.prenom} ${user.email}`.toLowerCase().includes(filter);
    this.dataSource.filter = val;
  }

  filterByRole(role: string): void {
    this.dataSource.filterPredicate = (user, filter) => !filter || user.role === filter;
    this.dataSource.filter = role;
  }

  filterByStatus(status: string): void {
    this.dataSource.filterPredicate = (user, filter) =>
      filter === '' || String(user.actif) === filter;
    this.dataSource.filter = status;
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize    = event.pageSize;
    this.loadUsers();
  }

  getRoleLabel(role: string): string {
    return ROLE_LABELS[role as Role] ?? role;
  }

  toggleStatus(user: UtilisateurDto): void {
    const msg    = user.actif ? 'Utilisateur désactivé' : 'Utilisateur réactivé';
    const onNext = () => { this.snackBar.open(msg, '', { duration: 3000, panelClass: 'snack-success' }); this.loadUsers(); };
    const onErr  = () => this.snackBar.open('Erreur lors de l\'opération', '', { duration: 3000 });

    if (user.actif) {
      this.userSvc.desactiver(user.id).subscribe({ next: onNext, error: onErr });
    } else {
      this.userSvc.reactiver(user.id).subscribe({ next: onNext, error: onErr });
    }
  }

  /* Placeholders — à implémenter avec MatDialog dans une itération suivante */
  openRegisterDialog(): void { this.snackBar.open('Utilisez la page /auth/register', '', { duration: 3000 }); }
  openEditDialog(_user: UtilisateurDto): void { this.snackBar.open('Fonctionnalité en cours', '', { duration: 2000 }); }
  openRoleDialog(_user: UtilisateurDto): void { this.snackBar.open('Fonctionnalité en cours', '', { duration: 2000 }); }
}
