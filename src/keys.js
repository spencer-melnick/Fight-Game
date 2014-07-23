var key = {
	isDown : {
		left : false,
		up : false,
		right : false,
		down : false,
		x : false,
		z : false,
		t : false
	},
	
	onPress : {
		z : [],
		x : [],
		t : []
	}
}

function handleKey(keycode, value)
{
	switch (keycode)
	{
		case 37:
			key.isDown.left = value;
			return true;
		
		case 38:
			key.isDown.up = value;
			return true;
			
		case 39:
			key.isDown.right = value;
			return true;
			
		case 40:
			key.isDown.down = value;
			return true;
			
		case 88:
			key.isDown.x = value;
			return true;
			
		case 90:
			key.isDown.z = value;
			return true;
		
		case 84:
			key.isDown.t = value;
			return true;
			
		default:
			return false;
	}
}

$(document).bind("keydown",function(event) {
	event.preventDefault();
	
	switch (event.which) {
		case 88:
			if (!key.isDown.x) {
				for (i = 0; i < key.onPress.x.length; i ++) {
					key.onPress.x[i]();
				}
			}
			break;
			
		case 90:
			if (!key.isDown.z) {
				for (i = 0; i < key.onPress.z.length; i ++) {
					key.onPress.z[i]();
				}
			}
			break;
			
		case 84:
			if (!key.isDown.t) {
				for (i = 0; i < key.onPress.t.length; i ++) {
					key.onPress.t[i]();
				}
			}
			break;
	}
	
	handleKey(event.which, true);
});

$(document).bind("keyup",function(event) {
	handleKey(event.which, false);
});