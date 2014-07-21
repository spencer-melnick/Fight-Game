function Enemy(x,y,z,width,height,image, health){
	this.x=x;
	this.y=y;
	this.z=z;
	this.width=width;
	this.height=height;
	this.image=image;
	this.health=health;
	
	this.sprite = addSprite(x,y,-50,0,[image]);
	this.hitbox = newRect(x, y, width, height, this);
	enemyHitboxes.push(this.hitbox);
	
	this.takeDamage = function(damage){
		console.log("enemy has taken damage!");
		this.health-=damage;
		if(this.health<=0){
			this.kill();
		}
	};
	
	this.kill = function(){
		delete this.sprite;
		removeFromArray(enemyHitboxes, this.hitbox);
		delete this.hitbox;
	};
	return this;
};