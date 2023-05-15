export interface RequestStatus {
  status: 'NEW' | 'PENDING' | 'ERROR' | 'COMPLETED';
  error?: {
    code?: number;
    message?: string;
  };
}
