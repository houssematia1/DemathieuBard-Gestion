/**
 * Types de plans BTP.
 */
export type TypePlan = 'COF' | 'FER' | 'NCAL' | 'EXE' | 'SYN' | 'FND' | 'ARCH';

/**
 * Type de prestation.
 * PDB — Prestation De Base (contractuelle)
 * PS  — Prestation Supplémentaire (avenant)
 */
export type TypePrestation = 'PDB' | 'PS';

/**
 * Statut technique dans le workflow de contrôle.
 * BROUILLON → EMIS → EN_CONTROLE_* → VISE
 */
export type StatutPlan =
  | 'BROUILLON'
  | 'EMIS'
  | 'EN_CONTROLE_INTERNE'
  | 'EN_CONTROLE_EXTERNE'
  | 'EN_CONTROLE_TECHNIQUE'
  | 'VISE';

/**
 * État de production du plan (perspective chantier).
 * NON_COMMENCE → EN_COURS → VISE_BPE
 * VISE_BPE : déclenché automatiquement par un contrôle VISA avec avis VSO ou VAC.
 */
export type EtatPlan = 'NON_COMMENCE' | 'EN_COURS' | 'VISE_BPE';

export type NiveauPlan = 'FND' | 'SS2' | 'SS1' | 'RDC' | 'ETG1' | 'ETG2' | 'ETG3' | 'ETG4' | 'ETG5' | 'TER' | 'GEN';

export const TYPE_PLAN: Record<TypePlan, { label: string; color: string; bg: string }> = {
  COF:  { label: 'Coffrage',        color: '#92400E', bg: '#FEF3C7' },
  FER:  { label: 'Ferraillage',     color: '#1E40AF', bg: '#DBEAFE' },
  NCAL: { label: 'Note de calcul',  color: '#5B21B6', bg: '#EDE9FE' },
  EXE:  { label: 'Exécution',       color: '#065F46', bg: '#D1FAE5' },
  SYN:  { label: 'Synthèse',        color: '#831843', bg: '#FCE7F3' },
  FND:  { label: 'Fondation',       color: '#7C3AED', bg: '#F5F3FF' },
  ARCH: { label: 'Architecture',    color: '#0E7490', bg: '#E0F2FE' },
};

export const NIVEAU_PLAN: Record<NiveauPlan, string> = {
  FND:  'Fondations', SS2: 'Sous-sol 2', SS1: 'Sous-sol 1',
  RDC:  'Rez-de-chaussée', ETG1: 'Étage 1', ETG2: 'Étage 2',
  ETG3: 'Étage 3', ETG4: 'Étage 4', ETG5: 'Étage 5',
  TER:  'Terrasse / Toiture', GEN: 'Général',
};

const STATUT_PLAN_FALLBACK = { label: 'Inconnu', color: '#6B7280', bg: '#F3F4F6', step: 0 };

export const STATUT_PLAN: Record<StatutPlan, { label: string; color: string; bg: string; step: number }> = {
  BROUILLON:             { label: 'Brouillon',           color: '#6B7280', bg: '#F3F4F6', step: 0 },
  EMIS:                  { label: 'Émis',                color: '#1D4ED8', bg: '#EFF6FF', step: 1 },
  EN_CONTROLE_INTERNE:   { label: 'Contrôle interne',    color: '#B45309', bg: '#FFFBEB', step: 2 },
  EN_CONTROLE_EXTERNE:   { label: 'Contrôle externe',    color: '#7C3AED', bg: '#F5F3FF', step: 3 },
  EN_CONTROLE_TECHNIQUE: { label: 'Contrôle technique',  color: '#0E7490', bg: '#ECFEFF', step: 4 },
  VISE:                  { label: 'Visé ✓',              color: '#065F46', bg: '#D1FAE5', step: 5 },
};

export const ETAT_PLAN: Record<EtatPlan, { label: string; color: string; bg: string; icon: string }> = {
  NON_COMMENCE: { label: 'Non commencé', color: '#6B7280', bg: '#F3F4F6', icon: 'radio_button_unchecked' },
  EN_COURS:     { label: 'En cours',     color: '#1D4ED8', bg: '#EFF6FF', icon: 'pending' },
  VISE_BPE:     { label: 'Visé BPE',    color: '#065F46', bg: '#D1FAE5', icon: 'verified' },
};

export function getStatutPlan(statut: string) {
  return (STATUT_PLAN as any)[statut] ?? STATUT_PLAN_FALLBACK;
}

export interface Version {
  idVersion: string;
  numeroVersion: number;
  indice: string;    // "-" | "A" | "B" | "C" …
  dateUpload: string;
  commentaire?: string;
  fichierUrl?: string;
  uploadePar: string;
}

export interface Plan {
  id: string;
  numeroPlan?: string;
  affaireId: string;
  nom: string;
  typePlan: TypePlan;
  typePrestation?: TypePrestation;
  niveau?: NiveauPlan;
  lot?: string;
  auteur?: string;
  projeteurId?: string;
  emetteurId?: string;
  nombrePlanches?: number;
  dateEngagement?: string;
  indiceInterne?: string;
  indiceExterne?: string;
  statut: StatutPlan;
  etat: EtatPlan;
  archived: boolean;
  dateCreation: string;
  creePar: string;
  fichiers: string[];
  versions: Version[];
  derniereVersion?: Version;
  historique: any[];
}

export interface PlanArchive {
  id: string;
  planId: string;
  dateArchive: string;
  modifiePar: string;
  numeroPlan?: string;
  nom: string;
  typePlanStr?: string;
  typePrestationStr?: string;
  indiceInterne?: string;
  indiceExterne?: string;
  statutStr?: string;
  etatStr?: string;
  fichiers: string[];
  versions: Version[];
}
