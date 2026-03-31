import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatProgressSpinnerModule, MatSnackBarModule,
  ],
  template: `
    <div class="login-wrapper">

      <!-- ══════════════ PANNEAU GAUCHE (Branding DB) ══════════════ -->
      <div class="left-panel">
        <div class="panel-overlay"></div>

        <div class="panel-content">
          <!-- Logo -->
          <div class="db-logo">
            <div class="logo-icon">
              <span>D</span><span class="sep">&amp;</span><span>B</span>
            </div>
            <div class="logo-label">
              <span>DEMATHIEU</span>
              <span class="amp">&amp; BARD</span>
            </div>
          </div>

          <!-- Tagline -->
          <div class="tagline">
            <h1>Bâtisseurs<br><span class="highlight">d'avenir</span></h1>
            <p>Depuis plus de 100 ans, nous construisons<br>les infrastructures de demain.</p>
          </div>

          <!-- Workflow pills -->
          <div class="workflow-pills">
            <div class="pill">
              <span class="pill-num">01</span>
              <span>Plan</span>
              <div class="pill-arrow">›</div>
            </div>
            <div class="pill">
              <span class="pill-num">02</span>
              <span>Contrôle</span>
              <div class="pill-arrow">›</div>
            </div>
            <div class="pill pill-active">
              <span class="pill-num">03</span>
              <span>Visa</span>
            </div>
          </div>

          <!-- Stats -->
          <div class="stats-row">
            <div class="stat-item">
              <span class="stat-value">100+</span>
              <span class="stat-label">Années d'expertise</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">5000+</span>
              <span class="stat-label">Collaborateurs</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">500+</span>
              <span class="stat-label">Projets actifs</span>
            </div>
          </div>

          <!-- Secteurs -->
          <div class="sectors">
            <span class="sector-tag">Génie Civil</span>
            <span class="sector-tag">Bâtiment</span>
            <span class="sector-tag">Travaux Spéciaux</span>
            <span class="sector-tag">Fondations</span>
          </div>
        </div>

        <!-- Pattern décoratif -->
        <div class="grid-pattern"></div>
      </div>

      <!-- ══════════════ PANNEAU DROIT (Formulaire) ══════════════ -->
      <div class="right-panel">
        <div class="form-card">

          <!-- Header -->
          <div class="form-header">
            <div class="form-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="#E8440E"/>
              </svg>
            </div>
            <div>
              <h2>Connexion</h2>
              <p>Accédez à votre espace de gestion BTP</p>
            </div>
          </div>

          <!-- Formulaire -->
          <form [formGroup]="form" (ngSubmit)="submit()" autocomplete="on">

            <!-- Email -->
            <mat-form-field appearance="outline" class="field">
              <mat-label>Adresse email</mat-label>
              <input
                matInput
                type="email"
                formControlName="email"
                placeholder="nom@demathieu-bard.tn"
                autocomplete="email">
              <mat-icon matSuffix class="field-icon">email</mat-icon>
              @if (form.get('email')?.hasError('required') && form.get('email')?.touched) {
                <mat-error>L'email est obligatoire</mat-error>
              }
              @if (form.get('email')?.hasError('email') && form.get('email')?.touched) {
                <mat-error>Format d'email invalide</mat-error>
              }
            </mat-form-field>

            <!-- Mot de passe -->
            <mat-form-field appearance="outline" class="field">
              <mat-label>Mot de passe</mat-label>
              <input
                matInput
                [type]="showPassword() ? 'text' : 'password'"
                formControlName="motDePasse"
                autocomplete="current-password">
              <button mat-icon-button matSuffix type="button"
                      (click)="togglePassword()">
                <mat-icon>{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              @if (form.get('motDePasse')?.hasError('required') && form.get('motDePasse')?.touched) {
                <mat-error>Le mot de passe est obligatoire</mat-error>
              }
            </mat-form-field>

            <!-- Erreur API -->
            @if (errorMsg()) {
              <div class="error-banner">
                <mat-icon>error_outline</mat-icon>
                <span>{{ errorMsg() }}</span>
              </div>
            }

            <!-- Submit -->
            <button
              mat-raised-button
              type="submit"
              class="submit-btn db-btn-primary"
              [disabled]="loading() || form.invalid">
              @if (loading()) {
                <mat-spinner diameter="20" color="accent" />
              } @else {
                <mat-icon>login</mat-icon>
                <span>SE CONNECTER</span>
              }
            </button>

          </form>

          <!-- Footer -->
          <div class="form-footer">
            <span>Pas encore de compte ?</span>
            <a routerLink="/auth/register" class="link">Créer un compte</a>
          </div>

        

        </div>
      </div>
    </div>
  `,
  styles: [`
    /* ── Wrapper ─────────────────────────────────────────────── */
    .login-wrapper {
      display: flex;
      min-height: 100vh;
      font-family: 'Inter', sans-serif;
    }

    /* ── Panneau gauche ──────────────────────────────────────── */
    .left-panel {
      flex: 1.1;
      position: relative;
      background: linear-gradient(150deg, #060E18 0%, #091B2E 35%, #0F2540 65%, #1B3A5C 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 56px;
    }

    .panel-overlay {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 10% 90%, rgba(232,68,14,.18) 0%, transparent 50%),
        radial-gradient(ellipse at 90% 10%, rgba(59,130,246,.08) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, rgba(27,58,92,.4) 0%, transparent 70%);
      pointer-events: none;
    }

    .grid-pattern {
      position: absolute;
      inset: 0;
      /* Blueprint grid — lignes fines comme un plan d'ingénieur */
      background-image:
        linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px),
        linear-gradient(rgba(255,255,255,.015) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.015) 1px, transparent 1px);
      background-size: 80px 80px, 80px 80px, 16px 16px, 16px 16px;
      pointer-events: none;
    }

    .panel-content {
      position: relative;
      z-index: 1;
      max-width: 460px;
      width: 100%;
      color: #fff;
    }

    /* Logo */
    .db-logo {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 52px;
    }

    .logo-icon {
      background: var(--db-orange);
      width: 52px;
      height: 52px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 1.1rem;
      color: #fff;
      letter-spacing: -2px;
      flex-shrink: 0;
      box-shadow: 0 4px 20px rgba(232,68,14,.4);

      .sep { font-size: .85rem; opacity: .8; }
    }

    .logo-label {
      display: flex;
      flex-direction: column;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: .85rem;
      font-weight: 800;
      letter-spacing: .18em;
      text-transform: uppercase;

      .amp { color: rgba(255,255,255,.45); font-size: .72rem; margin-top: 1px; letter-spacing: .05em; }
    }

    /* Tagline */
    .tagline {
      margin-bottom: 40px;

      h1 {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: clamp(2.8rem, 5vw, 4rem);
        font-weight: 900;
        line-height: 1.05;
        margin: 0 0 16px;
        letter-spacing: .01em;
        color: #fff;
        text-transform: uppercase;

        .highlight { color: var(--db-orange); }
      }

      p {
        font-size: .95rem;
        color: rgba(255,255,255,.55);
        line-height: 1.65;
        margin: 0;
        max-width: 340px;
      }
    }

    /* Workflow pills */
    .workflow-pills {
      display: flex;
      align-items: center;
      gap: 0;
      margin-bottom: 36px;
    }

    .pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border: 1px solid rgba(255,255,255,.15);
      border-radius: 4px;
      font-size: .78rem;
      font-weight: 600;
      color: rgba(255,255,255,.5);
      margin-right: -1px;
      background: rgba(255,255,255,.03);
      letter-spacing: .02em;

      &.pill-active {
        background: rgba(232,68,14,.15);
        border-color: rgba(232,68,14,.4);
        color: var(--db-orange);
      }
    }

    .pill-num {
      font-size: .62rem;
      opacity: .6;
      font-weight: 800;
      font-family: 'Courier New', monospace;
    }

    .pill-arrow {
      font-size: 1rem;
      opacity: .4;
      margin-left: 8px;
    }

    /* Stats */
    .stats-row {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .stat-value {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 1.8rem;
      font-weight: 900;
      color: #fff;
      letter-spacing: -.01em;
      line-height: 1;
    }

    .stat-label {
      font-size: .68rem;
      color: rgba(255,255,255,.4);
      letter-spacing: .06em;
      text-transform: uppercase;
      font-weight: 500;
    }

    .stat-divider {
      width: 1px;
      height: 36px;
      background: rgba(255,255,255,.12);
    }

    /* Sectors */
    .sectors {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .sector-tag {
      border: 1px solid rgba(255,255,255,.15);
      color: rgba(255,255,255,.55);
      padding: 4px 14px;
      border-radius: 3px;
      font-size: .72rem;
      font-weight: 600;
      letter-spacing: .05em;
      text-transform: uppercase;
      transition: all .2s;

      &:hover {
        border-color: var(--db-orange);
        color: var(--db-orange);
        background: rgba(232,68,14,.08);
      }
    }

    /* ── Panneau droit ───────────────────────────────────────── */
    .right-panel {
      flex: 0.9;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 40px;
      background: #F8FAFC;
    }

    .form-card {
      width: 100%;
      max-width: 420px;
      background: #fff;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 24px rgba(0,0,0,.06), 0 1px 4px rgba(0,0,0,.04);
      border: 1px solid #E8EDF3;
    }

    /* Form header */
    .form-header {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      margin-bottom: 32px;

      .form-icon {
        width: 48px;
        height: 48px;
        background: #FDE9E3;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      h2 {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 1.7rem;
        font-weight: 800;
        color: #0F2540;
        margin: 0 0 3px;
        letter-spacing: .02em;
        text-transform: uppercase;
      }

      p {
        font-size: .83rem;
        color: #6B7A8D;
        margin: 0;
      }
    }

    /* Fields */
    .field {
      width: 100%;
      margin-bottom: 8px;

      .field-icon { color: #A0AEB9; }
    }

    /* Error banner */
    .error-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #FEE2E2;
      color: #991B1B;
      padding: 10px 14px;
      border-radius: 6px;
      font-size: .875rem;
      font-weight: 500;
      margin-bottom: 16px;
      border: 1px solid #FECACA;

      mat-icon { font-size: 1.1rem; width: 18px; height: 18px; }
    }

    /* Submit button */
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

    /* Form footer */
    .form-footer {
      text-align: center;
      margin-top: 24px;
      font-size: .875rem;
      color: #6B7A8D;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .link {
      color: var(--db-orange);
      font-weight: 600;
      text-decoration: none;

      &:hover { text-decoration: underline; }
    }

    .demo-hint {
      margin-top: 20px;
      padding: 10px 14px;
      background: #F0F4F8;
      border-radius: 6px;
      font-size: .78rem;
      color: #5A6A7E;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      flex-wrap: wrap;

      code {
        background: #E2E8F0;
        padding: 1px 6px;
        border-radius: 4px;
        font-family: monospace;
        color: #1B3A5C;
        font-weight: 600;
      }
    }

    /* ── Responsive ──────────────────────────────────────────── */
    @media (max-width: 900px) {
      .login-wrapper { flex-direction: column; }
      .left-panel { padding: 32px 24px; min-height: 220px; flex: none; }
      .stats-row, .sectors { display: none; }
      .tagline h1 { font-size: 1.8rem; }
      .right-panel { padding: 24px 16px; }
      .form-card { padding: 28px 20px; }
    }
  `]
})
export class LoginComponent {
  private fb      = inject(FormBuilder);
  private auth    = inject(AuthService);
  private router  = inject(Router);
  private snackBar = inject(MatSnackBar);

  loading      = signal(false);
  showPassword = signal(false);
  errorMsg     = signal('');

  togglePassword(): void { this.showPassword.update(v => !v); }

  form = this.fb.group({
    email:      ['admin@btp.fr', [Validators.required, Validators.email]],
    motDePasse: ['Admin@123',    [Validators.required]],
  });

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.loading.set(true);
    this.errorMsg.set('');

    const { email, motDePasse } = this.form.value;

    this.auth.login({ email: email!, motDePasse: motDePasse! }).subscribe({
      next: () => {
        this.snackBar.open('Connexion réussie !', '', { duration: 2000, panelClass: 'snack-success' });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMsg.set(
          err.error?.message ?? 'Email ou mot de passe incorrect'
        );
      },
      complete: () => this.loading.set(false),
    });
  }
}
