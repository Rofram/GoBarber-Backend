import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";

type Message = ISendMailDTO

export default class FakeMailProvider implements IMailProvider {
  private Messages: Message[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.Messages.push(message);
  }
}