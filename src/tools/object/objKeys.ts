/** @format */

export const objKeys = (val: any): string[] => Object.keys(val);

export const getPropertyName = (obj, expression) => {
  try {
    const res = {};
    Object.keys(obj).map((k) => {
      res[k] = () => k;
    });
    return expression(res)();
  } catch (e) {
    throw new Error(`${expression} not found!`);
  }
};
