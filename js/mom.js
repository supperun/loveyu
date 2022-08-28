var momObj=function () {
	
	this.x;
	this.y;
	this.angle;
	this.bigEyeTimer=0;
	this.bigEyeCount=0;
	this.bigEyeInternal=800;
	this.bigBodyCount=0;

	this.bigTailTimer=0;
	this.bigTailCount=0;

};
momObj.prototype.init=function () {
		this.x=canWidth/2;
		this.y=canHeight/2;
		this.angle=0;
}

momObj.prototype.draw=function () {
	//lerp x,y
	//commonFunction
	this.x=lerpDistance(mx,this.x,0.98);
	this.y=lerpDistance(my,this.y,0.98);

	//delta angle
	//Math.atan2(y,x)
	var deltay=my-this.y;
	var deltax=mx-this.x;
	var beta=Math.atan2(deltay, deltax)+Math.PI;
	//lerp angle
	this.angle=lerpAngle(beta,this.angle,0.6);
	//tail
	this.bigTailTimer+=deltaTime;
	if(this.bigTailTimer>50)
	{
		this.bigTailCount+=1;
		this.bigTailCount%=8;
		this.bigTailTimer%=50;
	}
	//eye
	this.bigEyeTimer+=deltaTime;
	if(this.bigEyeTimer>this.bigEyeInternal)
	{
		this.bigEyeCount=(this.bigEyeCount+1)%2;
		this.bigEyeTimer%=this.bigEyeInternal;
		if(this.bigEyeCount==0)
		{
			this.bigEyeInternal=Math.random()*1000+500;
		}
		else
			this.bigEyeInternal=200;

	}
	cxt1.save();
	cxt1.translate(this.x,this.y);
	cxt1.rotate(this.angle);
	var be=this.bigEyeCount;
	var bb=this.bigBodyCount;
	var bt=this.bigTailCount;
	cxt1.drawImage(momTail[bt],-momTail[bt].width/2+30,-momTail[bt].height/2);

	if(data.double==1)//orange
	{
		cxt1.drawImage(momBodyOra[bb],-momBodyOra[bb].width/2,-momBodyOra[bb].height/2);
	}
	else
	{
		cxt1.drawImage(momBodyBlue[bb],-momBodyBlue[bb].width/2,-momBodyBlue[bb].height/2);
	}
	cxt1.drawImage(momEye[be],-momEye[be].width/2,-momEye[be].height/2);
	cxt1.restore();
}
