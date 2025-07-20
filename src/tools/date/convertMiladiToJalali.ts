/** @format */

import * as moment from 'jalali-moment';

/**
 * Convert miladi date to jalali
 * @param input
 */
export function convertMiladiToJalali(input: { miladiDate; format? }) {
  const defaultOptions = {
      format: 'YYYY/MM/DD',
    },
    options = { ...defaultOptions, ...input };

  return moment(options.miladiDate, 'YYYY-MM-DD')
    .locale('fa')
    .format(options.format);
}

export function getMiladiDateWithLocalTime(input: { miladiDate; format? }) {
  const defaultOptions = {
      format: 'YYYY-MM-DD hh:mm:ss',
    },
    options = { ...defaultOptions, ...input };
  return moment(options.miladiDate, 'YYYY-MM-DD')
    .add(4.5, 'hour')
    .format(options.format);
}
