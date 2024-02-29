export const startCase = (str = '') => {
  if (!str || typeof str != 'string') {
    return typeof str;
  }

  const strArr = str.split('_');

  const res = strArr.reduce((aggr, ele) => {
    const startCased = ele[0].toUpperCase() + ele.slice(1);
    return aggr + ' ' + startCased;
  });

  return res;
};
