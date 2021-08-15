import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointment: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findByDate = this.appointment.find(appointment => 
      isEqual(appointment.date, date)
    );

    return findByDate;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, date });

    this.appointment.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;