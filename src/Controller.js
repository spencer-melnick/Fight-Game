function addController(puppet){//puppet is the player that is controlled!
	console.log("Controller initialized");
	var controller = {
		puppet:puppet,
	}
	controller.updateKeyboard = function(){
		if(!controller.puppet.isAttacking){
			if(key.isDown.right){
				controller.puppet.rect.x += 5;
				controller.puppet.setDirection("Right");
				if (!controller.puppet.rect.touching(walls))//detect if controller.puppet will collide with a wall
					controller.puppet.moveEntity(5, 0);
				else
					controller.puppet.rect.x -= 5;
			}
			if(key.isDown.left){
				controller.puppet.rect.x -= 5;
				controller.puppet.setDirection("Left");
				if (!controller.puppet.rect.touching(walls))
					controller.puppet.moveEntity(-5, 0);
				else
					controller.puppet.rect.x += 5;
			}
			if(key.isDown.up){
				controller.puppet.rect.y -= 2;
				if (!controller.puppet.rect.touching(walls))
					controller.puppet.moveEntity(0, -2);
				else
					controller.puppet.rect.y += 2;
			}
			if(key.isDown.down){
				controller.puppet.rect.y += 2;
				if (!controller.puppet.rect.touching(walls))
					controller.puppet.moveEntity(0, 2);
				else
					controller.puppet.rect.y -= 2;
			}
			if(key.isDown.z){
				controller.puppet.executeAttack();
			}
		}
	}
	return controller;
}