import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";

import User from '../models/User';
import { Subject } from 'typeorm/persistence/Subject';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.')
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.')
    }

    // experiência | segurança

    const token = sign({}, "bae4c743be1a99db8efa3e706b3b3f4c",{
      subject: user.id,
      expiresIn: '1d',
    })

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService;