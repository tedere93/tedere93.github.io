var canvas = document.getElementById('myCanv');
console.log(canvas);
context = canvas.getContext('2d');

make_base();

function make_base()
{
  base_image = new Image();
  base_image.src = 'sudoku.png';
  context.drawImage(base_image, 100, 100);
}