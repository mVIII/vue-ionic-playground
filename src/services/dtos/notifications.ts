export type Notification = {
  title: string;
  description: string;
  icon: string;
  color: string;
  goTo?: string;
};
export type NotificationCallback = (notifcation: Notification) => void;
