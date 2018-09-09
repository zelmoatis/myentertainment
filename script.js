window.onload = function(){
	style();
	var signup = document.getElementsByClassName("articlePage signup")[0];
	if( signup != null ) {
		if(!localStorage.firstName) {
			signup.style.display = 'inline-block';
			let frmbtn = document.getElementById('formButton');
			frmbtn.addEventListener('click',formHandler,false);
		} else {
			document.getElementById('userwelcome').style.display = 'inline-block';
			document.getElementById('knownname').innerHTML = localStorage.firstName + " " + localStorage.lastName;
			document.getElementById('knownemail').innerHTML = localStorage.email;
			document.getElementById('reloadUser').addEventListener('click',reloadUser,false);
		}
	}

	document.body.addEventListener('keydown', function(e) {
		var elem = document.getElementById('logo');
		if( e.keyCode == 17 ){//ctrl left
			follow_mouse();
		}
	});
	document.body.addEventListener('keyup', function(e) {
		var elem = document.getElementById('logo');	
		if( e.keyCode == 27 ){//escape
			fadeout_logo(elem);
			appear(elem,5000);
		}
		if( e.keyCode == 17 ){//ctrl left
			stop_follow();
		}
	});
}
var follow_mouse = function(){
	var logo = document.getElementById('logo');
	var clone = logo.cloneNode(true);
	logo.style.visibility = 'hidden';
	clone.style.position = 'absolute';
	clone.style.height = '100px';
	clone.id = 'logo_temp';
	var scrolled  = document.body.scrollTop;
	document.body.appendChild(clone);
	document.addEventListener('mousemove',function(e) {
		clone.style.top = "" + (e.clientY+scrolled) + "px";
		clone.style.left = "" + e.clientX + "px";
	});

}
var stop_follow = function(){
	var logo = document.getElementById('logo');
	logo.style.visibility = 'visible';
	var clone = document.getElementById('logo_temp');
	document.body.removeChild(clone);
}

var appear = function(el,time){
	setTimeout(function(){el.style.opacity = 1; el.style.visibility = 'visible';},time);
}

var fadeout_logo = function(el){
	var op = 1;
	var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
			el.style.visibility = 'hidden';
        }
        el.style.opacity = op;
        op -= op * 0.1;
    }, 75);
}
var style = function(){
	var sb = document.getElementById('sidebar');
	if(sb != null){
		var titles = sb.getElementsByTagName('a');
		for( let i = 0; i < titles.length; i ++ ){
			titles[i].style.backgroundColor = '#a7dbdb';
		}
	}
	
	var sgnup = document.getElementsByClassName('signup');
	if(typeof sgnup[0] != 'undefined'){
		sgnup[0].getElementsByTagName('article')[0].style.marginLeft = '20px';
	}
		
}

var saveData = function (data) {
	localStorage.setItem('firstName', data[0].value);
	localStorage.setItem('lastName', data[1].value);
	localStorage.setItem('email', data[2].value);
}

var formHandler = function(){
	var frmo = document.forms['frm'];
	var msg = document.getElementById('signup_msg');
	msg.innerHTML = "";
	if( frmo.elements[0].value.length == 0 || frmo.elements[1].value.length == 0 || frmo.elements[2].value.length == 0 ){
		msg.style.display = 'block';
		msg.style.color = 'red';
		msg.innerHTML = "*Please fill in all the fields above";
	} else {
		let nameRegex = /^[a-zA-Z ]{2,30}$/;
		let emailRegex = /^([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))$/;
		let fnametest = nameRegex.test(frmo.elements[0].value.trim());
		let lnametest = nameRegex.test(frmo.elements[1].value.trim());
		let emailtest = emailRegex.test(frmo.elements[2].value.trim());
		if (fnametest && lnametest && emailtest) {
			saveData(frmo.elements);

			msg.style.display = 'block';
			msg.style.color = 'green';
			msg.innerHTML = "Thank you, " + frmo.elements[0].value + " " + frmo.elements[1].value + " ! A confirmation mail was sent to " + frmo.elements[2].value + ".";
			
			let newspaper = document.getElementById('newspaper');
				
			newspaper.style.animation = 'woosh 2s ease 1 forwards';
			newspaper.style.webkitAnimation = 'woosh 2s ease 1 forwards';
			
			document.getElementById('arrows').style.visibility = 'hidden';
			
			let check = document.getElementById('check');

			check.style.animation = 'pop-in 4s ease-out 1 forwards';
			check.style.webkitAnimation = 'pop-in 4s ease-out 1 forwards';

		} else if (!fnametest) {
			msg.style.display = 'block';
			msg.style.color = 'red';
			msg.innerHTML = "*Incorrect first name!";
		} else if (!lnametest) {
			msg.style.display = 'block';
			msg.style.color = 'red';
			msg.innerHTML = "*Incorrect last name!";
		} else if (!emailtest) {
			msg.style.display = 'block';
			msg.style.color = 'red';
			msg.innerHTML = "*Incorrect email!";
		} 
	}
}

var reloadUser = function() {
	localStorage.removeItem('firstName');
	localStorage.removeItem('lastName');
	localStorage.removeItem('email');
	document.getElementsByClassName('articlePage signup')[0].style.display = 'inline-block';
	document.getElementById('userwelcome').style.display = 'none';
	document.getElementById('formButton').addEventListener('click',formHandler,false);
}