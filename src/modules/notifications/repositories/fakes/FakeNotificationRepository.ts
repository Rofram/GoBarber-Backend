import { ObjectId } from 'mongodb';

import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';


import Notification from '../../infra/typeorm/schemas/notification';



class NotificationsRepository implements INotificationRepository {
  private notifications: Notification[] = [];


  public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectId(),
      content,
      recipient_id,
    });

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;