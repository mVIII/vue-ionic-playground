import { NotificationCallback, Notification } from '../dtos';
import { NotificationService } from '../Notification';

export default class MockNotificationService implements NotificationService {
  callbackStore = new Map<string, NotificationCallback>();

  On(event: string, callback: NotificationCallback): void {
    this.callbackStore.set(event, callback);
  }
  async spam(): Promise<void> {
    const mockNotis: Notification[] = [
      {
        title: 'Βρισιες',
        description: 'Ο Κωνσταντίνος Πατίσκος βριζει και φωναζει',
        color: 'danger',
        icon:
          'https://www.brandwatch.com/wp-content/themes/brandwatch/src/core/endpoints/resize.php?image=uploads/brandwatch/troll.jpg&width=469',
      },
      {
        title: 'Criticaly Low stock',
        description: 'Criticaly low on tomatoes',
        color: 'danger',
        icon:
          'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg',
      },
      {
        title: 'Low stock',
        description: 'Criticaly low on asparagus',
        color: 'warning',
        icon:
          'https://hips.hearstapps.com/hmg-prod/images/delish-grilled-asparagus-1522951967.jpg',
      },
      {
        title: 'New items',
        description: 'New fish',
        color: 'light',
        icon:
          'https://api.time.com/wp-content/uploads/2019/11/fish-with-human-face-tik-tok-video.jpg',
      },
      {
        title: 'New items',
        description: 'New wine',
        color: 'light',
        icon:
          'https://www.greeceandgrapes.com/image/cache/catalog/Skouras/SkourasFleva-600x600.png',
      },
      {
        title: 'New items',
        description: 'New wine',
        color: 'light',
        icon:
          'https://www.oinognosia.wine/wp-content/uploads/2018/05/assyrtiko_santo5.jpg',
      },
    ];
    for (;;) {
      const callback = this.callbackStore.get('notification');
      if (callback) {
        callback(mockNotis[Math.floor(Math.random() * mockNotis.length)]);
      }
      await new Promise((resolve) => {
        setTimeout(resolve, Math.floor(Math.random() * 7000) + 2000);
      });
    }
  }
}
