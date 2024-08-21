export type ColorMode = "RGB" | "CMYK";

export interface Media {
  width: number;
  height: number;
  dpi: number;
  colorMode: ColorMode;
}

export type Image = Media;
export type PDF = Pick<Media, "colorMode" | "height" | "width">;
export type PrintCheckerRequirement = Pick<
  Media,
  "colorMode" | "height" | "width"
> & { dpi?: number };
