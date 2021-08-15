import IHashProvider from "../models/IHashProvider";

export default class FakerHashProvider implements IHashProvider {
    public async generateHash(password: string): Promise<string> {
        return password;
    }

    public async compareHash(password: string, hash: string): Promise<boolean> {
        return password === hash;
    }
}