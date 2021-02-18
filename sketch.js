var ball
var speed = 11
var dash = false
var dashC = [0, 0]
var dashT = 10
var dashT2 = 20
var dashR = false
var ballP = [[], []]
var health = 100
var gameState = 0
var lvl = 0
var b = 255
var godMode = false
var JC = true
var JC2 = true
  
function preload(){

    bgImg = loadImage("img_2256.jpg")
}


function setup() {
  createCanvas(800,800);
  ball = createSprite(400, 400, 25, 25)
  enemyG = createGroup()
  
  edges = createEdgeSprites()
  laser = createSprite(400, -30, 800, 50)

  bar = createSprite(400, 750, 600, 50)
  bar.shapeColor = "crimson"
  bar.visible = 0

  barB = createSprite(400, 750, 620, 70)
  barB.shapeColor = "lightblue"
  barB.visible = 0

  barD = createSprite(400, 700, 200, 10)
  barD.shapeColor = "blue"
  barD.destroy()

  spin = createSprite(400, 400, 800, 50)
  spin.visible = 0

  spin2 = createSprite(400, 400, 50, 800)
  spin2.visible = 0

  movey = createSprite(400, 200, 20, 400)
  movey.visible = 0

  movey2 = createSprite(400, 600, 20, 400)
  movey2.visible = 0

  box = createSprite(400, 400, 200, 200)
  box.visible = 0

  lava = createSprite(400, 400, 5000, 5000)
  lava.visible = 0



  play = createButton("Play")

  
}

function draw() {
  console.log(ball.y)
  background(bgImg); 

  bar.depth = 10000
  barB.depth = 9999
  ball.depth = 9998
  

  fill("lightblue")
  noStroke()
  rectMode(CENTER)

  if(godMode === true){
    health = 100
  }
  


  if(gameState === 0){

    ball.x = 400
    ball.y = 400

    enemyG.remove(lava)
    enemyG.remove(laser)
    enemyG.remove(spin)
    enemyG.remove(spin2)
    b = 255
    JC = true
    JC2 = true

    play.show()

    health = 100
    bar.width = 100 * 6

    ball.x = 400
    ball.y = 400

    ball.visible = 0

    textFont("Truculenta")
    textAlign(CENTER)
    textSize(70)
    text("Game Name", 400, 100)

    
    
    play.position(335, 300)
    play.style("width", "150px")
    play.style("height", "70px")
    play.style("font-size", "30px")
    play.mousePressed(()=>{
        gameState = 1
        lvl = 0
        play.hide()
    })








  }
  if(gameState === 1){

    

  addEnemy()

  lvl += 1

  bar.visible = 1
  barB.visible = 1
  ball.visible = 1

  rect(400, 750, 620, 70)

  

  ball.velocityY = 0
  ball.velocityX = 0
if(dash === false){

if(keyDown("a")){
  ball.velocityX = -speed
  dashC[0] = -speed
}

if(keyDown("d")){
  ball.velocityX = speed
  dashC[0] = speed
}

if(keyDown("w")){
  ball.velocityY = -speed 
  dashC[1] = -speed
}

if(keyDown("s")){
  ball.velocityY = speed 
  dashC[1] = speed
}

if(keyDown("z")){
  godMode = true
}




if(keyWentUp("s")){
  dashC[1] = 0
}
if(keyWentUp("w")){
  dashC[1] = 0
}
if(keyWentUp("a")){
  dashC[0] = 0
}
if(keyWentUp("d")){
  dashC[0] = 0
}

dashT2 += 1
barD.width = dashT2*3

barD.x = ball.x
barD.y = ball.y + 40

ball.shapeColor = rgb(0, 0, dashT2*20)

}
if(dash === true){
  ball.velocityX = dashC[0] * 2
  ball.velocityY = dashC[1] * 2
  dashT -= 1

  if(dashC[0] === 0 && dashC[1] === 0){
    dashC[1] = speed
}
  
  if(dashT <= 0){
    dash = false
    dashT = 10
  }
}

if(keyDown(" ") && dashT2 >= 20){
  dash = true
  dashT2 = 0
  ball.shapeColor = "lightblue"
}

ball.collide(edges)

ballP[1].push(ball.y)
ballP[0].push(ball.x)

if(health <= 0){
  gameState = -1
  
    }


    if(enemyG.isTouching(ball) && dash === false && !ball.isTouching(box)){
      ball.shapeColor = "red"
      health -= 3
      push()
      translate(100, 750)
      bar.width = health*6
      pop()
    }

    

    
  }

 

  

  if(health > 100){
    health = 100
  }

  

  if(gameState === -1){


      ball.bounciness = 0.2
      ball.bounceOff(edges)
      health = 0

      dash = false

      bar.visible = 0
      barB.visible = 0
      spin2.visible = 0
      laser.visible = 0
      spin.visible = 0

      lava.visible = 0
      box.visible = 0
    

     

      if(JC2 === true){

        ball.velocityX = 0
        ball.valocityY = 0

        dashC[0] = 0
        dashC[1] = 0


        JC2 = false
      }

      

      b -= 3

      ball.shapeColor = rgb(0, 0, b)

      if(b <= 0){

        if(JC === true){
          

          ball.velocityY = -20
          
          JC = false
        }
        

        ball.velocityY += 1
      }

      if(ball.y > 790){

        textFont("Truculenta")
      textAlign(CENTER)
      textSize(75)
      text("Game Over", 400, 200)
      textSize(35)
      text("Press 'r' to continue", 400, 400)

      if(keyDown("r")){
        gameState = 0
        ball.x = 400
        ball.y = 400
        ball.visible = 1
      }

      }


    
  }

  

  drawSprites();
}

function addEnemy(){
  if(lvl % 60 == 0 && lvl < 500){

    rand = Math.round(random(1,2))
    switch(rand){

    case 1: for(var i = 50; i < height; i += 150){
      enemy = createSprite(820, i, 50, 10)
      enemyG.add(enemy)
      enemy.velocityX = -15
      enemy.shapeColor = "red"
      enemy.lifetime = 50
    }
    break

    case 2: for(var i = 70; i < height; i += 150){
      enemy = createSprite(820, i, 50, 10)
      enemyG.add(enemy)
      enemy.velocityX = -15
      enemy.shapeColor = "red"
      enemy.lifetime = 50
    }
    break
    
    }

    rand2 = Math.round(random(1,2))

    switch(rand2){

    case 1: for(var i = 50; i < height; i += 150){
      enemy = createSprite(i, -20, 10, 50)
      enemyG.add(enemy)
      enemy.velocityY = 15
      enemy.shapeColor = "red"
      enemy.lifetime = 50
    }
    break

    case 2: for(var i = 70; i < height; i += 150){
      enemy = createSprite(i, -20, 10, 50)
      enemyG.add(enemy)
      enemy.velocityY = 15
      enemy.shapeColor = "red"
      enemy.lifetime = 50
    }
    break
    
    }
    
    
  }
  

  if(lvl > 0 && lvl < 500){

    if(lvl < 10){
      laser.x = 400
  laser.y = 400
    }




    laser.shapeColor = rgb(lvl*2, 0, 0)

    if(lvl === 133){
      enemyG.add(laser)
    }
  
    
      laser.visible = 1
    
    for(i = 0; i < ballP[1].length; i++){
    laser.y = ballP[1][i - 20]
    }
  }

  if(lvl > 500){
    laser.lifetime = 0
  }

  if(lvl > 500 && lvl < 600){
    push()
    fill("green")
      rect(200, 200, 200, 200)
      rect(200, 600, 200, 200)
      rect(600, 600, 200, 200)
      rect(600, 200, 200, 200)
      pop()
      health = 100
      bar.width = 600
  }

  if(lvl > 600 && lvl < 1100){

   
    
    spin.rotation += 2
    enemyG.add(spin)
    spin.visible = 1
    spin.shapeColor = "red"

    spin2.rotation += 2
    enemyG.add(spin2)
    spin2.visible = 1
    spin2.shapeColor = "red"

    movey.visible = 1
    movey2.visible = 1

    movey.velocityX = -6
    movey2.velocityX = 6

    enemyG.add(movey)
    enemyG.add(movey2)

    movey.shapeColor = "red"
    movey2.shapeColor = "red"


    if(movey.x < 20){
      movey.x = 820
    }

    if(movey2.x > 820){
      movey2.x = 20
    }



 if(lvl % 3 === 0){
    tap = createSprite(400, 400, 30, 30)
    tap.shapeColor = "red"
    enemyG.add(tap)

    tap.lifetime = 50

    var rand = Math.round(random(1,2))
    switch(rand){
    case 1: tap.velocityY = random(10,13)
    break

    case 2: tap.velocityY = random(-10,-13)
    break

    }

    var rand2 = Math.round(random(1,2))
    switch(rand2){
    case 1: tap.velocityX = random(10,13)
    break

    case 2: tap.velocityX = random(-10,-13)
    break

    }

  }

  }




  if(lvl > 1100 && lvl < 1200){
    push()
    fill("green")
    rect(400, 400, 200, 200)
    spin.visible = 0
    spin2.visible = 0
    pop()
    box.x = 400
    box.y = 400
    health = 100

    bar.width = 600
  }


    if(lvl > 1200 && lvl < 1800){

    spin.visible = 0
    spin2.visible = 0

    

    

    box.visible = 1
    box.shapeColor = rgb(180, 180, 180)
    box.depth = lava.depth + 1
    box.bounceOff(edges)
    
   
    lava.visible = 1
    enemyG.add(lava)
    lava.shapeColor = "red"



        if(frameCount % 15 === 0){
          randX = random(-8, 8)
          randY = random(-8, 8)
            box.velocityX = randX
            box.velocityY = randY
           
        }



  }

  if(lvl > 1800){
    box.visible = 0
    lava.visible = 0

    textFont("Truculenta")
    textAlign(CENTER)
    textSize(70)
    text("You Win!", 400, 100)
    textSize(20)
    text("for now...", 400, 300)
  }

  } // addEnemy()

  

  

  function keyPressed(){
    if(keyCode === 49){
      lvl = 0
    }
    if(keyCode === 50){
      lvl = 500
    }
    if(keyCode === 51){
      lvl = 1100
    }
    if(keyCode === 52){
      lvl = 1800
    }
    
  }


