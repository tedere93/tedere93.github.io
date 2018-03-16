window.addEventListener("deviceorientation",ondeviceorientation);

function ondeviceorientation (e){
	document.getElementById("orientation_id").innerHTML = e.alpha.round() + " " + e.beta.round() + " " + e.gamma.round();
}