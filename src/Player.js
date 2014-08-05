function addPlayer(x,y,z) {
	var base = {
	hitboxes : [],
	sprites : [],
	x  :x,
	y : y,
	z : z,
	fallspeed : terminal,
	}
	facing = "Right";
	state = "standing";
	isAttacking = false;
	isStanding = true;
	attackFrame = 0;
	
	//Define animation sheets
	base.walkRightSheet = [0,1,2,3,4,5,6,7];
	base.walkLeftSheet = [8,9,10,11,12,13,14,15];
	base.standRightSheet = [16,17,18,19];
	base.standLeftSheet = [23,22,21,20];
	punchRightSheet = [24,25,26,27];
	punchLeftSheet = [31,30,29,28];
	
	sprite = addSprite(x,y,z,-30,0,50,base.walkRightSheet,"PlayerTest",128,128);
	sprite.shadow = new StaticSprite(x, y, z, 0, 0, 5, "PlayerShadow");
	
	base.rect = newRect(x, y, z, 65, 115, 65, base);
	punchBoxRight = newRect(x+55, y+40, z, 45, 35, 45, base);
	punchBoxLeft  = newRect(x-33, y+40, z, 45, 35, 45, base);
	base.hitboxes.push(punchBoxLeft, punchBoxRight);
	friendlyHitboxes.push(punchBoxLeft, punchBoxRight, base.rect);

	addAttack = function(spritesheet, hitbox, damage, duration) {
		var attack = {
			duration : duration,
			spritesheet : spritesheet,
			damage : damage,
			hitbox : hitbox,
		}
		if(typeof duration == undefined) {attack.duration = spritesheet.length;}
		return attack;
	};
	
	base.punchRight = addAttack(punchRightSheet, punchBoxRight, 20, 19);
	base.punchLeft = addAttack(punchLeftSheet, punchBoxLeft, 20, 19);
	
	stepAttack = function() {
		if((typeof currentAttack != undefined) && (isAttacking)) {
			if(attackFrame < (currentAttack.duration - 1)) {
				attackFrame += 1;
				if(currentAttack.hitbox.touching(enemyHitboxes) && (attackFrame == 14)) {
					var target=currentAttack.hitbox.getContact(enemyHitboxes);
					target.takeDamage(currentAttack.damage);
				}
			}
			else
			{
				attackFrame=0;
				isAttacking = false;
				//sprite.setAnimation(base[state + facing + "Sheet"]);
				if(base.isStanding == true)
				{
					base.setStanding(true);
				}
				else{
					base.setStanding(false);
					sprite.setAnimation(base["walk" + facing + "Sheet"]);
				}
			}
		}
	};
	
	stepGravity = function(gravityconstant){
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
				
				surfDist = base.rect.raycastDown(walls);
				base.rect.y += surfDist;
				base.moveEntity(0, surfDist, 0);
			}
		}
		else 
			throw("attempted to set an undefined gravity constant to 'Player'");
			sprite.shadow.setSpritePosition(base.rect.x+10,base.rect.y+15 + base.rect.h + base.rect.raycastDown(floors),base.rect.z - 0.2);
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
		sprite.setSpritePosition(base.rect.x,base.rect.y,base.rect.z);
	};
	
	base.setDirection = function(direction){
		if((direction=="Right" || direction=="Left") && direction!=facing){
			facing = direction;
			sprite.setAnimation(base["walk" + facing + "Sheet"]);
		}
	};
	
	base.setStanding = function(state) {
		if (sprite.isStanding != state)
		{
			if (state)
				sprite.setAnimation(base["stand" + facing + "Sheet"]);
			else
				sprite.setAnimation(base["walk" + facing + "Sheet"]);
		}
		
		sprite.isStanding = state;
	}

	base.isAttacking = function () {
		return isAttacking;
	};
	
	base.executeAttack = function(attack){
		if(isAttacking){
			return;
		}
		else
		{
			sprite.setAnimation(base[attack + facing].spritesheet);
			isAttacking = true;
			attackFrame = 0;
			currentAttack = base[attack + facing];
		}
	};

	base.update = function(){
		stepGravity(gravity);
		stepAttack();
	};
	return base;
}
	