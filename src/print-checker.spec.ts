import { describe, expect, it } from "vitest";
import { checkImage } from "./print-checker";
import { PrintCheckerRequirement } from "./print-checker.types";
import path from "path";
import { WrongColorModeException } from "./print-checker.errors";

const fixturesPath = path.join(__dirname, "/__fixtures");

describe("Image", () => {
  it("should check image [true]", async () => {
    const requirement: PrintCheckerRequirement = {
      colorMode: "CMYK",
      height: 154,
      width: 111,
      dpi: 300,
    };
    const imagePath = `${fixturesPath}/DinA6.jpg`;

    const response = await checkImage(imagePath, requirement);

    expect(response).toBeTruthy();
  });

  it("should check image [wrong color mode]", async () => {
    const requirement: PrintCheckerRequirement = {
      colorMode: "RGB",
      height: 154,
      width: 111,
      dpi: 300,
    };
    const imagePath = `${fixturesPath}/DinA6.jpg`;

    await expect(checkImage(imagePath, requirement)).rejects.toThrow(
      WrongColorModeException
    );
  });
});
