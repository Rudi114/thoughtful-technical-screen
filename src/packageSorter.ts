import { validatePackage } from './validation';

/**
 * Package classification types
 */
export type PackageCategory = 'STANDARD' | 'SPECIAL' | 'REJECTED';

/**
 * Package dimensions and weight
 */
export interface Package {
  width: number;  // in cm
  height: number; // in cm
  length: number; // in cm
  mass: number;   // in kg
}

/**
 * Constants for package classification
 */
const VOLUME_THRESHOLD = 1_000_000; // cm³
const DIMENSION_THRESHOLD = 150;    // cm
const MASS_THRESHOLD = 20;          // kg

/**
 * Determines if a package is bulky based on volume or dimensions
 * A package is bulky if:
 * - Volume (width × height × length) ≥ 1,000,000 cm³ OR
 * - Any single dimension ≥ 150 cm
 */
function isBulky(pkg: Package): boolean {
  const volume = pkg.width * pkg.height * pkg.length;
  const hasLargeDimension =
    pkg.width >= DIMENSION_THRESHOLD ||
    pkg.height >= DIMENSION_THRESHOLD ||
    pkg.length >= DIMENSION_THRESHOLD;

  return volume >= VOLUME_THRESHOLD || hasLargeDimension;
}

/**
 * Determines if a package is heavy
 * A package is heavy if mass ≥ 20 kg
 */
function isHeavy(pkg: Package): boolean {
  return pkg.mass >= MASS_THRESHOLD;
}

/**
 * Sorts packages into categories: STANDARD, SPECIAL, or REJECTED
 *
 * Classification rules:
 * - REJECTED: Package is both heavy AND bulky
 * - SPECIAL: Package is either heavy OR bulky (but not both)
 * - STANDARD: Package is neither heavy nor bulky
 *
 * @param width - Package width in cm
 * @param height - Package height in cm
 * @param length - Package length in cm
 * @param mass - Package mass in kg
 * @returns Package category
 * @throws Error if package input is invalid
 */
export function sort(width: number, height: number, length: number, mass: number): PackageCategory {
  const pkg = { width, height, length, mass };
  validatePackage(pkg);

  const heavy = isHeavy(pkg);
  const bulky = isBulky(pkg);

  if (heavy && bulky) {
    return 'REJECTED';
  }

  if (heavy || bulky) {
    return 'SPECIAL';
  }

  return 'STANDARD';
}
