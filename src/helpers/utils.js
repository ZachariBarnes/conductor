import { hash } from "./hash-helper";

export function slugify(str) {
  return str.toLowerCase().replace(/[\s]/gi, "-");
}

export function getResponseKey(section, prompt) {
  return hash(section + "-" + prompt);
}
