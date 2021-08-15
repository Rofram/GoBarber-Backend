import IHashProvider from "../models/IHashProvider";
import { hash, compare } from 'bcryptjs';

export default class BCryptHashProvider implements IHashProvider {
    public async generateHash(password: string): Promise<string> {
        return hash(password, 8);
    }

    public async compareHash(password: string, hash: string): Promise<boolean> {
        return compare(password, hash);
    }
}