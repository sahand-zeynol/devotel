/**
 * Convert miladi date to jalali
 *
 * @format
 * @param date
 */

export function convertMiladiDateToString(date) {
  let result = null;

  if (date) {
    date = new Date(date);
    const dd = String(date.getDate()).padStart(2, '0'),
      mm = String(date.getMonth() + 1).padStart(2, '0'), // January is 0!
      yyyy = date.getFullYear(),
      seconds = date.getSeconds(),
      minutes = date.getMinutes(),
      hour = date.getHours();

    result = `${yyyy}-${mm}-${dd} ${hour}:${minutes}:${seconds}`;
  }

  return result;
}
