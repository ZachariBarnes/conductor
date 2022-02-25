import { hash } from "./hash-helper";

export function slugify(str) {
  // console.log(`Slugify: ${str}`);
  return str || str.toLowerCase().replace(/[\s]/gi, "-");
}

export function getResponseKey(section, prompt) {
  return hash(section + "-" + prompt);
}
