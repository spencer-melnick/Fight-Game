var key = {
	isDown : {
		left : false,
		up : false,
		right : false,
		down : false,
		z : false
	}
}

function handleKey(keycode, value)
{
	switch (event.which)
	{
		case 37:
			key.isDown.left = value;
			break;
		
		case 38:
			key.isDown.up = value;
			break;
			
		case 39:
			key.isDown.right = value;
			break;
			
		case 40:
			key.isDown.down = value;
			break;
			
		case 90:
			key.isDown.z = value;
			
		default:
			break;
	}
}

$(document).keydown(function(event) {
	handleKey(event.which, true);
});

$(document).keyup(function(event) {
	handleKey(event.which, false);
});