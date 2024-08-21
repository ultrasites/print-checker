import { describe, expect, it } from "vitest";
import { checkImage } from "./print-checker";
import { PrintCheckerRequirement } from "./print-checker.types";
import path from "path";
import {
  WrongColorModeException,
  WrongHeightException,
} from "./print-checker.errors";

const fixturesPath = path.join(__dirname, "/__fixtures");

describe("Image", () => {
  it("should check image [true]", async () => {
    const requirement: PrintCheckerRequirement = {
      colorMode: "RGB",
      height: 862,
      width: 1453,
      dpi: 72,
    };
    const imagePath = `${fixturesPath}/ultra-sites.png`;

    const response = await checkImage(imagePath, requirement);

    expect(response).toBeTruthy();
  });

  it("should check image [wrong color mode]", async () => {
    const requirement: PrintCheckerRequirement = {
      colorMode: "CMYK",
      height: 862,
      width: 1453,
      dpi: 72,
    };
    const imagePath = `${fixturesPath}/ultra-sites.png`;

    await expect(checkImage(imagePath, requirement)).rejects.toThrow(
      WrongColorModeException
    );
  });
});
