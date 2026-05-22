import { readFileSync } from "fs";
import path from "path";

const htmlTemplate = (url: string): string =>
  readFileSync(path.join(__dirname, url)).toString();

export const template = {
  contactEntryEmailTemplate: htmlTemplate("./contactEntryEmailTemplate.html"),
  adminContactEntryEmailTemplate: htmlTemplate(
    "./adminContactEntryEmailTemplate.html"
  ),
};
