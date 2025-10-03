import { Package } from './packageSorter';

/**
 * Validates that a package object has all required properties with valid values
 * @param pkg - Package to validate
 * @throws Error if package is invalid
 */
export function validatePackage(pkg: any): asserts pkg is Package {
  // Check if package object exists
  if (pkg == null) {
    throw new Error('Package cannot be null or undefined');
  }

  // Check if package is an object
  if (typeof pkg !== 'object') {
    throw new Error('Package must be an object');
  }

  // Check for required properties
  const requiredProps = ['width', 'height', 'length', 'mass'];
  for (const prop of requiredProps) {
    if (!(prop in pkg)) {
      throw new Error(`Package is missing required property: ${prop}`);
    }
  }

  // Check that all properties are numbers
  if (typeof pkg.width !== 'number') {
    throw new Error('Package width must be a number');
  }
  if (typeof pkg.height !== 'number') {
    throw new Error('Package height must be a number');
  }
  if (typeof pkg.length !== 'number') {
    throw new Error('Package length must be a number');
  }
  if (typeof pkg.mass !== 'number') {
    throw new Error('Package mass must be a number');
  }

  // Check for NaN values
  if (isNaN(pkg.width)) {
    throw new Error('Package width cannot be NaN');
  }
  if (isNaN(pkg.height)) {
    throw new Error('Package height cannot be NaN');
  }
  if (isNaN(pkg.length)) {
    throw new Error('Package length cannot be NaN');
  }
  if (isNaN(pkg.mass)) {
    throw new Error('Package mass cannot be NaN');
  }

  // Check for Infinity values
  if (!isFinite(pkg.width)) {
    throw new Error('Package width must be a finite number');
  }
  if (!isFinite(pkg.height)) {
    throw new Error('Package height must be a finite number');
  }
  if (!isFinite(pkg.length)) {
    throw new Error('Package length must be a finite number');
  }
  if (!isFinite(pkg.mass)) {
    throw new Error('Package mass must be a finite number');
  }

  // Check for negative or zero values
  if (pkg.width <= 0) {
    throw new Error('Package width must be greater than zero');
  }
  if (pkg.height <= 0) {
    throw new Error('Package height must be greater than zero');
  }
  if (pkg.length <= 0) {
    throw new Error('Package length must be greater than zero');
  }
  if (pkg.mass <= 0) {
    throw new Error('Package mass must be greater than zero');
  }
}
