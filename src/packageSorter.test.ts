import { sort } from './packageSorter';

describe('Package Sorter', () => {
  describe('STANDARD packages (not bulky, not heavy)', () => {
    it('should classify small and light package as STANDARD', () => {
      expect(sort(10, 10, 10, 5)).toBe('STANDARD');
    });

    it('should classify package just below all thresholds as STANDARD', () => {
      expect(sort(100, 99, 100, 19.9)).toBe('STANDARD');
    });

    it('should classify medium-sized package under thresholds as STANDARD', () => {
      expect(sort(50, 50, 50, 10)).toBe('STANDARD');
    });
  });

  describe('SPECIAL packages (heavy only)', () => {
    it('should classify heavy package (exactly at threshold) as SPECIAL', () => {
      expect(sort(10, 10, 10, 20)).toBe('SPECIAL');
    });

    it('should classify very heavy package as SPECIAL', () => {
      expect(sort(20, 20, 20, 50)).toBe('SPECIAL');
    });

    it('should classify heavy package just above threshold as SPECIAL', () => {
      expect(sort(30, 30, 30, 20.1)).toBe('SPECIAL');
    });
  });

  describe('SPECIAL packages (bulky by volume)', () => {
    it('should classify package with volume exactly at threshold as SPECIAL', () => {
      expect(sort(100, 100, 100, 10)).toBe('SPECIAL');
    });

    it('should classify package with large volume as SPECIAL', () => {
      expect(sort(150, 100, 100, 15)).toBe('SPECIAL');
    });

    it('should classify package just above volume threshold as SPECIAL', () => {
      expect(sort(101, 100, 100, 5)).toBe('SPECIAL');
    });
  });

  describe('SPECIAL packages (bulky by dimension)', () => {
    it('should classify package with width exactly at dimension threshold as SPECIAL', () => {
      expect(sort(150, 10, 10, 5)).toBe('SPECIAL');
    });

    it('should classify package with height above dimension threshold as SPECIAL', () => {
      expect(sort(10, 200, 10, 10)).toBe('SPECIAL');
    });

    it('should classify package with length above dimension threshold as SPECIAL', () => {
      expect(sort(10, 10, 151, 8)).toBe('SPECIAL');
    });

    it('should classify package with multiple dimensions at threshold as SPECIAL', () => {
      expect(sort(150, 150, 10, 15)).toBe('SPECIAL');
    });
  });

  describe('REJECTED packages (both heavy and bulky)', () => {
    it('should classify heavy and bulky (by volume) package as REJECTED', () => {
      expect(sort(100, 100, 100, 20)).toBe('REJECTED');
    });

    it('should classify heavy and bulky (by dimension) package as REJECTED', () => {
      expect(sort(150, 10, 10, 25)).toBe('REJECTED');
    });

    it('should classify very heavy and very bulky package as REJECTED', () => {
      expect(sort(200, 200, 200, 100)).toBe('REJECTED');
    });

    it('should classify package at both thresholds as REJECTED', () => {
      expect(sort(100, 100, 100, 20)).toBe('REJECTED');
    });

    it('should classify heavy package with one large dimension as REJECTED', () => {
      expect(sort(151, 50, 50, 21)).toBe('REJECTED');
    });
  });
});
