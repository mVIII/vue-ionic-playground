import { NotificationCallback } from './dtos';

export interface NotificationService {
  On(event: string, callback: NotificationCallback): void;
}
