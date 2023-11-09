var snakeX=0;
var snakeY=0;
var snake_segment=[];
var gameover=false;
var blocksize=25;
var total_row=17;
var total_col=17;
var foodX=0;
var foodY=0;
var speedX=0;
var speedY=0;
var context;
var board;
var score=0;
window.onload=function(){
     board=document.getElementById("board");
    board.width=total_col*blocksize;
    board.height=total_row*blocksize;
    context=board.getContext("2d");
    placeFood();
    document.addEventListener("keyup",changedirection);
    setInterval(update, 1000/10);
}
function update(){
    if(gameover){
        return;
    }
    context.fillStyle="green";
    context.fillRect(0,0,board.width,board.height);
    context.fillStyle="red";
    context.fillRect(foodX,foodY,blocksize,blocksize);
    if(snakeX==foodX&& snakeY==foodY){
        snake_segment.push([foodX,foodY]);
        score++;
       var s= document.getElementById("score");
       s.innerHTML="score:"+score;
        placeFood();
    }
    for(let i=snake_segment.length-1;i>0;i--){
        snake_segment[i]=snake_segment[i-1];
    }
    if(snake_segment.length){
        snake_segment[0]=[snakeX,snakeY];
    }
    context.fillStyle="yellow";
    snakeX+=speedX*blocksize;
    snakeY+=speedY*blocksize;
    context.fillRect(snakeX,snakeY,blocksize,blocksize);
    for(let i=0;i<snake_segment.length;i++){
    context.fillRect(snake_segment[i][0],snake_segment[i][1],blocksize,blocksize);
    }
    if(snakeX<0||snakeX>total_col*blocksize||snakeY<0||snakeY>total_row*blocksize){
        gameover=true;
        alert("game over");
    }
    for(let i=0;i<snake_segment.length;i++){
        if(snakeX==snake_segment[i][0] && snakeY==snake_segment[i][1]){
            gameover=true;
            alert("game over");
        } 
    }
}
function changedirection(e){
   if(e.code=="ArrowUp"&& speedY!=1){
    speedX=0;
    speedY=-1;
   }
   else if(e.code=="ArrowDown"&& speedY!=-1){
    speedX=0;
    speedY=1;
   }
   else if(e.code=="ArrowLeft"&& speedX!=1){
    speedX=-1;
    speedY=0;
   }
   else if(e.code=="ArrowRight"&& speedX!=-1){
    speedX=1;
    speedY=0;
   }
}
function placeFood(){
    foodX=Math.floor(Math.random()*total_col)*blocksize;
    foodY=Math.floor(Math.random()*total_row)*blocksize;   
}



