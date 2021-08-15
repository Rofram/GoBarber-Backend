import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(fakeAppointmentRepository);

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '15648979',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('15648979');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(fakeAppointmentRepository);

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '15648979',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '15648979',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});