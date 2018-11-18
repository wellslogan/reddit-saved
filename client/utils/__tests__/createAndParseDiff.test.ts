import { mergeArrayOrder } from '@utils/createAndParseDiffData';

describe('Utils: createAndParseDiffData', () => {
  describe('Method: zip', () => {
    it('should work', () => {
      const actual = mergeArrayOrder([12, 11, 10, 5], [10, 9, 8, 7, 6, 5]);
      const expected = [12, 11, 10, 9, 8, 7, 6, 5];
      expect(actual).toEqual(expected);
    });

    it('should append trailing fromFile items', () => {
      const actual = mergeArrayOrder([10, 8, 7, 6], [10, 9, 8, 7, 6, 5]);
      const expected = [10, 9, 8, 7, 6, 5];
      expect(actual).toEqual(expected);
    });

    it('should prepend "newer" fromFile items', () => {
      const actual = mergeArrayOrder([2, 1], [4, 3, 2]);
      const expected = [4, 3, 2, 1];
      expect(actual).toEqual(expected);
    });

    it('should work when fromServer is empty', () => {
      const actual = mergeArrayOrder([], [1, 2, 3]);
      const expected = [1, 2, 3];
      expect(actual).toEqual(expected);
    });
  });
});
