const width=1080;
const height=720;
let x = [];
let e = [];
var gravity = 0.5;

var player={
    x:width/2,
    y:height/2,
    size:40,
    xspeed:0,
    xaccel:1,
    yspeed:0,
    yaccel:-2.5,
    isjump:1,
};

class enemy{
    constructor(x,y,size, angle , speed){
        this.x = x;
        this.y = y; 
        this.size = size;
        this.angle = angle;
        this.speed = speed;
    }
}
function moveEnemy(enemy){
    fill(255,0,0);
    //no se mates Q_Q

    var rads = (angle-90) * Math.PI / 180;
    obj.x += Math.cos(rads);
    obj.y += Math.sin(rads);
    circle(obj.x,obj.y,obj.size);
}



setup = function(){
    var myCanvas = createCanvas(width,height);
    myCanvas.parent("container");
    noStroke();
}
function playermove(){
    fill(255,255,255);
    
    //movimiento horizontal
    player.xspeed += ((keyIsDown(LEFT_ARROW) && player.x >= 0) * -player.xaccel) 
    + ((keyIsDown(RIGHT_ARROW) && player.x <= width - player.size) * +player.xaccel);
    
    player.xspeed -= Math.sign(player.xspeed) * player.xaccel/2;
    
    while(player.x+player.xspeed <= 0){
        player.xspeed += player.xaccel/2;
    }
    
    while(player.x+player.xspeed >= width-player.size){
        player.xspeed -= player.xaccel/2;
    }
    
    //Walljump
    if(player.x+player.xspeed < 1 && player.y < 650 && keyIsDown(90) && keyIsDown(LEFT_ARROW)){
        
        player.xspeed = 25;
        player.yspeed = -15;
    }
    if(player.x+player.xspeed >= width-player.size - 1 && player.y < 650 && keyIsDown(90) && keyIsDown(RIGHT_ARROW)){
        player.xspeed = -25;
        player.yspeed = -15;
    }


    player.x += player.xspeed;
    



    //Salto
    if(player.isjump <= 5){
        player.yspeed += keyIsDown(90) * player.yaccel;
        player.isjump += 1;
    }  
    player.yspeed += gravity;

    if(player.y+player.yspeed > height-player.size){
        player.isjump=0;
        while(player.y+player.yspeed > height-player.size){
            player.yspeed -= 0.1;
        }
    }

    while(player.y + player.yspeed < 0){
        player.yspeed += 1;
    } 
    player.y = round(player.yspeed + player.y);

    //dibujar
    text(player.y, 10, 30);
    square(player.x,player.y,player.size);
}


function draw() {
    let ms = millis();
    background(75,75,255);
    playermove();
}
