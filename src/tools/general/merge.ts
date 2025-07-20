export function merge(arrays: Array<Array<any>>, key: string) {
  const result = [],
    hash = Object.create(null);

  arrays.forEach(function (a) {
    a.forEach(function (o) {
      if (!hash[o[key]]) {
        hash[o[key]] = {};
        result.push(hash[o[key]]);
      }
      Object.keys(o).forEach(function (k) {
        hash[o[key]][k] = o[k];
      });
    });
  });

  return result;
}
