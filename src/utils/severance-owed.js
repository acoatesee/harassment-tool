import ontarioYearsToWeeksOfStatMin from './ontario-years-to-weeks-of-statutory-minimum.js';

function severanceOwed(numericalAnswers, employmentDuration) {
  if (employmentDuration >= 5) {
    // Already know user worked 5+ years thanks to if-statement.
    const ontarioEligibleForSeverance =
      // Terminated
      (numericalAnswers.laidOff === 1 &&
        numericalAnswers.workplaceLocation === 0 &&
        ((numericalAnswers.hasContractOntario === 1 &&
         numericalAnswers.hasLetterOfOfferOntario === 1 &&
         numericalAnswers.ontarioTypeOfEmploymentSeveranceSituations <= 2 &&
         numericalAnswers.ontarioTypeOfEmploymentPayrollOver === 0) ||
         ((numericalAnswers.hasContractOntario === 0 ||
          numericalAnswers.hasLetterOfOfferOntario === 0) &&
          numericalAnswers.ontarioStatMinSeveranceSituations <= 2 &&
          numericalAnswers.ontarioStatMinPayrollOver === 0))) ||

      // Laid off
      (numericalAnswers.laidOff !== 1 &&
        numericalAnswers.covidWorkplaceLocation === 0 &&
        ((numericalAnswers.ontarioTempLayOffInContract !== 1 &&
          numericalAnswers.ontarioTypeOfEmploymentSeveranceSituations <= 2 &&
          numericalAnswers.ontarioTypeOfEmploymentPayrollOver === 0) ||
          (numericalAnswers.ontarioTempLayOffInContract === 1 &&
           numericalAnswers.ontarioStatMinPayrollOver === 0)));

    if (ontarioEligibleForSeverance) {
      return ontarioYearsToWeeksOfStatMin(employmentDuration);
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}

export default severanceOwed;
