export class Error1 extends Error {
  constructor(message, name, types, src) {
    super(message);
    this.name = name;
    this.types = types;
    this.src = src;
  }
}

export function processError(error, path) {
  // If this error was originated not in this function
  console.log(error);
  if (error.hasOwnProperty('name') && error.name !== path) {
    throw new Error1(
      'An error as occured',
      path,
      ['input-processing', 'loud'],
      error
    );
  } else {
    if (
      error.hasOwnProperty('types') &&
      error.types.isArray() &&
      error.types.includes('input-filtering')
    ) {
      throw error;
    } else {
      throw new Error1(
        'An error as occured',
        path,
        ['input-processing', 'loud'],
        error
      );
    }
  }
}
