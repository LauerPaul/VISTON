var link = $('ul.menu li'),
	sections = $('.container.text section.content'),
	anchor_ = window.location.hash.replace('#','#');	 

jQuery(document).ready(function($) {
	load_section();

	if(anchor_ !== ''){
		var object_ = $('a[data-link="'+anchor_+'"]');
		setTimeout(function(){object_.click();},300);
		history.pushState('', document.title, window.location.pathname);
	}
	
	link.on('click', function(){
		var this_ = $(this),
			active = $('ul.menu li.active'),
			content_block = $('.container.text').offset().top;

		sections.animate({'opacity': 0},300).hide();
		active.removeClass('active');
		this_.addClass('active');
		load_section();
		$('html, body').animate({scrollTop: content_block},800);
	});
});
function load_section(){
	var active = $('ul.menu li.active'),
		data = active.children('a').attr('data-link'),
		section = $('.container.text section.content'+data);
	section.show().animate({'opacity': 1}, 200);
}