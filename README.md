# Package Sorting Application

A Node.js TypeScript application that classifies packages based on their dimensions and weight into three categories: STANDARD, SPECIAL, or REJECTED.

## Features

- **Package Classification**: Automatically sorts packages into categories based on size and weight
- **Comprehensive Validation**: Validates all input parameters with detailed error messages
- **100% Test Coverage**: Fully tested with Jest including edge cases
- **TypeScript**: Strongly typed for better code quality and developer experience

## Package Classification Rules

### Categories

- **STANDARD**: Package is neither bulky nor heavy
- **SPECIAL**: Package is either bulky OR heavy (but not both)
- **REJECTED**: Package is both bulky AND heavy

### Definitions

- **Bulky**: A package is bulky if:
  - Volume (width × height × length) ≥ 1,000,000 cm³, OR
  - Any single dimension ≥ 150 cm

- **Heavy**: A package is heavy if:
  - Mass ≥ 20 kg

## Installation

```bash
npm install
```

## Usage

### Import and Use

```typescript
import { sort } from './src/packageSorter';

// Classify a package: sort(width, height, length, mass)
const result = sort(100, 100, 100, 20);
console.log(result); // Output: 'REJECTED' (bulky by volume AND heavy)

const result2 = sort(10, 10, 10, 5);
console.log(result2); // Output: 'STANDARD' (not bulky, not heavy)

const result3 = sort(150, 10, 10, 5);
console.log(result3); // Output: 'SPECIAL' (bulky by dimension, not heavy)
```

### Function Signature

```typescript
sort(width: number, height: number, length: number, mass: number): PackageCategory
```

**Parameters:**
- `width` - Package width in cm (must be > 0)
- `height` - Package height in cm (must be > 0)
- `length` - Package length in cm (must be > 0)
- `mass` - Package mass in kg (must be > 0)

**Returns:**
- `'STANDARD'` | `'SPECIAL'` | `'REJECTED'`

**Throws:**
- Error if any parameter is invalid (not a number, negative, zero, NaN, or Infinity)

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

This will display a coverage report showing 100% coverage across all files.

### Test Structure

The test suite is organized into two files:

1. **`src/packageSorter.test.ts`** (18 tests)
   - STANDARD package classification tests
   - SPECIAL package classification (heavy only)
   - SPECIAL package classification (bulky by volume)
   - SPECIAL package classification (bulky by dimension)
   - REJECTED package classification

2. **`src/validation.test.ts`** (36 tests)
   - Null/undefined input validation
   - Non-object input validation
   - Missing property validation
   - Non-number property validation
   - Negative value validation
   - Zero value validation
   - NaN value validation
   - Infinity value validation

### Example Test Cases

**STANDARD Package:**
```typescript
sort(10, 10, 10, 5) // → 'STANDARD'
// Volume: 1,000 cm³ (< 1,000,000)
// No dimension ≥ 150 cm
// Mass: 5 kg (< 20)
```

**SPECIAL Package (Heavy):**
```typescript
sort(10, 10, 10, 20) // → 'SPECIAL'
// Volume: 1,000 cm³ (< 1,000,000)
// No dimension ≥ 150 cm
// Mass: 20 kg (≥ 20) ✓ HEAVY
```

**SPECIAL Package (Bulky by Volume):**
```typescript
sort(100, 100, 100, 10) // → 'SPECIAL'
// Volume: 1,000,000 cm³ (≥ 1,000,000) ✓ BULKY
// Mass: 10 kg (< 20)
```

**SPECIAL Package (Bulky by Dimension):**
```typescript
sort(150, 10, 10, 5) // → 'SPECIAL'
// Width: 150 cm (≥ 150) ✓ BULKY
// Volume: 15,000 cm³ (< 1,000,000)
// Mass: 5 kg (< 20)
```

**REJECTED Package:**
```typescript
sort(100, 100, 100, 20) // → 'REJECTED'
// Volume: 1,000,000 cm³ (≥ 1,000,000) ✓ BULKY
// Mass: 20 kg (≥ 20) ✓ HEAVY
```

**Invalid Input:**
```typescript
sort(0, 10, 10, 5) // → throws Error: 'Package width must be greater than zero'
sort(-10, 10, 10, 5) // → throws Error: 'Package width must be greater than zero'
sort('10', 10, 10, 5) // → throws Error: 'Package width must be a number'
sort(NaN, 10, 10, 5) // → throws Error: 'Package width cannot be NaN'
```

## Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

The compiled JavaScript will be output to the `./dist` directory.

## Project Structure

```
thoughtful-technical-screen/
├── src/
│   ├── packageSorter.ts       # Main sorting logic
│   ├── packageSorter.test.ts  # Business logic tests
│   ├── validation.ts           # Input validation logic
│   └── validation.test.ts      # Validation tests
├── dist/                       # Compiled JavaScript (after build)
├── jest.config.js              # Jest configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # This file
```

## Development

### Available Scripts

- `npm test` - Run all tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run build` - Compile TypeScript to JavaScript

### Requirements

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

## License

ISC
