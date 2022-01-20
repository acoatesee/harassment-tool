const caseReferencesAsSentenceFragment = (relatedCasesOutput) => {
  if (relatedCasesOutput === undefined || relatedCasesOutput["similarCases"] === undefined) {
    return "";
  }

  const similarCases = relatedCasesOutput["similarCases"];
  var output = "";

  for (var i = 0; i < similarCases.length; i++) {
    if (similarCases[i] !== undefined && similarCases[i].caseRef !== undefined) {
      if (i !== 0) {
        if (i === similarCases.length - 1) {
          output += ", and ";
        } else {
          output += ", ";
        }
      }

      output += similarCases[i].caseRef;
    }
  }

  return output;
}

export default caseReferencesAsSentenceFragment;
