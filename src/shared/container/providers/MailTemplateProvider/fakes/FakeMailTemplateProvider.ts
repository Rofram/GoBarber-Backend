import IMailTemplateProvider from "../models/IMailTemplateProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

export default class FakeMailTemplateProvider implements  IMailTemplateProvider {

  public async parseTemplate({ file }: IParseMailTemplateDTO): Promise<string> {
    return 'mail content';
  }
}