function getWeeksFromModelOutput(predictedReasonableNotice, weeksOrMonths) {
  predictedReasonableNotice = parseFloat(predictedReasonableNotice);
  if (weeksOrMonths === "months") {
    // Output is in months, need to convert to weeks
    const weeksPerMonth = 4.34524;
    predictedReasonableNotice *= weeksPerMonth;
  }
  return predictedReasonableNotice;
}

function dollarsFromBardalModelOutput(bardalModelOutput, salary) {
  const weeklySalary = parseFloat(salary) / 52;
  const modelOutput = bardalModelOutput.split(" ");

  var weeks = getWeeksFromModelOutput(modelOutput[0], modelOutput[1]);
  return (weeklySalary * weeks).toFixed(2);
}

export default dollarsFromBardalModelOutput;
