
	document.getElementById("business_V").innerHTML = "23/03/18 v3";


	var stare = {y:0,directie:1}


	setInterval( deseneaza,15, stare);
	var y = 0;
	var directie = 0.1;
	function deseneaza(x){
		var t = document.getElementById("id_transform");
		t.setAttribute("translation","0 "+x.y+" 0");
		x.y+=x.directie;
		if(x.y>7){
			x.directie = -0.1;
		} else if (x.y< -7){
			x.directie = 0.1;
		}
	 	

	}