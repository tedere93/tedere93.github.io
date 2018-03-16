window.addEventListener("deviceorientation",ondevor);

var radius = 20;

function ondevor(e){
	document.getElementById("orientation_id");
	var viewpoint = document.getElementById("id_viewpoint");
	var z = radius * Math.cos(e.alpha*Math.PI/180);
	var x = radius * Math.sin(e.alpha*Math.PI/180);
	viewpoint.setAttribute("position",x+" 0 "+ z);
	viewpoint.setAttribute("orientation","0 1 0 "+e.alpha*Math.PI/180);
}