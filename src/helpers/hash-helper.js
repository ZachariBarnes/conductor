import Hashids from "hashids";

export const generator = new Hashids();

export function hash(string) {
  const parts = string.split("").map(c => c.codePointAt(0));
  return generator.encode(parts);
}
