
	document.getElementById("business_V").innerHTML = "23/03/18 v2";
	setInterval( deseneaza,15,0,1);
	var y = 0;
	var directie = 0.1;
	function deseneaza(y, directie){
		var t = document.getElementById("id_transform");
		t.setAttribute("translation","0 "+y+" 0");
		y+=directie;
		if(y>7){
			directie = -0.1;
		} else if (y< -7){
			directie = 0.1;
		}
	 	

	}