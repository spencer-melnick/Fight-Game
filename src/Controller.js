function addController(puppet, vel){//puppet is the player that is controlled!
	console.log("Controller initialized");
	var controller = {
		puppet:puppet,
	}
	controller.updateKeyboard = function(){
		if(!controller.puppet.isAttacking){
			if(key.isDown.right){
				controller.puppet.rect.x += vel;
				controller.puppet.setDirection("Right");
				if (!controller.puppet.rect.touching(walls))//detect if controller.puppet will collide with a wall
					controller.puppet.moveEntity(vel, 0, 0);
				else
					controller.puppet.rect.x -= vel;
			}
			if(key.isDown.left){
				controller.puppet.rect.x -= vel;
				controller.puppet.setDirection("Left");
				if (!controller.puppet.rect.touching(walls))
					controller.puppet.moveEntity(-vel, 0, 0);
				else
					controller.puppet.rect.x += vel;
			}
			if(key.isDown.up){
				controller.puppet.rect.z -= vel;
				if (!controller.puppet.rect.touching(walls))
					controller.puppet.moveEntity(0, 0, -vel);
				else
					controller.puppet.rect.z += vel;
			}
			if(key.isDown.down){
				controller.puppet.rect.z += vel;
				if (!controller.puppet.rect.touching(walls))
					controller.puppet.moveEntity(0, 0, vel);
				else
					controller.puppet.rect.z -= vel;
			}
			if(key.isDown.z){
				controller.puppet.executeAttack();
			}
			if (key.isDown.x){
				controller.puppet.fallspeed = -10;
			}
		}
	}
	return controller;
}