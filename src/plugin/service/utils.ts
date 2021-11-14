export const isNumber = (value: any) => {
  return typeof value === 'number' && isFinite(value);
};

export const isDate = (value: any) => {
  return value instanceof Date && !isNaN(value.valueOf());
};
