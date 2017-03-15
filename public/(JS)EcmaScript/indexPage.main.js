jQuery(document).ready(function($) {
	$('.carousel').carousel({
	  interval: 6000,
	  pause: false,
	  wrap: true
	});
	new WOW().init();
});
function scroll_down(){
	var sec_block = $('#second-section').offset().top;
	
	$('html, body').animate({scrollTop: sec_block},1200);
}