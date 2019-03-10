export const cssClasses = (base: string, classes: object = {}): string =>
  Object.keys(classes).reduce(
    (acc, key) => (classes[key] ? `${acc} ${key}` : acc),
    base
  );
