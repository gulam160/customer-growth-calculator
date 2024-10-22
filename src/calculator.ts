import { type Month, months, PROJECTION_YEARS } from "./constant";
import type { GrowthRateUpdate, GrowthResult } from "./interface";
import { applyRateUpdates, calculateGrowth, formatStartDate } from "./utils";

export function customerGrowthCalculator(
  initialCustomers: number,
  startDateStr: string,
  monthlyGrowthRates: number[],
  rateUpdates: GrowthRateUpdate[] = []
): GrowthResult[] {
  let customers = initialCustomers;
  const result: GrowthResult[] = [];

  const startDate = formatStartDate(startDateStr);
  let currentYear = startDate.getFullYear();
  let currentMonth = startDate.getMonth();

  let growthRates = [...monthlyGrowthRates];

  for (let year = 1; year <= PROJECTION_YEARS; year++) {
    for (let month = currentMonth; month < 12; month++) {
      applyRateUpdates(growthRates, currentYear, month, rateUpdates);

      customers = calculateGrowth(customers, growthRates[month]);
      result.push({
        year: currentYear,
        month: months[month],
        customers: Math.round(customers),
      });
    }
    currentYear += 1;
    currentMonth = 0;
  }

  return result;
}

export function updateMonthlyRate(
  results: GrowthResult[],
  month: string,
  year: number,
  newRate: number
): GrowthResult[] {
  const startDate = `01-${(months.indexOf(month as Month) + 1)
    .toString()
    .padStart(2, "0")}-${year.toString().slice(-2)}`;
  const initialCustomers = results[0].customers;
  const monthlyRates = new Array(12).fill(5);

  const updates = [{ month, year, rate: newRate }] satisfies GrowthRateUpdate[];

  return customerGrowthCalculator(
    initialCustomers,
    startDate,
    monthlyRates,
    updates
  );
}

export function updateAllFutureRates(
  results: GrowthResult[],
  fromMonth: string,
  fromYear: number,
  newRate: number
): GrowthResult[] {
  const updateStartIndex = results.findIndex(
    (r) => r.month === fromMonth && r.year === fromYear
  );

  if (updateStartIndex === -1) {
    return results;
  }

  const previousResult = results[updateStartIndex - 1];
  const startDateStr = `01-${(months.indexOf(fromMonth as Month) + 1)
    .toString()
    .padStart(2, "0")}-${fromYear.toString().slice(-2)}`;

  const initialCustomers = previousResult
    ? previousResult.customers
    : results[0].customers;

  const monthlyRates = Array(12).fill(newRate);

  const newResults = customerGrowthCalculator(
    initialCustomers,
    startDateStr,
    monthlyRates
  );

  return [...results.slice(0, updateStartIndex), ...newResults];
}
