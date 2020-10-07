const width=720;
const height=720;
let x = [];
let e = [];
var gravity = 1;
var player={
    x:width/2,
    y:height/2,
    size:20,
    xspeed:0,
    xaccel:1,
    yspeed:0,
    yaccel:-5,
    isjump:1,
};

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

    player.y += player.yspeed;
    //dibujar
    square(player.x,player.y,player.size);
}


function draw() {
    let ms = millis();
    background(75,75,255);
    playermove();
}
