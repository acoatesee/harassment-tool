function ontarioYearsToWeeksOfStatMin(years) {
  if (years < 0) {
    console.error("Cannot handle negative years. Function will output the years back.");
  }

  // Flag indicating less than 1 year of service, assume they have enough months
  // for the minimum compensation
  if (years === 0) {
    return 1;
  } else if (years <= 7) {
    return years;
  } else {
    return 8;
  }
}

export default ontarioYearsToWeeksOfStatMin;
