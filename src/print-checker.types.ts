export type ColorMode = "RGB" | "CMYK";

export interface Media {
  width: number;
  height: number;
  dpi: number;
  colorMode: ColorMode;
}

export type Image = Media;
export type PrintCheckerRequirement = Media;
