window.addEventListener("deviceorientation",ondeviceorientation);

function ondeviceorientation (e){
	document.getElementById("orientation_id").innerHTML = e.alpha + " " + e.beta + " " + e.gamma;
}