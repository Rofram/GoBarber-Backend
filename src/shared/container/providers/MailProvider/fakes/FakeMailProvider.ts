import IMailProvider from "../models/IMailProvider";

interface Message {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private Messages: Message[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.Messages.push({ to, body });
  }
}