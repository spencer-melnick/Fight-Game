function ImageKey(image, name) {
	this.image = image;
	this.name = name;
	
	return this;
};

var image = {
	list : [],
	get : function(name) {
		for (i = 0; i < this.list.length; i ++)
		{
			if (this.list[i].name == name)
				return this.list[i].image;
		}
		//console.log("Unable to locate image " + name);
		return 0;
	},
	
	load : function(filename, name) {
		if (!this.get(name))
		{
			var image = new Image();
			image.src = filename;
			this.list.push(new ImageKey(image, name));
		}
		//console.log("Image " + name + " already exists");
	}
};	