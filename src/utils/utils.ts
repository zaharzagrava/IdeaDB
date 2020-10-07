import { queryCache } from 'react-query';
import { ServerDataType, NamesDataType } from '../types/types';

/**
 *
 * @param message Custom message of the error
 * @param name Path of the function that originated this error
 * @param types Types that this error belongs to. Can be _input-filtering_ or _input-processing_, _loud_ or _silent_.
 * @param src Source error that was the reason of this error, if it exists
 */
interface Error1OptionsV1 {
  message: string;
  name: string;
  types: string[];
  src?: Error1 | Error;
}

/**
 * A few rules.
 * 1) In a function that is not processError, Error1 can only be thrown with
 * ['input-filtering', 'loud'] types + path that equals to full path of the function
 * Conclusions
 * 1) So if an error is instanceof Error1 and has a path that = path argument,
 * we can infer that this is our input-filtering error
 * 2) If an error is instanceof Error1 and has path that !== path argument,
 * we can infer that this is an error that was originated in one of the function's
 * children function and should be wrapped
 * 3) If an error is not instanceof Error1, then it is an errro that was originated in
 * the function, and so should be wrapped
 */
export class Error1 extends Error {
  public types: string[];
  public src?: Error1 | Error;

  constructor(options: Error1OptionsV1) {
    super(options.message);
    this.name = options.name;
    this.types = options.types;
    this.src = options.src;
  }
}

export function processError(error: Error, path: string) {
  if (error instanceof Error1) {
    // It's either our input-filtering error or input-processing error from children method
    if (error.name === path) {
      // This is function's internal input-filtering error
      return error;
    } else {
      // This is an input-processing / input-filtering error of the children function
      return new Error1({
        message: 'An error as occured',
        name: path,
        types: ['children-function-error', 'loud'],
        src: error,
      });
    }
  } else {
    // Since all children methods should wrap their errors in Error1 object
    // we can infer that this Error was originated somewhere in our code
    // And since it is not an Error1, it has to be some input-processing error
    return new Error1({
      message: 'An error as occured',
      name: path,
      types: ['input-processing', 'loud'],
      src: error,
    });
  }
}

export async function updateQueryCache<DT extends ServerDataType[]>(
  type: NamesDataType,
  exception: string[],
  newData: DT
) {
  const exceptionQuery = queryCache.getQuery(exception);

  if (exceptionQuery === undefined) {
    throw new Error('excption paramter should return at least one query');
  }

  const queries = queryCache.getQueries((query) => {
    return (
      query.queryKey.includes(type) &&
      query.queryHash !== exceptionQuery.queryHash
    );
  });

  for (let i = 0; i < queries.length; i++) {
    const queryKey = queries[i].queryKey;

    const toUpdateQueryData = queryCache.getQueryData<DT | undefined>(queryKey);

    if (toUpdateQueryData !== undefined) {
      for (let i = 0; i < toUpdateQueryData.length; i++) {
        // If newData has same element that oldData has
        const newDataElem = newData.filter(
          (elem) => elem.id === toUpdateQueryData[i].id
        );

        if (newDataElem.length > 1) {
          throw new Error('');
        }

        if (newDataElem.length === 1) {
          console.log('@4');
          console.log({ newData, updateData: toUpdateQueryData });

          toUpdateQueryData[i] = newDataElem[0];
        }
      }
    }

    console.log('@2');
    console.log({ updateData: toUpdateQueryData });

    queryCache.setQueryData<DT | undefined, Error>(queryKey, () => {
      return toUpdateQueryData;
    });
  }
}
