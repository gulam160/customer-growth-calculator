import { createInterface } from "readline/promises";
import { months } from "./constant";
import {
  customerGrowthCalculator,
  updateAllFutureRates,
  updateMonthlyRate,
} from "./calculator";
import { formatResults } from "./utils";

async function askInputs() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const initialCustomers = parseInt(
      await rl.question("Enter initial number of customers: "),
      10
    );

    const startDate = await rl.question("Enter start date (DD-MM-YY): ");

    console.log("\nEnter monthly growth rates (%) for each month:");
    const monthlyGrowthRates: number[] = [];

    for (const month of months) {
      const rate = parseFloat(await rl.question(`${month}: `));
      monthlyGrowthRates.push(rate);
    }

    // Calculate initial growth
    let results = customerGrowthCalculator(
      initialCustomers,
      startDate,
      monthlyGrowthRates
    );

    console.log("\nInitial Growth Projection:");
    console.log(formatResults(results));

    // Allow for updates
    while (true) {
      console.log("\nOptions:");
      console.log("1. Update single month");
      console.log("2. Update all future months");
      console.log("3. Exit");

      const choice = await rl.question("Choose an option (1-3): ");

      if (choice === "3") break;

      if (choice === "1") {
        const month = await rl.question("Enter month name: ");
        const year = parseInt(await rl.question("Enter year: "), 10);
        const newRate = parseFloat(
          await rl.question("Enter new growth rate (%): ")
        );

        results = updateMonthlyRate(results, month, year, newRate);
      } else if (choice === "2") {
        const month = await rl.question("Enter start month: ");
        const year = parseInt(await rl.question("Enter start year: "), 10);
        const newRate = parseFloat(
          await rl.question("Enter new growth rate (%): ")
        );

        results = updateAllFutureRates(results, month, year, newRate);
      }

      console.log("\nUpdated Growth Projection:");
      console.log(formatResults(results));
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  askInputs();
}
