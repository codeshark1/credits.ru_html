$(window).load(function() {
	$(".pulse").fadeOut();
	$(".preloader").delay(400).fadeOut("slow");
});

jQuery(document).ready(function($){

    function navigation_show(button, menu) {
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

    function menu_nested(menu_id) {
        $(menu_id).find('ul').hide();
        $(menu_id).find('.menu-item--has-children>a').click(function(e){
            e.preventDefault();
            $(this).siblings('.sub-menu').slideDown();
            if ( $(this).parent().hasClass('menu-item--active') ) {
                $(this).siblings('.sub-menu').stop().slideUp();
                $(this).parent().removeClass('menu-item--active');
            } else {
                $(this).parent().addClass('menu-item--active').siblings('.menu-item--active').removeClass('expanded').find('.sub-menu').stop().slideUp();
                $(this).siblings('.sub-menu').stop().slideDown();
            }
        });
    }
    menu_nested('.menu-categs');

    function tabs() { // глобальная
        $('.js-nav-tabs a').click(function(e){
            e.preventDefault();
            var tab_id = $(this).attr('href');
            $('.js-nav-tabs li').removeClass('active');
            $(this).parent().addClass('active');
            $('.tabcontent').fadeOut(300);
            $(tab_id).fadeIn(300);
        });
    }
    tabs();


    /*Close button*/
    $('#bnr-close').click(function(){
        $('#bnr').fadeOut();
    });
    /*--BANNER*/


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
});