var dustObj=function () {
	this.x=[];
	this.y=[];
	this.amp=[];
	this.number=[];
	this.alpha;
}
dustObj.prototype.num=30;
dustObj.prototype.init=function () {
	for(var i=0;i<this.num;++i)
	{
		this.x[i]=Math.random()*canWidth;
		this.y[i]=Math.random()*canHeight;
		this.amp[i]=20+Math.random()*25;
		this.number[i]=Math.floor(Math.random()*7);//[0,6]
	}
	this.alpha=0;
}
dustObj.prototype.draw=function () {
	cxt1.save();
	this.alpha+=deltaTime*0.0008;
	var l=Math.sin(this.alpha);
	for(var i=0;i<this.num;++i)
	{
		var no=this.number[i];
		cxt1.drawImage(dustPic[no],this.x[i]+l*this.amp[i],this.y[i]);
	}
	cxt1.restore();

}