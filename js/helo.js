var heloObj=function () {
	this.x=[];
	this.y=[];
	this.alive=[];
	this.r=[];
};
heloObj.prototype.num=5;
heloObj.prototype.init=function () {
	for(var i=0;i<this.num;++i)
	{
		this.x[i]=0;
		this.y[i]=0;
		this.alive[i]=0;
		this.r[i]=0;
	}
}
heloObj.prototype.draw=function () {
	cxt1.save();
	cxt1.linewidth=2;
	cxt1.shadowBlur=10;
	cxt1.shadowColor='rgba(203,91,0,1)';
	for(var i=0;i<this.num;++i)
	{
		if(this.alive[i])
		{
			//draw
			this.r[i]+=deltaTime*0.05;
			if(this.r[i]>50)
			{
				this.alive[i]=false;
				continue;
			}
			var alpha=1-this.r[i]/50;
			cxt1.beginPath();
			cxt1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			cxt1.closePath();

			cxt1.strokeStyle='rgba(203,91,0,'+alpha+')';
			cxt1.stroke();
			
		}
	}
	cxt1.restore();
}
heloObj.prototype.born=function (x,y) {
	for(var i=0;i<this.num;++i)
	{
		if(!this.alive[i])
		{
			this.alive[i]=true;
			this.r[i]=10;
			this.x[i]=x;
			this.y[i]=y;
		}
	}
}