$(window).load(function() {
	$(".pulse").fadeOut();
	$(".preloader").delay(400).fadeOut("slow");
});

jQuery(document).ready(function($){

    function navigation_show(button, menu) { // глобальная
        //$(menu).hide();
        $(button).click(function(){
            if ( $(menu).is(':visible')){
                $(menu).slideUp().removeClass('active');
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
                $(menu).slideDown().addClass('active');
            }
        });
    }

    navigation_show('#js-btn-menu','#js-menu-wrapper');
    navigation_show('#js-btn-cities','#js-cities-wrapper');
    navigation_show('#js-cities-wrapper .close','#js-cities-wrapper');
    navigation_show('#btn-search-extended','#search-extended');

    
    
    function show_form_filter(button, block) { // фильтр, страница поиска кредитов
        $(block).hide();
        $(button).click(function(e){
            //e.preventDefault();
            if ( $(block).is(':visible')) {
                $(block).slideUp().removeClass('active');
                $('#js-btn-search-listing').removeClass('active').find('.indicator').text('+');
            } else {
                $('#js-btn-search-listing').addClass('active').find('.indicator').text('-');
                $(block).slideDown().addClass('active');
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
            $('.js-nav-tabs li').removeClass('active');
            $(this).parent().addClass('active');
            $('.tabcontent').fadeOut(300);
            $(tab_id).fadeIn(300);
            $(this).parents('.nav-tabs-wrapper').find('.tab-selected').text($(this).text());
            if ($(window).width() < 768) {
                $(this).parents('.nav-tabs').fadeOut(100);
            }
        });
        $('.tab-selected').click(function(e){
            e.preventDefault();
            $(this).parents('.nav-tabs-wrapper').find('.nav-tabs').fadeIn(100);
        });
    }
    tabs();

    function drop_menu() {
        $('.drop-menu-trigger').click(function(e){
            e.preventDefault();
            if ( $(this).siblings('.drop-menu').is(':visible') ) {
                $(this).siblings('.drop-menu').fadeOut(100);
            } else {
                $(this).siblings('.drop-menu').fadeIn(100)
            }
        });
        $('.drop-menu a').click(function(e){
            e.preventDefault();
            if (! $(this).hasClass('active') ) {
                $(this).parents('.drop-menu-wrapper').find('.active').removeClass('active');
                $(this).addClass('active')
                .parents('.drop-menu-wrapper')
                .find('.drop-menu-trigger')
                .text($(this).text())
                .siblings('.drop-menu')
                .fadeOut(100);
            }
        });
    }
    drop_menu();

    $(".plan-wrapper").swipe( { // глобальная
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
            if (! $(this).parent('.accord').hasClass('accord-open')) {
                $(this).parents('.section-accord').find('.accord-open').removeClass('accord-open').find('.accord-content').slideUp()
                $(this).parent('.accord').addClass('accord-open').find('.accord-content').slideDown();
            }
        });
    }    
    accordion();


    new SVGInjector().inject(document.querySelectorAll('svg[data-src]'));


    function setControlWidth() {
        $('.listing-controls--wrap').width( $('.plan-content').width() );
        $('.sort-bank').width( $('.td_bankname').width() );
        $('.sort-offer').outerWidth( $('.td_offer').width() );
        $('.sort-rate').width( $('.td_rate').width() );
        $('.sort-amount').width( $('.td_amount').width() );
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
        $('#location-hint').hide();
    };
    $('#location-hint').find('.btn-cta').click(function(e){
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
    }
    customCheckbox();
    $('label.checkbox').click(function(){
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