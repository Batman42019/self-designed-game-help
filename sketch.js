var sword, swordSound ;
var score  ;
var monster,  enemyGroup;
var apple, banana, orange, pear, fruitGroup, fruit;


function preload(){
    
    swordImage = loadImage("sword.png");
    monsterImg = loadImage("monster.png");

    apple = loadImage("apple.png");
    banana = loadImage("banana.png");
    orange = loadImage("orange.png");
    pear = loadImage("pear.png");

    


}


function setup(){
    

    createCanvas(600,600);


    sword = createSprite(40, 200,20, 20);
    sword.addImage(swordImage);
    sword.scale = 0.8;


    sword.setCollider("rectangle", 0, 0, 35, 35);


    score = 0;
    fruitGroup = new Group();
    enemyGroup = new Group();

}

function draw(){
    background("red");

  
    if (gameState === PLAY){

   
        fruits();
        Enemy();  
        
    
        sword.x  = mouseX;
        sword.y = mouseY;

       
        if (fruitGroup.isTouching(sword)){
            fruitGroup.destroyEach();
            score = score + 1;
        }

        if (enemyGroup.isTouching(sword)){
            gameState = END;

            
            fruitGroup.destroyEach();
            enemyGroup.destroyEach();
            fruitGroup.setVelocityXEach(0);
            enemyGroup.setVelocityXEach(0);

            

        }
    }

    drawSprites();

    // Display score
    text("Score: " + score, 300, 30);
}

function fruits(){
    if(World.frameCount % 80 === 0){
        
        position = Math.round(random(1, 2));
        
        fruit = createSprite(600, 200, 20, 20);
        fruit.scale = 0.2;

        rFruit = Math.round(random(1, 4));

        if (rFruit == 1){
            fruit.addImage(apple);
        } else if (rFruit == 2){
            fruit.addImage(banana);
        } else if (rFruit == 3){
            fruit.addImage(orange);
        } else {
            fruit.addImage(pear);
        }

        fruit.y = Math.round(random(50, 340));

        fruit.velocityX = -7;
        fruit.setLifetime = 100;
        
        if(position == 1){
          fruit.x = 600;
          fruit.velocityX = -(7+(score/4));
        }
        else{
          if(position == 2){
            fruit.x = 0;
            fruit.velocityX = (7+(score/4));
          }
        }
      
        fruitGroup.add(fruit);

    }
}

function Enemy () {
    if(World.frameCount % 200 === 0){
        monster = createSprite(400, 200, 20, 20);
        monster.y =  Math.round(random(100, 300));
        monster.velocityX = -(8+(score/10));
        monster.setLifetime = 50;

        enemyGroup.add(monster);
      
    }
}

// GameStates
var PLAY = "playing";
var END = "stopped";
var gameState = PLAY;