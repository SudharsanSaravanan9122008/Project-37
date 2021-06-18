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
    background("yellow")
    //write code to show a heading for showing the result of Quiz
    text("Results", 850/2-50, 300)
    //call getContestantInfo( ) here
    var contestantInfoRef = database.ref('contestants');
    contestantInfoRef.on("value",(data)=>{
      allContestants = data.val();
    })
    console.log(allContestants)
    var y = 0
    for(var plr in allContestants){
      var correctAnswer = "2"
      if(allContestants[plr].answer === correctAnswer){
        fill("green");
      }
      else{
        fill("red");
      }
      y+=20
      text(allContestants[plr].name, 850/2-100,300+y);
    }
    //write code to add a note here

    //write code to highlight contest who answered correctly
    
  }

}
