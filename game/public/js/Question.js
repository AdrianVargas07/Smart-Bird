export default class Question {
  constructor() {
    this.timerId = 0;
    this.timeContainer = document.getElementById('time');
    this.correctAnswer = false;
  }

  /* Getters and setters */

  getTimerId() {
    return this.timerId;
  }

  setTimerId(timerId) {
    this.timerId = timerId;
  }

  getTimeContainer() {
    return this.timeContainer;
  }

  getCorrectAnswer() {
    return this.correctAnswer;
  }

  setCorrectAnswer(correctAnswer) {
    this.correctAnswer = correctAnswer;
  }

  /*  Other functions */

  setTimeContainer(textTimeContainer) {
    this.timeContainer.textContent = textTimeContainer;
  }

  showQuestion() {
    window.location = '#question-modal';
  }

  showTimeOut() {
    window.location = '#timeOut-question-modal';
  }

  timerQuestion(timeQuestion, timeContainer) {
    timeContainer.textContent = timeQuestion;
    if (timeQuestion === 0) {
      clearInterval(this.getTimerId());
      this.showTimeOut();
    }
  }

  buildModalQuestion(player, questionJSON, timeFactor) {
    // Time to display the question after clicking the 'take card' option
    setTimeout(() => { this.showQuestion(); }, 250);

    // Time question
    this.timeContainer = document.getElementById('time');
    let timeQuestion = questionJSON.time * timeFactor;
    this.setTimerId(
      setInterval(() => {
        this.timerQuestion(timeQuestion -= 1, this.timeContainer);
      }, 1000),
    );

    // Content question
    const question = document.getElementById('question');
    question.textContent = questionJSON.question;
    // console.log(questionJSON);

    // Content options
    const option1 = document.getElementById('option1');
    const option2 = document.getElementById('option2');
    const option3 = document.getElementById('option3');
    const option4 = document.getElementById('option4');
    option1.textContent = questionJSON.response1;
    option2.textContent = questionJSON.response2;
    option3.textContent = questionJSON.response3;
    option4.textContent = questionJSON.response4;

    // The accept button modal is assigned with respect to color obtained by the player
    const buttonAccetpQuestion = document.getElementById('button-answer-question');
    buttonAccetpQuestion.style.background = player.getColor();
  }

  answerQuestion(questionJSON) {
    // The timer stops
    clearInterval(this.getTimerId());

    this.setCorrectAnswer(false);
    const numberCorrectAnswer = questionJSON.correctAnswer;
    const radioCorrectAnswer = `radio${numberCorrectAnswer}`;
    const correctRadio = document.getElementById(radioCorrectAnswer);
    let incorrectRadio = HTMLElement;

    if (correctRadio.checked) {
      this.setCorrectAnswer(true);
    }

    if (this.getCorrectAnswer()) {
      this.giveFeedbackCorrectOption(correctRadio);
    } else {
      // The radio clicked is searched
      const radios = document.getElementsByClassName('radio-question');
      for (let i = 0; i < radios.length; i += 1) {
        if (radios[i].checked) {
          incorrectRadio = radios[i];
        }
      }

      this.giveFeedbackWrongOption(incorrectRadio);
    }

    this.resetStyleQuestionModal(this.getCorrectAnswer(), correctRadio, incorrectRadio);
  }

  giveFeedbackCorrectOption(correctRadio) {
    const containerCorrectAnswer = correctRadio.parentNode;
    containerCorrectAnswer.style.background = 'lightgreen';
  }

  giveFeedbackWrongOption(incorrectRadio) {
    const containerWrongAnswer = incorrectRadio.parentNode;
    containerWrongAnswer.style.background = 'lightcoral';
  }

  resetStyleQuestionModal(correctAnswer, correctRadio, incorrectRadio) {
    setTimeout(() => {
      // //reset timer
      this.setTimeContainer('');

      // All the radios are unchecked
      correctRadio.checked = false;
      incorrectRadio.checked = false;

      // reset color feedback
      if (correctAnswer) {
        correctRadio.parentNode.style.background = 'gainsboro';
      } else {
        incorrectRadio.parentNode.style.background = 'gainsboro';
      }
      // hide modal
      window.location = '#';
    }, 2000);
  }
}
