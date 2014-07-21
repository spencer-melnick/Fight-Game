function Enemy(x,y,z,width,height,depth,image,health){
	this.x=x;
	this.y=y;
	this.z=z;
	this.width=width;
	this.height=height;
	this.image=image;
	this.health=health;
	
	this.sprite = addSprite(x,y,z,-50,-175,[image]);
	this.hitbox = newRect(x, y, z, width, height, depth, this);
	console.log(this.hitbox);
	enemyHitboxes.push(this.hitbox);
	walls.push(this.hitbox);
	
	this.takeDamage = function(damage){
		console.log("enemy has taken damage!");
		this.health-=damage;
		if(this.health<=0){
			this.kill();
		}
	};
	
	this.kill = function(){
		removeFromArray(walls, this.hitbox);
		removeFromArray(enemyHitboxes, this.hitbox);
		scene.remove(this.sprite.render);
		delete this.sprite;
		delete this.hitbox;
		delete this;
	};
	return this;
};