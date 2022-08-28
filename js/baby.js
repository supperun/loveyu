var babyObj=function () {
	this.x;
	this.y;
	this.angle;

	this.babyTailTimer=0;
	this.babyTailCount=0;

	this.babyEyeTimer=0;
	this.babyEyeCount=0;
	this.babyEyeInternal=1000;

	this.babyBodyTimer=0;
	this.babyBodyCount=0;
};
babyObj.prototype.init=function () {
	this.x=canWidth/2-50;
	this.y=canHeight/2+50;
	this.angle=0;
}
babyObj.prototype.draw=function () {
	//lerp x y
	this.x=lerpDistance(mom.x,this.x,0.98);
	this.y=lerpDistance(mom.y,this.y,0.98);

	//lerp angle;
	var deltay=mom.y-this.y;
	var deltax=mom.x-this.x;
	var beta=Math.atan2(deltay, deltax)+Math.PI;
	this.angle=lerpAngle(beta,this.angle,0.6);
	//baby tail count
	this.babyTailTimer+=deltaTime;
	if(this.babyTailTimer>50)
	{
		this.babyTailCount=(this.babyTailCount+1)%8;
		this.babyTailTimer%=50;
	}
	//baby eye count
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInternal)
	{
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInternal;
		{
			if(this.babyEyeCount==0)
			{
				this.babyEyeInternal=Math.random()*1500+2000;
			}
			else
			{
				this.babyEyeInternal=200;
			}
		}
	}
	//baby body
	this.babyBodyTimer+=deltaTime;
	if(this.babyBodyTimer>200)
	{
		this.babyBodyCount+=1;
		this.babyBodyTimer%=200;
		if(this.babyBodyCount>19)
		{
			this.babyBodyCount=19;
			//game over;
			data.gameOver=true;
		}
	}

	cxt1.save();
	cxt1.translate(this.x,this.y);
	cxt1.rotate(this.angle);
	var count=this.babyTailCount;
	var eyecount=this.babyEyeCount;
	var bodycount=this.babyBodyCount;
	cxt1.drawImage(babyTail[count],-babyTail[count].width/2+23,-babyTail[count].height/2);
	cxt1.drawImage(babyBody[bodycount],-babyBody[bodycount].width/2,-babyBody[bodycount].height/2);
	cxt1.drawImage(babyEye[eyecount],-babyEye[eyecount].width/2,-babyEye[eyecount].height/2);
	
	cxt1.restore();
}
