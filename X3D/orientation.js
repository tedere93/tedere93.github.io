window.addEventListener("deviceorientation",ondeviceorientation);

function ondeviceorientation (e){
	document.getElementById("orientation_id").innerHTML = e.alpha.round() + " " + e.beta.round() + " " + e.gamma;
	var viewpoint = document.getElementById("id_viewpoint");
	viewpoint.setAttribute("orientation","")
}