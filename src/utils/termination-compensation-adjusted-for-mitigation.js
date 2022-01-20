import moneyEarned from './money-earned.js';

function terminationCompensationAdjustedForMitigation(terminationCompensation, weeksWorked, yearlySalary) {
  if (isNaN(weeksWorked) || weeksWorked === 0 || isNaN(yearlySalary)) {
    return terminationCompensation;
  }

  return terminationCompensation - moneyEarned(weeksWorked, yearlySalary);
}

export default terminationCompensationAdjustedForMitigation;
