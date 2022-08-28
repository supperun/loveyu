var waveObj=function () {
	this.x=[];
	this.y=[];
	this.alive=[];
	this.r=[];
};
waveObj.prototype.num=10;
waveObj.prototype.init=function () {
	for(var i=0;i<this.num;++i)
	{
		this.alive[i]=false;
		this.r[i]=0;
	}
}
waveObj.prototype.draw=function () {
	cxt1.save();
	cxt1.linewidth=2;
	cxt1.shadowBlur=10;
	cxt1.shadowColor='white';
	for(var i=0;i<this.num;++i)
	{
		if(this.alive[i])
		{
			//draw
			//api round arc strokeStyle linewidth
			this.r[i]+=deltaTime*0.04;
			if(this.r[i]>50)
			{
				this.alive[i]=false;
				continue;
			}
			var alpha=1-this.r[i]/50;
			cxt1.beginPath();
			cxt1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			cxt1.closePath();
			cxt1.closePath();
			cxt1.strokeStyle='rgba(255,255,255,'+alpha+')';
			cxt1.stroke();
			
			//draw
			//console.log('draw');

		}
	}	
	cxt1.restore();
}
waveObj.prototype.born=function (x,y) {
	for(var i=0;i<this.num;++i)
	{
		if(!this.alive[i])
		{
			//born
			//console.log('born');
			this.alive[i]=true;
			this.r[i]=10;
			this.x[i]=x;
			this.y[i]=y;
			return;
		}
	}
}
