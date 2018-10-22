var hfLen = 3
function hfPageNav () {
	$('#pagenavPrevBtn').on('click', function () {
		var seledVal = $('.pagenav-item.seled').index();
		$('#pagenavNextBtn').addClass('ppisShow');
		$('.pagenav-item').removeClass('seled');
		seledVal = seledVal - 1;
		if (seledVal <= 0) {
			$(this).removeClass('ppisShow');
			$('#pagenavList').find('.pagenav-item').eq(0).addClass('seled');
			return;
		}
		$('#pagenavList').find('.pagenav-item').eq(seledVal).addClass('seled');
	})
	$('#pagenavNextBtn').on('click', function () {
		var seledVal = $('.pagenav-item.seled').index();
		$('#pagenavPrevBtn').addClass('ppisShow');
		$('.pagenav-item').removeClass('seled');
		seledVal = seledVal - 0 + 1;
		if (seledVal >= hfLen - 1) {
			$(this).removeClass('ppisShow');
			$('#pagenavList').find('.pagenav-item').eq(hfLen - 1).addClass('seled');
			return;
		}
		$('#pagenavList').find('.pagenav-item').eq(seledVal).addClass('seled');
	})
	$('#pagenavList').on('click', '.pagenav-item', function () {
		var seledVal = $(this).index();
		$('.pagenav-item').removeClass('seled');
		$('#pagenavList').find('.pagenav-item').eq(seledVal).addClass('seled');
		if (seledVal <= 0) {
			$('#pagenavPrevBtn').removeClass('ppisShow');
			$('#pagenavNextBtn').addClass('ppisShow');
			return;
		}
		$('#pagenavPrevBtn').addClass('ppisShow');
		if (seledVal >= hfLen - 1) {
			$('#pagenavNextBtn').removeClass('ppisShow');
			return;
		}
		$('#pagenavNextBtn').addClass('ppisShow');
	})
}
function resetWwStatus () {
	var ww = $(window).width();
	if (ww < 1700) {
		$('.home-of-header-sl').hide();
	} else {
		$('.home-of-header-sl').fadeIn();
	}
}
var sTop1 = $('.home-of-silder').offset().top;
function showSlide () {
	var sH = $(window).height();
	var sTop = $(window).scrollTop();
	var limitTop = sTop - 0 + sH / 2;
	console.log(sH, sTop, sTop1, limitTop);
	if (limitTop >= sTop1) {
		$('.home-of-silder').addClass('fixed-slider');
	} else {
		$('.home-of-silder').removeClass('fixed-slider');
	}
}
function scollected () {
	$('.collected-btn').on('click', function () {
		if ($(this).hasClass('seled')) {
			$(this).removeClass('seled');
		} else {
			$(this).addClass('seled');
		}
	})
}
function soltFuc () {
	$('.hf-sy-nav-solt-view').on('click', function (e) {
		e.stopPropagation();
		$(this).siblings('.hf-sy-nav-solt-list').slideDown();
	})
	$('.hf-sy-nav-solt-item').on('click', function (e) {
		e.stopPropagation();
		var thisVal = $(this).html();
		$('.hf-sy-nav-solt-view').html(thisVal);
		$(this).parent().slideUp();
	})
}
function isDh () {
	$('.home-of-title-icon').hover(function () {
		$('.home-of-title-ct').fadeIn();
	}, function () {
		$('.home-of-title-ct').fadeOut();
	})
}
var stIdx;
function islookDes () {
	$('.hf-sy-nav-link').hover(function (e) {
		e.stopPropagation();
		var thisIsSeled = $(this).attr('isSeled');
		if (!thisIsSeled) {
			$('.hf-sy-nav-retails-wrapper').fadeOut();
			$('.hf-sy-nav-retails').hide();
			return;
		}
		var dem = $('.hf-sy-nav-retails');
		for (var i = 0; i < dem.length; i++) {
			(function (i) {
				var thatIsSeled = dem.eq(i).attr('isSeled');
				if (thisIsSeled === thatIsSeled) {
					stIdx = i;
					$('.hf-sy-nav-retails-wrapper').fadeIn();
					dem.eq(i).show().siblings().hide();
				}
			})(i)
		}
	}, function () {
	})
	$('.hf-sy-nav-retails-wrapper').hover(function (e) {
		e.stopPropagation();
		$('.hf-sy-nav-retails-wrapper').show();
		$('.hf-sy-nav-retails').eq(stIdx).show().siblings().hide();
	}, function () {

	})
	$('.hf-sy-nav-retails-wrapper, .hf-sy-nav-list').on('mousemove', function (e) {
		e.stopPropagation();
	})
	$('.hf-body').on('mousemove', function () {
		$('.hf-sy-nav-retails-wrapper').fadeOut();
		$('.hf-sy-nav-retails').hide();
	})
	// $('.hf-body').hover(function () {
	// 	console.log(0, '11');
	// 	$('.hf-sy-nav-retails-wrapper').fadeOut();
	// 	$('.hf-sy-nav-retails').hide();
	// }, function () {

	// })
}
function sledItem () {
	$('.hf-sy-nav-link').on('click', function () {
		$('.hf-sy-nav-link').removeClass('seled');
		$(this).addClass('seled');
	})
	$('.ge-btn').on('click', function () {
		$('.ge-btn').removeClass('esp');
		$(this).addClass('esp');
		var _idx = $(this).index();
		$('.uptle-btn').eq(_idx).show().siblings().hide();
	})
	$('.gm-colled-btn').on('click', function () {
		if ($(this).hasClass('esp')) {
			$(this).removeClass('esp');
		} else {
			$(this).addClass('esp');
		}
	})
}
$(function () {
	hfPageNav();
	resetWwStatus();
	scollected();
	soltFuc();
	isDh();
	islookDes();
	sTop1 = $('.home-of-silder').offset().top;
	$(window).resize(resetWwStatus);
	// $(window).bind("scroll", showSlide);
	sledItem();
})