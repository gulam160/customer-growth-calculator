const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const PROJECTION_YEARS = 5;

type Month = (typeof months)[number];

export { months, type Month, PROJECTION_YEARS };
