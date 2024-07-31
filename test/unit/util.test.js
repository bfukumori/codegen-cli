import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import Util from '../../src/util';

describe('#Util - Strings', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('#upperCaseFirstLetter should transform the first letter to uppercase', () => {
    const data = 'hello';
    const expected = 'Hello';
    const result = Util.upperCaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });

  test('#upperCaseFirstLetter given an empty string should return empty', () => {
    const data = '';
    const expected = '';
    const result = Util.upperCaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });

  test('#lowerCaseFirstLetter should transform the first letter to lowerCase', () => {
    const data = 'Hello';
    const expected = 'hello';
    const result = Util.lowerCaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });

  test('#lowerCaseFirstLetter given an empty string should return empty', () => {
    const data = '';
    const expected = '';
    const result = Util.lowerCaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });
});
