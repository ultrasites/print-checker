export class MissingMetaDataException extends Error {
  readonly name = "PRINT_CHECKER_MISSING_META_DATA";
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, MissingMetaDataException.prototype);
  }
}

export class WrongHeightException extends Error {
  readonly name = "PRINT_CHECKER_WRONG_HEIGHT";
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, WrongHeightException.prototype);
  }
}

export class WrongWidthException extends Error {
  readonly name = "PRINT_CHECKER_WRONG_WIDTH";
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, WrongWidthException.prototype);
  }
}

export class WrongDpiException extends Error {
  readonly name = "PRINT_CHECKER_WRONG_DPI";
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, WrongDpiException.prototype);
  }
}

export class WrongColorModeException extends Error {
  readonly name = "PRINT_CHECKER_WRONG_COLOR_MODE";
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, WrongColorModeException.prototype);
  }
}

export class InvalidPageCountException extends Error {
  readonly name = "PRINT_CHECKER_INVALID_PAGE_COUNT";
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidPageCountException.prototype);
  }
}
