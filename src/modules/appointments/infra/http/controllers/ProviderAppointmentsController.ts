import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.body;
    const provider_id = req.user.id;
    
    const listAppointment = container.resolve(ListProviderAppointmentsService);
    
    const appointments = await listAppointment.execute({
      provider_id,
      year,
      month,
      day,
    })
  
    return res.json(appointments);
  }
}