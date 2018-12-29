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
		$('.home-of-header-sl, .home-of-silder').hide();
	} else {
		$('.home-of-header-sl, .home-of-silder').fadeIn();
	}
}
if ($('.home-of-sy-nav-box').length > 0) {
	var sTop1 = $('.home-of-sy-nav-box').offset().top;
}
function showSlide () {
	var sTop = $(window).scrollTop();
	if (sTop > sTop1 - 200) {
		$('.home-of-silder').addClass('fixed-slider');
	} else {
		$('.home-of-silder').removeClass('fixed-slider');
	}
	if (sTop > sTop1 - 128) {
		$('.essay-slide-wrapper').addClass('fixed-slider');
	} else {
		$('.essay-slide-wrapper').removeClass('fixed-slider');
	}
}
function scollected () {
	$('.collected-btn').on('click', function () {
		if ($(this).hasClass('seled')) {
			$(this).removeClass('seled');
		} else {
			$(this).addClass('seled');
		}
		return false
	})
}
function soltFuc () {
	$('.hf-sy-nav-solt-view').on('click', function (e) {
		e.stopPropagation();
		$(this).addClass('seled');
		$(this).siblings('.hf-sy-nav-solt-list').slideDown();
	})
	$('.hf-sy-nav-solt-item').on('click', function (e) {
		e.stopPropagation();
		var thisVal = $(this).html();
		$('.hf-sy-nav-solt-view').removeClass('seled').html(thisVal);
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
		if (_idx === 1) {
			$('#groove-input-placeholder').html('该信息仅自己可见，并以匿名的形式随机推送给5位陌生人！');
		} else {
			$('#groove-input-placeholder').html('这一刻，你想说点啥？');
		}
	})
	$('.gm-colled-btn').on('click', function () {
		if ($(this).hasClass('esp')) {
			$(this).removeClass('esp');
		} else {
			$(this).addClass('esp');
		}
	})
	$('.sel-geim-checkbox').on('click', function () {
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('seled');
		} else {
			$(this).parent().removeClass('seled');
		}
	});
}
$(function () {
	sledItem();
	hfPageNav();
	resetWwStatus();
	scollected();
	soltFuc();
	isDh();
	islookDes();
	if ($('.home-of-sy-nav-box').length > 0) {
		sTop1 = $('.home-of-sy-nav-box').offset().top;
	}
	$(window).resize(resetWwStatus);
	$(window).bind("scroll", showSlide);
})