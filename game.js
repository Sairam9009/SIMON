var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var start=false;
$(document).keydown(function detect(){
  if(start!=true){
    $("#level-title").text("Level "+level);
    nextSequence();
    start=true;
  }
});

function nextSequence(){

  userClickedPattern=[];
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var chosenButton=$("#"+randomChosenColor);
  chosenButton.fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
}
var length= [userClickedPattern];
$(".btn").click(function handler(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function remove(){
    $("#"+currentColor).removeClass("pressed")
  },100);
}
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length===userClickedPattern.length){
    setTimeout(function callBack(){
      nextSequence();
    },1000);
  }
}
  else{
    wrongAnswer();
  }
}
function wrongAnswer(){
  $(document.body).addClass("game-over");
  var sound=new Audio("sounds/wrong.mp3");
  sound.play();
  setTimeout(function(){
    $(document.body).removeClass("game-over");
  },200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}
function startOver(){
  level=0;
  gamePattern=[];
  start=false;
}
