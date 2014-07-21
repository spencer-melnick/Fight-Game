function addController(puppet){//puppet is the player that is controlled!
	var controller = {
		puppet:puppet,
	}
	controller.updateKeyboard = function(){
		if(!controller.puppet.isAttacking){
			if(canvas.Input.isPressed(Input.Right)){
				controller.puppet.rect.x += 5;
				controller.puppet.setDirection("Right");
				if (!controller.puppet.rect.touching(walls))//detect if controller.puppet will collide with a wall
					controller.puppet.moveEntity(5, 0);
				else
					controller.puppet.rect.x -= 5;
			}
			if(canvas.Input.isPressed(Input.Left)){
				controller.puppet.rect.x -= 5;
				controller.puppet.setDirection("Left");
				if (!controller.puppet.rect.touching(walls))
					controller.puppet.moveEntity(-5, 0);
				else
					controller.puppet.rect.x += 5;
			}
			if(canvas.Input.isPressed(Input.Up)){
				controller.puppet.rect.y -= 2;
				if (!controller.puppet.rect.touching(walls))
					controller.puppet.moveEntity(0, -2);
				else
					controller.puppet.rect.y += 2;
			}
			if(canvas.Input.isPressed(Input.Bottom)){
				controller.puppet.rect.y += 2;
				if (!controller.puppet.rect.touching(walls))
					controller.puppet.moveEntity(0, 2);
				else
					controller.puppet.rect.y -= 2;
			}
			if(canvas.Input.isPressed(Input.Z)){
				controller.puppet.executeAttack();
			}
		}
	}
	return controller;
}