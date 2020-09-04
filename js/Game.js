class Game {
  constructor(){

  }

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
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    car1.addImage(car1_img);
    car2.addImage(car2_img);
    car3.addImage(car3_img);
    car4.addImage(car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(ground_img);
      image(track_img,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
         // cars[index - 1].shapeColor = "red";
         fill("red");
         stroke("red");
         //strokeWeight(4);

         ellipse(x,y,60,60);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          text(player.name,x-20,y-100);
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      console.log(player.distance);
      
    }

   
    if(player.distance>=3760)
    {
      gameState = 2;
      //textSize(16);
      //text("YOU HAVE REACHED THE END",windowWidth/2,200);
      
    }
    drawSprites();
  }
  end()
  {
    console.log("GAME ENDED");
    var e1 = createElement("h2");
    e1.html("YOU HAVE REACHED THE END");
    e1.position(displayWidth/2,100);
  }
}
