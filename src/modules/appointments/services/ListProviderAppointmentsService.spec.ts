import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(fakeAppointmentsRepository);
  });

  it('should be able to show a list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 14, 0, 0),
      user_id: 'user-id',
      provider_id: 'provider',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 16, 0, 0),
      user_id: 'user-id',
      provider_id: 'provider',
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([
      appointment1,
      appointment2 
    ]);
  });
})