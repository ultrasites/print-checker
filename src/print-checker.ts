import sharp from "sharp";
import { Image, PrintCheckerRequirement } from "./print-checker.types";
import {
  MissingMetaDataException,
  WrongColorModeException,
  WrongDpiException,
  WrongHeightException,
  WrongWidthException,
} from "./print-checker.errors";
import { pxToMm } from "./print-checker.helper";

export async function checkImage(
  path: string,
  requirements: PrintCheckerRequirement
): Promise<true> {
  const { width, height, density, space } = await sharp(path).metadata();

  if (!width || !height || !density || !space) {
    throw new MissingMetaDataException();
  }

  validate(
    {
      colorMode: space === "cmyk" ? "CMYK" : "RGB",
      dpi: density,
      height,
      width,
    },
    requirements
  );

  return true;
}

function validate(media: Image, requirements: PrintCheckerRequirement) {
  const convertedHeight = Math.round(pxToMm(media.height, media.dpi));
  const convertedWidth = Math.round(pxToMm(media.width, media.dpi));

  if (media.colorMode !== requirements.colorMode) {
    throw new WrongColorModeException(`${media.colorMode}`);
  }

  if (media.dpi !== requirements.dpi) {
    throw new WrongDpiException(`${media.dpi}`);
  }

  if (convertedHeight !== requirements.height) {
    throw new WrongHeightException(`${convertedHeight}`);
  }

  if (convertedWidth !== requirements.width) {
    throw new WrongWidthException(`${convertedWidth}`);
  }
}
