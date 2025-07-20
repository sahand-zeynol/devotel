/** @format */

import { objKeys } from '../object/objKeys';
import { isStringFull } from './string';

export const isUndefined = (val: any): boolean => typeof val === 'undefined';
export const isNull = (val: any): boolean => val === null;
export const isNil = (val: any): boolean => isUndefined(val) || isNull(val);
export const hasLength = (val: any): boolean => val.length > 0;
export const isObject = (val: any): boolean =>
  typeof val === 'object' && !isNull(val);
export const isObjectFull = (val: any) =>
  isObject(val) && hasLength(objKeys(val));
export const isNumber = (val: any): boolean =>
  typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val);
export const isEqual = (val: any, eq: any): boolean => val === eq;
export const isFalse = (val: any): boolean => val === false;
export const isTrue = (val: any): boolean => val === true;
export const isTrueFull = (val: any): boolean => val === true || val === 'true';
export const isBoolean = (val: any): boolean => typeof val === 'boolean';
export const isNumeric = (val: any): boolean =>
  /^[+-]?([0-9]*[.])?[0-9]+$/.test(val);
export const isDate = (val: any): val is Date => val instanceof Date;
export const isValue = (val: any): boolean =>
  isStringFull(val) || isNumber(val) || isBoolean(val) || isDate(val);
export const isFunction = (val: any): boolean => typeof val === 'function';
