/**
 * Types de contrôle BTP.
 */
export type TypeControle = 'CONTROLE_INTERNE' | 'CONTROLE_EXTERNE' | 'CONTROLE_TECHNIQUE' | 'VISA';

/**
 * Avis du contrôleur (s'applique à tous les types de contrôle).
 * VSO : Visa Sans Observation — approuvé
 * VAC : Visa Avec Commentaire — approuvé avec commentaires mineurs
 * VAO : Visa Avec Observation — corrections majeures requises
 *
 * Règle clé : typeControle=VISA + VSO/VAC → plan.etat = VISE_BPE
 */
export type Decision = 'EN_ATTENTE' | 'VSO' | 'VAC' | 'VAO';

export const TYPE_CONTROLE_META: Record<TypeControle, { label: string; color: string; bg: string; icon: string }> = {
  CONTROLE_INTERNE:   { label: 'Contrôle interne',   color: '#B45309', bg: '#FFFBEB', icon: 'manage_search' },
  CONTROLE_EXTERNE:   { label: 'Contrôle externe',   color: '#7C3AED', bg: '#F5F3FF', icon: 'verified_user' },
  CONTROLE_TECHNIQUE: { label: 'Contrôle technique', color: '#0E7490', bg: '#ECFEFF', icon: 'engineering' },
  VISA:               { label: 'Visa',               color: '#065F46', bg: '#D1FAE5', icon: 'approval' },
};

export const DECISION_META: Record<Decision, { label: string; color: string; icon: string; bg: string }> = {
  EN_ATTENTE: { label: 'En attente',              color: '#B45309', icon: 'hourglass_empty', bg: '#FFFBEB' },
  VSO:        { label: 'VSO — Sans observation', color: '#15803D', icon: 'check_circle',    bg: '#F0FDF4' },
  VAC:        { label: 'VAC — Avec commentaire', color: '#0E7490', icon: 'task_alt',        bg: '#ECFEFF' },
  VAO:        { label: 'VAO — Avec observation', color: '#B91C1C', icon: 'edit_note',       bg: '#FEF2F2' },
};

export interface Commentaire {
  auteurId: string;
  contenu: string;
  date: string;
}

export interface Controle {
  id: string;
  reference?: string;
  planId: string;
  versionId?: string;
  indiceExterneImpacte?: string;
  typeControle: TypeControle;
  controleurId: string;
  projeteurId?: string;
  dateControle: string;
  decision: Decision;
  remarque?: string;
  fichierPDF?: string;
  commentaires: Commentaire[];
}
