var link = $('ul.menu li'),
	sections = $('.container.text section.content');

jQuery(document).ready(function($) {
	load_section();
	link.on('click', function(){
		var this_ = $(this),
			active = $('ul.menu li.active');

		sections.animate({'opacity': 0},300).hide();
		active.removeClass('active');
		this_.addClass('active');
		load_section();
	});
});
function load_section(){
	var active = $('ul.menu li.active'),
		data = active.children('a').attr('data-link'),
		section = $('.container.text section.content'+data);
	 
	section.show().animate({'opacity': 1}, 200);
}

//istory.pushState('', document.title, window.location.pathname);