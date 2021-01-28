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
    //async = function for the whole class instead of a particular object
    // static = function that runs in the background
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

    spaceship1 = createSprite(displayWidth/2-100,displayHeight-200);
    spaceship1.addImage("spaceship1",spaceship1Img);
    spaceship2 = createSprite(displayWidth/2+100,displayHeight-200);
    spaceship2.addImage("spaceship2",spaceship2Img);
    
    spaceships = [spaceship1, spaceship2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
     // image(bgImg, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = displayWidth/2-300 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        spaceships[index-1].x = x;
        spaceships[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill('red');
          ellipse(x,y,60,60);
        spaceships[index - 1].shapeColor = "red";

          camera.position.x = displayWidth/2;
          camera.position.y = spaceships[index-1].y;

        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    //if(player.distance > 3860){
     // gameState = 2;
   // }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
     


function goodAliens() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var gAlien = createSprite(displayWidth/8-50,displayHeight/2,40,40);
    gAlien.y = Math.round(random(300,400));
    gAlien.addImage(goodAlienImg);
    gAlien.velocityY = 3;
    
     //assign lifetime to the variable
    gAlien.lifetime = 300;
    
    //adjust the depth
    //gAlien.depth = trex.depth;
    //trex.depth = trex.depth+1;
    
    //add each cloud to the group
    gAliensGroup.add(gAlien);
  }
  


function badAliens() {
  if(frameCount % 60 === 0) {
    var bAlien = createSprite(displayWidth/8+100,displayHeight/2-100,20,30);
    bAlien.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    bAlien.velocityY = -6;
    bAliensGroup.add(bAlien);
    //generate random obstacles
  }
}
}