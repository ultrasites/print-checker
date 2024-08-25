import { describe, expect, it } from "vitest";
import { checkImage } from "./print-checker";
import { PrintCheckerRequirement } from "./print-checker.types";
import path from "path";
import {
  WrongColorModeException,
  WrongDpiException,
  WrongHeightException,
  WrongWidthException,
} from "./print-checker.errors";

const fixturesPath = path.join(__dirname, "/__fixtures");

describe("Image", () => {
  it("should check image [true]", async () => {
    const requirement: PrintCheckerRequirement = {
      colorMode: "CMYK",
      height: 148,
      width: 105,
      dpi: 300,
    };
    const imagePath = `${fixturesPath}/flyer_cmyk.jpg`;

    const response = await checkImage(imagePath, requirement);

    expect(response).toBeTruthy();
  });

  it("should check image and throw an exception [wrong color mode]", async () => {
    const requirement: PrintCheckerRequirement = {
      colorMode: "RGB",
      height: 154,
      width: 111,
      dpi: 300,
    };
    const imagePath = `${fixturesPath}/flyer_cmyk.jpg`;

    await expect(checkImage(imagePath, requirement)).rejects.toThrow(
      WrongColorModeException
    );
  });

  it("should check image and throw an exception [wrong height]", async () => {
    const requirement: PrintCheckerRequirement = {
      colorMode: "CMYK",
      height: 10,
      width: 111,
      dpi: 300,
    };
    const imagePath = `${fixturesPath}/flyer_cmyk.jpg`;

    await expect(checkImage(imagePath, requirement)).rejects.toThrow(
      WrongHeightException
    );
  });

  it("should check image and throw an exception [wrong width]", async () => {
    const requirement: PrintCheckerRequirement = {
      colorMode: "CMYK",
      height: 148,
      width: 10,
      dpi: 300,
    };
    const imagePath = `${fixturesPath}/flyer_cmyk.jpg`;

    await expect(checkImage(imagePath, requirement)).rejects.toThrow(
      WrongWidthException
    );
  });

  it("should check image and throw an exception [wrong dpi]", async () => {
    const requirement: PrintCheckerRequirement = {
      colorMode: "CMYK",
      height: 148,
      width: 105,
      dpi: 72,
    };
    const imagePath = `${fixturesPath}/flyer_cmyk.jpg`;

    await expect(checkImage(imagePath, requirement)).rejects.toThrow(
      WrongDpiException
    );
  });
});
