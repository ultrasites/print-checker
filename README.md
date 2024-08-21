# print-checker

Library to check and analyze images and pdf documents for printing. It validates the size, color mode and the resolution of media files.

## Example

### Config/Requirements

```
export type PrintCheckerRequirement = Pick<
  Media,
  "colorMode" | "height" | "width"
> & { dpi?: number };
```

### Validate Image

```
export async function checkImage(
  path: string,
  requirements: PrintCheckerRequirement
): Promise<true>
```

`path` is the path of the image,
`requirements` is the config with the requirements of image/pdf.

If the promise resolves, it responses `true`. Otherwise the promise will be rejected with an error.

### Validate PDF

```
export async function checkPDF(
  path: string,
  requirements: PrintCheckerRequirement
): Promise<true>
```

`path` is the path of the image,
`requirements` is the config with the requirements of image/pdf.

If the promise resolves, it responses `true`. Otherwise the promise will be rejected with an error.

## Exception-Handling

`PRINT_CHECKER_MISSING_META_DATA` is thrown, if some data is missing.

`PRINT_CHECKER_WRONG_HEIGHT` is thrown, if the image or document height is not equal to the requirements.

`PRINT_CHECKER_WRONG_WIDTH` is thrown, if the image or document width is not equal to the requirements.

`PRINT_CHECKER_WRONG_DPI` is thrown, if the image resolution not equal to the requirements (image only).

`PRINT_CHECKER_WRONG_COLOR_MODE` is thrown, if the image or document color mode (RGB or CMYK) is not equal to the requirements.

## Dependencies

- pdf-lib (Lib to analyze and create pdf documents)
- sharp (Lib to analyze images)

## Author

## License
