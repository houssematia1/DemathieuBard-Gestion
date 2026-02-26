import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/auth/auth.service';
import { ROLE_LABELS, UtilisateurDto } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatCardModule, MatDividerModule,
    MatSnackBarModule, MatProgressSpinnerModule,
  ],
  template: `
    <div class="profile-page">

      <!-- Header -->
      <div class="page-header">
        <h1>Mon Profil</h1>
        <p>Gérez vos informations personnelles</p>
      </div>

      @if (user()) {
        <div class="profile-grid">

          <!-- ── Carte identité ─────────────────────────────── -->
          <div class="identity-card db-card">
            <div class="avatar-section">
              <div class="big-avatar">{{ initials() }}</div>
              <div class="avatar-info">
                <h2>{{ user()!.prenom }} {{ user()!.nom }}</h2>
                <span class="role-badge {{ user()!.role }}">{{ ROLE_LABELS[user()!.role] }}</span>
                <span class="status-badge" [class]="user()!.actif ? 'actif' : 'inactif'">
                  {{ user()!.actif ? '● Actif' : '○ Inactif' }}
                </span>
              </div>
            </div>

            <mat-divider />

            <div class="info-list">
              <div class="info-item">
                <mat-icon>email</mat-icon>
                <div>
                  <label>Email</label>
                  <span>{{ user()!.email }}</span>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>badge</mat-icon>
                <div>
                  <label>Identifiant</label>
                  <span class="id-value">{{ user()!.id }}</span>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>calendar_today</mat-icon>
                <div>
                  <label>Membre depuis</label>
                  <span>{{ user()!.dateCreation | date:'MMMM yyyy':'':'fr' }}</span>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>manage_accounts</mat-icon>
                <div>
                  <label>Rôle système</label>
                  <span>{{ ROLE_LABELS[user()!.role] }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ── Formulaire édition ─────────────────────────── -->
          <div class="edit-card db-card">
            <div class="card-title">
              <mat-icon>edit</mat-icon>
              <h3>Modifier mes informations</h3>
            </div>

            <form [formGroup]="editForm" (ngSubmit)="saveProfile()">

              <div class="field-row">
                <mat-form-field appearance="outline">
                  <mat-label>Nom</mat-label>
                  <input matInput formControlName="nom">
                  @if (f['nom'].hasError('required') && f['nom'].touched) {
                    <mat-error>Nom obligatoire</mat-error>
                  }
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Prénom</mat-label>
                  <input matInput formControlName="prenom">
                  @if (f['prenom'].hasError('required') && f['prenom'].touched) {
                    <mat-error>Prénom obligatoire</mat-error>
                  }
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Email</mat-label>
                <input matInput type="email" formControlName="email">
                <mat-icon matSuffix>email</mat-icon>
                @if (f['email'].hasError('required') && f['email'].touched) {
                  <mat-error>Email obligatoire</mat-error>
                }
                @if (f['email'].hasError('email') && f['email'].touched) {
                  <mat-error>Format invalide</mat-error>
                }
              </mat-form-field>

              <!-- Role (read-only) -->
              <div class="readonly-field">
                <label>Rôle</label>
                <div class="readonly-value">
                  <span class="role-badge {{ user()!.role }}">{{ ROLE_LABELS[user()!.role] }}</span>
                  <span class="readonly-hint">Contactez un administrateur pour changer votre rôle</span>
                </div>
              </div>

              @if (saveError()) {
                <div class="error-banner">
                  <mat-icon>error_outline</mat-icon>
                  {{ saveError() }}
                </div>
              }

              <div class="form-actions">
                <button mat-stroked-button type="button" class="db-btn-outline"
                        (click)="resetForm()">
                  Annuler
                </button>
                <button mat-raised-button type="submit" class="db-btn-primary"
                        [disabled]="saving() || editForm.invalid || !editForm.dirty">
                  @if (saving()) {
                    <mat-spinner diameter="18" />
                  } @else {
                    <mat-icon>save</mat-icon>
                  }
                  Enregistrer
                </button>
              </div>

            </form>
          </div>

        </div>
      } @else {
        <div class="loading-state">
          <mat-spinner diameter="48" />
          <span>Chargement du profil...</span>
        </div>
      }

    </div>
  `,
  styles: [`
    .profile-page { display: flex; flex-direction: column; gap: 24px; }

    .page-header {
      h1 { font-size: 1.5rem; font-weight: 700; color: var(--db-navy); margin: 0 0 4px; }
      p  { color: var(--db-text-secondary); margin: 0; font-size: .9rem; }
    }

    .profile-grid {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 20px;
      align-items: start;
    }

    .db-card {
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 1px 3px rgba(0,0,0,.06);
      border: 1px solid #E8EDF3;
      overflow: hidden;
    }

    /* Identity card */
    .identity-card { padding: 28px 24px; }

    .avatar-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding-bottom: 24px;
      text-align: center;
    }

    .big-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--db-navy) 0%, #2D5A87 100%);
      color: #fff;
      font-size: 1.75rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(27,58,92,.3);
    }

    .avatar-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;

      h2 {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--db-text);
        margin: 0;
      }
    }

    .info-list {
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;

      mat-icon {
        color: var(--db-text-light);
        font-size: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
        margin-top: 2px;
        flex-shrink: 0;
      }

      div {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      label {
        font-size: .72rem;
        font-weight: 600;
        color: var(--db-text-light);
        text-transform: uppercase;
        letter-spacing: .05em;
      }

      span {
        font-size: .875rem;
        color: var(--db-text);
        font-weight: 500;
        word-break: break-all;
      }
    }

    .id-value {
      font-family: monospace !important;
      font-size: .75rem !important;
      color: var(--db-text-secondary) !important;
    }

    /* Edit card */
    .edit-card { padding: 28px; }

    .card-title {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 24px;

      mat-icon { color: var(--db-orange); }

      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: var(--db-text);
        margin: 0;
      }
    }

    .field-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .full { width: 100%; }
    mat-form-field { width: 100%; margin-bottom: 4px; }

    .readonly-field {
      padding: 12px 0 16px;

      label {
        font-size: .78rem;
        font-weight: 600;
        color: var(--db-text-secondary);
        text-transform: uppercase;
        letter-spacing: .05em;
        display: block;
        margin-bottom: 8px;
      }
    }

    .readonly-value {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .readonly-hint {
      font-size: .78rem;
      color: var(--db-text-light);
      font-style: italic;
    }

    .error-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #FEE2E2;
      color: #991B1B;
      padding: 10px 14px;
      border-radius: 6px;
      font-size: .875rem;
      margin-bottom: 16px;
      border: 1px solid #FECACA;

      mat-icon { font-size: 1.1rem; width: 18px; height: 18px; }
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 8px;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 60px;
      color: var(--db-text-secondary);
    }

    @media (max-width: 900px) {
      .profile-grid { grid-template-columns: 1fr; }
      .field-row    { grid-template-columns: 1fr; }
    }
  `]
})
export class UserProfileComponent implements OnInit {
  private userSvc  = inject(UserService);
  private auth     = inject(AuthService);
  private fb       = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  ROLE_LABELS = ROLE_LABELS;
  user      = signal<UtilisateurDto | null>(null);
  saving    = signal(false);
  saveError = signal('');

  editForm = this.fb.group({
    nom:    ['', Validators.required],
    prenom: ['', Validators.required],
    email:  ['', [Validators.required, Validators.email]],
  });

  get f() { return this.editForm.controls; }

  ngOnInit(): void {
    this.userSvc.getMe().subscribe({
      next: u => {
        this.user.set(u);
        this.editForm.patchValue({ nom: u.nom, prenom: u.prenom, email: u.email });
      }
    });
  }

  initials(): string {
    const u = this.user();
    return u ? (u.prenom[0] + u.nom[0]).toUpperCase() : 'DB';
  }

  resetForm(): void {
    const u = this.user();
    if (u) this.editForm.patchValue({ nom: u.nom, prenom: u.prenom, email: u.email });
    this.editForm.markAsPristine();
    this.saveError.set('');
  }

  saveProfile(): void {
    if (this.editForm.invalid) { this.editForm.markAllAsTouched(); return; }
    const u = this.user();
    if (!u) return;

    this.saving.set(true);
    this.saveError.set('');
    const v = this.editForm.value;

    this.userSvc.update(u.id, { nom: v.nom!, prenom: v.prenom!, email: v.email! }).subscribe({
      next: updated => {
        this.user.set(updated);
        this.editForm.markAsPristine();
        this.saving.set(false);
        this.snackBar.open('Profil mis à jour !', '', { duration: 3000, panelClass: 'snack-success' });
      },
      error: err => {
        this.saving.set(false);
        this.saveError.set(err.error?.message ?? 'Erreur lors de la sauvegarde');
      },
    });
  }
}
