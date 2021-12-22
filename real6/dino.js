var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100;

var img1 = new Image();
img1.src = 'img/run_right.gif';
var img2 = new Image();
img2.src = 'img/smbk2.png';
var dino={
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green'; //이거 없애면 invisible
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img1,this.x,this.y);
    }
}
dino.draw();

class Cactus {
    constructor(){
        this.x=500;
        this.y=200;
        this.width=50 ;
        this.height=50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img2,this.x,this.y);
    }
}

var timer=0;
//var jump_timer=0;
var cactus_arr=[];
var jump_spd=3;
var all_spd=5;
var animation;

function func_frame(){ //frame마다 실행됨 , 대부분 60hz인듯
    animation = webkitRequestAnimationFrame(func_frame);
    timer++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    if(timer%150===0){  //1초마다 새 장애물 만들기
        var cactus = new Cactus();
        cactus_arr.push(cactus);
        
    }
    cactus_arr.forEach((a,i,o)=>{
        if(a.x<0){
            o.splice(i,1)
        }
        a.x-=all_spd;
        collide(dino,a);  //실시간으로 충돌하는지 확인해야하니
        a.draw();
    })


    if(jumping==true){
        dino.y-=jump_spd;
        //jump_timer++;
    }
    if(jumping==false){
        if(dino.y<200 ){
            dino.y+=jump_spd;
        }

    }
    if(dino.y<110){
        jumping=false;
        //jump_timer=0;
    }
    dino.draw(); 
}

//실행!
func_frame();


//충돌확인
function collide(dino,cactus){
    var collide_yes=false;
    var difx=cactus.x-  (dino.x+dino.width);
    var dify = cactus.y - (dino.y+dino.height);
    if(difx<0 && dify<0){
        collide_yes=true;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        cancelAnimationFrame(animation);
    }
}


//space바로 점프
var jumping=false;
document.addEventListener('keydown',function(e){
     if(e.code=='Space'){
        jumping=true;
     }
 })

