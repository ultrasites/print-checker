import { Image } from "./print-checker.types";

export function pxToMm(input: number, dpi = 72) {
  return (input * 25.4) / dpi;
}
