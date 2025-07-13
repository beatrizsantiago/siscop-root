import { DocumentSnapshot } from 'firebase/firestore';
import Notification from '@domain/entities/Notification';

export interface NotificationRepository {
  getAllPaginated(lastDoc?: DocumentSnapshot): Promise<{
    list: Notification[];
    lastDoc?: DocumentSnapshot;
    hasMore: boolean;
  }>;
};