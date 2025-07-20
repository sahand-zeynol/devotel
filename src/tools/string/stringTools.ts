/**
 * Get first character and capital characters from string
 *
 * @format
 * @param input
 */

function getCapitalizeCharacters(input: string): string {
  return input.split(/(?=[A-Z])/).reduce((a, b) => a + b[0], '');
}

/**
 * Get first character and every character after (-,_) string
 * @param input
 */
function getDashedCharacters(input) {
  return input
    .split(/(?=[-,_])/g)
    .reduce((a, b) => a + b.replace(/[-,_]/g, '')[0], '');
}

/**
 * Capitalize string
 * @param input
 */
function capitalizeFirstLetter(input) {
  return `${input.charAt(0).toUpperCase()}${input.slice(1)}`;
}

export { capitalizeFirstLetter, getCapitalizeCharacters, getDashedCharacters };
