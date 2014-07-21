function SceneObject(renderfunc, depth) {
	this.render = renderfunc;
	this.depth = depth;
	return this;
};

var scene = {
	sprites : [],
	
	get : function(renderfunc) {
		for (i = 0; i < this.sprites.length; i ++) {
			if (this.sprites[i].render == renderfunc)
				return i;
		}
		return Number.NaN;
	},
	
	remove : function(renderfunc) {
		var x = this.get(renderfunc);
		if (!isNaN(x))
			this.sprites.splice(i, 1);
	},
	
	add : function(renderfunc, depth) {
		var i = 0;
		for (i = 0; i < this.sprites.length; i ++) {
			if (this.sprites[i].depth > depth)
				break;
		}
		this.sprites.splice(i, 0, new SceneObject(renderfunc, depth));
	},
	
	setDepth : function(renderfunc, depth) {
		var x = this.get(renderfunc);
		if (!isNaN(x))
			this.sprites.splice(x, 1);
		this.add(renderfunc, depth);
	},
	
	render : function() {
		for (var i in this.sprites) {
			this.sprites[i].render();
		}
	}
};

function addSprite(x, y, z, xoffset, yoffset, spriteset){
	var sprite = {
	x:x,
	y:y,
	z:z,
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
		sprite.context.drawImage(image.get(sprite.current), sprite.x, sprite.y + (sprite.z/zScale));
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
	
	sprite.setSpritePosition= function(x,y,z){
		sprite.x=x+xoffset;
		sprite.y=y+yoffset;
		sprite.z=z;
		scene.setDepth(sprite.render, sprite.z);
	}
	sprite.setSpritePosition(x,y,z);
	
	return sprite;
};	