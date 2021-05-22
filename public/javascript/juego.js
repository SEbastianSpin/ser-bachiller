//jshint esversion:6


const botonesRespuesta = $(".botonRespuesta");
let counter = 0;
let phoneCounter = 0;
let peopleCounter = 0;
let halfCounter = 0;
let timeCounter = 0;
let timeLeft = 720;

showQuestion(counter);
countdown();

botonesRespuesta.click(function() {
  let id = "#" + $(this).closest("section").attr("id");
  id = id + " .botonRespuesta";
  $(id).attr("class", "disabled botonRespuesta btn  btn-block");
  $(this).attr("class", "disabled botonRespuesta btn btn-warning btn-block");
  $(this).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
  let value = $(this).attr("value");
  pressedButton = $(this);

  setTimeout(function() {
    //  SOLVED SOLVED
    if (value === "true") {
      $(pressedButton).attr("class", "disabled botonRespuesta btn btn-success btn-block");
      counter += 1;
      showQuestion(counter);




    } else {
      $(pressedButton).attr("class", "disabled botonRespuesta btn btn-outline-danger btn-block");
      lose();
    }
  }, 2100);





});

$(".phone").click(() => {
  if (phoneCounter === 0) {
    let questions = $(".pregunta");
    questions.each((index, element) => {
      let preguntaClass = $(element).attr("class");
      if (preguntaClass === "pregunta") {

        let id = "#" + $(element).attr("id");
        id = id + " .botonRespuesta";
        let answers = $(id);
        let probability = getRandomInt(4);
        if (probability != 1) {
          answers.each((index, element) => {
            let value = $(element).attr("value");
            if (value === "true") {
              alert($(element).text());
            }
          });
        } else {
          let wrongAnswers = [];
          answers.each((index, element) => {
            let value = $(element).attr("value");
            if (value === "false") {
              wrongAnswers.push(element);

            }

          });
          alert($(wrongAnswers[getRandomInt(3)]).text());

        }



      }
    });

    phoneCounter += 1;
  } else {
    $(".phone").attr("class", "btn phone disabled");

  }
});
$(".public").click(() => {
  let wrongAnswers = [];
  let rightAnswer;
  // wrong answers x,y,x
  var x, y, z;

  if (peopleCounter === 0) {
    let questions = $(".pregunta");
    questions.each((index, element) => {
      let preguntaClass = $(element).attr("class");
      if (preguntaClass === "pregunta") {
        let id = "#" + $(element).attr("id");
        id = id + " .botonRespuesta";
        let answers = $(id);
        let probability = getRandomInt(4);

        answers.each((index, element) => {
          let value = $(element).attr("value");
          if (value === "true") {
            rightAnswer = $(element).text().slice(0, 1);
          } else {
            let textAnswer = $(element).text().slice(0, 1);
            wrongAnswers.push(textAnswer);



          }
        });

        if (probability != 1) {

          x = 10 + getRandomInt(11);
          y = 10 + getRandomInt(11);
          z = 10 + getRandomInt(11);
          console.log(x + "% del publico elegio la respuesta: " + wrongAnswers[0]);
          console.log(y + "% del publico elegio la respuesta: " + wrongAnswers[1]);
          console.log(z + "% del publico elegio la respuesta: " + wrongAnswers[2]);
          console.log((100 - x - y - z) + "% del publico elegio la respuesta: " + rightAnswer);
        } else {
          x = getRandomInt(11);
          y = getRandomInt(11);
          console.log((25 + x) + "% del publico elegio la respuesta: " + wrongAnswers[0]);
          console.log((25 - x) + "% del publico elegio la respuesta: " + wrongAnswers[1]);
          console.log((25 + y) + "% del publico elegio la respuesta: " + wrongAnswers[2]);
          console.log((25 - y) + "% del publico elegio la respuesta: " + rightAnswer);


        }

      }
    });


    peopleCounter += 1;
  } else {
    $(".public").attr("class", "btn half disabled");
  }


});
$(".half").click(() => {
  if (halfCounter === 0) {
    let questions = $(".pregunta");
    questions.each((index, element) => {
      let preguntaClass = $(element).attr("class");
      if (preguntaClass === "pregunta") {
        let id = "#" + $(element).attr("id");
        id = id + " .botonRespuesta";
        let answers = $(id);
        let wrongAnswers = [];
        answers.each((index, element) => {
          let value = $(element).attr("value");
          if (value === "false") {
            wrongAnswers.push(element);


          }
        });
        wrongAnswers.splice(getRandomInt(3), 1);
        $(wrongAnswers).each((index, element) => {
          $(element).attr("class", "disabled botonRespuesta btn  btn-block");

        });




      }

    });

    halfCounter += 1;
  } else {
    $(".half").attr("class", "btn half disabled");

  }

});

// 0 is the 1st the ordinal postion
function showQuestion(numberOfQuestion) {
  let questions = $(".pregunta");

  questions.each(function(index, element) {
    $(element).attr("class", "pregunta hide");
    if (index === numberOfQuestion) {
      $(element).attr("class", "pregunta");
    }

  });


}
function lose() {
  alert("Has perdido");
}
// needs to be 5 to get number [0:4]
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function countdown() {

  let timer = $("#time");
  timer.html(timeLeft - timeCounter);

  function timeIt() {
    timeCounter++;
    timer.html(convertSeconds(timeLeft - timeCounter));
    if(timeLeft===timeCounter){
     lose();
     $(".botonRespuesta").attr("class", "disabled botonRespuesta btn  btn-block");
    }
  }
    setInterval(timeIt, 1000);

}
function convertSeconds(s){
  var min=Math.floor(s/60);
  var sec=s%60;
  return min+": "+sec;
}

$(".index").click((e)=>{
  clicked_id = e.target.id;
  numberid=$("#"+clicked_id).html();
  numberid=parseInt(numberid);
  showQuestion(numberid);
});
