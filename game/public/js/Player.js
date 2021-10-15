export default class Player {
  constructor(id) {
    this.id = id;
    this.colorNumberObtain = 0;
    this.color = '';
    this.actualPosition = 0;
    this.avatar = document.getElementById(localStorage.getItem('username'));
  }

  /* Getters and setters */

  getIdPlayer() {
    return this.id;
  }

  getColorNumberObtain() {
    return this.colorNumberObtain;
  }

  setColorNumber(colorNumberObtain) {
    this.colorNumberObtain = colorNumberObtain;
  }

  getColor() {
    return this.color;
  }

  setColor(color) {
    this.color = color;
  }

  getActualPosition() {
    return this.actualPosition;
  }

  setActualPosition(actualPosition) {
    this.actualPosition = actualPosition;
  }

  getAvatar() {
    return this.avatar;
  }

  /* Other functions */

  takeCard() {
    this.colorNumberObtain = Math.floor(
      Math.random() * ((5 + 1) - 1) + 1,
    ); // Generate random number between 1 and 5
  }
}
