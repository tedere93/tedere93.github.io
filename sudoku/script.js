var canvas = document.getElementById('myCanv');
context = canvas.getContext('2d');

var canvas2 = document.getElementById('myCanv2');
ctx = canvas2.getContext('2d');
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas2.width, canvas2.height);

base_image = new Image();
base_image.src = 'sudoku.png';
base_image.onload = function(){
	context.drawImage(base_image, 0, 0);
	var image = context.getImageData(1,1,400,400);
	var data = image.data;
	for(var i = 0;i<data.length;i+=4){
		var red = data[i];
		var green = data[i+1];
		var blue = data[i+2];

		if(red>240&&green>240&&blue>240){
			data[i] = 255;
			data[i+1] = 255;
			data[i+2] = 255;
		} else {
			data[i] = 0;
			data[i+1] = 0;
			data[i+2] = 0;
		}
	}
	context.putImageData(image,0,0);

	var diagonala = parseInt(Math.sqrt(canvas.height*canvas.height + canvas.width*canvas.width)+1);

	var accumulator= new Array();

	for(var i=0;i<diagonala;i++){
		accumulator[i]= new Array(180);
	}

	for(var i=0;i<diagonala;i++){
		for(var j=0;j<180;j++){
			accumulator[i][j]=0;
		}
	}

	for(var i=0;i<canvas.height;i++){
		for(var j=0;j<canvas.width;j++){
			var culoare = context.getImageData(i,j,1,1);
			var data = culoare.data;
			// console.log(data.length);
			if(data[1]<255 && data[2]<255 && data[3]<255){
				for(var theta=0;theta<180;theta++){
					var r = parseInt((i-canvas.width/2)*Math.cos(theta/180/3.14)+(j - canvas.height/2)*Math.sin(theta/180/3.14));
					accumulator[r+diagonala/2][theta]++;
					// console.log(r+diagonala/2);
				}
			}

		}
	}


	var maxacc = 0;
	for(var i=0;i<diagonala;i++){
		for(var j=0;j<180;j++){
			if(maxacc<accumulator[i][j]){
				maxacc = accumulator[i][j];
			}
		}
	}



	// scalez
	for(var i=0;i<diagonala;i++){
		for(var j=0;j<180;j++){
			accumulator[i][j] = accumulator[i][j]/parseFloat(maxacc).toFixed(2)*255;
		}
	}
	



	// populez imaginea
	for(var i=0;i<diagonala;i++){
		for(var j=0;j<180;j++){
			var imageData = ctx.createImageData(1,1);
			imageData.data[1]=accumulator[i][j];
			imageData.data[2]=accumulator[i][j];
			imageData.data[3]=accumulator[i][j];
			ctx.putImageData(imageData,i,j);
		}
	}


}
