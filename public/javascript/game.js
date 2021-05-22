//jshint esversion:6

let timeCounter = 0;
let timeLeft = 720;

function convertSeconds(s) {
  var min = Math.floor(s / 60);
  var sec = s % 60;
  return min + ": " + sec;
}

// needs to be 5 to get number [0:4]
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function countdown() {

  let timer = $("#watch");
  timer.html(timeLeft - timeCounter);

  function timeIt() {
    timeCounter++;
    timer.html(convertSeconds(timeLeft - timeCounter));
    if (timeLeft === timeCounter) {
      Examquestions.show(-1);
    }
  }
  setInterval(timeIt, 1000);

}
class Comodin {

  constructor(counter) { //number of times an action can be called

    this.counter = counter;

  }
  action() {
    counter--;
  }
}
class question {
  constructor(question) {
    this.question = question;
  }

  show(wich = -1) { /// -1 hides all the questions
    this.question.each(function(index, element) {
      $(element).attr("class", "pregunta hide");
      if (index === wich && wich >= 0) {
        $(element).attr("class", "pregunta");
      }
    });
  }

  get allQuestions() {
    return this.question;
  }


}
class answers {
  constructor(answers) {
    this.answers = answers;

  }
  disable() {

    this.answers.each(function(index, element) {
      //$(element).attr("class", "disabled botonRespuesta btn  btn-block");
      $(element).addClass("disabled ");

    });

  }
  flip() {
    this.answers.each(function(index, element) {
      $(element).removeClass("botonRespuesta btn btn-warning btn-block");
      $(element).attr("class", "botonRespuesta");

    });
  }
  get allAnswers() {
    return this.answers;
  }
  revealAll() {
    this.answers.each((index, element) => {
      var value = $(element).attr("value");
      if (value === "true" ) {
        $(element).attr("class", "disabled botonRespuesta btn btn-success btn-block");


      } else {
        $(element).attr("class", "disabled botonRespuesta btn btn-outline-danger btn-block");


      }
    });
  }
  revealClicked() {
    this.answers.each((index, element) => {
      var value = $(element).attr("value");
      var clickedAns= $(element).hasClass("btn-warning");
      if (value === "true" && clickedAns) {
        $(element).attr("class", "disabled botonRespuesta btn btn-success btn-block");


      } else if(clickedAns) {
        $(element).attr("class", "disabled botonRespuesta btn btn-outline-danger btn-block");


      }
    });
  }


  //set answers( ans){ this.answers = answers;}
}
class clickedAnswer extends answers {
  constructor(answer, game) {
    super(answer);
    this.game = game;
  }
  shine() {

    this.answers.attr("class", "botonRespuesta btn btn-warning btn-block");
    this.answers.fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);

  }
  score() {
    var index = this.game.getindex();
    var value = this.answers.attr("value"); // true or false
    var pressedButton = this.answers;
    this.game.setGrades(index, value);
    //console.log(this.game.grades);

  }
  reveal() {
    var value = this.answers.attr("value"); // true or false
    var pressedButton = this.answers; ////it has to be like this set timeout makes this =undifined
    var temGame=this.game;////it has to be like this set timeout makes this =undifined
    setTimeout(function() {
      //  SOLVED SOLVED
      if (value === "true") {
        pressedButton.attr("class", "disabled botonRespuesta btn btn-success btn-block");

        setTimeout(function() {temGame.next();},1100);

      } else {
        pressedButton.attr("class", "disabled botonRespuesta btn btn-outline-danger btn-block");
        setTimeout(function() {  temGame.examQ.show(-1);},1100);
      //BUG SHOW IS METHOD FROM QUESTION NOT GAME

      }
    }, 2100);


  }


}
class Game {
  constructor(examQ, index =0, score = 0) { //questions/answers/indeex..
    this.score = score;
    this.index = index; //curent question displayed index 1 question 1
    this.examQ = examQ;
    var grades = [];
    this.examQ.allQuestions.each(function(index, element) {
      grades[index] = 0;
    });
    this.grades = grades;
  }
  next() {
    if(this.index < this.grades.length  ){
      this.index++;
      this.examQ.show(this.index);
    }


  }
  prev() {
    if (this.index > 0) {
      this.index--;
      this.examQ.show(this.index);
    }

  }
  setindex(index) {
    this.index = index;
    this.examQ.show(this.index);
  }
  getindex() {
    return this.index;
  }
  setGrades(index, grade) {
    this.grades[index] = grade;
  }
  getGrades(index) {
    return this.grades[index] ;
  }
   calculateScore() {

    for (var c = 0; c < this.grades.length; c++) {
     this.score = this.score +(this.grades[c]== "true");
      //console.log(this.score);

    }
    this.examQ.show(-1);
    $(".score").html("Tu resultado es "+this.score+ " sobre " + this.grades.length);
    $(".score").attr("class", "score ");
  }


}

class index{
  constructor(index){
    this.index=index;
  }
  paint(color){//light //Warning Success Danger
   this.index.attr("class","btn btn-"+color);
  }
  Highlight(){//light //Warning Success Danger
    this.index.removeClass("active btn btn-dark");
    this.index.removeClass("active btn btn-light");
    this.index.addClass( "btn btn-warning");
   //this.index[pos].toggleClass("btn btn-Danger");
  }
  paintIndexS(){
    this.index.each(function(index, element){

      if(Simulador.getGrades(index)==="true"){
      $(element).attr("class","btn btn-success");
      }
      else{

        $(element).attr("class","btn btn-danger");
      }

    });
  }


}
