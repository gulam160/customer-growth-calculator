import {
  customerGrowthCalculator,
  updateAllFutureRates,
  updateMonthlyRate,
} from "../calculator";
import { calculateGrowth, formatStartDate } from "../utils";

describe("Customer Growth Calculator", () => {
  const initialCustomers = 1000;
  const startDate = "22-10-24";
  // Let's Suppose 5% growth rate for each month
  const defaultGrowthRates = new Array(12).fill(5);

  test("formatStartDate() should correctly parse date string", () => {
    const date = formatStartDate("22-10-24");
    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(9);
    expect(date.getDate()).toBe(22);
  });

  test("calculateGrowth() should correctly calculate customer growth", () => {
    const result = calculateGrowth(1000, 5);
    expect(result).toBe(1050);
  });

  test("customerGrowthCalculator() should calculate growth for 5 years", () => {
    const results = customerGrowthCalculator(
      initialCustomers,
      startDate,
      defaultGrowthRates
    );

    expect(results.length).toBe(5 * 12 - 9);
    expect(results[0].year).toBe(2024);
    expect(results[0].month).toBe("October");
    expect(results[0].customers).toBe(1050);
  });

  test("updateMonthlyRate() should update specific month rate", () => {
    const initialResults = customerGrowthCalculator(
      initialCustomers,
      startDate,
      defaultGrowthRates
    );

    const updatedResults = updateMonthlyRate(
      initialResults,
      "January",
      2025,
      10
    );

    const januaryResult = updatedResults.find(
      (r) => r.month === "January" && r.year === 2025
    );

    expect(januaryResult).toBeDefined();
    expect(januaryResult!.customers).toBeGreaterThan(
      initialResults[0].customers
    );
  });

  test("updateAllFutureRates() should update rates from specified month", () => {
    const initialResults = customerGrowthCalculator(
      initialCustomers,
      startDate,
      defaultGrowthRates
    );

    const updatedResults = updateAllFutureRates(
      initialResults,
      "January",
      2025,
      10
    );

    const december2024Initial = initialResults.find(
      (r) => r.month === "December" && r.year === 2024
    )!;
    const january2025Updated = updatedResults.find(
      (r) => r.month === "January" && r.year === 2025
    )!;
    const expectedJanuaryCustomers = Math.round(
      december2024Initial.customers * 1.1
    );

    expect(january2025Updated.customers).toBe(expectedJanuaryCustomers);
    const february2025Updated = updatedResults.find(
      (r) => r.month === "February" && r.year === 2025
    )!;

    const expectedFebruaryCustomers = Math.round(
      january2025Updated.customers * 1.1
    );

    expect(february2025Updated.customers).toBe(expectedFebruaryCustomers);
  });
});
