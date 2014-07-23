function addPlayer(x,y,z) {
	var base = {
	hitboxes : [],
	sprites : [],
	x:x,
	y:y,
	z:z,
	facing:"Right",
	}
	//Define animation sheets
	base.walkSheet = [0,0,1,1];
	base.punchRightSheet = [2];
	base.punchLeftSheet = [3];
	
	base.sprite = addSprite(x,y,z,-50,0,50,base.walkSheet,"PlayerTest",200,200);
	base.sprite.shadow = new StaticSprite(x, y, z, 0, 0, 5, "PlayerShadow");
	
	base.state = "standing";//Is the player jumping, standing or fallen over?
	base.rect = newRect(x, y, z, 100, 200, 100, base);//The feet of the player -- the only part that collides with a wall
	base.hitbox = newRect(x, y, z, 100, 200, 100, base);//The hitbox of the player, used for registering hits on the player
	base.hitbox.solid = true;
	friendlyHitboxes.push(base.hitbox);//Add hitbox to the list of players
	base.hitboxes.push(base.hitbox);//Add to the list of self hitboxes -- this enables it to be moved with the player when the 'moveEntity()' function is called
	base.punchBoxRight = newRect(x+75, y+50, z, 75, 75, 75, base);//The hitbox of the punch attack
	base.punchBoxRight.solid=false;
	console.log(base.rect);
	base.punchBoxLeft = newRect(x-50, y+50, z, 75, 75, 75, base);
	base.punchBoxLeft.solid=false;
	base.hitboxes.push(base.punchBoxRight, base.punchBoxLeft);
	friendlyAttackboxes.push(base.punchBoxRight, base.punchBoxLeft);
	
	
	base.isAttacking = false;
	base.attackFrame = 0;
	base.attackFrameCount = 11;//Attack lasts 12 frames
	
	base.fallspeed = terminal;
	
	
//~~~~~~~~~~~~~~~~~~~~SET FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~		
	base.setDirection = function(direction){
		if((direction=="Right" || direction=="Left") && direction!=base.facing){
			base.facing = direction;
		}
	};
	
	base.executeAttack = function(){
		if(base.isAttacking){
			return;
		}
		else
		{
			base.sprite.setAnimation(base['punch'+base.facing+'Sheet']);
			base.isAttacking = true;
			base.attackFrame = 0;
		}
	};
	
	base.getCurrentAttackBox = function(){
		if(base.facing=="Right")
			return base.punchBoxRight;
		if(base.facing=="Left")
			return base.punchBoxLeft;
	};
	
	base.stepGravity = function(gravityconstant){
		if(!isNaN(gravityconstant)){
			base.fallspeed += gravityconstant;
			base.fallspeed = Math.min(terminal, base.fallspeed);
			base.rect.y += base.fallspeed;
			if (!base.rect.touching(walls)){
				base.moveEntity(0, base.fallspeed, 0);
				base.state = "midair";
			}
			else
			{
				base.state = "standing";
				base.rect.y -= base.fallspeed;
			}
		}
		else 
			throw("attempted to set an undefined gravity constant to 'Player'");
		base.sprite.shadow.setSpritePosition(base.rect.x,base.rect.y + base.rect.h + base.rect.raycastDown(floors),base.rect.z - 0.2);
	};
	
	base.update = function(){
		base.stepGravity(gravity);
		var currentAttackBox = base.getCurrentAttackBox();
		currentAttackBox.solid = base.isAttacking;
		if(base.isAttacking){
			if(base.attackFrame < base.attackFrameCount){
				base.attackFrame += 1;
				if(currentAttackBox.touching(enemyHitboxes)&&(base.attackFrame==1)){
					var target=currentAttackBox.getContact(enemyHitboxes);
					target.takeDamage(50);
				}
			}
			else
				{base.attackFrame=0;
				base.sprite.setAnimation(base.walkSheet);
				base.isAttacking = false;}
		}
	};
	
	base.moveEntity = function(x,y,z){
		for (i = 0; i < base.hitboxes.length; i++) {
			base.hitboxes[i].x += x;
			base.hitboxes[i].y += y;
			base.hitboxes[i].z += z;
		}
		this.x+=x;
		this.y+=y;
		this.z+=z;
		base.sprite.setSpritePosition(base.rect.x,base.rect.y,base.rect.z);
	}	
	return base;
}
	