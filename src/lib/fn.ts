export const compose =
  <T>(...fns: ((arg: T) => T)[]) =>
  (initialValue: T) =>
    fns.reduceRight((acc, fn) => fn(acc), initialValue);
