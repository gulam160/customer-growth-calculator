# Customer Growth Calculator

A Node.js calculator that projects customer growth over a 5-year period with customizable monthly growth rates.

## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- TypeScript

## Features

- Calculate customer growth for 5 years based on initial customers and start date
- Customize monthly growth rates
- Update growth rates for:
  - Single month
  - All future months in current year
  - All future months across all years
- View month-by-month customer projections
- Full TypeScript support
- Comprehensive test coverage

## Installation

```bash
# Clone the repository
git clone https://github.com/gulam160/customer-growth-calculator.git

# Navigate to project directory
cd customer-growth-calculator

# Install dependencies
yarn install
```

## Project Structure

```
customer-growth-calculator/
├── src/
│   ├──tests/
│   │   └── calculator.test.ts
│   ├── calculator.ts
│   ├── types.ts         # TypeScript interfaces
│   ├── utils.ts         # Utility functions
│   └── index.ts         # Main entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Setting Up Development Environment

1. Clone the repository
2. Install dependencies with `yarn install`
3. Run tests with `yarn test`
4. Start development with `yarn start`

## Author

Gulam Mustafa

### Note:

_This README provides a brief guide on how to get started, install dependencies, execute the code, test the code, and contribute to the project._
