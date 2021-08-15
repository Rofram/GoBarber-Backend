import { v4 as uuid } from 'uuid';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';


class FakerUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(x => x.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(x => x.email === email);

    return user;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { 
      id: uuid(),
      name, 
      email, 
      password 
    });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findUser = this.users.findIndex(x => x.id === user.id);

    this.users[findUser] = user;

    return user;
  }
}

export default FakerUsersRepository;