import blueQuestion from './JsonQuestions/blue.js';
import redQuestion from './JsonQuestions/red.js';
import greenQuestion from './JsonQuestions/green.js';
import yellowQuestion from './JsonQuestions/yellow.js';
import purpleQuestion from './JsonQuestions/purple.js';

const sectionBoard1 = 18;
const sectionBoard2 = 36;
export default class Question {
  constructor() {
    this.redQuestionJson = [redQuestion.difficulty1, redQuestion.difficulty2, redQuestion.difficulty3];
    this.blueQuestionJson = [blueQuestion.difficulty1, blueQuestion.difficulty2, blueQuestion.difficulty3];
    this.greenQuestionJson = [greenQuestion.difficulty1, greenQuestion.difficulty2, greenQuestion.difficulty3];
    this.yellowQuestionJson = [yellowQuestion.difficulty1, yellowQuestion.difficulty2, yellowQuestion.difficulty3];
    this.purpleQuestionJson = [purpleQuestion.difficulty1, purpleQuestion.difficulty2, purpleQuestion.difficulty3];
  }

  getQuestion(jsonMessage) {
    const difficultyLevel = this.getDifficultyLevel(jsonMessage.playerPosition, jsonMessage.difficulty);
    return this.getQuestionAccordingColor(difficultyLevel, jsonMessage.obtainedColor);
  }

  getDifficultyLevel(playerPosition, typeDifficulty) {
    if (typeDifficulty === 'Incremental') {
      if (playerPosition >= 0 && playerPosition <= sectionBoard1) {
        return 0;
      }
      if (playerPosition > sectionBoard1 && playerPosition <= sectionBoard2) {
        return 1;
      }
      return 2;
    }
    return Math.floor(Math.random() * (3));
  }

  getQuestionAccordingColor(difficultyLevel, obtainedColor) {
    let randomQuestion = 0;
    let jsonQuestion = {};

    switch (obtainedColor) {
      case 'red':
        randomQuestion = Math.floor(Math.random() * (this.redQuestionJson[difficultyLevel].length));
        jsonQuestion = this.redQuestionJson[difficultyLevel][randomQuestion];
        break;
      case 'blue':
        randomQuestion = Math.floor(Math.random() * (this.blueQuestionJson[difficultyLevel].length));
        jsonQuestion = this.blueQuestionJson[difficultyLevel][randomQuestion];
        break;
      case 'green':
        randomQuestion = Math.floor(Math.random() * (this.greenQuestionJson[difficultyLevel].length));
        jsonQuestion = this.greenQuestionJson[difficultyLevel][randomQuestion];
        break;
      case 'yellow':
        randomQuestion = Math.floor(Math.random() * (this.yellowQuestionJson[difficultyLevel].length));
        jsonQuestion = this.yellowQuestionJson[difficultyLevel][randomQuestion];
        break;
      case 'purple':
        randomQuestion = Math.floor(Math.random() * (this.purpleQuestionJson[difficultyLevel].length));
        jsonQuestion = this.purpleQuestionJson[difficultyLevel][randomQuestion];
        break;
      default:
        break;
    }

    jsonQuestion.type = 'question';
    jsonQuestion.obtainedColor = obtainedColor;
    console.log(`Generate response: [Color: ${obtainedColor}, Difficulty: ${difficultyLevel}]`);
    return jsonQuestion;
  }
}
