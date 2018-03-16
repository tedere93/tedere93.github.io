window.addEventListener("deviceorientation",ondevor);

function ondevor(e){
	document.getElementById("orientation_id");
	var viewpoint = document.getELementById("id_viewpoint");
	var x = radius * Math.cos(e.alpha*Math.PI/180);
	var z = radius * Math.sin(e.alpha*Math.PI/180);
	viewpoint.setAttribute("position",x+" 0 "+ z);
	viewpoint.setAttribute("orientation","0 1 0 "+e.alpha*Math.PI/180);
}