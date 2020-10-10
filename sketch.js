const width=1080;
const height=720;
let x = [];
let e = [];
var gravity = 0.5;
let playersprite;
var player={
    x:width/2,
    y:height/2,
    size:40,
    xspeed:0,
    xaccel:1,
    yspeed:0,
    yaccel:-2.5,
    isjump:1,
    canwall:0,
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
    playersprite = createSprite(player.x,  player.y,  player.size,  player.size);
    playersprite.shapeColor = color(255);
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
    
    
    

    



    //jump
    if(player.isjump <= 5){
        player.yspeed += keyIsDown(90) * player.yaccel;
        player.isjump += 1;
    }  
    player.yspeed += gravity;

    if(player.y+player.yspeed > height-player.size){
        if(!keyIsDown(90)){
            player.isjump=0;
        }  
        while(player.y+player.yspeed > height-player.size){
            player.yspeed -= 0.1;
        }
    }

    while(player.y + player.yspeed < 0){
        player.yspeed += 1;
    } 

    //Walljump

    if(player.canwall == 1){
        if(player.x < 1 && keyIsDown(90)){
            
            player.xspeed = 25;
            player.yspeed = -15;
        }
        if(player.x >= width-player.size - 1 && keyIsDown(90)){
            player.xspeed = -25;
            player.yspeed = -15;
        }
    }   
    //not too good method to avoid auto walljump
    if(!keyIsDown(90) && (player.x < 1 || player.x >= width-player.size - 1) && player.isjump != 0){
        player.canwall = 1;
    } else{
        player.canwall = 0;
    }


    player.x += player.xspeed;
    player.y = round(player.yspeed + player.y);

    //i know it's a bad bodge but i wanna have this ready and working
    playersprite.position.x = player.x + player.size/2;
    playersprite.position.y = player.y + player.size/2;
}


function draw() {
    background(75,75,255);
    drawSprites();
    let ms = millis();
    playermove();
}