$(window).load(function() {
	$(".pulse").fadeOut();
	$(".preloader").delay(400).fadeOut("slow");
});

jQuery(document).ready(function($){

    function navigation_show(button, menu, othermenu, otherbutton) { // глобальная
        //$(menu).hide();
        $(button).click(function(){
            if ( $(menu).is(':visible')){
                $(menu).slideUp().removeClass('active');
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
                $(menu).slideDown().addClass('active');
                $(othermenu).slideUp().removeClass('active');
                $(otherbutton).removeClass('active');
            }
        });
    }

    navigation_show('#js-btn-menu','#js-menu-wrapper','#search-extended','#btn-search-extended');
    navigation_show('#js-btn-cities','#js-cities-wrapper');
    navigation_show('#js-cities-wrapper .close','#js-cities-wrapper');
    navigation_show('#btn-search-extended','#search-extended','#js-menu-wrapper','#js-btn-menu');

    
    
    function show_form_filter(button, block) { // фильтр, страница поиска кредитов
		$(block).hide();
		$(button).click(function(e){
			if ( $(block).is(':visible')) {
				$(block).slideUp().removeClass('active');
				$('#js-btn-search-listing').removeClass('active');
			} else {
				$('#js-btn-search-listing').addClass('active');
				$(block).slideDown().addClass('active');
			}
			if($(window).width() < 576){
				if($(block).hasClass('active')){
					$('body').addClass('overflow-hidden');
				}else{
					$('body').removeClass('overflow-hidden');
				}
			}
		});
	}  
    show_form_filter('#js-btn-search-listing','#search-listing-filter');
    show_form_filter('#search-listing-filter .btn-close','#search-listing-filter');

    function menu_nested(menu_id) {
        //$(menu_id).find('ul').hide();        
        $(menu_id).find('.has-sub>a').click(function(e){
            if ( $(window).width() < 768 ) {
                e.preventDefault();
                $(this).siblings('.sub-menu').slideDown();
                if ( $(this).parent().hasClass('menu-item--active') ) {
                    $(this).siblings('.sub-menu').stop().slideUp();
                    $(this).parent().removeClass('menu-item--active');
                } else {
                    $(this).parent().addClass('menu-item--active').siblings('.menu-item--active').removeClass('menu-item--active').find('.sub-menu').stop().slideUp();
                    $(this).siblings('.sub-menu').stop().slideDown();
                }
            }
        });
    }
    menu_nested('#menu-main');

    function tabs() { // глобальная
        $('.js-nav-tabs .menu-item a').click(function(e){
            e.preventDefault();
            var tab_id = $(this).attr('href');
            $('.js-nav-tabs .menu-item').removeClass('active');
            $(this).parent().addClass('active');
            $('.tabcontent').css('display','none');
            $(tab_id).fadeIn(300);
            if($('select').hasClass('tab-select')){
                $('select.tab-select option').prop('selected', false);
                $('select.tab-select option[value="'+tab_id+'"]').prop('selected', true);
             }   
            $(this).parents('.nav-tabs-wrapper').find('.tab-selected').text($(this).text());
            

            if ($(window).width() < 768) {
                $(this).parents('.nav-tabs').css('display','none');
            }
        });
        $('.tab-selected').click(function(e){
            e.preventDefault();
            $(this).parents('.nav-tabs-wrapper').find('.nav-tabs').css('display','block');
        });
        $('.tab-select').on('change', function(){
            $('.js-nav-tabs .menu-item').removeClass('active');
            $('.js-nav-tabs .menu-item a[href="'+$(this).val()+'"]').parent().addClass('active');
            $('.tabcontent:not('+$(this).val()+')').css('display','none');
            $('.tabcontent'+$(this).val()).fadeIn(300);
        })
       

        $('html').click(function(){
            $('.js-nav-tabs').css('display','none');
        });        
        $('.nav-tabs-wrapper').click(function(e){
            e.stopPropagation();
        });
    }
    tabs();

    function drop_menu(trigger, menu, link, wrapper) {
		$(trigger).html($(link+'.active').html()).attr('href', $(link+'.active').attr('href'));
		$(trigger).click(function(e){
			e.preventDefault();
			if ( $(this).siblings(menu).is(':visible') ) {
				$(this).siblings(menu).css('display','none');
			} else {
				$(this).siblings(menu).css('display','block')
			}
		});
		$(link).click(function(e){			
            $(this).parents(wrapper).find('.active').removeClass('active');
            $(this).addClass('active')
                .parents(wrapper)
                .find(trigger)
                .html($(this).html())
                .siblings(menu)
                .hide();			
        });

        

	}

    drop_menu('.drop-menu-trigger', '.drop-menu', '.drop-menu a', '.drop-menu-wrapper');
    drop_menu('.ipoteka-types-current', '.row-ipoteka-types', '.ipoteka-type', '.ipoteka-types-wrapper');

/*     $(".plan-wrapper").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if ((direction == "left") && ! $(this).hasClass('swiped') )  {
                $(this).addClass('swiped');             
            }
            if ( (direction == "right") && $(this).hasClass('swiped') ) {
                $(this).removeClass('swiped');
            }
        },
        threshold:0,
        duration: 0
    }); */

    $(".plan-wrapper").swipe( {
        swipeStatus: function(event, phase, direction, distance, duration, fingerCount) {
            var swipeWidth = $(this).find('.plan-actions').width();            

            if (phase == "move") {
                if (direction == "left") {                   
                    $(this).addClass('swiped').children('.plan-content').css({
                        'margin-left' : '-'+swipeWidth+'px'
                    });
                                 
                } else if (direction == "right") {                  
                    $(this).removeClass('swiped').children('.plan-content').css({
                        'margin-left' : 0+'px'
                    });
                    
                }
            }
        },
        allowPageScroll: 'vertical',
        tap:function(event, target) {
            
            var swipeWidth = $(this).find('.plan-actions').width();            
            
            if( $(this).hasClass('swiped')) {
                $(this).removeClass('swiped').children('.plan-content').css({
                    'margin-left' : 0+'px'
                });
            } else {
                $(this).addClass('swiped').children('.plan-content').css({
                    'margin-left' : '-'+swipeWidth+'px'
                });
            }
        }
    });


    /* SEARCH FORM */
    function searchForm(formId) {
        $('.search-button, .search-field').click(function(e){
            e.stopPropagation();
        });
        $(formId).find('.search-button').click(function(e){
            e.preventDefault();
            if ( $(this).parent(formId).hasClass('open') ) {
                $(this).parent(formId).removeClass('open').addClass('closed');
            } else {
                $(this).parent(formId).removeClass('closed').addClass('open');
                $(this).siblings('.search-field').focus();
            }
        });
        $('html').click(function(){
            $(formId).removeClass('open').addClass('closed');
        });
    }
    searchForm('#search-header');
    searchForm('#searchform_listing');

    /* ACCORDION */
    function accordion() {
        $('.accord-content').hide();                
        $('.accord-open .accord-content').show();
        $('.h-accord').click(function(){
            if ($(this).parent('.accord').hasClass('accord-open')) {
                $(this).siblings('.accord-content').slideUp().parents('.accord').removeClass('accord-open');
            } else {
                $(this).parents('.section-accord').find('.accord-open').removeClass('accord-open').find('.accord-content').slideUp()
                $(this).parent('.accord').addClass('accord-open').find('.accord-content').slideDown();
            }
        });
    }    
    accordion();


    new SVGInjector().inject(document.querySelectorAll('svg[data-src]'));


    function setControlWidth() {
        $('.listing-controls--wrap').width( $('.plan-content').width() ); //потреб, авто
        $('.sort-bank').width( $('.td_bankname').width() ); //потреб, авто
        $('.sort-offer').outerWidth( $('.td_offer').width() ); //потреб, авто
        $('.sort-rate').width( $('.td_rate').width() ); //потреб, авто
        $('.sort-amount').width( $('.td_amount').width() ); //потреб, авто
        $('.sort-time').width( $('.td_time').width() ); //вклады

        $('.sort-overpay').width( $('.td_overpay').width() ); //авто        
        $('.plan_wide-title .td_title').css( 'padding-left', $('.td_bankname').width() ); //авто        

        
        $('.sort-limit').width( $('.td_limit').width() ); //кредитки        
        $('.sort-period').width( $('.td_period').width() ); //кредитки        
        $('.sort-price').width( $('.td_price').width() ); //кредитки               

        $('.sort-docs').width( $('.td_docs').width() ); //results               
        $('.sort-prob').width( $('.td_prob').width() + 20 ); //results               
    }    
    setControlWidth();
    
    function setButtonMoreWidth() {
        $('.btn-more-vertical').each(function(){
            $(this).width( $(this).parents('.plan-wrapper').height() );

        });
    };
    //setButtonMoreWidth();

    $(window).resize(function(){
        setControlWidth();
        //setButtonMoreWidth();
    });

    

    function hide_location_hint() {
        $('.location-hint').hide();
    };
    $('.location-hint').find('.btn-cta').click(function(e){
        e.preventDefault();
        hide_location_hint();
    });
    $('#js-btn-cities').click(function(e){        
        hide_location_hint();
    });

    //клонирование
    /* function cloneSubscribe(element,target) {
        $(element).clone().removeClass('hidden-xs').insertAfter(target).addClass('visible-xs');
    }
    cloneSubscribe('.subscribe-main','.sidebar-main'); */


    function customCheckbox() {
        if ($('label.checkbox input').length) {
            $('label.checkbox').each(function(){
                $(this).removeClass('checked');
            });
            $('label.checkbox input:checked').each(function(){
                $(this).parent('label').addClass('checked');
            });
        }
        if ($('label.radio input').length) {
            $('label.radio').each(function(){
                $(this).removeClass('checked');
            });
            $('label.radio input:checked').each(function(){
                $(this).parent('label').addClass('checked');
            });
        }        
    }
    customCheckbox();
    $('label.checkbox').click(function(){
        customCheckbox();
    });
    $('label.radio').click(function(){
        customCheckbox();
    });    


    /* PLAN CHILDREN */
    $('.js-btn-plan-children').click(function(){
        var block = $(this).parents('.plan').next('.js-plan-children');

        if ( $(block).is(':visible')){
            $(block).slideUp(100).removeClass('active');
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
            $(block).slideDown(100).addClass('active');
        }
    })  

    
    /* SCROLL TO TOP */
    function scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            document.getElementById("btn-top").style.opacity = 1;
        } else {
            document.getElementById("btn-top").style.opacity = 0;
        }
    }
    window.onscroll = function() {scrollFunction()};

    function scrollToSection(){
        $('html, body').animate({
             scrollTop: $('.header-site').offset().top
        }, 500);
    }

    $('#btn-top').click(function(){
        scrollToSection();
    });
});