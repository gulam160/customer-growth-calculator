interface GrowthResult {
  year: number;
  month: string;
  customers: number;
}

interface MonthlyGrowthRate {
  month: string;
  rate: number;
}

interface GrowthRateUpdate {
  month: string;
  year: number;
  rate: number;
}

export type { GrowthResult, MonthlyGrowthRate, GrowthRateUpdate };
