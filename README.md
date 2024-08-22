# print-checker

Library to check and analyze images for printing. It validates the size, color mode and the resolution of media files.

## Example

```
const requirement: PrintCheckerRequirement = {
      colorMode: "CMYK",
      height: 154, // unit: mm
      width: 111, // unit: mm
      dpi: 300,
  };

try {
  await checkImage("./example.jpg", requirement);
} catch(e) {
  if(e instanceof WrongHeightException) {
    ...
  }
}
```

`path` is the path of the image,
`requirements` is the config with the requirements of image.

If the promise resolves, it responses `true`. Otherwise the promise will be rejected with an error.

## Exception-Handling

`PRINT_CHECKER_MISSING_META_DATA` is thrown, if some data is missing.

`PRINT_CHECKER_WRONG_HEIGHT` is thrown, if the image or document height is not equal to the requirements.

`PRINT_CHECKER_WRONG_WIDTH` is thrown, if the image or document width is not equal to the requirements.

`PRINT_CHECKER_WRONG_DPI` is thrown, if the image resolution not equal to the requirements (image only).

`PRINT_CHECKER_WRONG_COLOR_MODE` is thrown, if the image or document color mode (RGB or CMYK) is not equal to the requirements.

## Dependencies

- sharp (Lib to analyze images)

## Roadmap

- Solution to validate pdf documents

## Author

Manuel Dierkes (m.dierkes@ultra-sites.de)
