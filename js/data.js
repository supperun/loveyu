var dataObj=function () {
	/* body... */
	this.fruitNum=0;
	this.double=1;
	this.score=0;
	this.gameOver=false;
	this.alpha=0;
}	
dataObj.prototype.reset=function () {
	this.fruitNum=0;
	this.double=1;
}

dataObj.prototype.draw=function () {
	cxt1.save();
	cxt1.shadowBlur=10;
	cxt1.shadowColor='white';
	cxt1.fillText("Score: "+this.score,canWidth/2,canHeight-50)
	if(this.gameOver)
	{
		this.alpha+=deltaTime*0.0005;
		if(this.alpha>1)
			this.alpha=1;
		cxt1.fillStyle="rgba(255,255,255,"+this.alpha+")";
		cxt1.fillText('Game Over!',canWidth/2,canHeight/2);
	}
	cxt1.restore();
}
dataObj.prototype.addScore=function () {
	this.score+=this.fruitNum*100*this.double;
	this.fruitNum=0;
	this.double=1;
}
