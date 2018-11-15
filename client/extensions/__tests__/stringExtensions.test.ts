describe('Extensions: StringExtensions', () => {
  describe('StringExtension: contains', () => {
    it('should work on empty string', () => {
      expect(''.contains('something')).toBe(false);
      expect(''.contains('')).toBe(true);
    });

    it('should work', () => {
      expect('hello'.contains('hell')).toBe(true);
      expect('hello'.contains('jeez')).toBe(false);
    });

    it('should work on exact match', () => {
      expect('hello'.contains('hello')).toBe(true);
    });
  });
});
