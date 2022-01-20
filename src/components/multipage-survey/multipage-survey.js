import React from 'react';
import PropTypes from 'prop-types';
import StartingInfo from './starting-info.js';
import MultipleChoiceQuestion from '../basic-views/multiple-choice/multiple-choice-question';
import CheckboxesQuestion from '../basic-views/checkboxes/checkboxes-question.js';
import TextQuestion from '../basic-views/text-questions/text-question.js';
import {isEmptyText, isNumeric} from '../../utils/validation.js';
import calculateMaxRemainingQuestionsForAll from '../../utils/calculate-remaining-questions-for-all.js';
import Alert from '../basic-views/alert/alert.js';
import ProgressSection from './progress-section.js';
// import ContactLawyerCTA from './../contact-lawyer-cta/contact-lawyer-cta.js';
import bg from './../../images/background-images/multipage-survey-bg.svg';
import onlyUnique from '../../utils/only-unique.js';
import './multipage-survey.css';
import '../btn.css';

class MultipageSurvey extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentQuestionName: "STARTING_SCREEN",
      currentQuestion: { question: this.props.toolIntroduction },
      textAnswers: {},
      numericalAnswers: {},
      path: [],
      alertMessage: ""
    };

    // Used instead of a comma when checkboxes answers are joined into a String
    // because it won't conflict with commas in answer options.
    this.checkboxesSplitSymbol = "<|>";

    this.createProgressSection = this.createProgressSection.bind(this);
    // this.createCTA = this.createCTA.bind(this);
    this.createContent = this.createContent.bind(this);
    this.createBackButton = this.createBackButton.bind(this);
    this.createNextButton = this.createNextButton.bind(this);
    this.validate = this.validate.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onBackKeyDown = this.onBackKeyDown.bind(this);
    this.onNextKeyDown = this.onNextKeyDown.bind(this);
    this.getNextQuestionName = this.getNextQuestionName.bind(this);
    this.onMCAnswerSelected = this.onMCAnswerSelected.bind(this);
    this.onCheckboxesAnswerSelected = this.onCheckboxesAnswerSelected.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.refreshQuestion = this.refreshQuestion.bind(this);
    this.showStartingScreen = this.showStartingScreen.bind(this);

    // These functions should not be changed during runtime because the constructor is only run once
    // so they would not get re-bound.
    this.getOutputToDisplay = props.getOutputToDisplay.bind(this);
    this.getInfoToDisplay = props.getInfoToDisplay.bind(this);
    this.modelInference = props.modelInference.bind(this);
    // this.shouldDisplayCTA = props.shouldDisplayCTA.bind(this);
    // this.createToolDetailsForContactLawyer = props.createToolDetailsForContactLawyer.bind(this);
    // this.createSuggestedDemandLetter = props.createSuggestedDemandLetter.bind(this);

    // if (props.findRelatedCases !== undefined) {
    //   this.findRelatedCases = props.findRelatedCases.bind(this);
    // }

    // Pre-calculate questions left for each possible node
    this.remainingQuestionsForAll = calculateMaxRemainingQuestionsForAll(props.firstQuestion, props.nextQuestionDict);

    // Skip the introduction page but keep it on the stack in case the user presses back
    if (this.props.skipFirst) {
      this.state.path.push(this.state.currentQuestionName);
      this.state = {
        ...this.state,
        currentQuestionName: props.firstQuestion,
        currentQuestion: this.props.questions[props.firstQuestion],
        alertMessage: ""
      };
    }
  }

  render() {
    return (
      <div style={{backgroundImage: `url(${bg})`}} className="multipage-survey-wrapper">
        <div className="multipage-survey-column">
          { this.createProgressSection() }
          { this.createContent() }
          <StartingInfo canFinishEarly={this.props.canFinishEarly} show={this.state.path.length === 0} time={this.props.time} />
          <Alert text={this.state.alertMessage} />
          <div className="btn-row">
            { this.createBackButton() }
            { this.createNextButton() }
          </div>
        </div>
        {/* { this.createCTA() } */}
      </div>
    );
  }

  createProgressSection() {
    if (this.state.currentQuestion !== undefined) {
      const currentQuestionNumber = this.state.path.length;
      let numberOfQuestions = this.remainingQuestionsForAll[this.props.firstQuestion];
      if (this.state.currentQuestionName !== "STARTING_SCREEN") {
          // -1 because we have not finished answering the current question yet so the current question is already
          // included in the remaining questions number
          numberOfQuestions = this.remainingQuestionsForAll[this.state.currentQuestionName] + currentQuestionNumber - 1;
      }

      return (
        <ProgressSection title={this.props.title}
                           questionNumber={currentQuestionNumber}
                           numberOfQuestions={numberOfQuestions}
                           canFinishEarly={this.props.canFinishEarly} />
      );
    }
  }

  // createCTA() {
  //   if (this.state.currentQuestion === undefined && this.shouldDisplayCTA()) {
  //     const toolDetails = this.createToolDetailsForContactLawyer(this.state.modelOutput);
  //     const contactLawyerRelatedCases = this.props.preprocessRelatedCasesForContactLawyer(this.state.relatedCasesOutput);
  //     const suggestedDemandLetterText = this.createSuggestedDemandLetter(this.state.modelOutput, this.state.relatedCasesOutput);
  //     return <div className="multipage-survey-column">
  //             <ContactLawyerCTA relatedCases={contactLawyerRelatedCases} textAnswers={this.state.textAnswers} toolDetails={toolDetails} suggestedDemandLetterText={suggestedDemandLetterText} />
  //            </div>;
  //   }
  // }

  createContent() {
    if (this.state.currentQuestion !== undefined) {
      if (this.state.currentQuestion.questionType === "mc") {
        // Avoid having the initial answer set for a totally different question
        // that coincidentally has the same question text as another.
        // Text fields still suffer from this issue, it is not patched yet
        // because it has not come up in any tools. It'd be trickier to fix because
        // there are no numerical answers to check against.
        // There are also other issues like both question answers being passed to
        // LeadAssign which we are not addressing yet.
        let initialAnswer = "";
        if (this.state.currentQuestionName in this.state.numericalAnswers) {
          initialAnswer = this.state.currentQuestion.answerOptions[this.state.numericalAnswers[this.state.currentQuestionName]];
        }

        return <MultipleChoiceQuestion
                question={this.state.currentQuestion.question}
                explanation={this.state.currentQuestion.explanation}
                answerOptions={this.state.currentQuestion.answerOptions}
                icon={this.state.currentQuestion.icon}
                key={`${this.state.currentQuestionName}MultipleChoiceQuestionKey`}
                initialAnswer={initialAnswer}
                invalid={this.state.alertMessage !== ""}
                onAnswerSelected={this.onMCAnswerSelected}
                name={`${this.state.currentQuestionName}MultipleChoice`} />;
      } else if (this.state.currentQuestion.questionType === "checkboxes") {
        let initialAnswers = [];
        if (this.state.currentQuestion.question in this.state.textAnswers) {
          initialAnswers = this.state.textAnswers[this.state.currentQuestion.question].split(this.checkboxesSplitSymbol);
        }

        return <CheckboxesQuestion
                question={this.state.currentQuestion.question}
                explanation={this.state.currentQuestion.explanation}
                answerOptions={this.state.currentQuestion.answerOptions}
                icon={this.state.currentQuestion.icon}
                key={`${this.state.currentQuestionName}CheckboxesQuestionKey`}
                initialAnswers={initialAnswers}
                invalid={this.state.alertMessage !== ""}
                onAnswerSelected={this.onCheckboxesAnswerSelected} />;
      } else if (this.state.currentQuestion.questionType !== undefined) {
        return <TextQuestion
                question={this.state.currentQuestion.question}
                explanation={this.state.currentQuestion.explanation}
                icon={this.state.currentQuestion.icon}
                type={this.state.currentQuestion.questionType}
                key={`${this.state.currentQuestionName}TextQuestionKey`}
                name={`${this.state.currentQuestionName}TextQuestion`}
                onChange={this.onTextChange}
                invalid={this.state.alertMessage !== ""}
                initialValue={this.state.textAnswers[this.state.currentQuestion.question]}
                dollarSign={this.state.currentQuestion.dollarSign} />;
      } else {
        // Displays info on the starting page
        return <p className="question-text">{this.state.currentQuestion.question}</p>;
      }
    } else if (this.state.currentQuestionName.startsWith("info")) {
      // Display info message, will continue on to other question when user presses Next
      return this.getInfoToDisplay(this.state.currentQuestionName);
    } else {
      return this.getOutputToDisplay(this.state.currentQuestionName);
    }
  }

  createBackButton() {
    if (this.state.path.length > 0) {
      return <div className="btn" onClick={this.onBack} onKeyDown={this.onBackKeyDown} tabIndex="0">{this.createBackText()}</div>;
    } else {
      // Hide the button but still have it impact the positioning of the Next button
      return <div className="btn" style={{visibility: "hidden"}} tabIndex="0">Back</div>;
    }
  }

  createNextButton() {
    if (this.state.currentQuestionName === "STARTING_SCREEN") {
      return <div className="btn red-btn" onClick={this.onNext} onKeyDown={this.onNextKeyDown} tabIndex="0">Start</div>;
    }

    if (this.state.currentQuestion !== undefined || this.state.currentQuestionName.startsWith("info")) {
      return <div className="btn red-btn" onClick={this.onNext} onKeyDown={this.onNextKeyDown} tabIndex="0">Next</div>;
    } else {
      // Hide the button but still have it impact the positioning of the Back button
      return <div className="btn" style={{visibility: "hidden"}}>Next</div>;
    }
  }

  createBackText() {
    if (this.state.currentQuestion === undefined) {
      return "Back to previous question";
    } else {
      return "Back";
    }
  }

  onNextKeyDown(e) {
    if (e.keyCode === 13){
      this.onNext();
    }
  }

  onBackKeyDown(e) {
    if (e.keyCode === 13){
      this.onBack();
    }
  }

  onBack() {
    // Take the last question name off the path stack
    const goTo = this.state.path.pop();

    if (goTo === "STARTING_SCREEN") {
      this.showStartingScreen();
    } else {
      // Update the UI to show the previous question
      this.refreshQuestion(goTo);
    }
  }

  validate(questionAnswer, questionType) {
    if (questionAnswer === undefined && questionType !== "checkboxes") {
      return "Please answer the question to the best of your ability.";
    } else if (questionType === "text" || questionType === "numeric") {
      if (isEmptyText(questionAnswer)) {
        return "The text field cannot be empty.";
      } else if (questionType === "numeric" && !isNumeric(questionAnswer)) {
        return "The text field expecting a number contained text. Make sure not to include decimals, commas, dollar signs, or spaces with your number.";
      } else if (questionType === "numeric" && this.state.currentQuestion.maxValue !== undefined && parseInt(questionAnswer) > this.state.currentQuestion.maxValue) {
        return `The number cannot be larger than ${this.state.currentQuestion.maxValue}.`;
      } else if (questionType === "numeric" && this.state.currentQuestion.minValue !== undefined && parseInt(questionAnswer) < this.state.currentQuestion.minValue) {
        return `The number must be larger than or equal to ${this.state.currentQuestion.minValue}.`;
      }
    }
    return "";
  }

  onNext() {
    if (this.state.currentQuestionName === "STARTING_SCREEN") {
      this.state.path.push(this.state.currentQuestionName);
      this.refreshQuestion(this.props.firstQuestion);
      return;
    }

    // Validate the current question's answers IF we were on a question,
    // remember info messages do not have a question
      if (this.state.currentQuestion !== undefined) {
      const questionAnswer = this.state.textAnswers[this.state.currentQuestion.question];
      const questionType = this.state.currentQuestion.questionType;
      const alertMessage = this.validate(questionAnswer, questionType);

      if (alertMessage !== "") {
        this.setState(prevState => ({
          alertMessage: alertMessage
        }));
        return;
      }
    }

    // Store the current question in the path stack
    this.state.path.push(this.state.currentQuestionName);

    // Get the next question to go to
    const goTo = this.getNextQuestionName();

    // Update the UI to show the next question
    this.refreshQuestion(goTo);

    // Run the model if we just transitioned to the model output page AND
    // we have not already run the model for this set of inputs before.
    if (goTo === this.props.modelOutputName && this.state.modelOutput === undefined) {
      this.modelInference().then((response) => {
        // Google Tag Manager event for a successful submission
        window.dataLayer.push({
           'event': 'Form Submission',
           'formType': this.props.gtmFormName
        });

        this.storeModelInference(response);
      }).catch((error) => this.setState(prevState => ({
            alertMessage: error.toString() + " Please press the Back button then Next again to re-run the model."
          })
        )
      );

      if (this.findRelatedCases !== undefined) {
        this.findRelatedCases().then((response) => this.setState(
            prevState => ({ relatedCasesOutput: response.data })
        )).catch((error) => console.error(error));
      }
    }
  }

  storeModelInference(response) {
    if ("modelOutput" in response.data) {
      if ("relatedCasesOutput" in response.data) {
        this.setState(
          prevState => (
            {
              alertMessage: "",
              modelOutput: response.data["modelOutput"],
              relatedCasesOutput: response.data["relatedCasesOutput"]
            }
          )
        );
      } else {
        this.setState(
          prevState => (
            {
              alertMessage: "",
              modelOutput: response.data["modelOutput"]
            }
          )
        );
      }
    } else {
      this.setState(
        prevState => (
          {
            alertMessage: "",
            modelOutput: response.data["predictions"][0]
          }
        )
      );
    }
  }

  getNextQuestionName() {
    if (this.state.currentQuestion !== undefined && this.state.currentQuestion.questionType === "mc") {
      const currentAnswer = this.state.numericalAnswers[this.state.currentQuestionName]
      const nextWithCurrentAnswer = this.props.nextQuestionDict[this.state.currentQuestionName][currentAnswer];
      if (nextWithCurrentAnswer !== undefined) {
        return nextWithCurrentAnswer;
      }
    }

    // Default, used for text input or some MC questions were multiple answers lead to the same place
    return this.props.nextQuestionDict[this.state.currentQuestionName].default;
  }

  refreshQuestion(goTo) {
    this.setState(prevState => ({
      currentQuestionName: goTo,
      currentQuestion: this.props.questions[goTo],
      alertMessage: ""
    }));
  }

  showStartingScreen() {
    this.setState(prevState => ({
      currentQuestionName: "STARTING_SCREEN",
      currentQuestion: { question: this.props.toolIntroduction },
      alertMessage: ""
    }));
  }

  onMCAnswerSelected(e) {
    const value = e.target.value;
    const index = this.state.currentQuestion.answerOptions.indexOf(value);

    this.setState(prevState => ({
      textAnswers: {
        ...prevState.textAnswers,
        [prevState.currentQuestion.question]: value
      },
      numericalAnswers: {
        ...prevState.numericalAnswers,
        [prevState.currentQuestionName]: index
      },
      alertMessage: "",
      modelOutput: undefined // Force model to rerun next time we encounter it now that we changed its inputs
    }));
  }

  onCheckboxesAnswerSelected(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;
    const index = this.state.currentQuestion.answerOptions.indexOf(value);

    if (isChecked) {
      // Create array in numericalAnswers if there is none
      if (!(this.state.currentQuestionName in this.state.numericalAnswers)) {
        this.setState(prevState => ({
          textAnswers: {
            ...prevState.textAnswers,
            [prevState.currentQuestion.question]: value
          },
          numericalAnswers: {
            ...prevState.numericalAnswers,
            [prevState.currentQuestionName]: [index]
          },
          alertMessage: "",
          modelOutput: undefined // Force model to rerun next time we encounter it now that we changed its inputs
        }));
      } else {
        // Add to numerical answers array and join the array into a String
        this.setState(prevState => ({
          textAnswers: {
            ...prevState.textAnswers,
            [prevState.currentQuestion.question]: prevState.numericalAnswers[prevState.currentQuestionName].concat(index).filter(onlyUnique).map(index => prevState.currentQuestion.answerOptions[index]).join(this.checkboxesSplitSymbol)
          },
          numericalAnswers: {
            ...prevState.numericalAnswers,
            [prevState.currentQuestionName]: prevState.numericalAnswers[prevState.currentQuestionName].concat(index).filter(onlyUnique)
          },
          alertMessage: "",
          modelOutput: undefined // Force model to rerun next time we encounter it now that we changed its inputs
        }));
      }
    } else {
      // Removing from answers, we assume array was initialized already
      // otherwise there wouldn't be anything for the user to uncheck.
      this.setState(prevState => ({
        textAnswers: {
          ...prevState.textAnswers,
          [prevState.currentQuestion.question]: prevState.numericalAnswers[prevState.currentQuestionName].filter(item => item !== index).join(this.checkboxesSplitSymbol)
        },
        numericalAnswers: {
          ...prevState.numericalAnswers,
          [prevState.currentQuestionName]: prevState.numericalAnswers[prevState.currentQuestionName].filter(item => item !== index)
        },
        alertMessage: "",
        modelOutput: undefined // Force model to rerun next time we encounter it now that we changed its inputs
      }));
    }
  }

  onTextChange(e) {
    const value = e.target.value;
    this.setState(prevState => ({
      textAnswers: {
        ...prevState.textAnswers,
        [prevState.currentQuestion.question]: value
      },
      modelOutput: undefined // Force model to rerun next time we encounter it now that we changed its inputs
    }));
  }
}

MultipageSurvey.defaultProps = {
  canFinishEarly: true,
  getInfoToDisplay: (() => null)
}

MultipageSurvey.propTypes = {
  title: PropTypes.string.isRequired,
  getOutputToDisplay: PropTypes.func.isRequired,
  getInfoToDisplay: PropTypes.func,
  modelOutputName: PropTypes.string.isRequired,
  modelInference: PropTypes.func.isRequired,
  gtmFormName: PropTypes.string.isRequired,
  firstQuestion: PropTypes.string.isRequired,
  // shouldDisplayCTA: PropTypes.func.isRequired,
  // preprocessRelatedCasesForContactLawyer: PropTypes.func.isRequired,
  // createToolDetailsForContactLawyer: PropTypes.func.isRequired,
  // createSuggestedDemandLetter: PropTypes.func.isRequired,
  canFinishEarly: PropTypes.bool,
  findRelatedCases: PropTypes.func,
  time: PropTypes.number
}

export default MultipageSurvey;
