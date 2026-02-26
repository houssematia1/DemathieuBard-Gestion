export type Role =
  | 'ADMIN'
  | 'CHEF_PROJET'
  | 'PROJETEUR'
  | 'EMETTEUR'
  | 'CONTROLEUR_INTERNE'
  | 'CONTROLEUR_EXTERNE'
  | 'RESPONSABLE_VISA';

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN:               'Administrateur',
  CHEF_PROJET:         'Chef de Projet',
  PROJETEUR:           'Projeteur',
  EMETTEUR:            'Émetteur',
  CONTROLEUR_INTERNE:  'Contrôleur Interne',
  CONTROLEUR_EXTERNE:  'Contrôleur Externe',
  RESPONSABLE_VISA:    'Responsable Visa',
};

export interface UtilisateurDto {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: Role;
  actif: boolean;
  dateCreation: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  userId: string;
  email: string;
  nom: string;
  prenom: string;
  role: Role;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role?: Role;
}

export interface UpdateUserRequest {
  nom: string;
  prenom: string;
  email: string;
}

export interface UpdateRoleRequest {
  role: Role;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
