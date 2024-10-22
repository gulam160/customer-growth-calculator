import { Month, months } from "./constant";
import { GrowthRateUpdate, GrowthResult } from "./interface";

const calculateGrowth = (
  currentCustomers: number,
  growthRate: number
): number => {
  const increasedCustomer = (currentCustomers * growthRate) / 100;
  return currentCustomers + increasedCustomer;
};

const formatStartDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(
    `20${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`
  );
};

const applyRateUpdates = (
  growthRates: number[],
  currentYear: number,
  currentMonth: number,
  updates: GrowthRateUpdate[]
) => {
  updates.forEach((update) => {
    const monthIndex = months.indexOf(update.month as Month);
    if (update.year === currentYear && monthIndex === currentMonth) {
      growthRates[monthIndex] = update.rate;
    }
  });
};

const formatResults = (results: GrowthResult[]): string => {
  return results
    .map(
      (result) =>
        `In ${result.month} ${
          result.year
        }: ${result.customers.toLocaleString()} customers`
    )
    .join("\n");
};

export { calculateGrowth, formatStartDate, applyRateUpdates, formatResults };
