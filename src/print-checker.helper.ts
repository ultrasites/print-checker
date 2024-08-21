import { PDF, Image } from "./print-checker.types";

export function isPDF(imageOrPdf: Image | PDF): imageOrPdf is PDF {
  return !("dpi" in imageOrPdf);
}

export function isImage(imageOrPdf: Image | PDF): imageOrPdf is Image {
  return "dpi" in imageOrPdf;
}
