
	document.getElementById("business_V").innerHTML = "23/03/18 v1";
	setInterval( deseneaza,30);
	var y = 0;
	var directie = 1;
	function deseneaza(){
		var t = document.getElementById("id_transform");
		t.setAttribute("translation","0 "+y+" 0");
		y+=directie;
		if(y>7){
			directie = -1;
		} else if (y< -7){
			directie = 1;
		}
	 	

	}