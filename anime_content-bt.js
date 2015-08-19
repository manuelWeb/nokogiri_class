jQuery(function($){

var largeur = $('#content-bt').width();

function depart () {
	$('#content-bt').animate({right: -largeur+46},0);

	if(!$.cookie("id_actif") && $('.pan2,.pan3,.pan4').css('display')=='none'){
		$('.pan1').css('display','block')
	}else{
		$('.pan1,.pan2,.pan3,.pan4').css('display')=='none'
	};

};

function ouvrir (time) {
	$('#content-bt').stop(/*clearQueue, gotoEnd*/)
			.animate({
			right:58 },time,'easeInOutCubic')
			//.
		};

function fermer (time) {
	$('#content-bt').stop(/*clearQueue, gotoEnd*/).animate({
		right: -largeur+46},time,'easeInOutCubic');
	};

var count=0;
function clignote(el_c,time) {
	if (count<5) {
		count+=1;
		el_c.animate({opacity: 0}, time)
		//.animate({opacity: 1}, 800)
		.animate({opacity: 1}, time,function() {
			clignote($(this),time);
		});
	} else{
		el_c.animate({opacity: 0}, 800)
		return false;
	};
};

// gestion evt
var statut = 'closed';
$('#evt-click').click(function() {
	if (statut == 'closed') {
		ouvrir(500);
		statut = 'open';
	}else{
		fermer(200);
		statut = 'closed';
	}
});

depart();//masque .content-bt

if(!$.cookie("id_actif")){
	$('.bt-carroussel').css('background-position', '0 0');//-234px
	ouvrir(800);
	statut = 'open';
	clignote($('#content-bt p'),500);
}else{
	// $('.bt-carroussel').css('background-position', '0 0');
	ouvrir(1500);
	statut = 'open';
	$('#content-bt p').css('display', 'none');
};

//affchage par defaut ou par cookie
if($.cookie("id_actif")=='un'){
	$('.bt-carroussel').css('background-position','0 0');
	$('.pan1').css('display','block').animate({'opacity':'1'});
}else if($.cookie("id_actif")=='deux'){
	$('.bt-carroussel').css('background-position','0 -78px');
	$('.pan2').css('display','block').animate({'opacity':'1'});
}else if($.cookie("id_actif")=='trois'){
	$('.bt-carroussel').css('background-position','0 -156px');
	$('.pan3').css('display','block').animate({'opacity':'1'});
}else{
	$('.bt-carroussel').css('background-position','0 0');
	$('.pan1').css('display','block').animate({'opacity':'1'});
}

//fct affiche/masque
function affiche_1(elt_a) {
	$(elt_a).stop().css('display','block')
	.animate({'opacity':'1'},{duration:1000,queu:false});
}
function masque_1 (elt_m) {
	$(elt_m).stop().css('display','none')
	.animate({'opacity':'0'},{duration:1500,queu:false});
}

//evt
$('.bt-carroussel li a').click(function(event) {	
	var evt_id= event.target.id;
	$.cookie("id_actif",evt_id,{expires:7,path:"/"});

	if (event.target.id == 'un') {
		$.cookie("id_actif") == 'un';
		$('.bt-carroussel').css('background-position','0 0');
		affiche_1('.pan1');
		masque_1('.pan2');masque_1('.pan3')
		return false;
	} else if(event.target.id == 'deux') {
		$.cookie("id_actif") == 'deux';
		$('.bt-carroussel').css('background-position','0 -78px');
		affiche_1('.pan2');
		masque_1('.pan1');masque_1('.pan3')
		return false;
	} else if(event.target.id == 'trois'){
		$.cookie("id_actif") == 'trois';
		$('.bt-carroussel').css('background-position','0 -156px');
		affiche_1('.pan3');
		masque_1('.pan1');masque_1('.pan2')
		return false;
	}
});
// Add a getElementsByClassName function if the browser doesn't have one
// Limitation: only works with one class name
// Copyright: Eike Send http://eike.se/nd
// License: MIT License
if (!document.getElementsByClassName) {
	document.getElementsByClassName = function(search) {
		var d = document, elements, pattern, i, results = [];
		if (d.querySelectorAll) { // IE8
			return d.querySelectorAll("." + search);
		}
		if (d.evaluate) { // IE6, IE7
			pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
			elements = d.evaluate(pattern, d, null, 0, null);
			while ((i = elements.iterateNext())) {
				results.push(i);
			}
		} else {
			elements = d.getElementsByTagName("*");
			pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
			for (i = 0; i < elements.length; i++) {
				if ( pattern.test(elements[i].className) ) {
					results.push(elements[i]);
				}
			}
		}
		return results;
	}
}
function hideIf_js (elt_to_hide) {
	elt_to_hide[0].style.display = 'none';
	// console.log(elt_to_hide[0].style.display)
};
// si js actif masque balise noscript
var noScript = document.getElementsByClassName('noscript')
hideIf_js(noScript)

});//end doc.ready


