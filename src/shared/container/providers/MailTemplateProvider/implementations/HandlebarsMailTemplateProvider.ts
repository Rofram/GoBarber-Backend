import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplateProvider from "../models/IMailTemplateProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

export default class HandlebarsMailTemplateProvider implements  IMailTemplateProvider {

  public async parseTemplate({ 
    file, 
    vars 
  }: IParseMailTemplateDTO): Promise<string> {
    const template = fs.readFileSync(file, 'utf8');

    const parseTemplate = handlebars.compile(template);

    return parseTemplate(vars);
  }
}