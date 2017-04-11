//--------------------------------------------------------------------------------------
//---------------------------- DOCUMENT READY FUNCTIONS --------------------------------
//--------------------------------------------------------------------------------------
jQuery(document).ready(function($) {
	new WOW().init();
	//----------------------------------------------------------------------------------
	// --------------------------- services/about toggle -------------------------------
	//----------------------------------------------------------------------------------
	if(sections.length > 0){
		if(anchor_ !== ''){
			var object_ = $('a[data-link="'+anchor_+'"]');
			setTimeout(function(){object_.click();},300);
			history.pushState('', document.title, window.location.pathname);
		}

		load_section();

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
	}
	//----------------------------------------------------------------------------------
	// ----------------------- *services/about toggle END* -----------------------------
	//----------------------------------------------------------------------------------
	// ---------------------------- SEARCH CLICK BUTTON HEADER -------------------------
	//----------------------------------------------------------------------------------

	$('a#search_group').click(function(){
		var width_ = $('.navbar-nav').width(),
			top_ = $('.navbar-nav').height();

		$(this).parent().find('.input-group').width(width_ - 40).css('top', top_/* + 90*/).addClass('border').show().animate({'opacity': 1}, 200);
		$('input#search').focus();
		$('.navbar-nav').addClass('search');

		var	offTop = $('input#search').offset().top;	
		// $('html, body').animate({scrollTop: offTop - 40}, 800);
	});
	$(document).on('click', function(e) {
		if (!$(e.target).closest('input#search, a#search_group').length) {
			var _this_ = $('a#search_group').parent().find('.input-group');
			_this_.animate({'opacity': 0}, 200);
			setTimeout(function(){
				_this_.width('auto').css('top', 'auto').removeClass('border').hide();
				$('.navbar-nav').removeClass('search');
			},200);
		}
		e.stopPropagation();
	});
	//----------------------------------------------------------------------------------
	// --------------------------- *SEARCH CLICK BUTTON HEADER END* --------------------
	//----------------------------------------------------------------------------------
	// ------------------------------ CHECKBOX AND RADIO STYLE -------------------------
	//----------------------------------------------------------------------------------
	$('input[type="radio"], input[type="checkbox"]').iCheck({
		checkboxClass: 'checkbox',
		radioClass: 'radio',
		increaseArea: '20%' // optional
	});
	//----------------------------------------------------------------------------------
	// ---------------------------- *CHECKBOX AND RADIO STYLE END* ---------------------
	//----------------------------------------------------------------------------------
	//------------------------- ACCORDION WITH TOGGLE ICONS ----------------------------
	//----------------------------------------------------------------------------------
	$('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);
	//----------------------------------------------------------------------------------
	//----------------------- *ACCORDION WITH TOGGLE ICONS END* ------------------------
	//----------------------------------------------------------------------------------
	//==================================================================================
	// --------------------------------- Feedback form ---------------------------------
	//==================================================================================
	$('#form-send').submit(function(event) {
		event.preventDefault();
		$('button.send_form').addClass('load');
		var _serialize = $(this).serialize();
		send.Feedback(_serialize);
	});
	//==================================================================================
	// ------------------------------ *Feedback form END* ------------------------------
	//==================================================================================
});
//--------------------------------------------------------------------------------------
//------------------------- *DOCUMENT READY FUNCTIONS END* -----------------------------
//--------------------------------------------------------------------------------------
//======================================================================================
//--------------------------------------------------------------------------------------
//----------------------------- FUNCTIONS SECTION --------------------------------------
//--------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------
	//------------------------- ACCORDION WITH TOGGLE ICONS ----------------------------
	//----------------------------------------------------------------------------------
	function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".more-less")
            .toggleClass('glyphicon-menu-down glyphicon-menu-up');
    }
	//----------------------------------------------------------------------------------
	//----------------------- *ACCORDION WITH TOGGLE ICONS END* ------------------------
	//----------------------------------------------------------------------------------
	//----------------------- INDEX PAGE SCROLL DOWN FUNCTION --------------------------
	//----------------------------------------------------------------------------------
	function scroll_down(){
		var sec_block = $('#second-section').offset().top;
		$('html, body').animate({scrollTop: sec_block},1200);
	}
	//----------------------------------------------------------------------------------
	//-------------------- *INDEX PAGE SCROLL DOWN FUNCTION END* -----------------------
	//----------------------------------------------------------------------------------
	//---------------------- AUTOCOMPLITE (SEARCH SECTION HEADER) ----------------------
	//----------------------------------------------------------------------------------
	$( function() {
	$.widget( "custom.catcomplete", $.ui.autocomplete, {
	  _create: function() {
	    this._super();
	    this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
	  },
	  _renderMenu: function( ul, items ) {
	    var that = this,
	      currentCategory = "";
	    $.each( items, function( index, item ) {
	      var li;
	      if ( item.category != currentCategory ) {
	        ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
	        currentCategory = item.category;
	      }
	      li = that._renderItemData( ul, item );
	      if ( item.category ) {
	        li.attr( "aria-label", item.category + " : " + item.label );
	      }
	    });
	  }
	});
	var data = [
	  { label: "anders", category: "" },
	  { label: "andreas", category: "" },
	  { label: "antal", category: "" },
	  { label: "annhhx10", category: "Products" },
	  { label: "annk K12", category: "Products" },
	  { label: "annttop C13", category: "Products" },
	  { label: "anders andersson", category: "People" },
	  { label: "andreas andersson", category: "People" },
	  { label: "andreas johnson", category: "People" }
	];

	$( "#search" ).catcomplete({
	  delay: 0,
	  source: data
	});
	} );
	//----------------------------------------------------------------------------------
	//------------------- *AUTOCOMPLITE (SEARCH SECTION HEADER) END* -------------------
	//----------------------------------------------------------------------------------
	// --------------------------- services/about toggle -------------------------------
	//----------------------------------------------------------------------------------
	function load_section(){
		var active = $('ul.menu li.active'),
			data = active.children('a').attr('data-link'),
			section = $('.container.text section.content'+data);
		section.show().animate({'opacity': 1}, 200);
	}
	//----------------------------------------------------------------------------------
	// ----------------------- *services/about toggle END* -----------------------------
	//----------------------------------------------------------------------------------
	//---------------------------- Feedback AJAX Form ----------------------------------
	//----------------------------------------------------------------------------------
var link = $('ul.menu li'),
	sections = $('.container.text section.content'),
	anchor_ = window.location.hash.replace('#','#'),
	send = {
		Feedback: function (_this){
			 $.ajax({
                url: '/index/fedback_send',
                type: "POST",
                dataType: 'json',
                data: _this,
                success: function(html){
					$('button.send_form').removeClass('load');
					$('#succes-modal .modal-body').html('<div style="margin-bottom: 40px;">'+html+'</div>');
					$('#succes-modal').modal('show');
                },
                error: function(error) {
                	console.log(error);
                }
            });
		}

	},
	//----------------------------------------------------------------------------------
	//------------------------- *Feedback AJAX Form END* -------------------------------
	//----------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------
	// --------------------------- carousel bootstrap ----------------------------------
	//----------------------------------------------------------------------------------
	carousel = {
		init: function (_obj, _timeout, _pause) {
			_obj.carousel({
			  interval: _timeout,
			  pause: _pause,
			  wrap: true
			});
		}
	}
	//----------------------------------------------------------------------------------
	// ------------------------ *carousel bootstrap END* -------------------------------
	//----------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//-------------------------- *FUNCTIONS SECTION  END* ----------------------------------
//--------------------------------------------------------------------------------------



//istory.pushState('', document.title, window.location.pathname);

/*
//ЗАЩИТА ОТ КОПИРОВАНИИ ИНФОРМАЦИИ 
function notcopy(){
	alert("Sorry, but you can not copy anything from this page!")
	return false
}
//Защита от перетаскивания и выделения текста.
document.onselectstart=new Function("return false");
document.ondragstart=new Function("return false");
// ЗАЩИТА ОТ ПЕЧАТИ
function atlpdp1(){
	for (wi=0; wi<document.all.length; wi++){
		if (document.all[wi].style.visibility != 'hidden'){
			document.all[wi].style.visibility = 'hidden';
			document.all[wi].id = 'atlpdpst'
		}
	}
}
function atlpdp2(){
	for (wi=0; wi<document.all.length; wi++){
		if (document.all[wi].id == 'atlpdpst')
		document.all[wi].style.visibility = ''
	}
}
window.onbeforeprint = atlpdp1;
window.onafterprint = atlpdp2;
//Выключение Правой кнопки мыши
var message="";
function clickIE() {if (document.all) {(message);return false;}}
function clickNS(e) {
	if(document.layers||(document.getElementById&&!document.all)){
		if (e.which==2) {
			(message);
			return false;
		}
	}
}
if (document.layers) {
	document.captureEvents(Event.MOUSEDOWN);
	document.onmousedown=clickNS;
}else{
	document.onmouseup=clickNS;
	document.oncontextmenu=clickIE;
}
document.oncontextmenu=new Function("return false")
*/
//--------------------------------------------------------------------------------------
//---------------------------- DOCUMENT READY FUNCTIONS --------------------------------
//--------------------------------------------------------------------------------------
jQuery(document).ready(function($) {
	new WOW().init();
	//----------------------------------------------------------------------------------
	// --------------------------- services/about toggle -------------------------------
	//----------------------------------------------------------------------------------
	if(sections.length > 0){
		if(anchor_ !== ''){
			var object_ = $('a[data-link="'+anchor_+'"]');
			setTimeout(function(){object_.click();},300);
			history.pushState('', document.title, window.location.pathname);
		}

		load_section();

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
	}
	//----------------------------------------------------------------------------------
	// ----------------------- *services/about toggle END* -----------------------------
	//----------------------------------------------------------------------------------
	// ---------------------------- SEARCH CLICK BUTTON HEADER -------------------------
	//----------------------------------------------------------------------------------

	$('a#search_group').click(function(){
		$(this).parent().find('.input-group').show(180,'swing');
		$('input#search').focus();
		$('.navbar-nav').addClass('search');
	});
	$(document).on('click', function(e) {
		if (!$(e.target).closest('input#search, a#search_group').length) {
			$('a#search_group').parent().find('.input-group').hide(180,'swing');
			$('.navbar-nav').removeClass('search');
		}
		e.stopPropagation();
	});
	//----------------------------------------------------------------------------------
	// --------------------------- *SEARCH CLICK BUTTON HEADER END* --------------------
	//----------------------------------------------------------------------------------
	// ------------------------------ CHECKBOX AND RADIO STYLE -------------------------
	//----------------------------------------------------------------------------------
	$('input[type="radio"], input[type="checkbox"]').iCheck({
		checkboxClass: 'checkbox',
		radioClass: 'radio',
		increaseArea: '20%' // optional
	});
	//----------------------------------------------------------------------------------
	// ---------------------------- *CHECKBOX AND RADIO STYLE END* ---------------------
	//----------------------------------------------------------------------------------
	//------------------------- ACCORDION WITH TOGGLE ICONS ----------------------------
	//----------------------------------------------------------------------------------
	$('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);
	//----------------------------------------------------------------------------------
	//----------------------- *ACCORDION WITH TOGGLE ICONS END* ------------------------
	//----------------------------------------------------------------------------------
	//==================================================================================
	// --------------------------------- Feedback form ---------------------------------
	//==================================================================================
	$('#form-send').submit(function(event) {
		event.preventDefault();
		$('button.send_form').addClass('load');
		var _serialize = $(this).serialize();
		send.Feedback(_serialize);
	});
	//==================================================================================
	// ------------------------------ *Feedback form END* ------------------------------
	//==================================================================================
});
//--------------------------------------------------------------------------------------
//------------------------- *DOCUMENT READY FUNCTIONS END* -----------------------------
//--------------------------------------------------------------------------------------
//======================================================================================
//--------------------------------------------------------------------------------------
//----------------------------- FUNCTIONS SECTION --------------------------------------
//--------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------
	//------------------------- ACCORDION WITH TOGGLE ICONS ----------------------------
	//----------------------------------------------------------------------------------
	function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".more-less")
            .toggleClass('glyphicon-menu-down glyphicon-menu-up');
    }
	//----------------------------------------------------------------------------------
	//----------------------- *ACCORDION WITH TOGGLE ICONS END* ------------------------
	//----------------------------------------------------------------------------------
	//----------------------- INDEX PAGE SCROLL DOWN FUNCTION --------------------------
	//----------------------------------------------------------------------------------
	function scroll_down(){
		var sec_block = $('#second-section').offset().top;
		$('html, body').animate({scrollTop: sec_block},1200);
	}
	//----------------------------------------------------------------------------------
	//-------------------- *INDEX PAGE SCROLL DOWN FUNCTION END* -----------------------
	//----------------------------------------------------------------------------------
	//---------------------- AUTOCOMPLITE (SEARCH SECTION HEADER) ----------------------
	//----------------------------------------------------------------------------------
	$( function() {
	$.widget( "custom.catcomplete", $.ui.autocomplete, {
	  _create: function() {
	    this._super();
	    this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
	  },
	  _renderMenu: function( ul, items ) {
	    var that = this,
	      currentCategory = "";
	    $.each( items, function( index, item ) {
	      var li;
	      if ( item.category != currentCategory ) {
	        ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
	        currentCategory = item.category;
	      }
	      li = that._renderItemData( ul, item );
	      if ( item.category ) {
	        li.attr( "aria-label", item.category + " : " + item.label );
	      }
	    });
	  }
	});
	var data = [
	  { label: "anders", category: "" },
	  { label: "andreas", category: "" },
	  { label: "antal", category: "" },
	  { label: "annhhx10", category: "Products" },
	  { label: "annk K12", category: "Products" },
	  { label: "annttop C13", category: "Products" },
	  { label: "anders andersson", category: "People" },
	  { label: "andreas andersson", category: "People" },
	  { label: "andreas johnson", category: "People" }
	];

	$( "#search" ).catcomplete({
	  delay: 0,
	  source: data
	});
	} );
	//----------------------------------------------------------------------------------
	//------------------- *AUTOCOMPLITE (SEARCH SECTION HEADER) END* -------------------
	//----------------------------------------------------------------------------------
	// --------------------------- services/about toggle -------------------------------
	//----------------------------------------------------------------------------------
	function load_section(){
		var active = $('ul.menu li.active'),
			data = active.children('a').attr('data-link'),
			section = $('.container.text section.content'+data);
		section.show().animate({'opacity': 1}, 200);
	}
	//----------------------------------------------------------------------------------
	// ----------------------- *services/about toggle END* -----------------------------
	//----------------------------------------------------------------------------------
	//---------------------------- Feedback AJAX Form ----------------------------------
	//----------------------------------------------------------------------------------
var link = $('ul.menu li'),
	sections = $('.container.text section.content'),
	anchor_ = window.location.hash.replace('#','#'),
	send = {
		Feedback: function (_this){
			 $.ajax({
                url: '/index/fedback_send',
                type: "POST",
                dataType: 'json',
                data: _this,
                success: function(html){
					$('button.send_form').removeClass('load');
					$('#succes-modal .modal-body').html('<div style="margin-bottom: 40px;">'+html+'</div>');
					$('#succes-modal').modal('show');
                },
                error: function(error) {
                	console.log(error);
                }
            });
		}

	},
	//----------------------------------------------------------------------------------
	//------------------------- *Feedback AJAX Form END* -------------------------------
	//----------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------
	// --------------------------- carousel bootstrap ----------------------------------
	//----------------------------------------------------------------------------------
	carousel = {
		init: function (_obj, _timeout, _pause) {
			_obj.carousel({
			  interval: _timeout,
			  pause: _pause,
			  wrap: true
			});
		}
	}
	//----------------------------------------------------------------------------------
	// ------------------------ *carousel bootstrap END* -------------------------------
	//----------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//-------------------------- *FUNCTIONS SECTION  END* ----------------------------------
//--------------------------------------------------------------------------------------



//istory.pushState('', document.title, window.location.pathname);

/*
//ЗАЩИТА ОТ КОПИРОВАНИИ ИНФОРМАЦИИ 
function notcopy(){
	alert("Sorry, but you can not copy anything from this page!")
	return false
}
//Защита от перетаскивания и выделения текста.
document.onselectstart=new Function("return false");
document.ondragstart=new Function("return false");
// ЗАЩИТА ОТ ПЕЧАТИ
function atlpdp1(){
	for (wi=0; wi<document.all.length; wi++){
		if (document.all[wi].style.visibility != 'hidden'){
			document.all[wi].style.visibility = 'hidden';
			document.all[wi].id = 'atlpdpst'
		}
	}
}
function atlpdp2(){
	for (wi=0; wi<document.all.length; wi++){
		if (document.all[wi].id == 'atlpdpst')
		document.all[wi].style.visibility = ''
	}
}
window.onbeforeprint = atlpdp1;
window.onafterprint = atlpdp2;
//Выключение Правой кнопки мыши
var message="";
function clickIE() {if (document.all) {(message);return false;}}
function clickNS(e) {
	if(document.layers||(document.getElementById&&!document.all)){
		if (e.which==2) {
			(message);
			return false;
		}
	}
}
if (document.layers) {
	document.captureEvents(Event.MOUSEDOWN);
	document.onmousedown=clickNS;
}else{
	document.onmouseup=clickNS;
	document.oncontextmenu=clickIE;
}
document.oncontextmenu=new Function("return false")
*/
