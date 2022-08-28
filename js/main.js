var can1,can2;
var cxt1,cxt2;
var lastTime,deltaTime;
var bgPic=new Image();
var canWidth,canHeight;
var ane;
var fruit;
var mom;
var mx,my;
var baby;
var babyTail=[];
var babyEye=[];
var babyBody=[];
var momTail=[];
var momEye=[];
var data=[];
var momBodyOra=[];
var momBodyBlue=[];
var wave;
var helo;
var dust;
var dustPic=[];
document.body.onload=game;
function game () {
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
}
function init () {
	//获得canvas,context
	can1=document.getElementById('canvas1');//fishes,dust,UI,circle
	can2=document.getElementById('canvas2');//backgroun.ane,fruits
	cxt1=can1.getContext('2d');
	cxt2=can2.getContext('2d');

	can1.addEventListener('mousemove', onMouseMove, false);
	bgPic.src='./src/background.jpg';
	canWidth=can1.width;
	canHeight=can1.height;
	ane=new aneObj();
	ane.init();
	fruit=new fruitObj();
	fruit.init();
	mom=new momObj();
	mom.init();

	mx=canWidth/2;
	my=canHeight/2;
	baby=new babyObj();
	baby.init();
	for(var i=0;i<8;++i)
	{
		babyTail[i]=new Image();
		babyTail[i].src="./src/babyTail"+i+".png";
	}
	for(i=0;i<2;i++)
	{
		babyEye[i]=new Image();
		babyEye[i].src='./src/babyEye'+i+'.png';
	}
	for(i=0;i<20;i++)
	{
		babyBody[i]=new Image();
		babyBody[i].src='./src/babyFade'+i+'.png';
	}
	for(i=0;i<8;++i)
	{
		momTail[i]=new Image();
		momTail[i].src='./src/bigTail'+i+'.png';
	}
	for(i=0;i<2;++i)
	{
		momEye[i]=new Image();
		momEye[i].src='./src/bigEye'+i+'.png';
	}
	data=new dataObj();
	for(i=0;i<8;++i)
	{
		momBodyOra[i]=new Image();
		momBodyBlue[i]=new Image();
		momBodyOra[i].src='./src/bigSwim'+i+'.png';
		momBodyBlue[i].src='./src/bigSwimBlue'+i+'.png';
	}
	wave=new waveObj();
	wave.init();
	helo=new heloObj();
	helo.init();
	for(i=0;i<7;++i)
	{
		dustPic[i]=new Image();
		dustPic[i].src='./src/dust'+i+'.png';
	}

	dust=new dustObj();
	dust.init();
	cxt1.fillStyle='white';
	cxt1.font="30px Verdana";
	cxt1.textAlign="center";//center/left/right

}
function gameloop () {
	window.requestAnimFrame(gameloop);//setInterval, setTimeout
	//console.log('loop');
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	//console.log(deltaTime);
	if(deltaTime>40)
		deltaTime=40;
	drawbackground();
	ane.draw();
	
	fruitMonitor();
	fruit.draw();
	cxt1.clearRect(0,0,canWidth,canHeight);

	mom.draw();
	baby.draw();
	momFruitsCollision();
	momBabyCollision();
	data.draw();
	wave.draw();
	helo.draw();
	dust.draw();
}
function onMouseMove (e) {
	if(data.gameOver)
		return;
	if(e.offSetX||e.layerX)
	{
		mx=e.offSetX==undefined?e.layerX:e.offSetX;
		my=e.offSetY==undefined?e.layerY:e.offSetY;
	}
}
