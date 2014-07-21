function newRect(x, y, w, h, owner)
{
	var rect = {
	x:x,
	y:y,
	w:w,
	h:h,
	owner:owner,
	solid:true,
	touching: function(array)
	{
		for (i = 0; i < array.length; i++) { 
			if ((this.x + this.w) > array[i].x)
				if (this.x < (array[i].x + array[i].w))
					if ((this.y + this.h) > array[i].y)
						if (this.y < (array[i].y + array[i].h))
							if (this.solid)
								return true;
			}				
		return false;
	},
	getContact: function(array)
	{
		for (i = 0; i < array.length; i++) { 
			if ((this.x + this.w) > array[i].x)
				if (this.x < (array[i].x + array[i].w))
					if ((this.y + this.h) > array[i].y)
						if (this.y < (array[i].y + array[i].h))
							if (this.solid)
								return array[i].owner;
			}				
		return;
	}
	};
	return rect;
}