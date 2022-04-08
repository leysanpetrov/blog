const compose = (...funcs) => (comp) =>
  funcs.reduceRight((wrapped, func) => func(wrapped), comp);

export default compose;