function debuggerRender(array){
	if(debug){
		var c=document.getElementById("canvas_id");
		var ctx=c.getContext("2d");
		for (i = 0; i < array.length; i++) {
			for (k = 0; k < array[i].length; k++) {
				ctx.beginPath();
					ctx.strokeStyle="#000000";
				ctx.strokeRect(array[i][k].x, array[i][k]. y + (array[i][k].z / zScale),array[i][k].w,array[i][k].h);
				ctx.beginPath();
				ctx.strokeStyle="#FF0000";
				ctx.strokeRect(array[i][k].x, array[i][k]. y + (array[i][k].z / zScale)+(array[i][k].d/zScale), array[i][k].w,array[i][k].h);
			}
		}
	}
};