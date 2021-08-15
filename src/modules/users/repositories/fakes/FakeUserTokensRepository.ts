import { v4 as uuid } from 'uuid';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '../../infra/typeorm/entities/UserToken';


class UsersRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generateToken(userId: string): Promise<UserToken> {
    const userToken = new UserToken();
    
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id: userId,
    });

    this.userTokens.push(userToken);

    return userToken; 
  }
}

export default UsersRepository;