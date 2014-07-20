var key = {
	isDown : {
		left : false,
		right : false,
		up : false,
		down : false
	}
}

function handleKey(keycode, value)
{
	switch (event.which)
	{
		case 37:
			key.isDown.left = true;
			break;
		
		case 38:
			key.isDown.up = true;
			break;
			
		case 39:
			key.isDown.right = true;
			break;
			
		case 40:
			key.isDown.left = true;
			break;
			
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