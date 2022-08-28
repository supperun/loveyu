var fruitObj=function () {
	this.alive=[];//bool
	this.orange=new Image();
	this.blue=new Image();
	this.x=[];
	this.y=[];
	this.l=[];
	this.speed=[];
	this.aneid=[];
	this.fruitType=[];

};
fruitObj.prototype.num=30;
fruitObj.prototype.init=function () {
	for(var i=0;i<this.num;++i)
	{
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.l[i]=0;
		this.speed[i]=Math.random()*0.017+0.003;
		this.aneid[i]=-1;
		this.fruitType[i]="";
		//this.born(i);
	}
	this.orange.src='./src/fruit.png';
	this.blue.src='./src/blue.png';
}
fruitObj.prototype.draw=function () {
	
	for(var i=0;i<this.num;++i)
	{
		//draw fruit
		//find an ane, grow, fly up
		//delta每两帧之间的时间间隔
		if(this.alive[i])
		{
			var pic=this.fruitType[i]=="blue"?this.blue:this.orange;

			if(this.l[i]<=14)//grouw
			{
				this.l[i]+=this.speed[i]*deltaTime;
				this.x[i]=ane.headx[this.aneid[i]];
				this.y[i]=ane.heady[this.aneid[i]];
			}
			else
			{
				this.y[i]-=this.speed[i]*6*deltaTime;
			}
			cxt2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			if(this.y[i]<10)
			{
				this.alive[i]=false;
			}
			if(this.y[i]<(ane.heady[this.aneid[i]]-10))
			{
				ane.isExisted[this.aneid[i]]=false;
				this.aneid[i]=-1;
			}
		}

	}
}
fruitObj.prototype.dead=function (i) {
	this.alive[i]=false;
	if(this.aneid[i]!=-1)
	{
		ane.isExisted[this.aneid[i]]=false;
		this.aneid[i]=-1;
	}
}
fruitObj.prototype.born=function (i) {
	var aneid;
	while(1)
	{
		aneid=Math.floor(Math.random()*ane.num);
		if(ane.isExisted[aneid]==false)
		{
			ane.isExisted[aneid]=true;
			break;
		}
	}
	this.aneid[i]=aneid;
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();
	this.fruitType[i]=ran>0.1?"orange":"blue";
	
}
function fruitMonitor() {
	/* body... */
	var num=0;
	for(var i=0;i<fruit.num;++i)
	{
		if(fruit.alive[i])
			num++;
	}
	if(num<15)
	{
		//send fruit;
		sendFruit();
		return;
	}
}
function sendFruit () {
	for(var i=0;i<fruit.num;++i)
	{
		if(!fruit.alive[i])
		{
			fruit.born(i);
			return;
		}
	}
}
