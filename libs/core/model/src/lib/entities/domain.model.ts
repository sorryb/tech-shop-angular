import { RequestStatus } from './request.model';

export interface DomainEntity<T> {
  domain: T;
  requestStatus: RequestStatus;
}
