//jshint esversion:6

class Phone extends Comodin {
  constructor(counter,game) {
    super(counter);
    this.game=game;

  }

  action() {
    this.game.examQ.allQuestions.each((index, element) => {
      let preguntaClass = $(element).attr("class");//has to be like this
      if (preguntaClass === "pregunta") {
        var id = "#" + $(element).attr("id");//here you can use game.index
        id = id + " .botonRespuesta";
        let Testanswers =  new answers ($(id));
        if (getRandomInt(4)!= 1) {


          Testanswers.allAnswers.each((index, element) => {
            let value = $(element).attr("value");
            if (value === "true") {
              alert($(element).text());
            }
          });
      }

      else {
        let wrongAnswers = [];
        Testanswers.allAnswers.each((index, element) => {
          let value = $(element).attr("value");
          if (value === "false") {
            wrongAnswers.push(element);

          }

        });
        alert($(wrongAnswers[getRandomInt(3)]).text());

      }
      }

    });




}
  execute() {
  if(this.counter>0){
    this.action();
    this.counter--;
  }
}
}
let Examquestions = new question($(".pregunta"));
let ExamAnswers = new answers($(".botonRespuesta"));
let QuienGame = new Game(Examquestions, 0, 0);
let QuienIndex=new index($(".index"));
let phone= new Phone(10,QuienGame);
Examquestions.show(0);

ExamAnswers.allAnswers.click(function() {
  var id = "#" + $(this).closest("section").attr("id") + " .botonRespuesta"; // select the clicked section(test)
  let TestAnswers = new answers($(id));
  var clicked = new clickedAnswer($(this), QuienGame);
  clicked.shine();
  clicked.reveal();
  if(clicked.answers.attr("value")==="true"){
    let clicked_index=new index($("#B" + QuienGame.getindex()));
    clicked_index.paint("success");
  }
  TestAnswers.disable();




});


$(".phone").click(() => {
  phone.execute();
});
