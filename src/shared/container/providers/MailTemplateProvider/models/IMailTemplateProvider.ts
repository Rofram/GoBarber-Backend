import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

export default interface IMailTemplateProvider {
  parseTemplate(data: IParseMailTemplateDTO): Promise<string>;
}