/**
 * Types de plans BTP (CLAUDE-METIER.md §2).
 */
export type TypePlan = 'COF' | 'FER' | 'NCAL' | 'EXE' | 'SYN' | 'FND' | 'ARCH';

/**
 * Workflow complet des statuts d'un plan BTP (CLAUDE-METIER.md §3).
 * BROUILLON → EMIS → EN_CONTROLE_INTERNE → (BPE|BAO|A_MODIFIER)
 *                  → EN_CONTROLE_EXTERNE → (FAVORABLE|DEFAVORABLE)
 *                  → VISE
 */
export type StatutPlan =
  | 'BROUILLON'             // Le projeteur travaille encore
  | 'EMIS'                  // Émis officiellement (indice A, B, C…)
  | 'EN_CONTROLE_INTERNE'   // Le contrôleur interne examine
  | 'BON_POUR_EXECUTION'    // BPE — contrôle interne OK
  | 'BON_AVEC_OBSERVATIONS' // BAO — OK avec remarques mineures
  | 'A_MODIFIER'            // Refusé, corrections majeures (retour projeteur)
  | 'EN_CONTROLE_EXTERNE'   // Le bureau de contrôle externe examine
  | 'FAVORABLE'             // Contrôle externe OK
  | 'DEFAVORABLE'           // Contrôle externe refusé (retour projeteur)
  | 'VISE';                 // Visa appliqué — prêt pour le chantier

/**
 * Niveaux / zones d'un bâtiment (CLAUDE-METIER.md §2).
 */
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
  FND:  'Fondations',
  SS2:  'Sous-sol 2',
  SS1:  'Sous-sol 1',
  RDC:  'Rez-de-chaussée',
  ETG1: 'Étage 1',
  ETG2: 'Étage 2',
  ETG3: 'Étage 3',
  ETG4: 'Étage 4',
  ETG5: 'Étage 5',
  TER:  'Terrasse / Toiture',
  GEN:  'Général',
};

const STATUT_PLAN_FALLBACK = { label: 'Inconnu', color: '#6B7280', bg: '#F3F4F6', step: 0 };

/** step sert à calculer la progression dans le pipeline visuel */
export const STATUT_PLAN: Record<StatutPlan, { label: string; color: string; bg: string; step: number }> = {
  BROUILLON:             { label: 'Brouillon',              color: '#6B7280', bg: '#F3F4F6', step: 0 },
  EMIS:                  { label: 'Émis',                   color: '#1D4ED8', bg: '#EFF6FF', step: 1 },
  EN_CONTROLE_INTERNE:   { label: 'Contrôle interne',       color: '#B45309', bg: '#FFFBEB', step: 2 },
  BON_POUR_EXECUTION:    { label: 'BPE',                    color: '#15803D', bg: '#F0FDF4', step: 3 },
  BON_AVEC_OBSERVATIONS: { label: 'BAO',                    color: '#0E7490', bg: '#ECFEFF', step: 3 },
  A_MODIFIER:            { label: 'À modifier',             color: '#B91C1C', bg: '#FEF2F2', step: 2 },
  EN_CONTROLE_EXTERNE:   { label: 'Contrôle externe',       color: '#7C3AED', bg: '#F5F3FF', step: 4 },
  FAVORABLE:             { label: 'Favorable',              color: '#15803D', bg: '#F0FDF4', step: 5 },
  DEFAVORABLE:           { label: 'Défavorable',            color: '#B91C1C', bg: '#FEF2F2', step: 4 },
  VISE:                  { label: 'Visé ✓',                 color: '#065F46', bg: '#D1FAE5', step: 6 },
};

/** Retourne les métadonnées d'un statut — ne crashe jamais même avec un statut inconnu */
export function getStatutPlan(statut: string) {
  return (STATUT_PLAN as any)[statut] ?? STATUT_PLAN_FALLBACK;
}

export interface Version {
  idVersion: string;
  numeroVersion: number;
  indice: string;    // "-" (brouillon) | "A" | "B" | "C" …
  dateUpload: string;
  commentaire?: string;
  fichierUrl?: string;
  uploadePar: string;
}

export interface Plan {
  id: string;
  affaireId: string;
  nom: string;
  typePlan: TypePlan;
  niveau?: NiveauPlan;
  lot?: string;
  projeteurId?: string;
  emetteurId?: string;
  statut: StatutPlan;
  dateCreation: string;
  creePar: string;
  versions: Version[];
  derniereVersion?: Version;
  historique: any[];
}
