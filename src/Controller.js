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
		}
	};
	
	controller.onJump = function() {
		if(controller.puppet.state=="standing")
		{
			controller.puppet.fallspeed = -15;
			controller.puppet.state="midair";
		}
	};
	
	controller.onAttack = function() {
		controller.puppet.executeAttack();
	}
	
	controller.toggleDebug = function() {
		debug = !debug;
	}
	
	key.onPress.x.push(controller.onJump);
	key.onPress.z.push(controller.onAttack);
	key.onPress.t.push(controller.toggleDebug);
	
	return controller;
}