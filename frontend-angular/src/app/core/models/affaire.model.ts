/**
 * Statuts du cycle de vie d'une affaire BTP (CLAUDE-METIER.md §1).
 * EN_PREPARATION → EN_COURS → EN_ARRET (temporaire) → TERMINEE
 *                                   ↓
 *                               ANNULEE
 */
export type StatutAffaire = 'EN_PREPARATION' | 'EN_COURS' | 'EN_ARRET' | 'TERMINEE' | 'ANNULEE';

export const STATUT_AFFAIRE: Record<StatutAffaire, { label: string; color: string; bg: string }> = {
  EN_PREPARATION: { label: 'En préparation', color: '#1D4ED8', bg: '#EFF6FF' },
  EN_COURS:       { label: 'En cours',       color: '#15803D', bg: '#F0FDF4' },
  EN_ARRET:       { label: 'En arrêt',       color: '#B45309', bg: '#FFFBEB' },
  TERMINEE:       { label: 'Terminée',        color: '#065F46', bg: '#D1FAE5' },
  ANNULEE:        { label: 'Annulée',         color: '#6B7280', bg: '#F3F4F6' },
};

export interface HistoriqueEntry {
  action: string;
  date: string;
  utilisateurId: string;
  details: string;
}

export interface Affaire {
  id: string;
  reference: string;
  nom: string;
  description?: string;
  client?: string;       // Maître d'ouvrage
  localisation?: string; // Ville / adresse du chantier
  chefProjetId?: string; // userId du chef de projet
  dateDebut: string;
  dateFin?: string;
  statut: StatutAffaire;
  creePar: string;
  dateCreation: string;
  dateDerniereModification: string;
  historique: HistoriqueEntry[];
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
