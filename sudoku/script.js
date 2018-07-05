document.getElementById("v1").innerHTML = "v2.5";
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
	var image = context.getImageData(1, 1, 400, 400);
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

	var diagonala = parseInt(Math.sqrt(canvas.height * canvas.height + canvas.width * canvas.width)+1);

	var accumulator= new Array();

	for (var i=0; i < diagonala; i++){
		accumulator[i] = new Array(180);
	}

	for (var raza = 0; raza < diagonala; raza++){
		for (var theta = 0; theta < 180; theta++){
			accumulator[raza][theta] = 0;
		}
	}

	for (var y = 0; y < canvas.height; y++){
		for (var x = 0; x < canvas.width; x++){
			var culoare = context.getImageData(x, y, 1, 1);
			var data = culoare.data;
			// console.log(data.length);
			if (data[0] > 250 && data[1] > 250 && data[2] > 250){
				for(var theta = 0; theta < 180; theta++){
					var raza = parseInt((x - canvas.width / 2) * Math.cos(theta / 180 * 3.14) + (y - canvas.height / 2) * Math.sin(theta / 180 * 3.14));
					accumulator[raza + diagonala / 2][theta]++;
					// console.log(r+diagonala/2);
				}
			}

		}
	}


	var maxacc = 0;
	for (var r = 0; r < diagonala; r++){
		for (var theta = 0; theta < 180; theta++){
			if (maxacc < accumulator[r][theta]){
				maxacc = accumulator[r][theta];
			}
		}
	}



	// scalez
	for (var r = 0; r < diagonala; r++){
		for (var theta = 0; theta < 180; theta++){
			accumulator[r][theta] = parseInt(accumulator[r][theta] / maxacc * 255);
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


	var vertical = new Array;
	var horizontal = new Array
	var xs = new Array;
	var ys = new Array;
	// var acc2[];	
	var prag = 100;
	var xss=0;
	var yss=0;
	var itt1=0;
	var itt2=0;
	var actItt1=0;
	var actItt2=0;
	var actualX = new Array;
	var actualY = new Array;
	for (var raza = 0; raza < diagonala; raza++){
		for (var theta = 0; theta < 180; theta++){
			if(accumulator[raza][theta] > prag){

				
				var x1,y1,x2,y2,test2;
				x1 = 0;

				if(theta != 0){
					y1 = ((raza - diagonala/2 - (x1 - canvas2.width/2) * Math.cos(theta/180.0*3.14))/ Math.sin(theta/180.0*3.14) + canvas2.height/2).toFixed(0);
					ys[yss]=y1;
					yss++;
				} else {
					x1 = (raza - diagonala/2) + canvas2.width/2;
					xs[xss]=x1;
					xss++;
					y1 = 0;
				}

				x2 = canvas2.width -1;

				if(theta != 0){
					y2 = ((raza - diagonala/2 - (x2 - canvas2.width/2) * Math.cos(theta/180.0*3.14))/ Math.sin(theta/180.0*3.14) + canvas2.height/2).toFixed(0);
				} else {
					x2 = (raza - diagonala/2) + canvas2.width/2;
					y2 = canvas2.height -1;
				}

				// console.log(x1, y1, x2, y2);
				if(x1==0){
					var test = ys[itt1-1];
					var res = Math.abs(y1-test);
					console.log(res);
					if(itt1==0){
						ctx.beginPath();
						ctx.strokeStyle="#FF0000";
						ctx.moveTo(x1, y1);
						ctx.lineTo(x2, y2);
						ctx.stroke();
						actualY[actItt1]=y1;
						actItt1++;
					} else {
						if(Math.abs(y1-test)>7){
							ctx.beginPath();
							ctx.strokeStyle="#FF0000";
							ctx.moveTo(x1, y1);
							ctx.lineTo(x2, y2);
							ctx.stroke();
							actualY[actItt1]=y1;
							actItt1++;
						}

					}
					itt1++;
					
				}else{
					// console.log(x1+"/"+xs[itt-1]);
					var test = xs[itt2-1];
					var res = Math.abs(x1-test);
					// console.log(res);
					if(itt2==0){
						ctx.beginPath();
						ctx.strokeStyle="#000000";
						ctx.moveTo(x1, y1);
						ctx.lineTo(x2, y2);
						ctx.stroke();
						actualX[actItt2]=x1;
						actItt2++;
					} else{
						if(Math.abs(x1-test)>7){
						ctx.beginPath();
						ctx.strokeStyle="#000000";
						ctx.moveTo(x1, y1);
						ctx.lineTo(x2, y2);
						ctx.stroke();
						actualX[actItt2]=x1;
						actItt2++;
						}
					}
					
					itt2++;
				}
				
				// ctx.stroke();
				
				
			}
		}
	}
	console.log(actualY);
	console.log(actualX);
}
