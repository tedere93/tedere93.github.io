## Sudoku solver web application
This application's main purpose is to detect a 9x9 semi-complete Sudoku board and to solve it. As of right now, it's only been tested and debugged for 400x400 px boards containing handwritten digits, similar to those that can be found in the MNIST dataset. 
The detection is made as follows:  
	1: Apply the Canny transform on the original image.  
	2: Apply the Hough transform on the image resulted after step #1 that results in a matrix containing the lines present in the image, from which a third image is created containing only the horizontal and vertical lines in the photo.  
	3: Remove the linest that are too close to eachother, resulting in 10 horizontal and 10 vertical lines, this being the board.  
	4: Intersecting two lines results in an approximative position of a square's top left corner.  
	5: Knowing a square is approximately 40x40 px, an image is extracted from each square and is sent to the an ANN (artificial neural network) which returns wether there is a digit in it, or if it's an empty box, and creates a new matrics.  
	6: The matrics generated at step #5 is then sent to a backtracking Sudoku solver which returns the solved matrics, assuming there is a solution.  
	7: Finally, the original image is completed by drawing the suitable digit on each of its empty boxes.
A bunch of other canvasses can be found on the main page containing an image of the majority of the steps. Try changing the "display" attribute from "none" to "block" to reaveal them.	


## Demo
Visit the [demo](https://tedere93.github.io/sudoku/) to see it in action.


## Credits
CannyJS - https://github.com/yuta1984/CannyJS  
ANN - https://github.com/mihaioltean/ann  
Backtracking solver - https://github.com/LeeYiyuan/sudokusolver  



## License
MIT License.
