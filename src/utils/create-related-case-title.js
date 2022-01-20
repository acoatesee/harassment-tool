import React from 'react';

const createRelatedCaseTitle = (relatedCase) => {
  if (relatedCase["url"] !== undefined && relatedCase["url"].startsWith("http")) {
    return <h4><a href={relatedCase["url"]} rel="nofollow noopener noreferrer" target="_blank">{relatedCase["caseRef"]}</a></h4>;
  } else {
    return <h4>{relatedCase["caseRef"]}</h4>;
  }
}

export default createRelatedCaseTitle;
