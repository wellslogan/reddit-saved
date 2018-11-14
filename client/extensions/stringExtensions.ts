String.prototype.contains = function(this: string, substring: string): boolean {
  return this.indexOf(substring) > -1;
};
