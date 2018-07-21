document.getElementById("v1").innerHTML = "v2.5";
var transformCanvas = document.getElementById('transformCanv');
transformContext = transformCanvas.getContext('2d');
tilesContext = document.getElementById("tileCanv").getContext('2d');
originalPhotoContext = document.getElementById("originalCanv").getContext('2d');
context_28x28 = document.getElementById("canvas_28x28").getContext('2d');

var linesCanvas = document.getElementById('linesCanv');
linesContext = linesCanvas.getContext('2d');
linesContext.fillStyle = "blue";
//tilesContext.fillStyle = "green";
//tilesContext.fillRect(0, 0, linesCanvas.width, linesCanvas.height);
linesContext.fillRect(0, 0, linesCanvas.width, linesCanvas.height);

base_image = new Image();
base_image.src = 'sudoku.png';
base_image.onload = on_load_image;

function drawImages(){
	var canvas1 = document.getElementById("data1");
	ctx1 = canvas1.getContext("2d");
	base_image1 = new Image();
	base_image1.src = "1.png";
	base_image1.onload = function(){
		ctx1.drawImage(base_image1,0,0);
	}

	var canvas2 = document.getElementById("data2");
	ctx2 = canvas2.getContext("2d");
	base_image2 = new Image();
	base_image2.src = "2.png";
	base_image2.onload = function(){
		ctx2.drawImage(base_image2,0,0);
	}

	var canvas3 = document.getElementById("data3");
	ctx3 = canvas3.getContext("2d");
	base_image3 = new Image();
	base_image3.src = "3.png";
	base_image3.onload = function(){
		ctx3.drawImage(base_image3,0,0);
	}

	var canvas4 = document.getElementById("data4");
	ctx4 = canvas4.getContext("2d");
	base_image4 = new Image();
	base_image4.src = "4.png";
	base_image4.onload = function(){
		ctx4.drawImage(base_image4,0,0);
	}

	var canvas5 = document.getElementById("data5");
	ctx5 = canvas5.getContext("2d");
	base_image5 = new Image();
	base_image5.src = "5.png";
	base_image5.onload = function(){
		ctx5.drawImage(base_image5,0,0);
	}

	var canvas6 = document.getElementById("data6");
	ctx6 = canvas6.getContext("2d");
	base_image6 = new Image();
	base_image6.src = "6.png";
	base_image6.onload = function(){
		ctx6.drawImage(base_image6,0,0);
	}

	var canvas7 = document.getElementById("data7");
	ctx7 = canvas7.getContext("2d");
	base_image7 = new Image();
	base_image7.src = "7.png";
	base_image7.onload = function(){
		ctx7.drawImage(base_image7,0,0);
	}

	var canvas8 = document.getElementById("data8");
	ctx8 = canvas8.getContext("2d");
	base_image8 = new Image();
	base_image8.src = "8.png";
	base_image8.onload = function(){
		ctx8.drawImage(base_image8,0,0);
	}

	var canvas9 = document.getElementById("data9");
	ctx9 = canvas9.getContext("2d");
	base_image9 = new Image();
	base_image9.src = "9.png";
	base_image9.onload = function(){
		ctx9.drawImage(base_image9,0,0);
	}
}



//---------------------------------------------------------------
function rgb_to_gray(rgb_array) 
{
    return 0.299 * (255 - rgb_array[0]) + 0.587 * (255 - rgb_array[1]) + 0.114 * (255 - rgb_array[2]);
}
//---------------------------------------------------------------
function on_load_image()
{	
	drawImages();
	transformContext.drawImage(base_image, 0, 0);
	originalPhotoContext.drawImage(base_image,0,0);
	var image = transformContext.getImageData(1, 1, 400, 400);
	var data = image.data;
	var imageData = CannyJS.canny(transformCanvas);
	imageData.drawOn(transformCanv);

	var diagonala = parseInt(Math.sqrt(transformCanvas.height * transformCanvas.height + transformCanvas.width * transformCanvas.width) + 1);

	var accumulator= new Array();

	for (var i=0; i < diagonala; i++){
		accumulator[i] = new Array(180);
	}

	for (var raza = 0; raza < diagonala; raza++){
		for (var theta = 0; theta < 180; theta++){
			accumulator[raza][theta] = 0;
		}
	}

	for (var y = 0; y < transformCanvas.height; y++){
		for (var x = 0; x < transformCanvas.width; x++){
			var culoare = transformContext.getImageData(x, y, 1, 1);
			var data = culoare.data;
			// console.log(data.length);
			if (data[0] > 250 && data[1] > 250 && data[2] > 250){
				for(var theta = 0; theta < 180; theta++){
					var raza = parseInt((x - transformCanvas.width / 2) * Math.cos(theta / 180 * 3.14) + (y - transformCanvas.height / 2) * Math.sin(theta / 180 * 3.14));
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

	var prag = 110;

	var xss=0;
	var yss=0;

	var actualX = new Array;
	var actualY = new Array;

	linesContext.beginPath();
	linesContext.strokeStyle="#FF0000";
	
	for (var raza = 0; raza < diagonala; raza++){
		for (var theta = 0; theta < 180; theta++){
			if (accumulator[raza][theta] > prag){

				var x1, y1, x2, y2, test2;
				
				if(theta != 0){
					x1 = 0;
					y1 = Math.floor((raza - diagonala / 2 - (x1 - linesCanvas.width / 2) * Math.cos(theta / 180.0 * 3.14)) / Math.sin(theta / 180.0 * 3.14) + linesCanvas.height / 2);
					if (yss == 0 || yss > 0 && y1 - actualY[yss - 1] > 7){ // overwrite previous if current one is too close
						actualY[yss] = y1;
						yss++;
					}
					else
						actualY[yss - 1] = y1;
				} 
				else {
					x1 = (raza - diagonala / 2) + linesCanvas.width / 2;
					if (xss == 0 || xss > 0 && x1 - actualX[xss - 1] > 7){// overwrite previous if current one is too close
						actualX[xss] = x1;
						xss++;
					}
					else
						actualX[xss - 1] = x1;
					y1 = 0;
				}


				if(theta != 0){
					x2 = linesCanvas.width -1;
					y2 = Math.floor((raza - diagonala/2 - (x2 - linesCanvas.width / 2) * Math.cos(theta / 180.0*3.14)) / Math.sin(theta / 180.0*3.14) + linesCanvas.height / 2);
				} 
				else {
					x2 = (raza - diagonala / 2) + linesCanvas.width / 2;
					y2 = linesCanvas.height -1;
				}
				
				linesContext.moveTo(x1, y1);
				linesContext.lineTo(x2, y2);
				
			}
		}
	}

	linesContext.stroke();
	
	var safety_margin = 6; // ignore pixels closer to margin than this value
	var estimate_cell_size = actualX[1] - actualX[0];

	// create matrix for ANN
	var digit_as_28x28_matrix = [];
	for (var i = 0; i < 28; i++)
		for (var j = 0; j < 28; j++) 
			digit_as_28x28_matrix[i * 28 + j] = 0; // fill it with 0
		
	var recognized_digits = [];
	for (var i = 0; i < 9; i++)
		recognized_digits[i] = new Array(9);
	
	// take each cell, 
	for (var cell_row = 0; cell_row < 9; cell_row++){
		for (var cell_col = 0; cell_col < 9; cell_col++){
			var imgData = originalPhotoContext.getImageData( actualX[cell_col] + safety_margin, actualY[cell_row] + safety_margin, estimate_cell_size - 2 * safety_margin, estimate_cell_size - 2 * safety_margin);
			// compute bounding box of digit
			var bbox = {min_row: estimate_cell_size - 2 * safety_margin, min_col: estimate_cell_size - 2 * safety_margin, max_row:0, max_col: 0};
			for (var row = 0; row < estimate_cell_size - 2 * safety_margin; row++)
				for (var col = 0; col < estimate_cell_size - 2 * safety_margin; col++){
					var pixel_color = originalPhotoContext.getImageData(actualX[cell_col] + safety_margin + col, actualY[cell_row] + safety_margin + row, 1, 1);
					if (pixel_color.data[0] < 100 && pixel_color.data[1] < 100 && pixel_color.data[2] < 100){ // black
						if (bbox.min_row > row)
							bbox.min_row = row;
						else
						if (bbox.max_row < row)
							bbox.max_row = row;

						if (bbox.min_col > col)
							bbox.min_col = col;
						else
						if (bbox.max_col < col)
							bbox.max_col = col;
					}
				}
				if (bbox.min_col < bbox.max_col && bbox.min_row < bbox.max_row){// I have a digit there
					// I have the bounding box; now I have to scale the box to 20x20 as in MNIST
					var imageData = new ImageData(28, 28); // scaled digit ; for DEBUG only
					
					var max_row_scaled = 20; // this is maximal size that the scaled cell can have
					var max_col_scaled = 20;
					
					if (bbox.max_col - bbox.min_col > bbox.max_row - bbox.min_row) // if bounding box is not square I must scale the box but aspect ratio must remain unchanged
						max_row_scaled = (bbox.max_row - bbox.min_row) /  (bbox.max_col - bbox.min_col + 1) * 20;
					else
						if (bbox.max_col - bbox.min_col < bbox.max_row - bbox.min_row)
							max_col_scaled = (bbox.max_col - bbox.min_col) /  (bbox.max_row - bbox.min_row + 1) * 20;
					// take each position from the 20x20 matrix
					for (var row = 0; row < max_row_scaled; row++)
						for (var col = 0; col < max_col_scaled; col++){
							// interpolation step
							// compute from which row and col from the original image I will take the color
							var original_row = row / (max_row_scaled - 1) * (bbox.max_row - bbox.min_row + 1);
							var original_col = col / (max_col_scaled - 1) * (bbox.max_col - bbox.min_col + 1);
							
							// start from: actualX[cell_col] + safety_margin + bbox.min_col
							var pixel_data = originalPhotoContext.getImageData(actualX[cell_col] + safety_margin + bbox.min_col + original_col, actualY[cell_row] + safety_margin + bbox.min_row + original_row, 1, 1); // I do not like this
							var index_in_28x28_matrix = Math.floor((row + 4 + (20 - max_row_scaled ) / 2) * 28 + col + 4 + (20 - max_col_scaled) / 2);
							digit_as_28x28_matrix[index_in_28x28_matrix] = rgb_to_gray(pixel_data.data) / 255.0;
							
							// I also put the color in imageData matrix for debug purposes only
							var index_in_image_data_matrix = Math.floor((row + 4 + (20 - max_row_scaled) / 2) * 28 * 4 + (col + 4 + (20 - max_col_scaled) / 2) * 4);
							imageData.data[index_in_image_data_matrix]     = digit_as_28x28_matrix[index_in_28x28_matrix] * 255;
							imageData.data[index_in_image_data_matrix + 1] = digit_as_28x28_matrix[index_in_28x28_matrix] * 255;
							imageData.data[index_in_image_data_matrix + 2] = digit_as_28x28_matrix[index_in_28x28_matrix] * 255;
							imageData.data[index_in_image_data_matrix + 3] = 255;
						}
					
					// send it to ANN
					var out_last_layer = [];
					var class_index = test_ann(digit_as_28x28_matrix, out_last_layer);
					recognized_digits[cell_row][cell_col] = class_index;
					// print digit on canvas
					tilesContext.font = '20px serif';
					tilesContext.strokeText(class_index.toString(), actualX[cell_col] + safety_margin, actualY[cell_row] + safety_margin);
					// display matrix on canvas
					context_28x28.putImageData(imageData, actualX[cell_col] + safety_margin, actualY[cell_row] + safety_margin);
				}
				else// no digit found there
				recognized_digits[cell_row][cell_col] = 0;
		}

	}
	console.log(recognized_digits);
	var theMask = [];
	for (var i = 0; i < 9; i++)
		theMask[i] = new Array(9);

	for(var i = 0;i<9;i++){
		for(var j = 0;j<9;j++){
			if(recognized_digits[i][j]!=0){
				theMask[i][j] = 1;
			}else{
				theMask[i][j] = 0;
			}
		}
	}

	function Solver() {
    this.working_grid = recognized_digits;
};

Solver.prototype.validate_row = function (r, c) {
    var value = this.working_grid[r][c];
    for (var _c = 0; _c < 9; _c++) {
        if (_c != c && this.working_grid[r][_c] == value) {
            return false;
        }
    }
    return true;
};

Solver.prototype.validate_column = function (r, c) {
    var value = this.working_grid[r][c];
    for (var _r = 0; _r < 9; _r++) {
        if (_r != r && this.working_grid[_r][c] == value) {
            return false;
        }
    }
    return true;
};

Solver.prototype.validate_box = function (r, c) {
    var value = this.working_grid[r][c];
    var box_r = Math.floor(r / 3);
    var box_c = Math.floor(c / 3);

    for (var _r = box_r * 3; _r < box_r * 3 + 3; _r++) {
        for (var _c = box_c * 3; _c < box_c * 3 + 3; _c++) {
            if (_r != r && _c != c && this.working_grid[_r][_c] == value) {
                return false;
            }
        }
    }
    return true;
};

Solver.prototype.backtrack = function (r, c) {
    c++; // Move to next cell in row
    if (c > 8) { // Moves to next row when end of column is reached
        c = 0;
        r++;
        if (r > 8) { // Checks if end of grid is reached
            return true;
        }
    }

    if (this.working_grid[r][c] != 0) { // Move to next cell if user has entered a number in current cell
        if (!(this.validate_row(r, c) && this.validate_column(r, c) && this.validate_box(r, c))){
            return false;
        }
        return this.backtrack(r, c);
    } else { // Goes through all possible numbers if user has left cell blank
        for (var x = 1; x < 10; x++) {
            this.working_grid[r][c] = x;
            if (this.validate_row(r, c) &&  this.validate_column(r, c) && this.validate_box(r, c)){
                if (this.backtrack(r, c)) {
                    return true;
                }
            }
        }
        this.working_grid[r][c] = 0;
        return false;
    }
};

Solver.prototype.solve = function () {
	// Validate initial grid
	for(var r = 0; r < 9; r++){
		for(var c = 0; c < 9; c++){
			if (this.working_grid[r][c] != 0 && !(this.validate_row(r, c) && this.validate_column(r, c) && this.validate_box(r, c))){
    			return false;
			}
		}
	}

    return this.backtrack(0, -1);
};
var solution;
function solve(){
        var solver = new Solver();
        for(var row = 0; row < 9; row++){
            for(var column = 0; column < 9; column ++){
                var value = solver.working_grid[row][column];
                solver.working_grid[row][column] = value;
            }
        }
        if(solver.solve()) {
            for (var row = 0; row < 9; row++) {
                for (var column = 0; column < 9; column++) {
                    var cell = document.getElementById("c" + row.toString() + column.toString());
                    // cell.value = solver.working_grid[row][column];
                    // cell.readOnly = true;
                }
            }
        }else{
            alert("No solutions found!");
        }
        // console.log(theMask);
        // console.log(solver.working_grid);
        solution = solver.working_grid;
        // console.log(solution);
        drawAnswer();
    }

function drawAnswer(){
	var cifra1 = ctx1.getImageData(1,1,38,38);
	var cifra2 = ctx2.getImageData(1,1,38,38);
	var cifra3 = ctx3.getImageData(1,1,38,38);
	var cifra4 = ctx4.getImageData(1,1,38,38);
	var cifra5 = ctx5.getImageData(1,1,38,38);
	var cifra6 = ctx6.getImageData(1,1,38,38);
	var cifra7 = ctx7.getImageData(1,1,38,38);
	var cifra8 = ctx8.getImageData(1,1,38,38);
	var cifra9 = ctx9.getImageData(1,1,38,38);

	for(var i = 0;i<9;i++){
		for(var j = 0; j< 9; j++){
			if(theMask[i][j]==0){
				var caz = solution[i][j];
				switch(caz){
					case 1:
						originalPhotoContext.putImageData(cifra1,actualX[j],actualY[i]);
						break;
					case 2:
						originalPhotoContext.putImageData(cifra2,actualX[j],actualY[i]);
						break;
					case 3:
						originalPhotoContext.putImageData(cifra3,actualX[j],actualY[i]);
						break;
					case 4:
						originalPhotoContext.putImageData(cifra4,actualX[j],actualY[i]);
						break;
					case 5:
						originalPhotoContext.putImageData(cifra5,actualX[j],actualY[i]);
						break;
					case 6:
						originalPhotoContext.putImageData(cifra6,actualX[j],actualY[i]);
						break;
					case 7:
						originalPhotoContext.putImageData(cifra7,actualX[j],actualY[i]);
						break;
					case 8:
						originalPhotoContext.putImageData(cifra8,actualX[j],actualY[i]);
						break;
					case 9:
						originalPhotoContext.putImageData(cifra9,actualX[j],actualY[i]);
						break;
							
				}
			}else{
			}
		}
	}
}
$("#solver").click(function(){
	solve();
});
}