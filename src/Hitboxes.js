var walls = []; //solid objects- the player can't walk through these
var floors = []; //things where shadows can be cast
var friendlyHitboxes = []; //Player hitboxes, if an enemy attacks these, the player will take damage
var friendlyAttackboxes = []; //Player attacks' hitboxes, if an enemy is caught inside, they will take damage
var enemyHitboxes = []; //sets up an empty array named enemyHitboxes
var enemyAttackboxes = [];

function newRect(x, y, z, w, h, d, owner)
{
	var rect = {
	x:x,
	y:y,
	z:z,
	w:w,
	h:h,
	d:d,
	owner:owner,
	solid:true,
	touching: function(array)
	{
		for (i = 0; i < array.length; i++) {
			if (array[i] != this)
				if ((this.x + this.w) > array[i].x)
					if (this.x < (array[i].x + array[i].w))
						if ((this.y + this.h) > array[i].y)
							if (this.y < (array[i].y + array[i].h))
								if ((this.z + this.d) > array[i].z)
									if (this.z < (array[i].z + array[i].d))
										if (this.solid)
											return true;
			}				
		return false;
	},
	
	getContact: function(array)
	{
		for (i = 0; i < array.length; i++) {
			if (array[i] != this)
				if ((this.x + this.w) > array[i].x)
					if (this.x < (array[i].x + array[i].w))
						if ((this.y + this.h) > array[i].y)
							if (this.y < (array[i].y + array[i].h))
								if ((this.z + this.d) > array[i].z)
									if (this.z < (array[i].z + array[i].d))
										if (this.solid)
											return array[i].owner;
			}				
		return;
	},
	
	raycastDown: function(array)
	{
		var dist = Number.MAX_VALUE;
		
		for (i = 0; i < array.length; i ++) {
			if (array[i] != this)
				if ((this.x + this.w) > array[i].x)
					if (this.x < (array[i].x + array[i].w))
						if ((this.z + this.d) > array[i].z)
							if (this.z < (array[i].z + array[i].d))
								if ((this.y + this.h) <= array[i].y)
								{
									var tempDist = array[i].y - (this.y + this.h);
									if (tempDist < dist)
										dist = tempDist;
								}
			}
		
		if (dist == Number.MAX_VALUE)
			return Number.NaN;
		return dist;
	}
	};
	return rect;
}