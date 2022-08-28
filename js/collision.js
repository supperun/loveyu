//判断大鱼和果实的距离
function momFruitsCollision () {
	if(data.gameOver)
		return;
	for(var i=0;i<fruit.num;++i)
	{
		if(fruit.alive[i])
		{
			//calculate length
			var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
			if(l<900)
			{
				//fruit eaten
				fruit.dead(i);
				data.fruitNum++;
				mom.bigBodyCount++;
				if(mom.bigBodyCount>7)
					mom.bigBodyCount=7;
				if(fruit.fruitType[i]=='blue')//blue
				{
					data.double=2;
				}
				wave.born(fruit.x[i],fruit.y[i]);
			}
		}
	}
}
//mom baby collision
function momBabyCollision () {
	if(data.gameOver||data.fruitNum<=0)
		return;
	var l=calLength2(mom.x,mom.y,baby.x,baby.y);
	
	if(l<900)
	{
		//baby recover
		baby.babyBodyCount=0;
		//data=>0;
		mom.bigBodyCount=0;
		//score update
		data.addScore();
		//data.reset();
		//draw halo
		helo.born(baby.x,baby.y);
	}
}
