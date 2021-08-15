import UserToken from "../infra/typeorm/entities/UserToken";

export default interface IUserTokensRepository {
  generateToken(userId: string): Promise<UserToken>;
}