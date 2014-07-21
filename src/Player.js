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
		base.walkSheet = ["PlayerTest","PlayerTest","PlayerTest2","PlayerTest2"];
		base.punchRightSheet = ["PlayerPunchRight"];
		base.punchLeftSheet = ["PlayerPunchLeft"];
		
		
		
		base.sprite = addSprite(x,y,z,-50,-175,base.walkSheet);
		base.state = "grounded";//Is the player jumping, standing or fallen over?
		base.rect = newRect(x, y, z, 100, 25, base);//The feet of the player -- the only part that collides with a wall
		base.hitbox = newRect(x, y-175, z, 100, 200, base);//The hitbox of the player, used for registering hits on the player
		base.hitbox.solid = true;
		friendlyHitboxes.push(base.hitbox);//Add hitbox to the list of players
		base.hitboxes.push(base.hitbox);//Add to the list of self hitboxes -- this enables it to be moved with the player when the 'moveEntity()' function is called
		base.punchBoxRight = newRect(x+75, y-50, z, 75, 75, 75, base);//The hitbox of the punch attack
		base.punchBoxRight.solid=false;
		base.punchBoxLeft = newRect(x-50, y-50, z, 75, 75, 75, base);
		base.punchBoxLeft.solid=false;
		base.hitboxes.push(base.punchBoxRight, base.punchBoxLeft);
		base.isAttacking = false;
		base.attackFrame = 0;
		base.attackFrameCount = 11;//Attack lasts 12 frames
		
		
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
				base.sprite.setSprite(base['punch'+base.facing+'Sheet']);
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
		base.updateAttack = function(){
			var currentAttackBox = base.getCurrentAttackBox();
			currentAttackBox.solid = base.isAttacking;
			if(base.isAttacking){
				if(base.attackFrame < base.attackFrameCount){
					base.attackFrame += 1;
					if(currentAttackBox.touching(enemyHitboxes)){
						var target=currentAttackBox.getContact(enemyHitboxes);
						target.takeDamage(5);
					}
				}
				else
					{base.attackFrame=0;
					base.sprite.setSprite(base.walkSheet);
					base.isAttacking = false;}
			}
		};
		base.moveEntity = function(x,y,z){
			for (i = 0; i < base.hitboxes.length; i++) {
				base.hitboxes[i].x += x;
				base.hitboxes[i].y += y;
				base.hitboxes[i].x += z;
			}
			this.x+=x;
			this.y+=y;
			this.z+=z;
			console.log(base.rect);
			base.sprite.setSpritePosition(base.rect.x,base.rect.y,base.rect.z);
		}	
		/*base.checkCanMove = function(x,y,z, array){
			base.rect.x += x;
			base.rect.y += y;
			base.rect.z += z;
				if (!base.rect.touching(array))
					base.moveEntity(x, y, z);
				else
					base.rect.x -= x;
					base.rect.y -= y;
					base.rect.z -= z;
		};*/
		return base;
	}
	