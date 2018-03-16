window.addEventListener("deviceorientation",ondeviceorientation);

function ondeviceorientation (e){
	document.getELementById("orientation_id").innerHTML = e.alpha + " " + e.beta + " " + e.gamma;
}