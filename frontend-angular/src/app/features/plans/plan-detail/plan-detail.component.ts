import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PlanService, UpdatePlanPayload } from '../../../core/services/plan.service';
import { ControleService, CreateControlePayload, DecisionPayload } from '../../../core/services/controle.service';
import { UserService } from '../../../core/services/user.service';
import { Plan, PlanArchive, STATUT_PLAN, ETAT_PLAN, TYPE_PLAN, Version, getStatutPlan } from '../../../core/models/plan.model';
import { Controle, DECISION_META, TYPE_CONTROLE_META } from '../../../core/models/controle.model';
import { UtilisateurDto } from '../../../core/models/user.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-plan-detail',
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
    @if (plan()?.affaireId) {
      <a [routerLink]="['/affaires', plan()!.affaireId]" class="bc-link">Affaire</a>
      <mat-icon class="bc-sep">chevron_right</mat-icon>
    }
    <span class="bc-cur">{{ plan()?.nom ?? '…' }}</span>
  </div>

  @if (loading()) {
    <div class="loader-wrap"><mat-spinner diameter="36" /></div>
  } @else {
  @if (plan(); as p) {

    <!-- ── Plan Header ──────────────────────────────────────────── -->
    <div class="plan-header">
      <div class="plan-meta">
        <div class="plan-badges">
          <span class="type-badge"
                [style.color]="TYPE_PLAN[p.typePlan].color"
                [style.background]="TYPE_PLAN[p.typePlan].bg">
            {{ p.typePlan }} — {{ TYPE_PLAN[p.typePlan].label }}
          </span>
          @if (p.derniereVersion) {
            <span class="indice-tag">Indice {{ p.derniereVersion.indice }}</span>
          }
          @if (p.statut === 'BROUILLON' && hasVAO()) {
            <span class="refuse-tag">
              <mat-icon>warning</mat-icon>
              Observations — À modifier
            </span>
          }
          @if (p.statut === 'VISE') {
            <span class="vise-tag">
              <mat-icon>verified</mat-icon> Visé — Prêt pour exécution
            </span>
          }
        </div>
        <h1 class="plan-nom">{{ p.nom }}</h1>
        <p class="plan-affaire-ref">Affaire : <code>{{ p.affaireId | slice:0:16 }}…</code></p>
      </div>
      <div class="header-right">
        <!-- Workflow BTP simplifié -->
        <div class="statut-pipeline">
          @for (step of statutSteps; track step.key) {
            <div class="pipeline-step"
                 [class.done]="getStatutPlan(p.statut).step > step.step"
                 [class.current]="p.statut === step.key"
                 [class.refused]="false">
              <div class="step-node">
                @if (getStatutPlan(p.statut).step > step.step) {
                  <mat-icon class="step-check">check</mat-icon>
                } @else if (p.statut === step.key) {
                  <div class="step-pulse"></div>
                }
              </div>
              <span class="step-name">{{ step.label }}</span>
              <span class="step-role">{{ step.role }}</span>
            </div>
            @if (!$last) {
              <div class="step-connector"
                   [class.done]="getStatutPlan(p.statut).step > step.step"></div>
            }
          }
        </div>
      </div>
    </div>

    <!-- ── Actions bar ─────────────────────────────────────────── -->
    <div class="actions-bar">
      @if (canEmettre(p)) {
        <button class="btn-action primary" (click)="emettre()">
          <mat-icon>publish</mat-icon> Émettre (Indice {{ nextIndice(p) }})
        </button>
      }
      @if (canSoumettre(p)) {
        <button class="btn-action primary" (click)="soumettre()">
          <mat-icon>send</mat-icon> Soumettre au contrôle interne
        </button>
      }
      @if (canAddVersion(p)) {
        <button class="btn-action" (click)="openVersionDialog()">
          <mat-icon>add</mat-icon> Nouvelle version
        </button>
      }
      @if (canControler(p)) {
        <button class="btn-action" (click)="openControleDialog()">
          <mat-icon>fact_check</mat-icon> Créer un contrôle
        </button>
      }
      @if (canEdit(p)) {
        <button class="btn-action" (click)="openEditDialog()">
          <mat-icon>edit</mat-icon> Modifier
        </button>
      }
      <div class="actions-spacer"></div>
      @if (canDelete(p)) {
        <button class="btn-action danger" (click)="deletePlan()" [disabled]="deletingPlan()">
          @if (deletingPlan()) { <mat-spinner diameter="14" /> }
          @else { <mat-icon>delete</mat-icon> }
          Supprimer
        </button>
      }
    </div>

    <!-- ── Versions Timeline ────────────────────────────────────── -->
    <h2 class="section-title">Versions</h2>
    <div class="versions-list">
      @for (v of p.versions; track v.idVersion; let last = $last) {
        <div class="version-card" [class.latest]="last">
          <div class="ver-left">
            <div class="ver-indice">{{ v.indice }}</div>
            @if (!last) { <div class="ver-line"></div> }
          </div>
          <div class="ver-body">
            <div class="ver-header">
              <span class="ver-title">Version {{ v.numeroVersion }}</span>
              <span class="ver-date">{{ v.dateUpload | date:'dd/MM/yyyy HH:mm' }}</span>
            </div>
            @if (v.commentaire) {
              <p class="ver-comment">{{ v.commentaire }}</p>
            }
            @if (v.fichierUrl) {
              <a [href]="v.fichierUrl" class="ver-file" target="_blank">
                <mat-icon>attach_file</mat-icon> Voir le fichier
              </a>
            }
            <span class="ver-by">Par : {{ v.uploadePar }}</span>
          </div>
          <!-- Contrôles de cette version -->
          @if (controlesByVersion(v.idVersion).length) {
            <div class="ver-controles">
              @for (c of controlesByVersion(v.idVersion); track c.id) {
                <div class="controle-chip"
                     [style.color]="DECISION_META[c.decision].color"
                     [style.borderColor]="DECISION_META[c.decision].color + '44'">
                  <mat-icon class="chip-icon">{{ DECISION_META[c.decision].icon }}</mat-icon>
                  <span>{{ TYPE_CONTROLE_META[c.typeControle].label }} — {{ DECISION_META[c.decision].label }}</span>
                </div>
              }
            </div>
          }
        </div>
      } @empty {
        <p class="text-muted">Aucune version disponible.</p>
      }
    </div>

    <!-- ── Contrôles ─────────────────────────────────────────────── -->
    @if (controles().length) {
      <h2 class="section-title" style="margin-top:28px;">Contrôles</h2>
      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Version</th>
              <th>Décision</th>
              <th>Remarque</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            @for (c of controles(); track c.id) {
              <tr class="data-row">
                <td>
                  <span class="type-tag">{{ c.typeControle }}</span>
                </td>
                <td>
                  <span class="ver-ref">{{ versionLabel(c.versionId) }}</span>
                </td>
                <td>
                  <span class="decision-badge"
                        [style.color]="DECISION_META[c.decision].color"
                        [style.background]="DECISION_META[c.decision].color + '18'">
                    <mat-icon class="dec-icon">{{ DECISION_META[c.decision].icon }}</mat-icon>
                    {{ DECISION_META[c.decision].label }}
                  </span>
                </td>
                <td class="text-muted">{{ c.remarque || '—' }}</td>
                <td class="text-muted">{{ c.dateControle | date:'dd/MM/yyyy' }}</td>
                <td (click)="$event.stopPropagation()">
                  @if (canDecide(c)) {
                    <div class="row-actions-inline">
                      <button class="dec-btn valide" (click)="decide(c, 'VSO')" matTooltip="VSO — Visa Sans Observation">
                        <mat-icon>check_circle</mat-icon>
                      </button>
                      <button class="dec-btn bao" (click)="decide(c, 'VAC')" matTooltip="VAC — Visa Avec Commentaire">
                        <mat-icon>task_alt</mat-icon>
                      </button>
                      <button class="dec-btn refuse" (click)="decide(c, 'VAO')" matTooltip="VAO — Observations (remarque obligatoire)">
                        <mat-icon>edit_note</mat-icon>
                      </button>
                    </div>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }

    <!-- ── Historique des archives ───────────────────────────────── -->
    <div class="archives-section">
      <button class="archives-toggle" (click)="toggleArchives()">
        <mat-icon>{{ showArchives() ? 'expand_less' : 'history' }}</mat-icon>
        Historique des archives
        @if (archives().length) {
          <span class="archives-count">{{ archives().length }}</span>
        }
        @if (!showArchives()) {
          <mat-icon class="toggle-chevron">expand_more</mat-icon>
        } @else {
          <mat-icon class="toggle-chevron">expand_less</mat-icon>
        }
      </button>

      @if (showArchives()) {
        @if (loadingArchives()) {
          <div class="archives-loading"><mat-spinner diameter="24" /></div>
        } @else if (!archives().length) {
          <p class="archives-empty">Aucune archive disponible.</p>
        } @else {
          <div class="archives-list">
            @for (a of archives(); track a.id) {
              <div class="archive-card">
                <div class="archive-header">
                  <div class="archive-meta">
                    <span class="archive-date">
                      <mat-icon>schedule</mat-icon>
                      {{ a.dateArchive | date:'dd/MM/yyyy HH:mm' }}
                    </span>
                    <span class="archive-by">par {{ a.modifiePar }}</span>
                  </div>
                  <div class="archive-badges">
                    @if (a.indiceInterne) {
                      <span class="arc-indice">Indice {{ a.indiceInterne }}</span>
                    }
                    @if (a.statutStr) {
                      <span class="arc-statut">{{ a.statutStr }}</span>
                    }
                  </div>
                </div>
                <div class="archive-body">
                  <span class="arc-nom">{{ a.nom }}</span>
                  @if (a.versions?.length) {
                    <span class="arc-versions">{{ a.versions.length }} version(s)</span>
                  }
                  @if (a.fichiers?.length) {
                    <span class="arc-fichiers">
                      <mat-icon>attach_file</mat-icon>{{ a.fichiers.length }} fichier(s)
                    </span>
                  }
                </div>
              </div>
            }
          </div>
        }
      }
    </div>

  }
  } <!-- end @else -->
</div>

<!-- ── Edit Plan Dialog ─────────────────────────────────────────── -->
@if (showEditDialog()) {
  <div class="dialog-backdrop" (click)="closeEditDialog()">
    <div class="dialog-box dialog-box-wide" (click)="$event.stopPropagation()">
      <div class="dialog-header">
        <h2>Modifier le plan</h2>
        <button class="dialog-close" (click)="closeEditDialog()"><mat-icon>close</mat-icon></button>
      </div>
      <form [formGroup]="planEditForm" (ngSubmit)="submitEditPlan()" class="dialog-form">
        <div class="field-row">
          <div class="field-group" style="flex:2">
            <label>Nom <span class="req">*</span></label>
            <input formControlName="nom" class="field-input" placeholder="Ex: Plan coffrage RDC - Bloc A" />
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
            <input formControlName="auteur" class="field-input" placeholder="Ex: Anis Meddeb" />
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
            <input formControlName="lot" class="field-input" placeholder="Ex: Gros Œuvre" />
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
        <div class="dialog-actions">
          <button type="button" class="btn-cancel" (click)="closeEditDialog()">Annuler</button>
          <button type="submit" class="btn-submit" [disabled]="planEditForm.invalid || submittingEdit()">
            @if (submittingEdit()) { <mat-spinner diameter="16" /> }
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
}

<!-- ── Version Dialog ──────────────────────────────────────────── -->
@if (showVersionDialog()) {
  <div class="dialog-backdrop" (click)="closeVersionDialog()">
    <div class="dialog-box" (click)="$event.stopPropagation()">
      <div class="dialog-header">
        <h2>Nouvelle version</h2>
        <button class="dialog-close" (click)="closeVersionDialog()"><mat-icon>close</mat-icon></button>
      </div>
      <form [formGroup]="versionForm" (ngSubmit)="submitVersion()" class="dialog-form">
        <div class="field-group">
          <label>Commentaire</label>
          <textarea formControlName="commentaire" class="field-input field-textarea" rows="3"
                    placeholder="Modifications apportées…"></textarea>
        </div>
        <div class="field-group">
          <label>Fichier de la version</label>
          <label class="file-drop-zone" [class.has-file]="selectedVersionFile()" for="version-file-input">
            @if (selectedVersionFile()) {
              <mat-icon class="pdf-icon">{{ fileIcon(selectedVersionFile()!.name) }}</mat-icon>
              <span class="file-name">{{ selectedVersionFile()!.name }}</span>
              <span class="file-size">{{ (selectedVersionFile()!.size / 1024 / 1024).toFixed(1) }} Mo</span>
              <button type="button" class="file-clear-btn" (click)="$event.preventDefault(); selectedVersionFile.set(null)">
                <mat-icon>close</mat-icon>
              </button>
            } @else {
              <mat-icon>upload_file</mat-icon>
              <span>Cliquer pour joindre le fichier</span>
              <span class="file-hint">PDF · Word · Excel · DWG · max 50 Mo</span>
            }
          </label>
          <input id="version-file-input" type="file"
                 accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg"
                 class="file-hidden-input" (change)="onVersionFileChange($event)" />
        </div>
        <div class="dialog-actions">
          <button type="button" class="btn-cancel" (click)="closeVersionDialog()">Annuler</button>
          <button type="submit" class="btn-submit" [disabled]="submitting()">
            @if (submitting()) { <mat-spinner diameter="16" /> }
            Créer la version
          </button>
        </div>
      </form>
    </div>
  </div>
}

<!-- ── Controle Dialog ─────────────────────────────────────────── -->
@if (showControleDialog()) {
  <div class="dialog-backdrop" (click)="closeControleDialog()">
    <div class="dialog-box" (click)="$event.stopPropagation()">
      <div class="dialog-header">
        <h2>Créer un contrôle</h2>
        <button class="dialog-close" (click)="closeControleDialog()"><mat-icon>close</mat-icon></button>
      </div>
      <form [formGroup]="controleForm" (ngSubmit)="submitControle()" class="dialog-form">
        <div class="field-group">
          <label>Type de contrôle</label>
          <select formControlName="typeControle" class="field-input field-select"
                  [attr.disabled]="isControle() ? true : null">
            <option value="CONTROLE_INTERNE">Contrôle Interne</option>
            <option value="CONTROLE_EXTERNE">Contrôle Externe</option>
            <option value="CONTROLE_TECHNIQUE">Contrôle Technique</option>
            <option value="VISA">Visa</option>
          </select>
        </div>
        <div class="field-group">
          <label>Contrôleur assigné <span class="req">*</span></label>
          @if (loadingControleurs()) {
            <p class="loading-hint">Chargement…</p>
          } @else if (controleurs().length === 0) {
            <p class="loading-hint" style="color:#B91C1C">Aucun contrôleur trouvé.</p>
          } @else {
            <select formControlName="controleurId" class="field-input field-select">
              <option value="">— Sélectionner un contrôleur —</option>
              @for (u of getFilteredControleurs(); track u.id) {
                <option [value]="u.id">
                  {{ u.prenom }} {{ u.nom }}
                  — {{ u.role === 'CONTROLEUR_INTERNE' ? 'Ctrl. Interne' : 'Ctrl. Externe' }}
                </option>
              }
            </select>
          }
        </div>
        <div class="dialog-actions">
          <button type="button" class="btn-cancel" (click)="closeControleDialog()">Annuler</button>
          <button type="submit" class="btn-submit"
                  [disabled]="!controleForm.value.controleurId || submittingControle()">
            @if (submittingControle()) { <mat-spinner diameter="16" /> }
            Lancer le contrôle
          </button>
        </div>
      </form>
    </div>
  </div>
}
  `,
  styles: [`
    .page-wrap { max-width: 1100px; }

    .breadcrumb {
      display: flex; align-items: center; gap: 4px;
      margin-bottom: 20px; font-size: .85rem;
    }
    .bc-link { color: var(--db-navy); text-decoration: none; &:hover { text-decoration: underline; } }
    .bc-sep { font-size: 1rem; color: var(--db-text-secondary); }
    .bc-cur { color: var(--db-text-secondary); }
    .loader-wrap { display: flex; justify-content: center; padding: 60px; }

    /* Plan header */
    .plan-header {
      display: flex; align-items: flex-start; justify-content: space-between;
      margin-bottom: 20px; gap: 20px;
    }
    .plan-badges { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
    .type-badge {
      font-family: 'Courier New', monospace; font-size: .82rem; font-weight: 700;
      padding: 3px 10px; border-radius: 4px;
    }
    .indice-tag {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 2px 12px; border-radius: 12px;
      background: var(--db-navy); color: #fff;
      font-size: .78rem; font-weight: 700;
    }
    .refuse-tag {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 2px 10px; border-radius: 12px;
      background: #FEE2E2; color: #B91C1C;
      font-size: .75rem; font-weight: 700;
      mat-icon { font-size: .85rem; width: 14px; height: 14px; }
    }
    .vise-tag {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 2px 12px; border-radius: 12px;
      background: #D1FAE5; color: #065F46;
      font-size: .75rem; font-weight: 700;
      mat-icon { font-size: .85rem; width: 14px; height: 14px; }
    }
    .plan-nom {
      font-family: var(--db-font-display, 'Barlow Condensed', sans-serif);
      font-size: 1.6rem; font-weight: 800; margin: 0 0 4px;
      color: var(--db-text); text-transform: uppercase; letter-spacing: .02em;
    }
    .plan-affaire-ref {
      font-size: .8rem; color: var(--db-text-secondary); margin: 0;
      code { font-family: 'Courier New', monospace; font-size: .78rem; color: var(--db-navy); }
    }

    /* Pipeline workflow BTP */
    .statut-pipeline {
      display: flex; align-items: center;
      background: #fff; border: 1px solid var(--db-border);
      border-radius: 10px; padding: 16px 20px;
    }

    .pipeline-step {
      display: flex; flex-direction: column; align-items: center; gap: 5px;
      padding: 0 10px; min-width: 80px;
    }

    .step-node {
      width: 28px; height: 28px; border-radius: 50%;
      background: #E9EEF5; border: 2px solid #D1D9E6;
      display: flex; align-items: center; justify-content: center;
      transition: all .25s; position: relative;

      .pipeline-step.done & {
        background: var(--db-navy); border-color: var(--db-navy);
      }
      .pipeline-step.current & {
        background: var(--db-orange); border-color: var(--db-orange);
        box-shadow: 0 0 0 5px rgba(232,68,14,.15);
      }
      .pipeline-step.refused & {
        background: #FEE2E2; border-color: #FECACA;
      }
    }

    .step-check {
      font-size: .85rem; width: 14px; height: 14px;
      color: #fff;
    }

    .step-pulse {
      width: 8px; height: 8px; border-radius: 50%;
      background: #fff;
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: .6; transform: scale(.8); }
    }

    .step-name {
      font-size: .72rem; font-weight: 700; color: var(--db-text-secondary);
      white-space: nowrap; text-align: center;

      .pipeline-step.done & { color: var(--db-navy); }
      .pipeline-step.current & { color: var(--db-orange); }
    }

    .step-role {
      font-size: .65rem; color: var(--db-text-light);
      white-space: nowrap; text-align: center;
    }

    .step-connector {
      width: 32px; height: 2px;
      background: #D1D9E6; flex-shrink: 0;
      transition: background .25s;

      &.done { background: var(--db-navy); }
    }

    /* Actions */
    .actions-bar {
      display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap;
    }
    .btn-action {
      display: flex; align-items: center; gap: 6px;
      border: 1px solid var(--db-border); border-radius: 6px;
      padding: 8px 16px; background: #fff; cursor: pointer;
      font-size: .875rem; font-weight: 500; color: var(--db-text);
      mat-icon { font-size: 1rem; width: 16px; height: 16px; }
      &:hover { background: #F3F4F6; }
      &.primary {
        background: var(--db-navy); color: #fff; border-color: transparent;
        &:hover { background: var(--db-navy-darker, #091B2E); }
      }
      &.accent {
        background: #15803D; color: #fff; border-color: transparent;
        &:hover { background: #166534; }
      }
    }

    .section-title { font-size: 1rem; font-weight: 700; margin: 0 0 12px; color: var(--db-text); }

    /* Versions */
    .versions-list { display: flex; flex-direction: column; }
    .version-card {
      display: flex; gap: 16px; padding: 12px 0;
      &.latest .ver-body { background: #FFFBEB; border-color: #FCD34D; }
    }
    .ver-left {
      display: flex; flex-direction: column; align-items: center; gap: 0;
      width: 44px; flex-shrink: 0;
    }
    .ver-indice {
      width: 36px; height: 36px; border-radius: 50%;
      background: var(--db-navy); color: #fff;
      font-weight: 800; font-size: 1rem;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .ver-line { flex: 1; width: 2px; background: var(--db-border); margin: 4px auto; }
    .ver-body {
      flex: 1; border: 1px solid var(--db-border); border-radius: 8px;
      padding: 12px 16px; background: #fff;
      display: flex; flex-direction: column; gap: 6px;
      margin-bottom: 12px;
    }
    .ver-header { display: flex; align-items: center; justify-content: space-between; }
    .ver-title { font-weight: 600; color: var(--db-text); }
    .ver-date { font-size: .78rem; color: var(--db-text-secondary); }
    .ver-comment { font-size: .85rem; color: var(--db-text-secondary); margin: 0; }
    .ver-file {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: .82rem; color: var(--db-navy); text-decoration: none;
      mat-icon { font-size: .9rem; width: 14px; height: 14px; }
      &:hover { text-decoration: underline; }
    }
    .ver-by { font-size: .75rem; color: var(--db-text-secondary); }
    .ver-controles { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
    .controle-chip {
      display: inline-flex; align-items: center; gap: 4px;
      border: 1px solid; border-radius: 12px; padding: 2px 10px;
      font-size: .75rem; font-weight: 600;
    }
    .chip-icon { font-size: .85rem; width: 14px; height: 14px; }

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
      border-bottom: 1px solid var(--db-border);
      &:last-child { border-bottom: none; }
      &:hover { background: #F8FAFC; }
    }
    td { padding: 12px 16px; vertical-align: middle; }
    .text-muted { color: var(--db-text-secondary); font-size: .82rem; }
    .type-tag {
      display: inline-block; padding: 2px 8px; border-radius: 4px;
      background: #EFF6FF; color: var(--db-navy);
      font-size: .78rem; font-weight: 600;
    }
    .ver-ref {
      font-family: 'Courier New', monospace; font-size: .78rem;
      color: var(--db-text-secondary);
    }
    .decision-badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; border-radius: 12px; font-size: .78rem; font-weight: 600;
    }
    .dec-icon { font-size: .9rem; width: 14px; height: 14px; }
    .row-actions-inline { display: flex; gap: 4px; }
    .dec-btn {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: 4px; border: none;
      cursor: pointer;
      mat-icon { font-size: 1rem; width: 16px; height: 16px; }
      &.valide { background: #D1FAE5; color: #15803D; &:hover { background: #A7F3D0; } }
      &.bao    { background: #ECFEFF; color: #0E7490; &:hover { background: #CFFAFE; } }
      &.refuse { background: #FEE2E2; color: #B91C1C; &:hover { background: #FECACA; } }
    }

    /* Dialogs */
    .dialog-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,.45);
      display: flex; align-items: center; justify-content: center; z-index: 1000;
    }
    .dialog-box {
      background: #fff; border-radius: 10px; width: 480px; max-width: 95vw;
      box-shadow: 0 20px 60px rgba(0,0,0,.2);
    }
    .dialog-box-wide { width: 600px; }
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
    .field-group { display: flex; flex-direction: column; gap: 6px; }
    .field-group label { font-size: .8rem; font-weight: 600; color: var(--db-text-secondary); }
    .req { color: #B91C1C; }
    .field-input {
      border: 1px solid var(--db-border); border-radius: 6px;
      padding: 9px 12px; font-size: .875rem; color: var(--db-text);
      outline: none; font-family: inherit; background: #fff;
      &:focus { border-color: var(--db-navy); }
    }
    .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .field-textarea { resize: vertical; min-height: 72px; }
    .field-select { appearance: auto; }
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
    .loading-hint { font-size: .82rem; color: var(--db-text-secondary); margin: 0; padding: 8px 0; }
    .info-assign {
      display: flex; align-items: center; gap: 8px;
      background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 6px;
      padding: 10px 14px; font-size: .875rem; color: #1E40AF;
      mat-icon { font-size: 1.1rem; width: 18px; height: 18px; flex-shrink: 0; }
    }
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

    /* Danger button */
    .actions-spacer { flex: 1; }
    .btn-action.danger {
      color: #B91C1C; border-color: #FECACA;
      &:hover { background: #FEE2E2; }
      &:disabled { opacity: .5; cursor: not-allowed; }
      mat-icon { font-size: 1rem; width: 16px; height: 16px; }
    }

    /* Archives */
    .archives-section { margin-top: 32px; border-top: 1px solid var(--db-border); padding-top: 16px; }
    .archives-toggle {
      display: flex; align-items: center; gap: 8px;
      background: none; border: none; cursor: pointer;
      font-size: .9rem; font-weight: 600; color: var(--db-text-secondary);
      padding: 6px 0; border-radius: 4px;
      &:hover { color: var(--db-text); }
      mat-icon { font-size: 1.1rem; width: 18px; height: 18px; }
      .toggle-chevron { margin-left: auto; }
    }
    .archives-count {
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--db-navy); color: #fff;
      font-size: .72rem; font-weight: 700;
      padding: 1px 7px; border-radius: 10px;
    }
    .archives-loading { display: flex; justify-content: center; padding: 24px; }
    .archives-empty { color: var(--db-text-secondary); font-size: .85rem; padding: 12px 0; }
    .archives-list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
    .archive-card {
      border: 1px solid var(--db-border); border-radius: 8px;
      padding: 12px 16px; background: #FAFBFC;
    }
    .archive-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 6px; flex-wrap: wrap; gap: 6px;
    }
    .archive-meta { display: flex; align-items: center; gap: 10px; }
    .archive-date {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: .78rem; color: var(--db-text-secondary);
      mat-icon { font-size: .85rem; width: 14px; height: 14px; }
    }
    .archive-by { font-size: .75rem; color: var(--db-text-secondary); }
    .archive-badges { display: flex; gap: 6px; }
    .arc-indice {
      font-size: .75rem; font-weight: 700;
      background: var(--db-navy); color: #fff;
      padding: 1px 8px; border-radius: 10px;
    }
    .arc-statut {
      font-size: .75rem; font-weight: 600;
      background: #F3F4F6; color: var(--db-text-secondary);
      padding: 1px 8px; border-radius: 10px;
    }
    .archive-body {
      display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
    }
    .arc-nom { font-size: .85rem; font-weight: 500; color: var(--db-text); }
    .arc-versions, .arc-fichiers {
      display: inline-flex; align-items: center; gap: 3px;
      font-size: .75rem; color: var(--db-text-secondary);
      mat-icon { font-size: .8rem; width: 12px; height: 12px; }
    }
  `]
})
export class PlanDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private planSvc = inject(PlanService);
  private controleSvc = inject(ControleService);
  private userSvc = inject(UserService);
  private auth = inject(AuthService);
  private snack = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  plan = signal<Plan | null>(null);
  controles = signal<Controle[]>([]);
  controleurs = signal<UtilisateurDto[]>([]);
  archives = signal<PlanArchive[]>([]);
  loading = signal(true);
  loadingControleurs = signal(false);
  loadingArchives = signal(false);
  showVersionDialog = signal(false);
  showControleDialog = signal(false);
  showEditDialog = signal(false);
  showArchives = signal(false);
  submitting = signal(false);
  submittingControle = signal(false);
  submittingEdit = signal(false);
  deletingPlan = signal(false);
  selectedVersionFile = signal<File | null>(null);
  projeteurs = signal<UtilisateurDto[]>([]);
  loadingProjeteurs = signal(false);

  readonly STATUT_PLAN = STATUT_PLAN;
  readonly getStatutPlan = getStatutPlan;
  readonly TYPE_PLAN = TYPE_PLAN;
  readonly DECISION_META = DECISION_META;
  readonly TYPE_CONTROLE_META = TYPE_CONTROLE_META;

  /** Pipeline visuel du workflow BTP (CLAUDE-METIER.md §3). */
  readonly statutSteps = [
    { key: 'BROUILLON'             as const, step: 0, label: 'Brouillon',     role: 'Projeteur'    },
    { key: 'EMIS'                  as const, step: 1, label: 'Émis',          role: 'Émetteur'     },
    { key: 'EN_CONTROLE_INTERNE'   as const, step: 2, label: 'Ctrl Interne',  role: 'Ctrl. CI'     },
    { key: 'EN_CONTROLE_EXTERNE'   as const, step: 3, label: 'Ctrl Externe',  role: 'Bureau Ctrl.' },
    { key: 'EN_CONTROLE_TECHNIQUE' as const, step: 4, label: 'Ctrl Technique',role: 'Tech.'        },
    { key: 'VISE'                  as const, step: 5, label: 'Visé ✓',        role: 'Resp. Visa'   },
  ];

  versionForm = this.fb.group({
    commentaire: [''],
  });

  controleForm = this.fb.group({
    typeControle: ['CONTROLE_INTERNE'],
    controleurId: [''],
  });

  planEditForm = this.fb.group({
    nom:            ['', Validators.required],
    typePrestation: ['PDB', Validators.required],
    auteur:         [''],
    niveau:         [''],
    lot:            [''],
    nombrePlanches: [null as number | null],
    dateEngagement: [''],
    projeteurId:    [''],
  });

  get userId(): string { return this.auth.currentUser()?.userId ?? ''; }
  get role(): string { return this.auth.userRole() ?? ''; }
  isAdmin(): boolean { return this.role === 'ADMIN'; }
  /** L'utilisateur connecté est lui-même contrôleur → auto-assigné */
  isControle(): boolean {
    return this.role === 'CONTROLEUR_INTERNE' || this.role === 'CONTROLEUR_EXTERNE';
  }

  /** Peut émettre : plan en BROUILLON, rôle EMETTEUR ou PROJETEUR */
  canEmettre(p: Plan): boolean {
    return p.statut === 'BROUILLON' && ['EMETTEUR', 'PROJETEUR', 'ADMIN'].includes(this.role);
  }

  /** Peut soumettre au contrôle interne : plan EMIS, rôle EMETTEUR */
  canSoumettre(p: Plan): boolean {
    return p.statut === 'EMIS' && ['EMETTEUR', 'PROJETEUR', 'ADMIN'].includes(this.role);
  }

  /** Peut créer une nouvelle version : plan BROUILLON (après VAO) */
  canAddVersion(p: Plan): boolean {
    return p.statut === 'BROUILLON' && ['PROJETEUR', 'EMETTEUR', 'ADMIN'].includes(this.role);
  }

  /** Peut créer un contrôle : ADMIN, CHEF_PROJET, EMETTEUR uniquement */
  canControler(p: Plan): boolean {
    if (!['EN_CONTROLE_INTERNE', 'EN_CONTROLE_EXTERNE', 'EN_CONTROLE_TECHNIQUE'].includes(p.statut)) {
      return false;
    }
    return ['ADMIN', 'CHEF_PROJET', 'EMETTEUR'].includes(this.role);
  }

  fileIcon(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'picture_as_pdf';
    if (ext === 'doc' || ext === 'docx') return 'description';
    if (ext === 'xls' || ext === 'xlsx') return 'table_chart';
    if (ext === 'dwg') return 'architecture';
    return 'insert_drive_file';
  }

  hasVAO(): boolean {
    return this.controles().some(c => c.decision === 'VAO');
  }

  canDecide(c: Controle): boolean {
    if (c.decision !== 'EN_ATTENTE') return false;
    if (this.role === 'ADMIN') return true;
    return c.controleurId === this.userId;
  }

  /** Prochain indice pour l'affichage dans le bouton Émettre */
  nextIndice(p: Plan): string {
    const emis = p.versions.filter(v => v.indice !== '-').length;
    return emis === 0 ? 'A' : String.fromCharCode('A'.charCodeAt(0) + emis);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.planSvc.getById(id).subscribe({
      next: p => { this.plan.set(p); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
    this.controleSvc.getByPlan(id).subscribe({
      next: cs => this.controles.set(cs),
      error: () => {}
    });
  }

  controlesByVersion(versionId: string): Controle[] {
    return this.controles().filter(c => c.versionId === versionId);
  }

  versionLabel(versionId: string | undefined): string {
    if (!versionId) return '—';
    const v = this.plan()?.versions.find(x => x.idVersion === versionId);
    return v ? `v${v.numeroVersion} (${v.indice})` : versionId;
  }

  emettre(): void {
    const id = this.plan()!.id;
    this.planSvc.emettre(id).subscribe({
      next: p => {
        this.plan.set(p);
        const indice = p.derniereVersion?.indice ?? 'A';
        this.snack.open(`Plan émis officiellement — Indice ${indice}`, 'OK', { duration: 3000 });
      },
      error: (err) => this.snack.open(
        err?.error?.message ?? 'Erreur lors de l\'émission', 'Fermer', { duration: 4000 })
    });
  }

  soumettre(): void {
    const id = this.plan()!.id;
    this.planSvc.soumettre(id).subscribe({
      next: p => { this.plan.set(p); this.snack.open('Plan soumis au contrôle interne', 'OK', { duration: 3000 }); },
      error: (err) => this.snack.open(
        err?.error?.message ?? 'Erreur lors de la soumission', 'Fermer', { duration: 4000 })
    });
  }

  openVersionDialog(): void {
    this.versionForm.reset();
    this.selectedVersionFile.set(null);
    this.showVersionDialog.set(true);
  }
  closeVersionDialog(): void {
    this.showVersionDialog.set(false);
    this.selectedVersionFile.set(null);
  }

  onVersionFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedVersionFile.set(input.files[0]);
    }
  }

  submitVersion(): void {
    this.submitting.set(true);
    const v = this.versionForm.value;
    const planId = this.plan()!.id;

    const doAddVersion = (fichierUrl?: string) => {
      this.planSvc.addVersion(planId, {
        commentaire: v.commentaire || undefined,
        fichierUrl,
      }).subscribe({
        next: p => {
          this.plan.set(p);
          this.snack.open('Nouvelle version créée', 'OK', { duration: 3000 });
          this.closeVersionDialog();
          this.submitting.set(false);
        },
        error: () => { this.snack.open('Erreur', 'Fermer', { duration: 4000 }); this.submitting.set(false); }
      });
    };

    const file = this.selectedVersionFile();
    if (file) {
      this.planSvc.uploadFile(file).subscribe({
        next: ({ fichierUrl }) => doAddVersion(fichierUrl),
        error: () => {
          this.snack.open('Erreur lors de l\'upload du fichier', 'Fermer', { duration: 4000 });
          this.submitting.set(false);
        }
      });
    } else {
      doAddVersion();
    }
  }

  /** Déduit le typeControle à partir du statut actuel du plan */
  private typeControleFromStatut(): string {
    const statut = this.plan()?.statut;
    if (statut === 'EN_CONTROLE_EXTERNE')   return 'CONTROLE_EXTERNE';
    if (statut === 'EN_CONTROLE_TECHNIQUE') return 'CONTROLE_TECHNIQUE';
    if (statut === 'EMIS')                  return 'VISA';
    return 'CONTROLE_INTERNE'; // EN_CONTROLE_INTERNE ou défaut
  }

  openControleDialog(): void {
    const defaultType = this.typeControleFromStatut();
    this.controleForm.reset({ typeControle: defaultType, controleurId: '' });
    this.controleurs.set([]);
    this.showControleDialog.set(true);

    this.loadingControleurs.set(true);
    forkJoin({
      internes: this.userSvc.getByRole('CONTROLEUR_INTERNE'),
      externes: this.userSvc.getByRole('CONTROLEUR_EXTERNE'),
    }).subscribe({
      next: ({ internes, externes }) => {
        this.controleurs.set([...internes, ...externes].filter(u => u.actif));
        this.loadingControleurs.set(false);
      },
      error: () => this.loadingControleurs.set(false),
    });
  }

  /** Filtre la liste des contrôleurs selon le typeControle sélectionné */
  getFilteredControleurs(): UtilisateurDto[] {
    const type = this.controleForm.value.typeControle;
    const list = this.controleurs();
    if (type === 'CONTROLE_INTERNE') return list.filter(u => u.role === 'CONTROLEUR_INTERNE');
    if (type === 'CONTROLE_EXTERNE') return list.filter(u => u.role === 'CONTROLEUR_EXTERNE');
    return list; // CONTROLE_TECHNIQUE / VISA → tous
  }
  closeControleDialog(): void { this.showControleDialog.set(false); }

  submitControle(): void {
    const f = this.controleForm.value;
    if (!f.controleurId) return;
    this.submittingControle.set(true);
    const p = this.plan()!;
    const payload: CreateControlePayload = {
      planId: p.id,
      versionId: p.derniereVersion?.idVersion,
      typeControle: f.typeControle as any,
      controleurId: f.controleurId,
      projeteurId: p.projeteurId,
    };
    this.controleSvc.create(payload).subscribe({
      next: c => {
        this.controles.update(list => [...list, c]);
        this.snack.open('Contrôle créé', 'OK', { duration: 3000 });
        this.closeControleDialog();
        this.submittingControle.set(false);
      },
      error: () => { this.snack.open('Erreur', 'Fermer', { duration: 4000 }); this.submittingControle.set(false); }
    });
  }

  decide(c: Controle, decision: 'VSO' | 'VAC' | 'VAO'): void {
    let remarque: string | undefined;
    if (decision === 'VAO') {
      remarque = prompt('Remarque obligatoire (observations à corriger) :') ?? undefined;
      if (!remarque?.trim()) {
        this.snack.open('La remarque est obligatoire pour VAO', 'Fermer', { duration: 4000 });
        return;
      }
    }
    const payload: DecisionPayload = { decision, remarque };
    this.controleSvc.applyDecision(c.id, payload).subscribe({
      next: updated => {
        this.controles.update(list => list.map(x => x.id === c.id ? updated : x));
        this.snack.open(`Avis ${decision} enregistré`, 'OK', { duration: 3000 });
        this.planSvc.getById(this.plan()!.id).subscribe(p => this.plan.set(p));
      },
      error: () => this.snack.open('Erreur', 'Fermer', { duration: 4000 })
    });
  }

  canDelete(p: Plan): boolean {
    if (p.statut === 'VISE') return false;
    return this.isAdmin() || p.creePar === this.userId;
  }

  deletePlan(): void {
    const p = this.plan();
    if (!p) return;
    if (!confirm(`Supprimer le plan "${p.nom}" ?\nUne archive sera conservée automatiquement.`)) return;

    this.deletingPlan.set(true);
    this.planSvc.delete(p.id).subscribe({
      next: () => {
        this.snack.open('Plan supprimé (archivé)', 'OK', { duration: 3000 });
        this.router.navigate(['/affaires', p.affaireId]);
      },
      error: (err) => {
        this.snack.open(err?.error?.message ?? 'Erreur lors de la suppression', 'Fermer', { duration: 4000 });
        this.deletingPlan.set(false);
      }
    });
  }

  canEdit(p: Plan): boolean {
    return p.statut === 'BROUILLON' &&
      ['ADMIN', 'CHEF_PROJET', 'PROJETEUR', 'EMETTEUR'].includes(this.role);
  }

  openEditDialog(): void {
    const p = this.plan()!;
    this.planEditForm.patchValue({
      nom:            p.nom,
      typePrestation: p.typePrestation ?? 'PDB',
      auteur:         p.auteur ?? '',
      niveau:         p.niveau ?? '',
      lot:            p.lot ?? '',
      nombrePlanches: p.nombrePlanches ?? null,
      dateEngagement: p.dateEngagement?.slice(0, 10) ?? '',
      projeteurId:    p.projeteurId ?? '',
    });
    this.loadingProjeteurs.set(true);
    this.userSvc.getByRole('PROJETEUR').subscribe({
      next: list => { this.projeteurs.set(list.filter(u => u.actif)); this.loadingProjeteurs.set(false); },
      error: () => this.loadingProjeteurs.set(false),
    });
    this.showEditDialog.set(true);
  }

  closeEditDialog(): void { this.showEditDialog.set(false); }

  submitEditPlan(): void {
    if (this.planEditForm.invalid) return;
    this.submittingEdit.set(true);
    const v = this.planEditForm.value;
    const payload: UpdatePlanPayload = {
      nom:            v.nom ?? undefined,
      typePrestation: (v.typePrestation as any) ?? undefined,
      auteur:         v.auteur || undefined,
      niveau:         v.niveau || undefined,
      lot:            v.lot || undefined,
      nombrePlanches: v.nombrePlanches ?? undefined,
      dateEngagement: v.dateEngagement || undefined,
      projeteurId:    v.projeteurId || undefined,
    };
    this.planSvc.update(this.plan()!.id, payload).subscribe({
      next: updated => {
        this.plan.set(updated);
        this.snack.open('Plan modifié', 'OK', { duration: 3000 });
        this.closeEditDialog();
        this.submittingEdit.set(false);
      },
      error: (err) => {
        this.snack.open(err?.error?.message ?? 'Erreur lors de la modification', 'Fermer', { duration: 4000 });
        this.submittingEdit.set(false);
      }
    });
  }

  toggleArchives(): void {
    if (this.showArchives()) {
      this.showArchives.set(false);
      return;
    }
    this.showArchives.set(true);
    if (this.archives().length) return; // déjà chargé
    this.loadingArchives.set(true);
    this.planSvc.getArchives(this.plan()!.id).subscribe({
      next: list => { this.archives.set(list); this.loadingArchives.set(false); },
      error: () => this.loadingArchives.set(false)
    });
  }
}
