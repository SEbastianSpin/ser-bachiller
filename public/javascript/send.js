//jshint esversion:6



function showCampo(s) {
  var selected = s[s.selectedIndex].id;

  if (selected === "math") {
    $(".len").toggle();
    $(".nature").toggle();
    $(".social").toggle();


  } else if (selected === "len") {
    $(".math").hide();
    $(".nature").hide();
    $(".social").hide();
  } else if (selected === "nature") {
    $(".math").hide();
    $(".len").hide();
    $(".social").hide();
  } else if (selected === "social") {
    $(".math").hide();
    $(".len").hide();
    $(".nature").hide();

  }




}

function hideSubcampo(s){

  var selected = s[s.selectedIndex].id;

  var options=["algebra","geometry","esta","culture","lecture","comunication","writting",
  "literature","body","world","chemstry","appliedchemstry","force","energy","evolution",
"celular", "animals","origins", "middle","hybrid","work","citizenship","state","argumentation"];


for(var i in options){
  if(options[i]!==selected){
   $("."+options[i]).hide();
  }
}
}



$("#checker").click(()=>{

var q=($("#question").val());//wrong0
var rightans=($("#right").val());
var wrongans0=($("#wrong0").val());
var wrongans1=($("#wrong1").val());
var wrongans2=($("#wrong2").val());


$(".preguntaSolo").html(q);
$("#rightans").html(rightans);
$("#wrongans2").html(wrongans2);
$("#wrongans1").html(wrongans1);
$("#wrongans0").html(wrongans0);

$.getScript("https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js");
//$(".preguntaSolo").appendChild(script);




});



// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()
