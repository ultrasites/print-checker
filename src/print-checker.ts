import sharp from "sharp";
import * as fs from "fs";
import {
  ColorMode,
  Image,
  PDF,
  PrintCheckerRequirement,
} from "./print-checker.types";
import {
  InvalidPageCountException,
  MissingMetaDataException,
  WrongColorModeException,
  WrongDpiException,
  WrongHeightException,
  WrongWidthException,
} from "./print-checker.errors";
import { PDFDocument } from "pdf-lib";
import { exec } from "child_process";
import { isImage, isPDF } from "./print-checker.helper";

export async function checkImage(
  path: string,
  requirements: PrintCheckerRequirement
): Promise<true> {
  const { width, height, density, channels } = await sharp(path).metadata();

  if (!width || !height || !density || !channels) {
    throw new MissingMetaDataException();
  }

  validate(
    {
      colorMode: channels === 4 ? "CMYK" : "RGB",
      dpi: density,
      height,
      width,
    },
    requirements
  );

  return true;
}

export async function checkPDF(
  path: string,
  requirements: PrintCheckerRequirement
): Promise<true> {
  const fileBuffer = fs.readFileSync(path);
  const pdfDoc = await PDFDocument.load(fileBuffer);

  if (pdfDoc.getPageCount() > 1) {
    throw new InvalidPageCountException();
  }

  const page = pdfDoc.getPage(0);

  const { width, height } = page.getSize();
  const isCMYKinPDF = await isPDFColorModeCMYK(path);
  const colorMode: ColorMode = isCMYKinPDF ? "CMYK" : "RGB";

  if (!width || !height) {
    throw new MissingMetaDataException();
  }

  validate(
    {
      colorMode,
      height,
      width,
    },
    requirements
  );

  return true;
}

async function isPDFColorModeCMYK(path: string) {
  const gsCommand = `gs -o - -sDEVICE=inkcov "${path}"`;
  return new Promise<boolean>((resolve, reject) => {
    exec(gsCommand, (error, stdout, stderr) => {
      if (error) {
        throw new Error("PRINT_CHECKER_PDF_COLOR_MODE_ERROR");
      }
      if (stderr) {
        throw new Error("PRINT_CHECKER_PDF_COLOR_MODE_STDERR");
      }

      const lines = stdout.split("\n");
      lines.forEach((line) => {
        const match = line.match(
          /\s*(\d+\.\d+)\s+(\d+\.\d+)\s+(\d+\.\d+)\s+(\d+\.\d+)\s+(\d+\.\d+)/
        );
        if (match) {
          const [c, m, y, k] = match.slice(1, 5).map(parseFloat);
          return resolve(c > 0 || m > 0 || y > 0 || k > 0);
        }
        return reject();
      });
    });
  });
}

function validate(media: Image | PDF, requirements: PrintCheckerRequirement) {
  if (media.colorMode !== requirements.colorMode) {
    throw new WrongColorModeException();
  }

  if (isImage(media) && requirements.dpi) {
    if (media.dpi < requirements.dpi) {
      throw new WrongDpiException();
    }
  }

  if (media.height !== requirements.height) {
    throw new WrongHeightException();
  }

  if (media.width !== requirements.width) {
    throw new WrongWidthException();
  }
}
