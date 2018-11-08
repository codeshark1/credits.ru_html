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

    
    
    function navigation_show_flex(button, menu) { // фильтр, страница поиска кредитов
        $(menu).hide();
        $(button).click(function(){
            if ( $(menu).is(':visible')){
                $(menu).slideUp().removeClass('active');
                $(this).removeClass('active').find('.indicator').text('+');
            } else {
                $(this).addClass('active').find('.indicator').text('-');
                $(menu).slideDown().addClass('active').css('display','flex');
            }
        });
    }    
    //navigation_show_flex('#js-btn-search-listing','#search-listing-filter');

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
                $(this).parents('.nav-tabs').slideUp(100);
            }
        });
        $('.tab-selected').click(function(){
            $(this).parents('.nav-tabs-wrapper').find('.nav-tabs').slideDown(100);
        });
    }
    tabs();

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
        duration: 100
    });


    /* SEARCH FORM */
    function searchForm(formId) {
        $('.search-submit, .search-field').click(function(e){
            e.stopPropagation();
        });
        $(formId).find('.search-submit').click(function(e){
            if ( $(this).parent(formId).hasClass('open') ) {
                //do nothing
            } else {
                e.preventDefault();
                $(this).parent(formId).removeClass('closed').addClass('open');
                $(this).siblings('.search-field').focus();
            }
        });
        $('html').click(function(){
            $(formId).removeClass('open').addClass('closed');
        });
    }
    searchForm('#searchform');
    searchForm('#searchform_listing');

    /* CATEGS (MOB BEHAVIOR) */
    $('#header-categs').click(function(){
        if ( $(window).width() <= 991) {
            if ( $('#menu-categs').is(':visible')){
                $('#menu-categs').slideUp();
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
                $('#menu-categs').slideDown();
            }
        }
    });

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
    
    $(window).resize(function(){
        setControlWidth();
    });

    

    (function hide_location_hint() {
        $('.location-hint').find('.btn-cta').click(function(e){        
            e.preventDefault();
            $(this).parents('.location-hint').hide();
        })
    })();
});