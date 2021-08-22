import ICreateNotificationDTO from "../dtos/ICreateNotificationDTO";
import Notification from "../infra/typeorm/schemas/notification";

export default interface INotificationRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}