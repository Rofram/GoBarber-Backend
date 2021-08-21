import { getHours,isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentRepository';


interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentRepository') private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({ provider_id, year, month, day }: Request): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day
    });

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const isAfterCurrentDate = isAfter(new Date(year, month - 1, day, hour), currentDate);

      return {
        hour,
        available: !hasAppointmentInHour && isAfterCurrentDate,
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService

