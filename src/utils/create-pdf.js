import jsPDF from 'jspdf';

function createPDF(questionsAndAnswersMap, title) {
  var doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;

  doc.setFontStyle("bold");
  doc.setFontSize(14);
  doc.text(title, 105, 20, null, null, "center");

  doc.setFontStyle("normal");
  doc.setFontSize(12);
  doc.text("Powered by the Conflict Analytics Lab at Queen's University.", 105, 26, null, null, "center");

  doc.setFontStyle("bold");
  doc.setFontSize(11);
  doc.text("Your inputs", 20, 35);

  doc.setFontStyle("normal");
  var y = 35;
  const questions = Object.keys(questionsAndAnswersMap);
  for (var i = 1; i <= questions.length; i++) {
    const questionStrings = doc.splitTextToSize("Q: " + questions[i-1], 170);
    y += 8;

    // Move text on to the next page if we reached the end of the current one
    // and have more questions to go.
    if (y >= pageHeight - 20) {
      doc.addPage();
      y = 20;
    }

    doc.text(questionStrings, 20, y);
    y += 6 * (questionStrings.length - 1); // Add extra spacing if we took up more than one line

    const answerStrings = doc.splitTextToSize("A: " + questionsAndAnswersMap[questions[i-1]], 170);
    y += 6;
    doc.text(answerStrings, 20, y);
    y += 6 * (answerStrings.length - 1);
  }

  // Set default font size to 12 even though we use 11 for Q&A page
  doc.setFontSize(12);
  return doc;
}

export default createPDF;
