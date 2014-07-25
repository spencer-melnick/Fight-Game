function ImageKey(path, name) {
	this.name = name;
	this.path = path;
	
	return this;
};

var loadedimages = 0;

var image = {
	list : [],
	
	get : function(name) {
		for (i = 0; i < this.list.length; i ++)
		{
			if (this.list[i].name == name)
			{
				return this.list[i].image;
			}
		}
		return 0;
	},
	
	add : function(filename, name) {
		if (!this.get(name))
		{
			this.list.push(new ImageKey(filename, name));
		}
	},
	
	load : function() {
		for (i = 0; i < this.list.length; i ++)
			{
				this.list[i].image = new Image();
				this.list[i].image.src = this.list[i].path;
				this.list[i].image.onload = function() {
					loadedimages ++;
					if(loadedimages==image.list.length)
					{
						initialize();
					}
				};
			}
		},

}

