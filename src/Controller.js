function addController(puppet, xvel, yvel){//puppet is the player that is controlled!
	console.log("Controller initialized");
	var controller = {
		puppet:puppet,
	}
	controller.updateKeyboard = function(){
		if(!controller.puppet.isAttacking){
			if(key.isDown.right){
				controller.puppet.rect.x += xvel;
				controller.puppet.setDirection("Right");
				if (!controller.puppet.rect.touching(walls))//detect if controller.puppet will collide with a wall
					controller.puppet.moveEntity(xvel, 0);
				else
					controller.puppet.rect.x -= xvel;
			}
			if(key.isDown.left){
				controller.puppet.rect.x -= xvel;
				controller.puppet.setDirection("Left");
				if (!controller.puppet.rect.touching(walls))
					controller.puppet.moveEntity(-xvel, 0);
				else
					controller.puppet.rect.x += xvel;
			}
			if(key.isDown.up){
				controller.puppet.rect.y -= yvel;
				if (!controller.puppet.rect.touching(walls))
					controller.puppet.moveEntity(0, -yvel);
				else
					controller.puppet.rect.y += yvel;
			}
			if(key.isDown.down){
				controller.puppet.rect.y += yvel;
				if (!controller.puppet.rect.touching(walls))
					controller.puppet.moveEntity(0, yvel);
				else
					controller.puppet.rect.y -= yvel;
			}
			if(key.isDown.z){
				controller.puppet.executeAttack();
			}
		}
	}
	return controller;
}