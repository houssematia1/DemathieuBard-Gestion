export type TypeNotification = 'EMAIL' | 'IN_APP' | 'BOTH';

export interface Notification {
  id: string;
  destinataireId: string;
  message: string;
  type: TypeNotification;
  lu: boolean;
  dateEnvoi: string;
  referenceEntite?: string;
  typeEntite?: string;
}
