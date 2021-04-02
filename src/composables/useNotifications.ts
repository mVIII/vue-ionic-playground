import { Notification } from '@/services/dtos';

import { ref } from 'vue';

import { container } from 'tsyringe';
import { NotificationService } from '@/services/Notification';

export function useNotifications() {
  const notificationService = container.resolve<NotificationService>(
    'Notification'
  );

  const liveNotifications = ref<Notification[]>([]);

  function listenForNotifications(): void {
    notificationService.On('notification', (notification: Notification) => {
      liveNotifications.value.unshift(notification);
    });
  }

  return {
    listenForNotifications,
    liveNotifications,
  };
}
