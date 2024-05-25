var name=prompt("Enter your name first")
var institute=prompt("Enter your institute")

var questions = [
    {
      question: "HTML Stands for",
      option1: "Hyper Text Markup Language",
      option2: "Hyper Tech Markup Language",
      option3: "Hyper Touch Markup Language",
      corrAnswer: "Hyper Text Markup Language",
    },
    {
      question: "CSS Stands for",
      option1: "Cascoding Style Sheets",
      option2: "Cascading Style Sheets",
      option3: "Cascating Style Sheets",
      corrAnswer: "Cascading Style Sheets",
    },
    {
      question: "Which tag is used for most large heading",
      option1: "<h6>",
      option2: "<h2>",
      option3: "<h1>",
      corrAnswer: "<h1>",
    },
    {
        question:"How do you create a function in JavaScript?",

    option1:"function = myFunction()",
    option2:"function:myFunction()",
    option3:"function myFunction()",
    corrAnswer:"function myFunction()",
    },
    {
question:"What is the output of this code? \n console.log(typeof null);",
option1:"null",
option2:"object",
option3:"undefined",
corrAnswer:"object",
    },
    {
    question:"Which method is used to add an element at the end of an array?",
    option1:"array.push(element)",
    option2:"array.pop(element)",
    option3:"array.shift(element)",
    corrAnswer:"array.push(element)",
    },
    {
      question: "Which tag is used to make element unique ",
      option1: "id",
      option2: "class  ",
      option3: "label",
      corrAnswer: "id",
    },
    {
      question: "Any element assigned with id, can be get in css ",
      option1: "by # tag",
      option2: "by @ tag",
      option3: "by & tag",
      corrAnswer: "by # tag",
    },
    {
      question: "CSS can be used with ______ methods ",
      option1: "8",
      option2: "3",
      option3: "4",
      corrAnswer: "3",
    },
    {
      question: "In JS variable types are ____________ ",
      option1: "6",
      option2: "3",
      option3: "8",
      corrAnswer: "8",
    },
    {
      question: "In array we can use key name and value ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
    {
      question: "toFixed() is used to define length of decimal ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "True",
    },
    {
      question: "push() method is used to add element in the start of array ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
    {
        question:"What is the correct syntax for referring to an external script called app.js?",

option1:"<script href=app.js></script>",
option2:"<script name=app.js></script>",
option3:"<script src=app.js></script>",
corrAnswer:"<script src=app.js>",
    },
    {
    question:"How do you write a conditional statement for executing some statements only if i is equal to 5?",
    option1:"if i = 5",
    option2:"if i == 5 then",
    option3:"if (i == 5)",
    corrAnswer:"if i = 5 then",
    },
  ];
  var ques = document.getElementById("ques");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var btn = document.getElementById("btn");
var timer = document.getElementById("timer")

var index = 0;
var score = 0;
var min = 1;
var sec = 59;

setInterval(function(){
    timer.innerHTML = `${min}:${sec}`;
    sec--;
    // sec=59;
    if(sec<0){
        min--;
        // min = 1;
        sec = 59;
        if(min<0){
            min = 1;
            sec = 59
            nextQuestion();
        }
    }
},1000);
function nextQuestion(){
var getOptions=document.getElementsByName("option");

for (var i=0 ; i < getOptions.length ; i++){
    if( getOptions[i].checked){
        var selectedValue=getOptions[i].value
        var selectedQues=questions[index-1].question
    var selectedAns=questions[index-1][`option${selectedValue}`]
    var correctAnswer = questions[index-1]["corrAnswer"];

    if(selectedAns == correctAnswer){
        score++;
    }
}
console.log(score)

getOptions[i].checked=false;
}
btn.disabled=true;
if(index > questions.length-1){
  var percentage = (score / questions.length * 100).toFixed(2);
    // console.log("Questions completed ....");
    if (percentage > 80) {
      Swal.fire({
          title: "Good job!",
          text:institute+"<br>"+name+"<br> your percetnage is: " +`${percentage}`,
          icon: "success"
        });
    } else if (percentage > 60) {
      Swal.fire({
      text:"<br>Unfortunately, you didn't score 60%. Better luck next time!",
      title: "better luck next time!",
      // html: message,
      icon: "error"
  });
}

}else{
    ques.innerText=questions[index].question;
    opt1.innerText=questions[index].option1;
    opt2.innerText=questions[index].option2;
    opt3.innerText=questions[index].option3;
    index++;
    min=1;
    sec=59;
}
}
function target(){
    var btn=document.getElementById("btn")
    btn.disabled = false;
}
