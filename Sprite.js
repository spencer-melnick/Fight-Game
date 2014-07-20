function addSprite(x, y, xoffset, yoffset, spriteset){
	var sprite = {
	x:x,
	y:y,
	xoffset:xoffset,
	yoffset:yoffset,
	spriteset:spriteset,
	current:spriteset[0],
	ticks:0,
	frame:0,
	paused:false,
	canvas:document.getElementById("canvas_id"),
	}
	sprite.context=sprite.canvas.getContext("2d")
	sprite.setSprite=function(spritesetname){
		if(spritesetname!=undefined){
			sprite.spriteset = spritesetname;
			frame = 0;
			ticks = 0;
		}else
			throw("attempted to assign a non-existent spritesheet");
	}
	
	sprite.render=function(){
		sprite.context.drawImage(image.get("PlayerTest"), sprite.x, sprite.y);
		if (!sprite.paused)
		{
			sprite.ticks ++;
			if (sprite.ticks > 4)
			{
				sprite.ticks = 0;
				sprite.frame ++;
				if (sprite.frame >= sprite.spriteset.length)
					sprite.frame = 0;
				sprite.current = sprite.spriteset[sprite.frame];
			}
		}
	}
	
	sprite.setSpritePosition= function(x,y){
		sprite.x=x+xoffset;
		sprite.y=y+yoffset;
	}
	return sprite;
};