//jshint esversion:6
countdown();
let Examquestions = new question($(".pregunta"));
let ExamAnswers = new answers($(".botonRespuesta"));
let Simulador = new Game(Examquestions, 0, 0);
let Exam_index=new index($(".index"));
Examquestions.show(0);

ExamAnswers.allAnswers.click(function() {
  var id = "#" + $(this).closest("section").attr("id") + " .botonRespuesta"; // select the clicked section(test)
  let TestAnswers = new answers($(id));
  TestAnswers.flip(); ///alows to press a button more than once
  var clicked = new clickedAnswer($(this), Simulador);
  clicked.shine();
  clicked.disable();
  clicked.score();


});

$(".finish").click(() => {
  ExamAnswers.revealClicked();
  ExamAnswers.disable();
  Exam_index.paintIndexS();
  Simulador.calculateScore();
});
$(".prev").click(() => {
  Simulador.prev();
});
$(".next").click(() => {
  let clicked_index=new index($("#B" + Simulador.getindex()));
  Simulador.next();
  if(clicked_index.index.hasClass("btn-warning")){

  }
  else{
    clicked_index.paint("light");
  }

});
$(".Highlight").click((e) =>{
let clicked_index=new index($("#B" + Simulador.getindex()));
clicked_index.Highlight();
});

Exam_index.index.click((e) => {
  clicked_id = e.target.id;
  let clickedIndex=new index($("#" + clicked_id));
  clickedIndex.paint("light");
  numberid = clickedIndex.index.html();
  numberid = parseInt(numberid);
  Simulador.setindex(numberid);
});
