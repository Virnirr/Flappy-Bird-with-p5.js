// variables for bird

// variables for spring and majority of animation variabes
var numColumn;
var randColor = [];
var columnY = [];
var columnX = [];
var dx = -3;
var point;
var spring, summer, fall, winter;
var begin;
var bird_start;
var game_over;
var press_once;

//summer control variables
var summerColumnY = []
var summerColumnX = []
var bx = 100;
var by = 100;

//fall control variables
var leafx = [];
var leafy = [];
var leafcol = [];
var leafrot = [];
var numLeaves = 20;
var fallColumnX = [];
var fallColumnY = [];

// setup for arrays
function setup() {

    createCanvas(400, 550);

    //control variables
    numColumn = 50;
    point = 0;
    bird_start = false;
    spring = false;
    summer = false;
    fall = false;
    winter = false;
    begin = true;
    game_over = false;
    press_once = 0;

    // Bird Object
    bird = new Bird();

    for (var i = 0; i < 6; i++) {
        randColor.push(color(random(255), random(255), random(255)));
    }

    // Spring array
    x = 490;
    for (var i = 0; i < numColumn; i++) {
        columnY.push(random(200, 400));
        columnX.push(x);
        x += 250;
    }

    //Summer array
    x = 490
    for (var i = 0; i < numColumn; i++) {
        summerColumnY.push(random(550, 600));
        summerColumnX.push(x);
        x += 250;
    }

    // Fall leaves array
    var c;
    for (var i = 0; i < numLeaves; i++) {
        leafx.push(random(width));
        leafy.push(random(320, 550));
        c = int(random(3));
        if (c == 0)
            leafcol.push(color(255, 0, 0));
        else if (c == 1)
            leafcol.push(color(255, 150, 10));
        else
            leafcol.push(color(255, 255, 0));
        leafrot.push(random(-PI / 6, PI / 6));
    }

    x = 490;
    for (var i = 0; i < numColumn; i++) {
        fallColumnY.push(random(250, 450));
        fallColumnX.push(x);
        x += 250;
    }


}

function preload() {
    img = loadImage('flappy_bird_font.jpg');
    img3 = loadImage('start_game.png');
    over_image = loadImage('flappyBirdGameOver.png');
    scoreboard_image = loadImage('scoreboard.png');
    copper = loadImage('copper.png');
    silver = loadImage('silver.png');
    gold = loadImage('gold.png');
    spring_background = loadImage('spring_background.png')
}

function draw() {

    // beginning scene with the four options to click on
    if (begin == true) {
        background('#4ec0ca');
        drawBirdSpring(125, 220);
        drawSeagull(270, 200);
        drawFallBird(125, 370);
        drawWinterB(275, 370);
        img.resize(500, 75);
        image(img, 45, 75);
        textSize(20);
        textStyle(BOLD);
        fill('#AFD297');
        rect(75, 250, 100, 60, 100);
        fill('#FF9C9C');
        text("Spring", 93, 285);
        fill('#FFCA27');
        rect(225, 250, 100, 60, 100);
        fill('#649CD9');
        text("Summer", 233, 285);
        fill('#B34233');
        rect(75, 400, 100, 60, 100);
        fill('#F8D481');
        text("Fall", 105, 437);
        fill('#cefff7');
        rect(225, 400, 100, 60, 100);
        fill('#E4C0C8');
        text("Winter", 245, 437);
    }
    // if you choose spring
    if (spring) {
        seasonal_Spring();
    }

    // if you choose summer
    else if (summer) {
        seasonal_Summer();
    }

    // if you choose fall
    else if (fall) {
        seasonal_Fall();
    }

    // if you chosoe winter
    else if (winter) {
        seasonal_Winter();
    }

    // Finish the game at 50 points
    // I honestly don't know what to show at 50 points but congrats you made it
    // Only reason I max point at 50 is because the pixels lags the screen 
    if (point == 50) {
        game_over = true;
        noLoop();
    }

    // Ending screen
    if (game_over) {
        fill(0);
        over_image.resize(300, 100);
        scoreboard_image.resize(250, 150);
        image(over_image, 50, 100);
        image(scoreboard_image, 70, 250);
        textSize(40);

        if (point < 10) {
            image(copper, width / 2 - 110, height / 2 + 30);
        }
        else if (point >= 10 && point < 20) {
            image(silver, width / 2 - 110, height / 2 + 30);
        }
        else {
            image(gold, width / 2 - 110, height / 2 + 30);
        }

        text(point, width / 2 + 50, height / 2 + 80);
    }
}

// Spring season option
function seasonal_Spring() {
    spring_background.resize(400, 550);
    image(spring_background, 0, 0);

    bird.show();

    if (bird_start) {

        bird.update();

        // Making Columns
        for (var i = 0; i < numColumn; i++) {
            drawSpringColumns(columnX[i], columnY[i], 0);
            var hit1 = circleRect(bird.x, bird.y, 12, columnX[i] - 40, columnY[i], 80, height);
            drawSpringColumns(columnX[i], columnY[i] - 175, -PI);
            var hit2 = circleRect(bird.x, bird.y, 12, columnX[i] - 40, columnY[i] - height - 175, 80, height);
            var hit3 = circleRect(bird.x, bird.y, 12, columnX[i] - 40, columnY[i] - 175, 80, 150);

            // Game end if you touch any of the pipes
            if (hit1 || hit2) {
                game_over = true;
                noLoop();
            }

            // Game scoring system Algorithm
            if (hit3 && point <= i) {
                point += 1;
            }
        }

        // Making Columns Move Left
        for (var i = 0; i < numColumn; i++) {
            columnX[i] += dx;
        }
    }
    else {
        img3.resize(200, 100);
        image(img3, 100, 100);
    }

    //point tracker
    fill(0);
    textSize(40);
    textStyle(BOLD);
    text(point, width / 2, 100);
}

// Summer season option
function seasonal_Summer() {

    // backgrounds
    background(135, 206, 235)

    fill(0, 0, 255)
    rect(0, height / 4, width, 150)
    fill(210, 170, 109)
    rect(0, height / 4 + 150, width, height - height / 4 + 150)


    fill(255, 255, 0)
    ellipse(100, 100, 100)

    fill(0, 255, 0)
    rect(67, 294, 60, 40)
    drawBoat(285, 188)
    drawUmbrella(136, 307)

    // let bird design show
    bird.show();

    if (bird_start) {

        // flying bird
        bird.update();

        for (var i = 0; i < numColumn; i++) {
            drawPalmtree(summerColumnX[i], summerColumnY[i], 0);

            drawPalmtree(summerColumnX[i], summerColumnY[i] - 600, 180)

            summerColumnX[i] += dx;

            var hit1 = circleRect(bird.x, bird.y, 5, summerColumnX[i] - 10, summerColumnY[i] - 160, 36, 150);
            var hit2 = circleRect(bird.x, bird.y, 5, summerColumnX[i] - 10, summerColumnY[i] - 600, 36, 150)

            if (hit1 || hit2) {
                game_over = true;
                noLoop();
            }

            if (bird.x > summerColumnX[i] && point <= i) {
                point += 1;
            }
        }


    }
    else {
        img3.resize(200, 100);
        image(img3, 100, 100);
    }

    //point tracker
    fill(0);
    textSize(40);
    textStyle(BOLD);
    text(point, width / 2, 100);
}

// Fall Option
function seasonal_Fall() {
    // Fall background

    background(220);
    noStroke();
    fill('#944E01');
    rect(0, 520, 400, 100);
    //tree
    fill('#7D4E01');
    rect(287, 213, 20, 70);
    rect(95, 213, 20, 70);
    fill('#FF4C00');
    ellipse(65, 194, 100);
    ellipse(140, 194, 100);
    ellipse(100, 140, 100);
    fill('#FF9B0D');
    ellipse(265, 194, 100);
    ellipse(330, 194, 100);
    ellipse(296, 140, 100);
    //sun
    fill(255, 20, 0);
    ellipse(200, -40, 220);
    fill(255, 200, 0);
    ellipse(200, -40, 200);
    //leaves
    for (var i = 0; i < numLeaves; i++) {
        leaf(leafx[i], leafy[i], leafcol[i], leafrot[i]);
    }

    bird.show();

    if (bird_start) {

        bird.update();

        for (var i = 0; i < numColumn; i++) {
            drawFallColumn(fallColumnX[i], fallColumnY[i], 0)
            var fallhit1 = circleRect(bird.x, bird.y, 12, fallColumnX[i], fallColumnY[i], 80, 400);
            drawFallColumn(fallColumnX[i], fallColumnY[i] - 550, 0)
            var fallhit2 = circleRect(bird.x, bird.y, 12, fallColumnX[i], fallColumnY[i] - 550, 80, 400);

            if (fallhit1 || fallhit2) {
                game_over = true;
                noLoop();
            }

            if (bird.x > fallColumnX[i] + 40 && point <= i) {
                point += 1; 
            }
        }
        //move columns 
        for (var i = 0; i < numColumn; i++) {
            fallColumnX[i] += dx;
        }
    }

    else {
        img3.resize(200, 100);
        image(img3, 100, 100);
    }

    //point tracker
    fill(0);
    textSize(40);
    textStyle(BOLD);
    text(point, width / 2, 100);
}

function seasonal_Winter() {
    //background
    background('#BEF1F9');

    //sun 
    fill('#E1E627');
    ellipse(320, 70, 80);
    //mountains
    fill('#011481');
    triangle(50, 430, 200, 80, 500, 430);
    triangle(-50, 430, 100, 100, 200, 430);
    triangle(300, 430, 400, 130, 600, 430);
    triangle(200, 430, 320, 150, 500, 430);
    //ground
    fill('#E3F1F9');
    rect(0, 420, width, 130);
    bird.show();

    if (bird_start) {

        bird.update();

        // Making Columns
        for (var i = 0; i < numColumn; i++) {
            drawWinterC(columnX[i], columnY[i], 0);
            var hit1 = circleRect(bird.x, bird.y, 12, columnX[i] - 40, columnY[i], 80, height);
            drawWinterC(columnX[i], columnY[i] - 175, -PI);
            var hit2 = circleRect(bird.x, bird.y, 12, columnX[i] - 40, columnY[i] - height - 175, 80, height);
            var hit3 = circleRect(bird.x, bird.y, 12, columnX[i] - 40, columnY[i] - 175, 80, 150);

            // Game end if you touch any of the pipes
            if (hit1 || hit2) {
                game_over = true;
                noLoop();
            }

            // Game scoring system Algorithm
            if (hit3 && point <= i) {
                point += 1;
            }
        }

        // Making Columns Move Left
        for (var i = 0; i < numColumn; i++) {
            columnX[i] += dx;
        }
    }
    else {
        img3.resize(200, 100);
        image(img3, 100, 100);
    }

    //point tracker
    fill(0);
    textSize(40);
    textStyle(BOLD);
    text(point, width / 2, 100);
}

// The bird
function drawBirdSpring(x, y) {
    push();
    translate(x, y);
    scale(0.6);
    // bee body
    fill(253, 238, 40, 255);
    ellipse(0, 0, 70, 60);
    strokeWeight(10);
    bezier(11, -24, 5, -11, 5, 11, 11, 24);
    bezier(-12, -25, -20, -11, -20, 12, -12, 25);

    // wings
    push();
    fill('rgba(210,217,218,255)');
    noStroke();
    ellipse(-20, -20, 45, 35);
    pop();

    //eyes
    fill(255);
    strokeWeight(1);
    ellipse(25, -10, 30);
    fill(0);
    ellipse(25, -10, 7, 10);
    pop();
}

//column
function drawWinterC(x, y, rot){
    push();
       translate(x, y);
       rotate(rot)
       fill('#01ECE6');
       rect(-40, 0, 80, height);
       fill('#F21400');
       rect(0, 0, 5, height);
       rect(-40, 30,  80, 5);
     pop();
 }
 

// Flower function
function drawFlowers(x, y, col1) {
    push();
    translate(x, y);
    scale(0.7)
    fill(242, 240, 0);
    ellipse(0, 0, 20);
    fill(col1);
    for (var i = 0; i < 2 * PI; i += 2 * PI / 10) {
        var cx = 20 * cos(i);
        var cy = 20 * sin(i);
        ellipse(cx, cy, 20);
    }
    pop();
}

// Pipes/Column Designs
function drawSpringColumns(x, y, rot) {
    push();
    translate(x, y);
    rotate(rot)
    fill('#75be2f');
    strokeWeight(3)
    rect(-40, 0, 80, height);
    line(-40, 40, 40, 40);
    strokeWeight(1);
    drawFlowers(-20, 25, randColor[0]);
    drawFlowers(20, 70, randColor[1]);
    drawFlowers(-15, 120, randColor[2]);
    drawFlowers(10, 170, randColor[3]);
    drawFlowers(5, 240, randColor[4]);
    drawFlowers(5, 300, randColor[5]);
    pop();
}

// Collision Detection Algorithm
function circleRect(cx, cy, radius, rx, ry, rw, rh) {
    // temporary variables to set edges for testing
    var testX = cx;
    var testY = cy;

    // which edge is closest?
    if (cx < rx) testX = rx;      // test left edge
    else if (cx > rx + rw) testX = rx + rw;   // right edge
    if (cy < ry) testY = ry;      // top edge
    else if (cy > ry + rh) testY = ry + rh;   // bottom edge

    // get distance from closest edges
    var distX = cx - testX;
    var distY = cy - testY;
    var distance = sqrt(distX * distX + distY * distY);

    // if the distance is less than the radius, collision!
    if (distance <= radius) {
        return true;
    }
    return false;
}

// Bird Physics Constructor
// Bird Physics simulation jumping motion Algorithm
function Bird() {
    this.y = height / 2;
    this.x = 100;

    this.gravity = 1.3;
    this.lift = -27;
    this.velocity = 0;

    this.show = function () {
        if (spring) {
            drawBirdSpring(this.x, this.y);
        }
        else if (summer) {
            drawSeagull(this.x, this.y);
        }

        else if (fall) {
            drawFallBird(this.x, this.y);
        }

        else if (winter) {
            drawWinterB(this.x, this.y);
        }
    }

    this.up = function () {
        this.velocity += this.lift;
    }

    //gravity simulation
    this.update = function () {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity

        if (this.y > height - 16) {
            this.y = height - 16;
            this.velocity = 0;
        }

        if (this.y < 16) {
            this.y = 16;
            this.velocity = 0;
        }
    }
}

// jumping motion with space bar
function keyPressed() {
    if (key == ' ') {
        bird_start = true;
        bird.up();
    }
}

function mouseClicked() {
    if (mouseX > 75 && mouseX < 175 && mouseY > 250 && mouseY < 310 && press_once < 1) {
        spring = true;
        begin = false;
        press_once += 1;
    }

    if (mouseX > 225 && mouseX < 325 && mouseY > 250 && mouseY < 310 && press_once < 1) {
        summer = true;
        begin = false;
        press_once += 1;
    }

    if (mouseX > 75 && mouseX < 175 && mouseY > 400 && mouseY < 460 && press_once < 1) {
        fall = true;
        begin = false;
        press_once += 1;
    }

    if (mouseX > 225 && mouseX < 325 && mouseY > 400 && mouseY < 460 && press_once < 1) {
        winter = true;
        begin = false;
        press_once += 1;
    }
}

function drawSeagull(x, y, rot, sc) {
    push()
    translate(x, y)
    rotate(radians(rot))
    scale(sc)

    fill(255)
    arc(10, 0, 30, 40, PI, 0)
    arc(0, 0, 50, 70, 0, PI)
    line(-4, 0, -25, 0)

    fill(255)
    ellipse(8, -10, 15)
    fill(0)
    ellipse(8, -10, 10)

    fill(242, 140, 40)
    triangle(21, -8, 42, 0, 14, -1)
    ellipse(4, 36, 20, 5)
    ellipse(5, 36, 20, 5)

    push()
    fill(150)
    rotate(radians(20))
    arc(0, 10, 30, 40, 0, PI)
    pop()

    pop()

}

function drawPalmtree(x, y, rot, sc) {
    push();
    translate(x, y);
    rotate(radians(rot));
    scale(sc);

    fill(0, 200, 0);
    push();
    rotate(radians(-30));
    arc(120, -115, 70, 40, PI, 0);
    arc(40, -110, 70, 40, PI, 0);
    pop();
    push();
    rotate(radians(30));
    arc(-20, -120, 70, 40, PI, 0);
    arc(-100, -120, 70, 40, PI, 0);
    pop();

    fill("#4A3728");
    rect(0, -150, 16, 150);
    fill("#65350F");
    ellipse(0, -137, 20);
    ellipse(16, -137, 20);
    ellipse(8, -150, 20);
    pop();
}


function drawBoat(x, y, rot, sc) {
    push()
    translate(x, y)
    rotate(radians(rot))
    scale(sc)
    push()
    strokeWeight(3)
    stroke(0)
    line(-10, 0, -10, -50)
    pop()
    fill(255)
    rect(-10, -50, 40, 40)
    fill(128, 70, 4)
    arc(0, 0, 90, 60, 0, PI)
    pop()
}

function drawUmbrella(x, y, rot, sc) {
    push()
    translate(x, y)
    rotate(radians(rot))
    scale(sc)
    push()
    stroke(0)
    strokeWeight(5)
    line(0, 0, 0, -50)
    pop()
    fill(255, 0, 0)
    arc(0, -50, 80, 50, PI, 0)
    pop()

}

function drawSeagull(x, y, rot, sc) {
    push()
    translate(x, y)
    rotate(radians(rot))
    scale(sc)

    fill(255)
    arc(10, 0, 30, 40, PI, 0)
    arc(0, 0, 50, 70, 0, PI)
    line(-4, 0, -25, 0)

    fill(255)
    ellipse(8, -10, 15)
    fill(0)
    ellipse(8, -10, 10)

    fill(242, 140, 40)
    triangle(21, -8, 42, 0, 14, -1)
    ellipse(4, 36, 20, 5)
    ellipse(5, 36, 20, 5)

    push()
    fill(150)
    rotate(radians(20))
    arc(0, 10, 30, 40, 0, PI)
    pop()

    pop()

}

function drawWinterB(x, y) {
    push();
    translate(x, y);
    scale(0.8);
    //body
    fill('#35A5F0');
    ellipse(0, 0, 70, 50);
    //eye
    fill(255);
    push();
    rotate(radians(-30))
    ellipse(28, 5, 20, 25);
    pop();
    fill(0);
    ellipse(30, -8, 8);
    //wings
    fill('#7CCDF0');
    push();
    rotate(radians(-20));
    ellipse(-28, -10, 40, 25);
    pop();
    //lips
    fill('#F04600');
    ellipse(35, 5, 20, 5);
    ellipse(35, 8, 20, 5);

    pop();
}

// Fall leaf design
function leaf(x, y, col, rot) {
    push();
    translate(x, y);
    rotate(rot);
    fill(col);
    beginShape();
    vertex(5, 5);
    vertex(13, 15);
    vertex(14, 29);
    vertex(19, 24);
    vertex(25, 20);
    vertex(23, 31);
    vertex(17, 37);
    vertex(33, 32);
    vertex(49, 17);
    vertex(50, 20);
    vertex(33, 34);
    vertex(17, 39);
    vertex(32, 44);
    vertex(42, 54);
    vertex(32, 52);
    vertex(22, 45);
    vertex(24, 60);
    vertex(24, 60);
    vertex(19, 75);
    vertex(15, 65);
    vertex(13, 50);
    vertex(1, 65);
    vertex(-24, 75);
    vertex(-9, 50);
    vertex(4, 42);
    vertex(-10, 38);
    vertex(-23, 23);
    vertex(-2, 25);
    vertex(5, 33);
    vertex(3, 24);
    endShape(CLOSE);
    pop();
}

// Fall Columns
function fallColumn(x, y) {
    push();
    translate(x, y);
    stroke(0);
    strokeWeight(3);
    fill('#C2740B');
    rect(0, 0, 80, 300);
    fill(255, 0, 0);
    rect(0, 0, 80, 250);
    fill(250, 100, 0);
    rect(0, 0, 80, 200);
    fill(230, 100, 0);
    rect(0, 0, 80, 150);
    fill(255, 230, 0);
    rect(0, 0, 80, 100);
    fill('#F0BD20');
    rect(0, 0, 80, 50);
    strokeWeight(2);
    fill('#F9B40B');
    ellipse(40, 80, 40, 100);
    ellipse(40, 220, 40, 100);
    line(40, 20, 40, 80);
    line(40, 220, 40, 280);
    pop();
}

// Fall Bird
function drawFallBird(x, y) {
    push();
    stroke(0);
    translate(x, y);
    scale(0.7);
    fill(255, 0, 0);
    ellipse(0, 0, 60);
    fill(255);
    ellipse(18, -15, 15, 25);
    fill(0);
    ellipse(20, -15, 5, 7);
    fill(255, 255, 0);
    ellipse(20, 10, 20, 10);
    fill(250, 100, 0);
    ellipse(-20, 5, 40, 20);
    pop();
}

function drawFallColumn(x,y)
{
   push();
      translate(x,y);
      stroke(0);
      strokeWeight(3);
      fill('#C2740B');
      rect(0, 0, 80, 400);
      fill(255, 0, 0);
      rect(0, 0, 80, 250);
      fill(250,100, 0);
      rect(0, 0, 80, 200);
      fill(230, 100, 0);
      rect(0, 0, 80, 150);
      fill(255, 230, 0);
      rect(0, 0, 80, 100);
      fill('#F0BD20');
      rect(0, 0, 80, 50);
      strokeWeight(2);
      fill('#F9B40B');
      ellipse(40, 80, 40, 100);
      ellipse(40, 220, 40, 100);
      line(40, 20, 40, 80);
      line(40, 220, 40, 280);
   pop();
   }