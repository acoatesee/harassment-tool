import React from 'react';
import MultipageSurvey from './components/multipage-survey/multipage-survey.js';
import { HarassmentContent, HarassmentNext } from './components/constants/harassment/harassment-content.js';
// import crowdfundingConsiderations from './../../../constants/inv/inv-html-outputs/crowdfunding-considerations.js';

class HarassmentTool extends React.Component {

  constructor(props) {
    super(props);
    this.toolTitle = "Harassment Investigation Tool";
    this.firstQuestion = "age";
    // this.firstQuestion = "numComplainants"; // fast version
  }

  render() {
    return <MultipageSurvey title={this.toolTitle}
        getOutputToDisplay={this.getOutputToDisplay}
        modelOutputName="outputNotApplicable"
        modelInference={this.inference}
        gtmFormName={this.toolTitle}
        questions={HarassmentContent}
        nextQuestionDict={HarassmentNext}
        firstQuestion={this.firstQuestion}
        canFinishEarly={false}
        toolIntroduction={"This tool is designed to address the growing climate of workplace harassment and the investigations conducted in relation to them. According to the Occupational Health and Safety Act, an employer shall ensure that an investigation is conducted that is appropriate in the circumstances. This is important to both employers and employees since failure to conduct a fair and neutral investigation process could lead to damages, another investigation being ordered, or setting aside the employer’s sanctions. This questionnaire will show you whether your investigation has potential flaws and will flag any flaws at the end."}
        // shouldDisplayCTA={this.shouldDisplayCTA}
        // createToolDetailsForContactLawyer={this.createToolDetailsForContactLawyer}
        // preprocessRelatedCasesForContactLawyer={this.preprocessRelatedCasesForContactLawyer}
        // createSuggestedDemandLetter={this.createSuggestedDemandLetter}
        skipFirst={this.props.skipFirst} />;
  }

  // shouldDisplayCTA() {
  //   return false;
  // }

  // createToolDetailsForContactLawyer(modelOutput) {
  //   console.error("Did not expect to be sending information to a lawyer from this tool.");
  //   const toolDetails = {tool: "Prospectus Exemption Tool"};
  //   return toolDetails;
  // }

  getOutputToDisplay(outputName) {
    // if (outputName === "outputMultipleComplainants") {
    //   return "RED FLAG: When there are multiple complainants or respondents, the more complex the issue and the more likely an external investigator is needed"
    // } else if (outputName === "outputMultipleRespondents") {
    //   return "RED FLAG: When there are multiple complainants or respondents, the more complex the issue and the more likely an external investigator is needed"
    // } else if (outputName === "outputMultipleComplaints") {
    //   return "RED FLAG: When there are multiple complaints, the more complex the issue and the more likely an external investigator is needed"
    // } else if (outputName === "outputInvestigationConfidentiality") {
    //   return "RED FLAG: The investigation process must maintain confidentiality and only necessary information should be disclosed (OHSA 32.0.6 (2)(d)). If complainants are able to compare notes before making the complaint to management, are allowed to hear their complaints in front of one another, and are not cautioned not to speak to each other about their respective complaints"
    // } else if (outputName === "outputOutsideDismissed") {
    //   return "RED FLAG: the employer may have failed to investigate the complaint properly since the incident was dismissed without reason"
    // } else if (outputName === "outputInvestigationProcess") {
    //   return "RED FLAG: According to the OHSA, an employer should have detailed measures and procedures for reporting incidents of workplace harassment and also explanations for how these incidents and complaints will be investigated (OHSA 32.0.6 (2)(a)(c)). If the employer has no policy, the investigation may be flawed if an internal investigator (i.e. someone from the organization) lacks the experience, knowledge, and training needed to conduct proper investigations (Schneider)."
    // } else if (outputName === "outputUnionRepresentation") {
    //   return "RED FLAG Union Representation: Union members have a right to support by a union representative during the investigation process. If you were not offered that, or if someone prevented you from having it, there might be an issue with the investigation."
    // } else if (outputName === "outputUnionRepresentationBlockedEmp") {
    //   return "RED FLAG Union Representation: Union members have a right to support by a union representative during the investigation process. If you were not offered that, or if someone prevented you from having it, there might be an issue with the investigation."
    // } else if (outputName === "outputUnionRepresentationBlockedInv") {
    //   return "RED FLAG Union Representation: Union members have a right to support by a union representative during the investigation process. If you were not offered that, or if someone prevented you from having it, there might be an issue with the investigation."
    // } else if (outputName === "outputUnionSameRepConsent") {
    //   return "RED FLAG Conflicting Representation: There may be a potential conflict if the same union member represents the complainant and respondent. If both parties consented to this, it may be less of an issue."
    // } else if (outputName === "outputUnionLocation") {
    //   return "RED FLAG EMPLOYER INTERFERENCE - If the harassment (or other issues) took place only during union business, then the employer might not have a right to investigate as this could constitute interference with union business."
    // }
    console.error(`Current question name ${outputName} is not included in the expected output names.`);
    return null;
  }

  // preprocessRelatedCasesForContactLawyer() {
  //   return "";
  // }

  createSuggestedDemandLetter() {
    return "";
  }

  inference() {
    console.log("Inference was called on the prospectus tool. This should never be the case.");
    return 0;
  }
}

export default HarassmentTool;
