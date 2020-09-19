export class Error1 extends Error {
  constructor(message, name, types, src) {
    super(message);
    this.name = name;
    this.types = types;
    this.src = src;
  }
}

export function processError(error, path) {
  // If this error was originated in this function
  if (error.name === path) {
    if (error.types.includes('input-filtering')) {
      throw error;
    } else {
      throw new Error1(
        'An error as occured',
        path,
        ['input-processing', 'loud'],
        error
      );
    }
  } else {
    throw new Error1(
      'An error as occured',
      path,
      ['input-processing', 'loud'],
      error
    );
  }
}
