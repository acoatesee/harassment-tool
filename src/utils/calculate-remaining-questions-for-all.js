// Calculate how many questions the user needs to answer to reach the end of the
// tool. Assumes relationships has no cycles.
function calculateMaxRemainingQuestions(rootKey, relationships, memo) {
  // No remaining questions, current key is likely an output key
  if (!rootKey || !relationships[rootKey]) {
    return 0;
  }

  // Check for a memoized answer
  if (rootKey in memo) {
    return memo[rootKey];
  }

  // Calculate the longest possible path using recursion
  const rootNode = relationships[rootKey];
  let max = 0;
  for (const questionKey in rootNode) {
    const childKey = rootNode[questionKey];
    const possibleNewMax = calculateMaxRemainingQuestions(childKey, relationships, memo);
    if (possibleNewMax > max) {
      max = possibleNewMax;
    }
  }

  // Include the current question in the max
  max++;

  // Memoize the current answer
  memo[rootKey] = max;

  return max;
}

// Calculate the remaining questions for each node below the root then print
// the memo. The memo can be used in the tools to update the progress bar.
function calculateMaxRemainingQuestionsForAll(rootKey, relationships) {
  const remainingQuestionsForAll = {};
  calculateMaxRemainingQuestions(rootKey, relationships, remainingQuestionsForAll);
  return remainingQuestionsForAll;
}

export default calculateMaxRemainingQuestionsForAll;
