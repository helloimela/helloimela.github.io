$(document).ready(function(){


	//mobile menu

	$('.menu-mobile a').click(function(e){
		e.preventDefault();
		$('.main-nav').addClass('open');

	});

	$('.js-close-menu a').click(function(e){
		e.preventDefault();
		$('.main-nav').removeClass('open');
	});

	$('.sublevel li a').click(function(){
		setTimeout(function(){
		  $('.main-nav').removeClass('open');
		}, 1000);
	});

	if($(window).width()<=800){
		$('body').addClass('mobile-view');
		$('.toggle-menu a').click(function(e){
			e.preventDefault();
			if($(this).parent().find('ul.sublevel').hasClass('open')){
				$(this).parent().find('ul.sublevel').slideUp('fast').removeClass('open');
			} else {
				$(this).parent().find('ul.sublevel').slideDown('fast').addClass('open');
			}
		});
	}


	// smooth scrolling

	$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 800);
	        return false;
	      }
	    }
	  });
	});


	var href;
	// tab panel interaction
	$('.panel-toggle a').click(function(e){
		e.preventDefault();
		href = '#'+$(this).attr('href');
		$('.panel-content').find('.active').slideUp().removeClass('active');
		$(href).slideDown().addClass('active');
		$('.panel-toggle a').removeClass('active');
		$(this).addClass('active');
		return false;
	});


	//accordion
	$('.acc-toggle').click(function(e){
		e.preventDefault();
		if($(this).parent().hasClass('active')){
			$(this).parent().find('.acc-ctn').slideUp();
			$(this).parent().removeClass('active');
		} else {

			// remove this part to keep another accordion menu open on one menu click
			$('.acc-menu > li').removeClass('active');
			$('.acc-ctn').each(function(){
				$(this).slideUp();
			});


			$(this).parent().find('.acc-ctn').slideDown();
			$(this).parent().addClass('active');
		}
		
	});


	//slider
	$('.flexslider').flexslider({
	    animation: "slide"
	  });



	// slider 2

	var order = 1, maxOrder = $('#slider').data('maxorder');
	var carouselH = $('#carousel li[data-order='+order+']').outerHeight(true);
	var lastCar=maxOrder;

	$('#slider li[data-order='+order+']').fadeIn().addClass('active-slide');
	$('#carousel li[data-order='+order+']').addClass('active-crsl');

	var startInterval;
	function startSlider(){
	    startInterval = setInterval(function(){

	        $('#slider li[data-order='+order+']').fadeOut().removeClass('active-slide');

	        $('#carousel li[data-order='+order+']')
	            .animate({'margin-top' : -(carouselH)+'px'}, 100)
	            .clone(true).insertAfter($('#carousel li[data-order='+lastCar+']')).removeClass('active-crsl');
	        lastCar = order;

	        order = order==maxOrder ? 1 : order+1 ;
	        $('#slider li[data-order='+order+']').fadeIn().addClass('active-slide');
	        $('#carousel li[data-order='+order+']').addClass('active-crsl');

	        setTimeout(function(){
	            $('#carousel li[data-order='+lastCar+'].active-crsl').removeClass('active-crsl').remove();
	        },600);

	    }, 5000);
	}

	startSlider();
	
	$('#carousel li').click(function(){
	    $current = $(this);
	    var selectedSlide = $current.data('order');
	    clearInterval(startInterval);

	    $('#carousel li').removeClass('active-crsl');

	    $current.addClass('active-crsl');

	    $current.prevAll().each(function(){
	        $eachPrev = $(this);
	        $eachPrev.clone(true).insertAfter($('#carousel li[data-order='+lastCar+']'));
	        $eachPrev.animate({marginTop : -($(this).outerHeight(true))+'px'},100);
	    });

	    lastCar = $current.prev().data('order');
	    order = selectedSlide;

	    setTimeout(function(){
	        $current.prevAll().remove();
	    },500);

	    $('#slider li.active-slide').fadeOut();
	    $('#slider li[data-order="'+selectedSlide+'"]').fadeIn().addClass('active-slide');

	    startSlider();

	});

	// endof slider 2


	$('.js-close-modal').click(function(e){
		e.preventDefault();
		$(this).closest('.js-modal').fadeOut();
	});

	$('.js-show-modal').click(function(e){
		e.preventDefault();
		var elTarget = $(this).data('href');
		$(elTarget).fadeIn();
	});


});

$(window).scroll(function(){
	if($('body').scrollTop() >= 50){
		$('header').addClass('fixed');
	} else {
		if($('header').hasClass('fixed')){
			$('header').removeClass('fixed');
		}
	}

	if($('body').scrollTop() >= 300){
		$('.go-up').addClass('shown');
	} else {
		if($('.go-up').hasClass('shown')){
			$('.go-up').removeClass('shown');
		}
	}
});
