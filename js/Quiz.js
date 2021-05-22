class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    this.title1 = createElement('h2');
    this.title1.html("Result Of The Quiz");
    this.title1.position(300, 0);
    //call getContestantInfo() here
    Contestant.getPlayerInfo();
    console.log(allContestants);
    //write condition to check if contestantInfo is not undefined
    //write code to add a note here
    if (allContestants !== undefined){
      fill("black");
      textSize(18);
      text("NOTE: CONTESTANTS WITH THE CORRECT ANSWER WILL BE HIGHLIGHTED IN GREEN!", 5, 235);
    }
    //write code to highlight contest who answered correctly
    var answersY = 255;
    for (var plr in allContestants){
      var correctAnswer = "2";
      if (allContestants[plr].answer === correctAnswer){
        stroke("green");
        fill("green");
      } else{
        stroke("red");
        fill("red");
      }
      textSize(22);
      strokeWeight(1);
      text(allContestants[plr].name + ": " + allContestants[plr].answer, 200, answersY);
      answersY += 25;
    }
  }

}
