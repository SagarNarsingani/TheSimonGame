
var buttonColours = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false; 

$(document).keypress(
    function(){
        if(!started){
          $("h1").text("Level " + level);
          nextSequence();
          started = true;
        }
    }
);

$(".start").click(
    function(){
        if(!started){
          $("h1").text("Level " + level);
          nextSequence();
          started = true;
        }
    }
)

$(".btn").click(
    function(){
       
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        animatePress(userChosenColour);
        playAudio(userChosenColour);

        checkAnswer(userClickedPattern.length-1);

    }
);

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(level === currentLevel+1){
         setTimeout(function(){
             nextSequence();
         },1000);
     }

    }else{
        
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        $("body").addClass("game-over");
        setTimeout(
            function(){
                $("body").removeClass("game-over");
            }, 200
        );

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}

function nextSequence(){
   
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(4*Math.random());
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColour);
    
}

function playAudio(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour){

   $("#" + currentColour).addClass("pressed");
   setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
   },100);

}

function startOver(){

    started = false;
    gamePattern = [];
    level = 0;

}

