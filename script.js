window.onload = function(){
	style();
	var frmbtn = document.getElementById('formButton');
	if( frmbtn != null ){
		frmbtn.addEventListener('click',formHandler,false);
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

formHandler = function(){
	var frmo = document.forms['frm'];
	var msg = document.getElementById('signup_msg');
	msg.innerHTML = "";
	if( frmo.elements[0].value.length == 0 || frmo.elements[1].value.length == 0 || frmo.elements[2].value.length == 0 ){
		msg.style.color = 'red';
		msg.innerHTML = "*Vă rugăm să completați toate câmpurile";
	}else{
		msg.style.color = 'black';
		msg.innerHTML = "Vă mulțumim, " + frmo.elements[0].value + " " + frmo.elements[1].value + " ! Un mail de confirmare a fost trimis la adresa " + frmo.elements[2].value + ".";

	}
}