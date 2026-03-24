import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AffaireService, UpdateAffairePayload } from '../../../core/services/affaire.service';
import { PlanService, CreatePlanPayload } from '../../../core/services/plan.service';
import { UserService } from '../../../core/services/user.service';
import { Affaire, STATUT_AFFAIRE } from '../../../core/models/affaire.model';
import { Plan, STATUT_PLAN, TYPE_PLAN, TypePlan } from '../../../core/models/plan.model';
import { UtilisateurDto } from '../../../core/models/user.model';
import { AuthService } from '../../../core/auth/auth.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-affaire-detail',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule,
    MatIconModule, MatButtonModule, MatTooltipModule,
    MatProgressSpinnerModule, MatSnackBarModule,
  ],
  template: `
<div class="page-wrap">

  <!-- Breadcrumb -->
  <div class="breadcrumb">
    <a routerLink="/affaires" class="bc-link">Affaires</a>
    <mat-icon class="bc-sep">chevron_right</mat-icon>
    <span class="bc-cur">{{ affaire()?.reference ?? '…' }}</span>
  </div>

  @if (loading()) {
    <div class="loader-wrap"><mat-spinner diameter="36" /></div>
  } @else {
  @if (affaire(); as a) {

    <!-- ── Affaire Header ─────────────────────────────────────── -->
    <div class="affaire-header">
      <div class="affaire-meta">
        <span class="affaire-ref">{{ a.reference }}</span>
        <h1 class="affaire-nom">{{ a.nom }}</h1>
        @if (a.description) {
          <p class="affaire-desc">{{ a.description }}</p>
        }
      </div>
      <div class="header-right">
        <span class="statut-badge"
              [style.color]="STATUT_AFFAIRE[a.statut].color"
              [style.background]="STATUT_AFFAIRE[a.statut].bg">
          {{ STATUT_AFFAIRE[a.statut].label }}
        </span>
        @if (canManage()) {
          <button class="btn-edit" (click)="openEditDialog()">
            <mat-icon>edit</mat-icon> Modifier
          </button>
        }
      </div>
    </div>

    <!-- ── Info Grid ──────────────────────────────────────────── -->
    <div class="info-grid">
      <div class="info-card">
        <div class="info-label">Date de début</div>
        <div class="info-val">{{ a.dateDebut | date:'dd MMMM yyyy':'':'fr' }}</div>
      </div>
      <div class="info-card">
        <div class="info-label">Date de fin prévue</div>
        <div class="info-val">{{ a.dateFin ? (a.dateFin | date:'dd MMMM yyyy':'':'fr') : 'Non définie' }}</div>
      </div>
      <div class="info-card">
        <div class="info-label">Créée par</div>
        <div class="info-val">{{ a.creePar }}</div>
      </div>
      <div class="info-card">
        <div class="info-label">Dernière modification</div>
        <div class="info-val">{{ a.dateDerniereModification | date:'dd/MM/yyyy HH:mm' }}</div>
      </div>
    </div>

    <!-- ── Avancement ────────────────────────────────────────── -->
    <div class="av-section">
      <h2 class="section-title">Avancement</h2>
      <div class="av-layout">
        <!-- Barre de progression -->
        <div class="av-progress-card">
          <div class="av-progress-header">
            <span class="av-progress-label">Avancement pondéré</span>
            <span class="av-progress-pct">{{ calculAvancement() }}%</span>
          </div>
          <div class="av-progress-bar">
            <div class="av-progress-fill"
                 [style.width.%]="calculAvancement()"
                 [style.background]="calculAvancement() >= 100 ? '#15803D' : calculAvancement() > 50 ? '#1D4ED8' : '#F59E0B'">
            </div>
          </div>
          <div class="av-progress-sub">
            {{ plans().length }} plan(s) · pondéré par type
          </div>
        </div>

        <!-- Tableaux de config -->
        <div class="av-tables">
          <div class="av-table-card">
            <div class="av-table-title">% par état livrable</div>
            <table class="av-table">
              <thead><tr><th>État</th><th class="tc">%</th></tr></thead>
              <tbody>
                @for (e of objectEntries(a.pourcentagesParEtat); track e[0]) {
                  <tr><td>{{ etatLabel(e[0]) }}</td><td class="tc">{{ e[1] }}%</td></tr>
                }
              </tbody>
            </table>
          </div>
          <div class="av-table-card">
            <div class="av-table-title">Coefficient par type</div>
            <table class="av-table">
              <thead><tr><th>Type</th><th class="tc">Coef.</th></tr></thead>
              <tbody>
                @for (e of objectEntries(a.coefficientsParType); track e[0]) {
                  <tr><td>{{ e[0] }}</td><td class="tc">{{ e[1] }}</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Plans de l'affaire ─────────────────────────────────── -->
    <div class="section-header">
      <h2 class="section-title">Plans</h2>
      @if (canCreate()) {
        <button class="btn-add-plan" (click)="openPlanDialog()">
          <mat-icon>add</mat-icon> Nouveau plan
        </button>
      }
    </div>

    @if (loadingPlans()) {
      <div class="loader-wrap"><mat-spinner diameter="28" /></div>
    } @else {
      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type</th>
              <th>Dernier indice</th>
              <th>Statut</th>
              <th>Date création</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            @for (p of plans(); track p.id) {
              <tr class="data-row" [routerLink]="['/plans', p.id]">
                <td><span class="plan-nom">{{ p.nom }}</span></td>
                <td>
                  <span class="type-badge"
                        [style.color]="TYPE_PLAN[p.typePlan].color"
                        [style.background]="TYPE_PLAN[p.typePlan].bg">
                    {{ p.typePlan }}
                  </span>
                </td>
                <td>
                  @if (p.derniereVersion) {
                    <span class="indice-badge">{{ p.derniereVersion.indice }}</span>
                    <span class="ver-num"> v{{ p.derniereVersion.numeroVersion }}</span>
                  } @else { <span class="text-muted">—</span> }
                </td>
                <td>
                  <span class="statut-pill"
                        [style.color]="STATUT_PLAN[p.statut].color"
                        [style.background]="STATUT_PLAN[p.statut].bg">
                    {{ STATUT_PLAN[p.statut].label }}
                  </span>
                </td>
                <td class="text-muted">{{ p.dateCreation | date:'dd/MM/yyyy' }}</td>
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
                  <span>Aucun plan pour cette affaire</span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }

    <!-- ── Historique ─────────────────────────────────────────── -->
    <div class="section-header" style="margin-top:32px;">
      <h2 class="section-title">Historique</h2>
    </div>
    <div class="historique-list">
      @for (h of a.historique; track h.date) {
        <div class="hist-row">
          <div class="hist-dot"></div>
          <div class="hist-body">
            <span class="hist-action">{{ h.action }}</span>
            <span class="hist-details">{{ h.details }}</span>
          </div>
          <span class="hist-date">{{ h.date | date:'dd/MM/yyyy HH:mm' }}</span>
        </div>
      } @empty {
        <p class="text-muted" style="padding: 16px 0;">Aucun historique.</p>
      }
    </div>

  } @else {
    <p class="text-muted">Affaire introuvable.</p>
  }
  } <!-- end @else -->

</div>

<!-- ── Edit Dialog ─────────────────────────────────────────────── -->
@if (showEditDialog()) {
  <div class="dialog-backdrop" (click)="closeEditDialog()">
    <div class="dialog-box" (click)="$event.stopPropagation()">
      <div class="dialog-header">
        <h2>Modifier l'affaire</h2>
        <button class="dialog-close" (click)="closeEditDialog()"><mat-icon>close</mat-icon></button>
      </div>
      <form [formGroup]="editForm" (ngSubmit)="submitEdit()" class="dialog-form">
        <div class="field-group">
          <label>Nom <span class="req">*</span></label>
          <input formControlName="nom" class="field-input" />
        </div>
        <div class="field-group">
          <label>Description</label>
          <textarea formControlName="description" class="field-input field-textarea" rows="3"></textarea>
        </div>
        <div class="field-row">
          <div class="field-group">
            <label>Date début</label>
            <input formControlName="dateDebut" type="date" class="field-input" />
          </div>
          <div class="field-group">
            <label>Date fin</label>
            <input formControlName="dateFin" type="date" class="field-input" />
          </div>
        </div>
        <div class="field-group">
          <label>Statut</label>
          <select formControlName="statut" class="field-input field-select">
            @for (s of statutKeys; track s) {
              <option [value]="s">{{ STATUT_AFFAIRE[s].label }}</option>
            }
          </select>
        </div>
        <div class="dialog-actions">
          <button type="button" class="btn-cancel" (click)="closeEditDialog()">Annuler</button>
          <button type="submit" class="btn-submit" [disabled]="editForm.invalid || submitting()">
            @if (submitting()) { <mat-spinner diameter="16" /> }
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
}

<!-- ── Plan Dialog ─────────────────────────────────────────────── -->
@if (showPlanDialog()) {
  <div class="dialog-backdrop" (click)="closePlanDialog()">
    <div class="dialog-box" (click)="$event.stopPropagation()">
      <div class="dialog-header">
        <h2>Nouveau plan</h2>
        <button class="dialog-close" (click)="closePlanDialog()"><mat-icon>close</mat-icon></button>
      </div>
      <form [formGroup]="planForm" (ngSubmit)="submitPlan()" class="dialog-form">
        <div class="field-row">
          <div class="field-group" style="flex:2">
            <label>Nom <span class="req">*</span></label>
            <input formControlName="nom" class="field-input" placeholder="Ex: Plan coffrage RDC" />
          </div>
          <div class="field-group">
            <label>N° plan</label>
            <input formControlName="numeroPlan" class="field-input" placeholder="PL-001" />
          </div>
        </div>
        <div class="field-row">
          <div class="field-group">
            <label>Prestation <span class="req">*</span></label>
            <select formControlName="typePrestation" class="field-input field-select">
              <option value="PDB">PDB — Plan de base</option>
              <option value="PS">PS — Plan de synthèse</option>
            </select>
          </div>
          <div class="field-group">
            <label>Auteur</label>
            <input formControlName="auteur" class="field-input" placeholder="Nom de l'auteur" />
          </div>
        </div>
        <div class="field-row">
          <div class="field-group">
            <label>Niveau</label>
            <select formControlName="niveau" class="field-input field-select">
              <option value="">— Aucun —</option>
              <option value="GEN">GEN — Général</option>
              <option value="FND">FND — Fondations</option>
              <option value="SS2">SS2 — Sous-sol 2</option>
              <option value="SS1">SS1 — Sous-sol 1</option>
              <option value="RDC">RDC — Rez-de-chaussée</option>
              <option value="ETG1">ETG1 — Étage 1</option>
              <option value="ETG2">ETG2 — Étage 2</option>
              <option value="ETG3">ETG3 — Étage 3</option>
              <option value="ETG4">ETG4 — Étage 4</option>
              <option value="ETG5">ETG5 — Étage 5</option>
              <option value="TER">TER — Terrasse</option>
            </select>
          </div>
          <div class="field-group">
            <label>Lot</label>
            <input formControlName="lot" class="field-input" placeholder="Ex: Lot 1" />
          </div>
        </div>
        <div class="field-row">
          <div class="field-group">
            <label>Nb planches</label>
            <input formControlName="nombrePlanches" type="number" min="1" class="field-input" placeholder="1" />
          </div>
          <div class="field-group">
            <label>Date d'engagement</label>
            <input formControlName="dateEngagement" type="date" class="field-input" />
          </div>
        </div>
        <div class="field-group">
          <label>Projeteur assigné</label>
          @if (loadingProjeteurs()) {
            <p class="loading-hint">Chargement…</p>
          } @else {
            <select formControlName="projeteurId" class="field-input field-select">
              <option value="">— Sélectionner un projeteur —</option>
              @for (u of projeteurs(); track u.id) {
                <option [value]="u.id">{{ u.prenom }} {{ u.nom }}</option>
              }
            </select>
          }
        </div>
        <div class="field-group">
          <label>Type de plan <span class="req">*</span></label>
          <div class="type-options">
            <input type="radio" id="tp-COF"  class="type-radio" name="planTypeGroup" value="COF" checked
                   (change)="planForm.patchValue({typePlan: 'COF'})">
            <label for="tp-COF" class="type-tile">
              <span class="tile-code" style="color:#92400E">COF</span>
              <span class="tile-name">Coffrage</span>
            </label>
            <input type="radio" id="tp-FER"  class="type-radio" name="planTypeGroup" value="FER"
                   (change)="planForm.patchValue({typePlan: 'FER'})">
            <label for="tp-FER" class="type-tile">
              <span class="tile-code" style="color:#1E40AF">FER</span>
              <span class="tile-name">Ferraillage</span>
            </label>
            <input type="radio" id="tp-NCAL" class="type-radio" name="planTypeGroup" value="NCAL"
                   (change)="planForm.patchValue({typePlan: 'NCAL'})">
            <label for="tp-NCAL" class="type-tile">
              <span class="tile-code" style="color:#5B21B6">NCAL</span>
              <span class="tile-name">Note calcul</span>
            </label>
            <input type="radio" id="tp-EXE"  class="type-radio" name="planTypeGroup" value="EXE"
                   (change)="planForm.patchValue({typePlan: 'EXE'})">
            <label for="tp-EXE" class="type-tile">
              <span class="tile-code" style="color:#065F46">EXE</span>
              <span class="tile-name">Exécution</span>
            </label>
            <input type="radio" id="tp-SYN"  class="type-radio" name="planTypeGroup" value="SYN"
                   (change)="planForm.patchValue({typePlan: 'SYN'})">
            <label for="tp-SYN" class="type-tile">
              <span class="tile-code" style="color:#831843">SYN</span>
              <span class="tile-name">Synthèse</span>
            </label>
          </div>
        </div>
        <div class="field-group">
          <label>Commentaire (version initiale)</label>
          <textarea formControlName="commentaire" class="field-input field-textarea" rows="2"></textarea>
        </div>
        <!-- Fichier PDF -->
        <div class="field-group">
          <label>Fichier du plan</label>
          <label class="file-drop-zone" [class.has-file]="selectedPlanFile()" for="plan-file-input">
            @if (selectedPlanFile()) {
              <mat-icon class="pdf-icon">{{ fileIcon(selectedPlanFile()!.name) }}</mat-icon>
              <span class="file-name">{{ selectedPlanFile()!.name }}</span>
              <span class="file-size">{{ (selectedPlanFile()!.size / 1024 / 1024).toFixed(1) }} Mo</span>
              <button type="button" class="file-clear-btn" (click)="$event.preventDefault(); selectedPlanFile.set(null)">
                <mat-icon>close</mat-icon>
              </button>
            } @else {
              <mat-icon>upload_file</mat-icon>
              <span>Cliquer pour joindre le fichier</span>
              <span class="file-hint">PDF · Word · Excel · DWG · max 50 Mo</span>
            }
          </label>
          <input id="plan-file-input" type="file"
                 accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg"
                 class="file-hidden-input" (change)="onPlanFileChange($event)" />
        </div>
        <div class="dialog-actions">
          <button type="button" class="btn-cancel" (click)="closePlanDialog()">Annuler</button>
          <button type="submit" class="btn-submit" [disabled]="planForm.invalid || submittingPlan()">
            @if (submittingPlan()) { <mat-spinner diameter="16" /> }
            @else { <mat-icon style="font-size:1rem;width:18px;height:18px">add</mat-icon> }
            Créer le plan
          </button>
        </div>
      </form>
    </div>
  </div>
}
  `,
  styles: [`
    .page-wrap { max-width: 1100px; }

    /* Breadcrumb */
    .breadcrumb {
      display: flex; align-items: center; gap: 4px;
      margin-bottom: 20px; font-size: .85rem;
    }
    .bc-link { color: var(--db-navy); text-decoration: none; &:hover { text-decoration: underline; } }
    .bc-sep { font-size: 1rem; color: var(--db-text-secondary); }
    .bc-cur { color: var(--db-text-secondary); }

    .loader-wrap { display: flex; justify-content: center; padding: 60px; }

    /* Affaire header */
    .affaire-header {
      display: flex; align-items: flex-start; justify-content: space-between;
      margin-bottom: 24px; gap: 16px;
      background: #fff; border: 1px solid var(--db-border);
      border-radius: 10px; padding: 20px 24px;
      border-left: 4px solid var(--db-navy);
    }
    .affaire-ref {
      font-family: 'Courier New', monospace; font-size: .8rem;
      font-weight: 700; color: var(--db-navy);
      background: #EFF6FF; padding: 3px 10px; border-radius: 4px;
      display: inline-block; margin-bottom: 10px;
      letter-spacing: .03em;
    }
    .affaire-nom {
      font-family: var(--db-font-display, 'Barlow Condensed', sans-serif);
      font-size: 1.7rem; font-weight: 800; margin: 0 0 6px;
      color: var(--db-text); text-transform: uppercase; letter-spacing: .02em;
    }
    .affaire-desc { font-size: .875rem; color: var(--db-text-secondary); margin: 0; line-height: 1.5; }
    .header-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
    .statut-badge {
      display: inline-block; padding: 5px 14px; border-radius: 20px;
      font-size: .8rem; font-weight: 600;
    }
    .btn-edit {
      display: flex; align-items: center; gap: 6px;
      border: 1px solid var(--db-border); border-radius: 6px;
      padding: 7px 14px; background: #fff; cursor: pointer;
      font-size: .875rem; font-weight: 500; color: var(--db-text);
      mat-icon { font-size: 1rem; width: 16px; height: 16px; }
      &:hover { background: #F3F4F6; }
    }

    /* Info grid */
    .info-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
      margin-bottom: 28px;
    }
    .info-card {
      background: #fff; border: 1px solid var(--db-border);
      border-radius: 8px; padding: 14px 16px;
    }
    .info-label { font-size: .73rem; font-weight: 600; color: var(--db-text-secondary);
      text-transform: uppercase; letter-spacing: .06em; margin-bottom: 6px; }
    .info-val { font-size: .9rem; font-weight: 500; color: var(--db-text); }

    /* Avancement */
    .av-section { margin-bottom: 32px; }
    .av-layout { display: flex; gap: 16px; flex-wrap: wrap; }
    .av-progress-card {
      flex: 1; min-width: 260px;
      background: #fff; border: 1px solid var(--db-border); border-radius: 8px;
      padding: 16px 20px;
    }
    .av-progress-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
    .av-progress-label { font-size: .82rem; font-weight: 600; color: var(--db-text-secondary); }
    .av-progress-pct { font-size: 1.4rem; font-weight: 800; color: var(--db-navy); }
    .av-progress-bar {
      height: 10px; background: #F3F4F6; border-radius: 99px; overflow: hidden; margin-bottom: 8px;
    }
    .av-progress-fill { height: 100%; border-radius: 99px; transition: width .4s ease; }
    .av-progress-sub { font-size: .75rem; color: var(--db-text-secondary); }
    .av-tables { display: flex; gap: 12px; flex-wrap: wrap; }
    .av-table-card {
      background: #fff; border: 1px solid var(--db-border); border-radius: 8px; overflow: hidden;
      min-width: 180px;
    }
    .av-table-title {
      padding: 8px 14px; font-size: .75rem; font-weight: 700;
      color: var(--db-text-secondary); background: #F8FAFC;
      border-bottom: 1px solid var(--db-border); text-transform: uppercase; letter-spacing: .05em;
    }
    .av-table { width: 100%; border-collapse: collapse; font-size: .8rem; }
    .av-table th {
      padding: 6px 14px; font-size: .7rem; font-weight: 600;
      color: var(--db-text-secondary); text-align: left;
    }
    .av-table td { padding: 5px 14px; border-top: 1px solid #F3F4F6; color: var(--db-text); }
    .av-table .tc { text-align: right; font-weight: 600; color: var(--db-navy); }

    /* Section header */
    .section-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 12px;
    }
    .section-title { font-size: 1rem; font-weight: 700; margin: 0; color: var(--db-text); }
    .btn-add-plan {
      display: flex; align-items: center; gap: 5px;
      background: var(--db-navy); color: #fff; border: none; border-radius: 6px;
      padding: 8px 14px; font-size: .82rem; font-weight: 600; cursor: pointer;
      mat-icon { font-size: 1rem; width: 16px; height: 16px; }
      &:hover { background: var(--db-navy-darker, #091B2E); }
    }

    /* Table */
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
    td { padding: 12px 16px; vertical-align: middle; }

    .plan-nom { font-weight: 500; color: var(--db-text); }
    .type-badge {
      font-family: 'Courier New', monospace; font-size: .78rem;
      font-weight: 700; padding: 2px 8px; border-radius: 4px;
    }
    .indice-badge {
      display: inline-flex; align-items: center; justify-content: center;
      width: 26px; height: 26px; border-radius: 50%;
      background: var(--db-navy); color: #fff;
      font-weight: 700; font-size: .85rem;
    }
    .ver-num { font-size: .78rem; color: var(--db-text-secondary); }
    .statut-pill {
      display: inline-block; padding: 2px 10px; border-radius: 12px;
      font-size: .75rem; font-weight: 600;
    }
    .text-muted { color: var(--db-text-secondary); font-size: .82rem; }
    .col-actions { width: 60px; }
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
      text-align: center; padding: 48px 16px !important;
      color: var(--db-text-secondary);
      mat-icon { font-size: 1.8rem; opacity: .4; display: block; margin: 0 auto 8px; }
    }

    /* Historique */
    .historique-list { display: flex; flex-direction: column; }
    .hist-row {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 10px 0; border-bottom: 1px solid var(--db-border);
      &:last-child { border-bottom: none; }
    }
    .hist-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--db-navy); margin-top: 6px; flex-shrink: 0;
    }
    .hist-body { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .hist-action { font-size: .875rem; font-weight: 600; color: var(--db-text); }
    .hist-details { font-size: .8rem; color: var(--db-text-secondary); }
    .hist-date { font-size: .78rem; color: var(--db-text-secondary); white-space: nowrap; }

    /* Dialogs */
    .dialog-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,.45);
      display: flex; align-items: center; justify-content: center; z-index: 1000;
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
      display: flex; &:hover { background: #F3F4F6; }
    }
    .dialog-form { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 14px; }
    .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .field-group { display: flex; flex-direction: column; gap: 6px; }
    .field-group label { font-size: .8rem; font-weight: 600; color: var(--db-text-secondary); }
    .req { color: #B91C1C; }
    .field-input {
      border: 1px solid var(--db-border); border-radius: 6px;
      padding: 9px 12px; font-size: .875rem; color: var(--db-text);
      outline: none; font-family: inherit; background: #fff;
      &:focus { border-color: var(--db-navy); }
    }
    .field-textarea { resize: vertical; min-height: 68px; }
    .field-select {
      appearance: auto !important;
      -webkit-appearance: auto !important;
      cursor: pointer;
    }

    /* ── Type selector : radio natifs + CSS pur ── */
    .type-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: flex-start;
    }
    .type-radio {
      display: none;
    }
    .type-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 8px 14px;
      border: 2px solid #DDE3EC;
      border-radius: 6px;
      cursor: pointer;
      background: #fff;
      min-width: 68px;
      transition: border-color .15s, background .15s, box-shadow .15s;
      user-select: none;
    }
    .type-tile:hover {
      border-color: #1B3A5C;
    }
    .type-radio:checked + .type-tile {
      background: #DBEAFE;
      border-color: #1B3A5C;
      box-shadow: 0 0 0 2px #1B3A5C;
    }
    .tile-code {
      font-family: 'Courier New', monospace;
      font-weight: 700;
      font-size: .85rem;
      display: block;
    }
    .tile-name {
      color: #5A6A7E;
      font-size: .67rem;
      display: block;
    }

    .dialog-actions {
      display: flex; justify-content: flex-end; gap: 10px;
      margin-top: 4px; padding-top: 16px; border-top: 1px solid var(--db-border);
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

    /* ── File upload zone ── */
    .file-drop-zone {
      display: flex; align-items: center; gap: 10px;
      border: 2px dashed var(--db-border); border-radius: 8px;
      padding: 14px 16px; cursor: pointer; background: #FAFBFC;
      transition: border-color .15s, background .15s;
      &:hover { border-color: var(--db-navy); background: #F0F4FF; }
      &.has-file { border-style: solid; border-color: #15803D; background: #F0FDF4; }
      mat-icon { color: var(--db-text-secondary); font-size: 1.4rem; width: 22px; height: 22px; }
      .pdf-icon { color: #B91C1C; font-size: 1.4rem; width: 22px; height: 22px; }
      span { font-size: .82rem; color: var(--db-text-secondary); }
      .file-name { color: var(--db-text); font-weight: 600; flex: 1; }
      .file-size { font-size: .75rem; color: #6B7280; }
      .file-hint { font-size: .72rem; color: #9CA3AF; }
    }
    .file-hidden-input { display: none; }
    .file-clear-btn {
      margin-left: auto; border: none; background: transparent; cursor: pointer;
      color: #B91C1C; display: flex; align-items: center; padding: 2px; border-radius: 4px;
      &:hover { background: #FEE2E2; }
      mat-icon { font-size: 1rem; width: 16px; height: 16px; }
    }

    @media (max-width: 768px) {
      .info-grid { grid-template-columns: 1fr 1fr; }
      .affaire-header { flex-direction: column; }
    }
  `]
})
export class AffaireDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private affaireSvc = inject(AffaireService);
  private planSvc = inject(PlanService);
  private userSvc = inject(UserService);
  private auth = inject(AuthService);
  private snack = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  affaire = signal<Affaire | null>(null);
  plans = signal<Plan[]>([]);
  loading = signal(true);
  loadingPlans = signal(true);
  showEditDialog = signal(false);
  showPlanDialog = signal(false);
  submitting = signal(false);
  submittingPlan = signal(false);
  selectedPlanFile = signal<File | null>(null);
  projeteurs = signal<UtilisateurDto[]>([]);
  loadingProjeteurs = signal(false);

  readonly STATUT_AFFAIRE = STATUT_AFFAIRE;
  readonly STATUT_PLAN = STATUT_PLAN;
  readonly TYPE_PLAN = TYPE_PLAN;
  readonly statutKeys = Object.keys(STATUT_AFFAIRE) as (keyof typeof STATUT_AFFAIRE)[];
  readonly typePlanKeys = Object.keys(TYPE_PLAN) as TypePlan[];

  editForm = this.fb.group({
    nom: ['', Validators.required],
    description: [''],
    dateDebut: ['', Validators.required],
    dateFin: [''],
    statut: [''],
  });

  planForm = this.fb.group({
    nom: ['', Validators.required],
    numeroPlan: [''],
    typePrestation: ['PDB', Validators.required],
    typePlan: ['COF', Validators.required],
    auteur: [''],
    niveau: [''],
    lot: [''],
    nombrePlanches: [null as number | null],
    dateEngagement: [''],
    projeteurId: [''],
    commentaire: [''],
  });

  canManage(): boolean {
    const r = this.auth.userRole();
    return r === 'ADMIN' || r === 'CHEF_PROJET';
  }

  canCreate(): boolean {
    const r = this.auth.userRole();
    return ['ADMIN', 'CHEF_PROJET', 'PROJETEUR'].includes(r ?? '');
  }

  /** Renvoie les entrées d'un objet sous forme de tableau pour @for */
  objectEntries(obj: Record<string, number> | undefined): [string, number][] {
    return Object.entries(obj ?? {});
  }

  etatLabel(key: string): string {
    const MAP: Record<string, string> = {
      DEMARRE:                'Démarré',
      PREMIER_INDICE_DIFFUSE: '1er indice diffusé',
      CONTROLE_EXTERNE:       'Contrôle externe',
      VAO:                    'VAO',
      VISE_BPE:               'Visa BPE (VSO/VAC)',
    };
    return MAP[key] ?? key;
  }

  private getPlanScore(plan: Plan, pct: Record<string, number>): number {
    const d    = pct['DEMARRE']                ?? 25;
    const pid  = pct['PREMIER_INDICE_DIFFUSE'] ?? 30;
    const ce   = pct['CONTROLE_EXTERNE']       ?? 10;
    const vao  = pct['VAO']                    ?? 15;
    const vbpe = pct['VISE_BPE']               ?? 20;
    const hasVersions  = (plan.versions?.length ?? 0) > 0;
    const multiVersion = (plan.versions?.length ?? 0) > 1;
    switch (plan.statut) {
      case 'VISE':                  return d + pid + ce + (multiVersion ? vao : 0) + vbpe;
      case 'EN_CONTROLE_TECHNIQUE':
      case 'EN_CONTROLE_EXTERNE':   return d + pid + ce;
      case 'EN_CONTROLE_INTERNE':
      case 'EMIS':                  return d + pid;
      case 'BROUILLON':             return hasVersions ? d : 0;
      default:                      return 0;
    }
  }

  calculAvancement(): number {
    const a  = this.affaire();
    const ps = this.plans();
    if (!a || !ps.length) return 0;
    const pct  = a.pourcentagesParEtat  ?? {};
    const coef = a.coefficientsParType  ?? {};
    const maxScore = Object.values(pct).reduce((s, v) => s + v, 0) || 100;
    let weighted = 0;
    let total    = 0;
    for (const plan of ps) {
      const c = (coef as Record<string, number>)[plan.typePlan] ?? 1;
      weighted += this.getPlanScore(plan, pct) * c;
      total    += maxScore * c;
    }
    return total > 0 ? Math.round(weighted / total * 100) : 0;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.affaireSvc.getById(id).subscribe({
      next: a => { this.affaire.set(a); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
    this.planSvc.getByAffaire(id).subscribe({
      next: p => { this.plans.set(p); this.loadingPlans.set(false); },
      error: () => this.loadingPlans.set(false)
    });
  }

  openEditDialog(): void {
    const a = this.affaire()!;
    this.editForm.patchValue({
      nom: a.nom,
      description: a.description ?? '',
      dateDebut: a.dateDebut?.slice(0, 10) ?? '',
      dateFin: a.dateFin?.slice(0, 10) ?? '',
      statut: a.statut,
    });
    this.showEditDialog.set(true);
  }

  closeEditDialog(): void { this.showEditDialog.set(false); }

  submitEdit(): void {
    if (this.editForm.invalid) return;
    this.submitting.set(true);
    const v = this.editForm.value;
    const id = this.affaire()!.id;
    const payload: UpdateAffairePayload = {
      nom: v.nom!,
      description: v.description || undefined,
      dateDebut: v.dateDebut!,
      dateFin: v.dateFin || undefined,
      statut: v.statut!,
    };
    this.affaireSvc.update(id, payload).subscribe({
      next: updated => {
        this.affaire.set(updated);
        this.snack.open('Affaire mise à jour', 'OK', { duration: 3000 });
        this.closeEditDialog();
        this.submitting.set(false);
      },
      error: () => {
        this.snack.open('Erreur lors de la mise à jour', 'Fermer', { duration: 4000 });
        this.submitting.set(false);
      }
    });
  }

  fileIcon(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'picture_as_pdf';
    if (ext === 'doc' || ext === 'docx') return 'description';
    if (ext === 'xls' || ext === 'xlsx') return 'table_chart';
    if (ext === 'dwg') return 'architecture';
    return 'insert_drive_file';
  }

  openPlanDialog(): void {
    this.planForm.reset({ typePlan: 'COF', typePrestation: 'PDB', nom: '', commentaire: '' });
    this.loadingProjeteurs.set(true);
    this.userSvc.getByRole('PROJETEUR').subscribe({
      next: users => { this.projeteurs.set(users.filter(u => u.actif)); this.loadingProjeteurs.set(false); },
      error: () => this.loadingProjeteurs.set(false),
    });
    this.selectedPlanFile.set(null);
    this.showPlanDialog.set(true);
  }

  closePlanDialog(): void {
    this.showPlanDialog.set(false);
    this.selectedPlanFile.set(null);
  }

  onPlanFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedPlanFile.set(input.files[0]);
    }
  }

  submitPlan(): void {
    if (this.planForm.invalid) return;
    this.submittingPlan.set(true);
    const v = this.planForm.value;

    const doCreate = (fichierUrl?: string) => {
      const payload: CreatePlanPayload = {
        affaireId: this.affaire()!.id,
        nom: v.nom!,
        numeroPlan: v.numeroPlan || undefined,
        typePlan: v.typePlan!,
        typePrestation: (v.typePrestation as any) || undefined,
        auteur: v.auteur || undefined,
        niveau: v.niveau || undefined,
        lot: v.lot || undefined,
        nombrePlanches: v.nombrePlanches ?? undefined,
        dateEngagement: v.dateEngagement || undefined,
        projeteurId: v.projeteurId || undefined,
        commentaire: v.commentaire || undefined,
        fichierUrl,
      };
      this.planSvc.create(payload).subscribe({
        next: p => {
          this.plans.update(list => [p, ...list]);
          this.snack.open('Plan créé avec succès', 'OK', { duration: 3000 });
          this.closePlanDialog();
          this.submittingPlan.set(false);
        },
        error: () => {
          this.snack.open('Erreur lors de la création', 'Fermer', { duration: 4000 });
          this.submittingPlan.set(false);
        }
      });
    };

    const file = this.selectedPlanFile();
    if (file) {
      this.planSvc.uploadFile(file).subscribe({
        next: ({ fichierUrl }) => doCreate(fichierUrl),
        error: () => {
          this.snack.open('Erreur lors de l\'upload du fichier', 'Fermer', { duration: 4000 });
          this.submittingPlan.set(false);
        }
      });
    } else {
      doCreate();
    }
  }
}
