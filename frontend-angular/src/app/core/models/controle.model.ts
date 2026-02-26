export type TypeControle = 'INTERNE' | 'EXTERNE';

/**
 * Décisions du contrôle BTP (CLAUDE-METIER.md §3 & §5).
 *
 * Contrôle INTERNE : BPE | BAO | A_MODIFIER
 * Contrôle EXTERNE : FAVORABLE | DEFAVORABLE
 */
export type Decision =
  | 'EN_ATTENTE'
  | 'BPE'          // Bon Pour Exécution (interne OK)
  | 'BAO'          // Bon Avec Observations (interne OK avec remarques)
  | 'A_MODIFIER'   // Rejeté par l'interne — corrections majeures
  | 'FAVORABLE'    // Contrôle externe OK
  | 'DEFAVORABLE'; // Contrôle externe refusé

export const DECISION_META: Record<Decision, { label: string; color: string; icon: string; bg: string }> = {
  EN_ATTENTE:  { label: 'En attente',          color: '#B45309', icon: 'hourglass_empty', bg: '#FFFBEB' },
  BPE:         { label: 'Bon Pour Exécution',  color: '#15803D', icon: 'check_circle',    bg: '#F0FDF4' },
  BAO:         { label: 'Bon Avec Observations',color: '#0E7490', icon: 'task_alt',        bg: '#ECFEFF' },
  A_MODIFIER:  { label: 'À modifier',          color: '#B91C1C', icon: 'edit',            bg: '#FEF2F2' },
  FAVORABLE:   { label: 'Favorable',           color: '#15803D', icon: 'verified',        bg: '#F0FDF4' },
  DEFAVORABLE: { label: 'Défavorable',         color: '#B91C1C', icon: 'cancel',          bg: '#FEF2F2' },
};

export interface Commentaire {
  auteurId: string;
  contenu: string;
  date: string;
}

export interface Controle {
  id: string;
  planId: string;
  versionId: string;
  typeControle: TypeControle;
  controleurId: string;
  dateControle: string;
  decision: Decision;
  remarque?: string;
  commentaires: Commentaire[];
}
