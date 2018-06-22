document.getElementById("v1").innerHTML = "v2.1";
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
	// for(var i = 0;i<data.length;i+=4){
	// 	var red = data[i];
	// 	var green = data[i+1];
	// 	var blue = data[i+2];

	// 	if(red>240&&green>240&&blue>240){
	// 		data[i] = 255;
	// 		data[i+1] = 255;
	// 		data[i+2] = 255;
	// 	} else {
	// 		data[i] = 0;
	// 		data[i+1] = 0;
	// 		data[i+2] = 0;
	// 	}
	// }
	// context.putImageData(image,0,0);

	var imageData = CannyJS.canny(canvas);
	imageData.drawOn(myCanv);

	var diagonala = parseInt(Math.sqrt(canvas.height*canvas.height + canvas.width*canvas.width)+1);

	var accumulator= new Array();

	for(var i=0;i<diagonala;i++){
		accumulator[i]= new Array(180);
	}

	for(var raza=0;raza<diagonala;raza++){
		for(var theta=0;theta<180;theta++){
			accumulator[raza][theta]=0;
		}
	}

	for(var i=0;i<canvas.height;i++){
		for(var j=0;j<canvas.width;j++){
			var culoare = context.getImageData(i,j,1,1);
			var data = culoare.data;
			// console.log(data.length);
			if(data[0]<255 && data[1]<255 && data[2]<255){
				for(var theta=0;theta<180;theta++){
					var raza = parseInt((i-canvas.width/2)*Math.cos(theta/180*3.14)+(j - canvas.height/2)*Math.sin(theta/180*3.14));
					accumulator[raza+diagonala/2][theta]++;
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
			accumulator[i][j] = parseInt(accumulator[i][j]/maxacc*255);
		}
	}
	
	//teste verific ce valori am in accumulator.
	// var count = 0;
	// var arrayiu = new Array;
	// for(var i=0;i<diagonala;i++){
	// 	for(var j=0;j<180;j++){
	// 		// arrayiu.push(accumulator[i][j]);
	// 		// console.log(accumulator[i][j]);
	// 	}
	// }


	// niste verificari
	// var uniquearray = [];
	// $.each(arrayiu, function(i,el){
	// 	if($.inArray(el,uniquearray)===-1) uniquearray.push(el);
	// });
	// console.log(uniquearray.sort());



	var prag = 200;
	for(var raza=0;raza<diagonala;raza++){
		for(var theta = 0;theta<180;theta++){
			if(accumulator[raza][theta]>prag){


				var x1,y1,x2,y2;
				x1 = 0;

				if(theta != 0){
					y1 = ((raza - diagonala/2 - (x1 - canvas2.width/2) * Math.cos(theta/180.0*3.14))/ Math.sin(theta/180.0*3.14) + canvas2.height/2).toFixed(0);
				} else {
					x1 = (raza - diagonala/2) + canvas2.width/2;
					y1 = 0;
				}

				x2 = canvas2.width -1;

				if(theta != 0){
					y2 = ((raza - diagonala/2 - (x2 - canvas2.width/2) * Math.cos(theta/180.0*3.14))/ Math.sin(theta/180.0*3.14) + canvas2.height/2).toFixed(0);
				} else {
					x2 = (raza - diagonala/2) + canvas2.width/2;
					y2 = canvas2.height -1;
				}

				console.log(x1, y1, x2, y2);
				ctx.moveTo(x1,y1);
				ctx.lineTo(x2,y2);

				ctx.stroke();
			}
		}
	}


}
