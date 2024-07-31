export default class Util {
  static #transform({ str, upperCase = true }) {
    if (!str) {
      return '';
    }

    const firstLetter = str.charAt(0);
    const rest = str.slice(1);

    return upperCase
      ? firstLetter.toUpperCase() + rest
      : firstLetter.toLowerCase() + rest;
  }

  static upperCaseFirstLetter(str) {
    return Util.#transform({ str });
  }

  static lowerCaseFirstLetter(str) {
    return Util.#transform({ str, upperCase: false });
  }
}
