$(document).ready(function(){

	//Navigation menu scrollTo
	$('header nav ul li a').click(function(event){
		event.preventDefault();
		var section = $(this).attr('href');
		var section_pos = $(section).position();

		if(section_pos){
			$(window).scrollTo({top:section_pos.top, left:'0px'}, 1000);
		}
		
	});

	$('.app_link').click(function(e){
		event.preventDefault();
		$(window).scrollTo({top:$("#hero").position().top, left:'0px'}, 1000);		
	});

	//Show & Hide menu on mobile
	$('.burger_icon').click(function(){
		$('header nav').toggleClass('show');
		$('header .burger_icon').toggleClass('active');
	});

	//wow.js on scroll animations initialization
	wow = new WOW(
	    {
		  animateClass: 'animated',
		  mobile: false,
		  offset: 50
		}
	);
	wow.init();

	//parallax effect initialization
	$('.hero').parallax("50%", 0.3);

	//Nice scroll initialization
	$("html").niceScroll({
		scrollspeed: 50,
		autohidemode : false,
		cursorwidth : 8,
		cursorborderradius: 8,
		cursorborder : "0",
		background : "rgba(48, 48, 48, .4)",
		cursorcolor : '#1f1f1f',
		zindex : 999
	});

	//Testimonials slider initialization
	$("#tslider").owlCarousel({
		items : 1,
		navigation : true,
		pagination : false,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem: true,
		responsive: true,
		autoPlay : true,
		transitionStyle : "fade"
	});

	//Mailchimp subscription form initialization
	$('#submit_form').submit(function(){
		$('#mc_submit').attr('disabled', 'disabled');		
   		processing('icon', 'loading');
	});

	if($('#submit_form').length){
		//Mailchim Subscription form
		$('#submit_form').ajaxChimp({
		    callback: chimpResponce
		});
	}	

	//Mail chimp callback function
	function chimpResponce(resp) {
   		if (resp.result === 'success') {   			
   			processing('loading', 'icon');
			$('#mc_submit').removeAttr('disabled', 'disabled');
	        $('#submit_form #mc-email').val('');
   			$('#error_msg').hide();
   			$('#success_msg').show();
	    }else{		
   			processing('loading', 'icon');
   			$('#success_msg').hide();
   			$('#error_msg').show();
	    	$('#mc_submit').removeAttr('disabled', 'disabled');
	    }
	}

	function processing(hide, show){
			$('#mc_submit i').removeClass(hide).addClass(show);
	}

	//Popup video
	$('#play_video').click(function(e){
		e.preventDefault();	

		var video_link = $(this).data('video');
		video_link = '<iframe src="' + video_link + '" width="500" height="208" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

		$('.about_video').append(video_link).fadeIn(200);
	});

	$('.close_video').click(function(e){
		e.preventDefault();	

		$('.about_video').fadeOut(200,function(){
			$('iframe', this).remove();
		});

	});

});



/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.11
 */
;(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else{a(jQuery)}}(function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}};return j}));