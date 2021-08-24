import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.query;
    const provider_id = req.user.id;
    
    const listAppointment = container.resolve(ListProviderAppointmentsService);
    
    const appointments = await listAppointment.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    })
  
    return res.json(classToClass(appointments));
  }
}