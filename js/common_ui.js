$(document).ready(function(){
	deviceChk();

    //popClose
  $('.btnClose').click(function(){
    var $layerPop = $(this).closest('.popWrap'),
        $dim = $(this).closest('.popWrap').find('.dim');

    $layerPop.removeClass('active');
    $dim.remove();

    $('body').css('overflow','visible');
    $('body').focus();
  });

  //scrollTab
  $('.tabcontents:first-child').show();

  $('.tabMenu ul li a').on('click', function(){
	var menuSelect = $(this);
		

	$('.tabMenu ul li').removeClass('active');
	menuSelect.parent().addClass('active');
	menuSelect.closest('li').parents('.tabMenu').next().children().eq($(this).closest('li').index()).show().siblings().hide();
	var left = $('.tabMenu ul li.active').offset().left,
		curLeft = $('.tabMenu').scrollLeft();

	$('.tabMenu').animate({scrollLeft : curLeft+left}, 400);
  });
  
  
  
});

$(window).on('load', function(){
	//subMenu
    var customSelect = $('select.select_menuList');
	customSelect.each(function() {
		var that = $(this);
		var listID = that.attr('id'),
			theOptions = "",
			startingOption = "",
			customSelect = "";

            that.children('option').each(function() {
				var curOpt = $(this);
				var curVal = curOpt.attr('value'),
					curHtml = curOpt.html(),
					isSelected = curOpt.attr('selected');
				if(isSelected === 'selected') {
					startingOption = curHtml;
					theOptions += '<li class="selected" data-value="' + curVal + '">' + curHtml + '</li>';
				}else {
					theOptions += '<li data-value="' + curVal + '">' + curHtml + '</li>';
				}
			});

		customSelect = '<div class="dropdown-select entypo-down-open-big"><span>' + startingOption + '</span></div><div class="dropdown-container"><div class="dropSelectWrap"><ul class="dropdown-select-ul" data-role="' + listID +'">' + theOptions + '</ul><div class="dim"></div></div></div>';
		$(customSelect).insertAfter(that);
		
	});
	
	var	selectdd = $('.dropdown-select'),
		selectli = $('.dropdown-select-ul li');

	selectdd.on('click',function(){
		$(this).next('.dropdown-container').toggleClass('active');
	});

	$('.dim').on('click',function(){
		$(this).parents('.dropdown-container').removeClass('active');
	});

	selectli.on('click',function(){
		var that = $(this);
		var	parentUl = that.parent('ul'),
            thisdd = parentUl.parents('.dropdown-container').prev('.dropdown-select'),
            lihtml = that.html(),
            livalue = that.attr('data-value'),
            originalSelect = '#' + parentUl.attr('data-role');

        parentUl.next('.dropdown-container').toggleClass('active');
        that.siblings('li').removeClass('selected');
        that.addClass('selected');
        $(originalSelect).val(livalue);
        thisdd.children('span').html(lihtml);
	});

	//select : bottomSheetType 
	var popSelect = $('.selectBox');
	popSelect.each(function() {
		var that = $(this);
		var listID = that.attr('id'),
			theOptions = "",
			startingOption = "",
			popSelect = "";

            that.children('option').each(function() {
				var curOpt = $(this);
				var curVal = curOpt.attr('value'),
					curHtml = curOpt.html(),
					isSelected = curOpt.attr('selected');
				if(isSelected === 'selected') {
					startingOption = curHtml;
					theOptions += '<li class="selected" data-value="' + curVal + '">' + curHtml + '</li>';
				}else {
					theOptions += '<li data-value="' + curVal + '">' + curHtml + '</li>';
				}
			});
		popSelect = '<div class="dropdown-select entypo-down-open-big"><span>' + startingOption + '</span></div><div class="popWrap popBottom"><div class="dropdown-container"><div class="dropSelectWrap"><ul class="dropdown-select-ul" data-role="' + listID +'">' + theOptions + '</ul><div class="dim"></div></div></div></div>';
		$(popSelect).insertAfter(that);
		
	});
	
	var	selectdd = $('.dropdown-select'),
		selectli = $('.dropdown-select-ul li');

	selectdd.on('click',function(){
		$(this).next('.popWrap').addClass('active');
		$(this).next('.popWrap').children('.dropdown-container').toggleClass('active');
	});

	$('.dim').on('click',function(){
		$(this).parents('.popWrap').removeClass('active');
		$(this).parents('.dropdown-container').removeClass('active');
	});

	selectli.on('click',function(){
		var that = $(this);
		var	parentUl = that.parent('ul'),
            thisdd = parentUl.parent('.dropSelectWrap').closest('.popWrap').prev('.dropdown-select'),
            lihtml = that.html(),
            livalue = that.attr('data-value'),
            originalSelect = '#' + parentUl.attr('data-role');

        parentUl.parents('.dropdown-container').toggleClass('active');
		parentUl.parents('.popWrap').removeClass('active');
        that.siblings('li').removeClass('selected');
        that.addClass('selected');
        $(originalSelect).val(livalue);
        thisdd.children('span').html(lihtml);
	});
});


/* iOS or Android ? */
function deviceChk(){
	if( /Android/i.test(navigator.userAgent)) {
		$('#wrap').addClass('android');
	}else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
		$('#wrap').addClass('ios');
	}
};

/* iOS position:fixed bug */
var fixedPosChg = function(){
	var pos;
	var iosFlag = navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
};

//popUP 
function fnShowPop(sGetName){
    var $layer = $("#"+ sGetName);
  
    $layer.addClass("active");
    $layer.find('.popHeader').prepend('<a href="#" class="mod"></a>');
    $layer.find('.mod').focus();
    $layer.not('.asideMenuWrap, .popFull').append('<div class="dim"></div>');
    $('body').css('overflow','hidden');

	$('.dim, .btn_popBottomClose').click(function(){
		$layer.removeClass("active");
		$layer.find('.mod').remove();
		$layer.find('.dim').remove();
		$('body').css('overflow','auto');
	});
  };
  
function fnHidePop(sGetName){
	var $layer = $("#"+ sGetName);

	$layer.removeClass("active");
	$layer.find('.mod').remove();
	$layer.find('.dim').remove();

	$('body').css('overflow','auto');
};



