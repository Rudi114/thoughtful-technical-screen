import { validatePackage } from './validation';

describe('validatePackage', () => {
  describe('Null or undefined inputs', () => {
    it('should throw error for null', () => {
      expect(() => validatePackage(null)).toThrow('Package cannot be null or undefined');
    });

    it('should throw error for undefined', () => {
      expect(() => validatePackage(undefined)).toThrow('Package cannot be null or undefined');
    });
  });

  describe('Non-object inputs', () => {
    it('should throw error for string', () => {
      expect(() => validatePackage('not an object')).toThrow('Package must be an object');
    });

    it('should throw error for number', () => {
      expect(() => validatePackage(42)).toThrow('Package must be an object');
    });

    it('should throw error for boolean', () => {
      expect(() => validatePackage(true)).toThrow('Package must be an object');
    });
  });

  describe('Missing properties', () => {
    it('should throw error for missing width', () => {
      const pkg = { height: 10, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package is missing required property: width');
    });

    it('should throw error for missing height', () => {
      const pkg = { width: 10, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package is missing required property: height');
    });

    it('should throw error for missing length', () => {
      const pkg = { width: 10, height: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package is missing required property: length');
    });

    it('should throw error for missing mass', () => {
      const pkg = { width: 10, height: 10, length: 10 };
      expect(() => validatePackage(pkg)).toThrow('Package is missing required property: mass');
    });

    it('should throw error for empty object', () => {
      expect(() => validatePackage({})).toThrow('Package is missing required property: width');
    });
  });

  describe('Non-number properties', () => {
    it('should throw error for string width', () => {
      const pkg = { width: '10', height: 10, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package width must be a number');
    });

    it('should throw error for string height', () => {
      const pkg = { width: 10, height: '10', length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package height must be a number');
    });

    it('should throw error for string length', () => {
      const pkg = { width: 10, height: 10, length: '10', mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package length must be a number');
    });

    it('should throw error for string mass', () => {
      const pkg = { width: 10, height: 10, length: 10, mass: '5' };
      expect(() => validatePackage(pkg)).toThrow('Package mass must be a number');
    });

    it('should throw error for null width', () => {
      const pkg = { width: null, height: 10, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package width must be a number');
    });

    it('should throw error for undefined height', () => {
      const pkg = { width: 10, height: undefined, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package height must be a number');
    });

    it('should throw error for object as width', () => {
      const pkg = { width: {}, height: 10, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package width must be a number');
    });

    it('should throw error for array as mass', () => {
      const pkg = { width: 10, height: 10, length: 10, mass: [5] };
      expect(() => validatePackage(pkg)).toThrow('Package mass must be a number');
    });
  });

  describe('Negative values', () => {
    it('should throw error for negative width', () => {
      const pkg = { width: -10, height: 10, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package width must be greater than zero');
    });

    it('should throw error for negative height', () => {
      const pkg = { width: 10, height: -10, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package height must be greater than zero');
    });

    it('should throw error for negative length', () => {
      const pkg = { width: 10, height: 10, length: -10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package length must be greater than zero');
    });

    it('should throw error for negative mass', () => {
      const pkg = { width: 10, height: 10, length: 10, mass: -5 };
      expect(() => validatePackage(pkg)).toThrow('Package mass must be greater than zero');
    });
  });

  describe('Zero values', () => {
    it('should throw error for zero width', () => {
      const pkg = { width: 0, height: 10, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package width must be greater than zero');
    });

    it('should throw error for zero height', () => {
      const pkg = { width: 10, height: 0, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package height must be greater than zero');
    });

    it('should throw error for zero length', () => {
      const pkg = { width: 10, height: 10, length: 0, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package length must be greater than zero');
    });

    it('should throw error for zero mass', () => {
      const pkg = { width: 10, height: 10, length: 10, mass: 0 };
      expect(() => validatePackage(pkg)).toThrow('Package mass must be greater than zero');
    });

    it('should throw error for all zero values', () => {
      const pkg = { width: 0, height: 0, length: 0, mass: 0 };
      expect(() => validatePackage(pkg)).toThrow('Package width must be greater than zero');
    });
  });

  describe('NaN values', () => {
    it('should throw error for NaN width', () => {
      const pkg = { width: NaN, height: 10, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package width cannot be NaN');
    });

    it('should throw error for NaN height', () => {
      const pkg = { width: 10, height: NaN, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package height cannot be NaN');
    });

    it('should throw error for NaN length', () => {
      const pkg = { width: 10, height: 10, length: NaN, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package length cannot be NaN');
    });

    it('should throw error for NaN mass', () => {
      const pkg = { width: 10, height: 10, length: 10, mass: NaN };
      expect(() => validatePackage(pkg)).toThrow('Package mass cannot be NaN');
    });
  });

  describe('Infinity values', () => {
    it('should throw error for Infinity width', () => {
      const pkg = { width: Infinity, height: 10, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package width must be a finite number');
    });

    it('should throw error for negative Infinity height', () => {
      const pkg = { width: 10, height: -Infinity, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package height must be a finite number');
    });

    it('should throw error for Infinity length', () => {
      const pkg = { width: 10, height: 10, length: Infinity, mass: 5 };
      expect(() => validatePackage(pkg)).toThrow('Package length must be a finite number');
    });

    it('should throw error for Infinity mass', () => {
      const pkg = { width: 10, height: 10, length: 10, mass: Infinity };
      expect(() => validatePackage(pkg)).toThrow('Package mass must be a finite number');
    });
  });

  describe('Valid package', () => {
    it('should not throw for valid package', () => {
      const pkg = { width: 10, height: 10, length: 10, mass: 5 };
      expect(() => validatePackage(pkg)).not.toThrow();
    });
  });
});
