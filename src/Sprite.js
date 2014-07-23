function SceneObject(sprite, depth) {
	this.sprite = sprite;
	this.depth = depth;
	return this;
};

var scene = {
	sprites : [],
	
	get : function(sprite) {
		for (i = 0; i < this.sprites.length; i ++) {
			if (this.sprites[i].sprite == sprite)
				return i;
		}
		return Number.NaN;
	},
	
	remove : function(sprite) {
		var x = this.get(sprite);
		if (!isNaN(x))
			this.sprites.splice(x, 1);
	},
	
	add : function(sprite, depth) {
		var i = 0;
		for (i = 0; i < this.sprites.length; i ++) {
			if (this.sprites[i].depth > depth)
				break;
		}
		this.sprites.splice(i, 0, new SceneObject(sprite, depth));
	},
	
	setDepth : function(sprite, depth) {
		var x = this.get(sprite);
		if (!isNaN(x))
			this.sprites.splice(x, 1);
		this.add(sprite, depth);
	},
	
	render : function() {
		for (var i in this.sprites) {
			this.sprites[i].sprite.render();
		}
	}
};

function addSprite(x, y, z, xoffset, yoffset, zoffset, animationframes, imagename, spritewidth, spriteheight){
	var sprite = {
	x:x,
	y:y,
	z:z,
	xoffset:xoffset,
	yoffset:yoffset,
	zoffset:zoffset,
	animationframes:animationframes,//this should be an array
	sourceimage:image.get(imagename),
	ticks:0,
	frame:0,
	paused:false,
	spritewidth:spritewidth,
	spriteheight:spriteheight,
	canvas:document.getElementById("canvas_id"),
	}
	sprite.xTileCount = sprite.sourceimage.width / sprite.spritewidth;
	sprite.tileCount = (sprite.xTileCount * (sprite.sourceimage.height / sprite.spriteheight));
	sprite.xTile = 0;
	sprite.yTile = 0;
	sprite.context=sprite.canvas.getContext("2d")
	
	sprite.setTile = function(tileid){
		if(tileid>=sprite.tileCount){
			console.log("Attempted to assign a tile out of range");
			return;
		}else{
			sprite.xTile = tileid % sprite.xTileCount;
			sprite.yTile = (tileid - sprite.xTile) / sprite.xTileCount;
		}
	}
	
	sprite.setAnimation = function(array){
		sprite.animationframes = array;
	};
	
	sprite.render=function(){
		sprite.context.drawImage(sprite.sourceimage,
		(sprite.xTile) * sprite.spritewidth,
		(sprite.yTile) * sprite.spriteheight,
		sprite.spritewidth,
		sprite.spriteheight,
		sprite.x,
		sprite.y + ((sprite.z+sprite.zoffset)/zScale),
		sprite.spritewidth,
		sprite.spriteheight);
		if (!sprite.paused)
		{
			sprite.ticks ++;
			if (sprite.ticks > 4)
			{
				sprite.ticks = 0;
				sprite.frame ++;
				if (sprite.frame >= sprite.animationframes.length)
					sprite.frame = 0;
				sprite.setTile(sprite.animationframes[sprite.frame]);
			}
		}
	}
	
	sprite.setSpritePosition= function(x,y,z){
		sprite.x=x+xoffset;
		sprite.y=y+yoffset;
		sprite.z=z;
		scene.setDepth(sprite, sprite.z);
	}
	sprite.setSpritePosition(x,y,z);
	
	return sprite;
};	