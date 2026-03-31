import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/auth/auth.service';
import { ROLE_LABELS, Role } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatSelectModule, MatProgressSpinnerModule, MatSnackBarModule,
  ],
  template: `
    <div class="register-wrapper">

      <!-- Bande décorative gauche -->
      <div class="accent-bar"></div>

      <div class="register-content">

        <!-- Header -->
        <div class="register-header">
          <div class="logo-box">
            <span>D&amp;B</span>
          </div>
          <div>
            <h1>Créer un compte</h1>
            <p>Système de Gestion des Affaires BTP — Demathieu &amp; Bard</p>
          </div>
        </div>

        <!-- Card formulaire -->
        <div class="form-card">
          <form [formGroup]="form" (ngSubmit)="submit()">

            <!-- Nom / Prénom -->
            <div class="field-row">
              <mat-form-field appearance="outline">
                <mat-label>Nom</mat-label>
                <input matInput formControlName="nom" placeholder="Ben Salah">
                @if (f['nom'].hasError('required') && f['nom'].touched) {
                  <mat-error>Nom obligatoire</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Prénom</mat-label>
                <input matInput formControlName="prenom" placeholder="Mohamed">
                @if (f['prenom'].hasError('required') && f['prenom'].touched) {
                  <mat-error>Prénom obligatoire</mat-error>
                }
              </mat-form-field>
            </div>

            <!-- Email -->
            <mat-form-field appearance="outline" class="full">
              <mat-label>Adresse email professionnelle</mat-label>
              <input matInput type="email" formControlName="email" placeholder="m.bensalah@btp.tn">
              <mat-icon matSuffix>email</mat-icon>
              @if (f['email'].hasError('required') && f['email'].touched) {
                <mat-error>Email obligatoire</mat-error>
              }
              @if (f['email'].hasError('email') && f['email'].touched) {
                <mat-error>Format invalide</mat-error>
              }
            </mat-form-field>

            <!-- Mot de passe -->
            <mat-form-field appearance="outline" class="full">
              <mat-label>Mot de passe</mat-label>
              <input matInput [type]="showPwd() ? 'text' : 'password'" formControlName="motDePasse">
              <button mat-icon-button matSuffix type="button" (click)="togglePwd()">
                <mat-icon>{{ showPwd() ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              @if (f['motDePasse'].hasError('required') && f['motDePasse'].touched) {
                <mat-error>Mot de passe obligatoire</mat-error>
              }
              @if (f['motDePasse'].hasError('minlength') && f['motDePasse'].touched) {
                <mat-error>Minimum 8 caractères</mat-error>
              }
            </mat-form-field>

            <!-- Rôle -->
            <mat-form-field appearance="outline" class="full">
              <mat-label>Rôle</mat-label>
              <mat-select formControlName="role">
                @for (entry of roleEntries; track entry.value) {
                  <mat-option [value]="entry.value">{{ entry.label }}</mat-option>
                }
              </mat-select>
              @if (f['role'].hasError('required') && f['role'].touched) {
                <mat-error>Rôle obligatoire</mat-error>
              }
            </mat-form-field>

            <!-- Indicateur force mot de passe -->
            @if (f['motDePasse'].value) {
              <div class="pwd-strength">
                <div class="strength-bar" [class]="pwdStrengthClass()"></div>
                <span class="strength-label">{{ pwdStrengthLabel() }}</span>
              </div>
            }

            <!-- Erreur API -->
            @if (errorMsg()) {
              <div class="error-banner">
                <mat-icon>error_outline</mat-icon>
                {{ errorMsg() }}
              </div>
            }

            <!-- Submit -->
            <button mat-raised-button type="submit" class="submit-btn db-btn-primary"
                    [disabled]="loading() || form.invalid">
              @if (loading()) {
                <mat-spinner diameter="20" />
              } @else {
                <mat-icon>person_add</mat-icon>
                <span>CRÉER MON COMPTE</span>
              }
            </button>

          </form>
        </div>

        <!-- Footer -->
        <div class="register-footer">
          <span>Déjà un compte ?</span>
          <a routerLink="/auth/login" class="link">Se connecter</a>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .register-wrapper {
      min-height: 100vh;
      display: flex;
      background: #F4F6F9;
    }

    .accent-bar {
      width: 6px;
      background: linear-gradient(180deg, var(--db-orange) 0%, var(--db-navy) 100%);
      flex-shrink: 0;
    }

    .register-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 24px;
    }

    .register-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
      width: 100%;
      max-width: 540px;

      .logo-box {
        width: 52px;
        height: 52px;
        background: var(--db-navy);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: 800;
        font-size: .9rem;
        letter-spacing: -1px;
        flex-shrink: 0;
      }

      h1 {
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--db-navy);
        margin: 0 0 4px;
        letter-spacing: -.02em;
      }

      p {
        font-size: .85rem;
        color: var(--db-text-secondary);
        margin: 0;
      }
    }

    .form-card {
      width: 100%;
      max-width: 540px;
      background: #fff;
      border-radius: 12px;
      padding: 36px;
      box-shadow: 0 4px 20px rgba(0,0,0,.06);
      border: 1px solid #E8EDF3;
    }

    .field-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .full { width: 100%; }

    mat-form-field {
      width: 100%;
      margin-bottom: 4px;
    }

    /* Password strength */
    .pwd-strength {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: -8px 0 12px;
    }

    .strength-bar {
      height: 4px;
      border-radius: 2px;
      flex: 1;
      transition: all .3s;

      &.weak   { width: 33%; background: #EF4444; }
      &.medium { width: 66%; background: #F59E0B; }
      &.strong { width: 100%; background: #22C55E; }
    }

    .strength-label {
      font-size: .75rem;
      font-weight: 600;
      color: var(--db-text-secondary);
      min-width: 50px;
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

    .submit-btn {
      width: 100%;
      height: 48px;
      font-size: .9rem;
      font-weight: 700;
      letter-spacing: .06em;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 8px;
      border-radius: 6px !important;
    }

    .register-footer {
      margin-top: 24px;
      font-size: .875rem;
      color: var(--db-text-secondary);
      display: flex;
      gap: 6px;
    }

    .link {
      color: var(--db-orange);
      font-weight: 600;
      text-decoration: none;
      &:hover { text-decoration: underline; }
    }

    @media (max-width: 600px) {
      .field-row { grid-template-columns: 1fr; }
      .form-card  { padding: 24px 16px; }
    }
  `]
})
export class RegisterComponent {
  private fb       = inject(FormBuilder);
  private auth     = inject(AuthService);
  private router   = inject(Router);
  private snackBar = inject(MatSnackBar);

  loading  = signal(false);
  showPwd  = signal(false);
  errorMsg = signal('');

  togglePwd(): void { this.showPwd.update(v => !v); }

  roleEntries = (Object.keys(ROLE_LABELS) as Role[]).map(value => ({
    value,
    label: ROLE_LABELS[value]
  }));

  form = this.fb.group({
    nom:        ['', Validators.required],
    prenom:     ['', Validators.required],
    email:      ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required, Validators.minLength(8)]],
    role:       ['PROJETEUR' as Role, Validators.required],
  });

  get f() { return this.form.controls; }

  pwdStrengthClass(): string {
    const pwd = this.f['motDePasse'].value ?? '';
    if (pwd.length < 8) return 'weak';
    const strong = /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^a-zA-Z0-9]/.test(pwd);
    return strong ? 'strong' : 'medium';
  }

  pwdStrengthLabel(): string {
    const c = this.pwdStrengthClass();
    return c === 'weak' ? 'Faible' : c === 'medium' ? 'Moyen' : 'Fort';
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.errorMsg.set('');

    const v = this.form.value;
    this.auth.register({
      nom: v.nom!, prenom: v.prenom!, email: v.email!,
      motDePasse: v.motDePasse!, role: v.role as Role
    }).subscribe({
      next: () => {
        this.snackBar.open('Compte créé ! Connectez-vous.', '', { duration: 3000, panelClass: 'snack-success' });
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMsg.set(err.error?.message ?? 'Erreur lors de la création du compte');
      },
      complete: () => this.loading.set(false),
    });
  }
}
