
function selectColor (control, view) {
	// 选择颜色
	var control = $(control);
	control.on('click', function () {
		$(this).addClass('colorSel').siblings().removeClass('colorSel');
		var colorName = $(this).attr('colorname');
		control.parent().siblings(view).html(colorName)
	})
}
function selectSize (control, view, sizeItem) {
	// 选择尺码
	var view1 = $(view);
	var sizeItem1 = view1.siblings(control).children().find(sizeItem);
	view1.on('click', function (e) {
		e.stopPropagation();
		var control1 = $(this).siblings(control);
		$(this).addClass('is-show');
		control1.slideDown();
	});
	sizeItem1.on('click', function () {
		var view2 = $(this).parent().parent().siblings(view).find('.size-view-num');
		var _val = $(this).html();
		view2.html(':' + _val);
		$('.add-goods-btn').find('.add-goods-err').fadeOut();
		$(this).parent().parent().slideUp();
	});
}
function addCart () {
	// 添加到购物车
	$('.add-goods-btn').on('click', function () {
		var _val = $('#goods-size-num').html();
		if (!_val) {
			$(this).find('.add-goods-err').fadeIn();
		}
	})
}
function cutBigImg () {
	// 切换大图
	$('.img-nav-item').on('click', function () {
		$(this).addClass('now-page').siblings().removeClass('now-page');
		var imgSrc = $(this).find('img').attr('src');
		$('#gd-big-img').attr('src', imgSrc);
	})
}
var cutNav = {
	len: $('.img-nav-list').find('.img-nav-item').length,
	idx: 0,
	basics: function () {
		cutNav.btnStatus();
		var _h = $('.img-nav-item').width() * 1.4;
		var sTop = _h * 4;
		$(".img-nav-list").animate({
			top: '-' + cutNav.idx * sTop + 'px'
		}, 500);
	},
	prev: function () {
		cutNav.idx--;
		if (cutNav.idx <= 0) {
			cutNav.idx = 0;
		}
		cutNav.basics();
	},
	next: function () {
		var _len = Math.ceil(cutNav.len / 4) - 1;
		cutNav.idx++;
		if (cutNav.idx >= _len) {
			cutNav.idx = _len;
		}
		cutNav.basics();
	},
	btnStatus: function () {
		$('.img-prev-btn, .img-next-btn').addClass('has-more');
		var _len = Math.ceil(cutNav.len / 4) - 1;
		if (cutNav.idx <= 0) {
			$('.img-prev-btn, .img-next-btn').removeClass('has-more');
			if (_len > 0) {
				$('.img-next-btn').addClass('has-more');
			}
		}
		if (cutNav.idx >= _len) {
			$('.img-prev-btn, .img-next-btn').removeClass('has-more');
			if (_len > 0) {
				$('.img-prev-btn').addClass('has-more');
			}
		}
	}
};
function cutImgNav () {
	// 切换索引图
	$('.img-prev-btn').on('click', cutNav.prev);
	$('.img-next-btn').on('click', cutNav.next);
	var hr;
	$(window).resize(function () {
		clearTimeout(hr);
		hr = setTimeout(function () {
			cutNav.basics();
		}, 500);
	})
}
var recommend = {
	len: $('.recommended-goods-list').find('.recommended-goods-item').length,
	idx: 0,
	basics: function () {
		recommend.btnStatus();
		var _h = $('.recommended-goods-item').width();
		var sTop = _h * 4;
		$(".recommended-goods-list").animate({
			left: '-' + recommend.idx * sTop + 'px'
		}, 500);
	},
	prev: function () {
		recommend.idx--;
		if (recommend.idx <= 0) {
			recommend.idx = 0;
		}
		recommend.basics();
	},
	next: function () {
		var _len = Math.ceil(recommend.len / 4) - 1;
		recommend.idx++;
		if (recommend.idx >= _len) {
			recommend.idx = _len;
		}
		recommend.basics();
	},
	btnStatus: function () {
		$('.recommend-prev, .recommend-next').addClass('has-more');
		var _len = Math.ceil(recommend.len / 4) - 1;
		if (recommend.idx <= 0) {
			$('.recommend-prev, .recommend-next').removeClass('has-more');
			if (_len > 0) {
				$('.recommend-next').addClass('has-more');
			}
		}
		if (recommend.idx >= _len) {
			$('.recommend-prev, .recommend-next').removeClass('has-more');
			if (_len > 0) {
				$('.recommend-prev').addClass('has-more');
			}
		}
	},
	init: function () {
		var _h = $('.recommended-goods-item').width();
		$(".recommended-goods-list").animate({
			left: 0,
			width: recommend.len * _h + 'px'
		});
	}
};
function cutRecommend () {
	// 切换推荐商品
	recommend.init();
	$('.recommend-prev').on('click', recommend.prev);
	$('.recommend-next').on('click', recommend.next);
}
function goodsSizeTable () {
	// 尺寸对照表弹窗
	$('.size-table-btn').on('click', function (){
		$('.gd-win-wrapper').show();
		$('.gd-win-content').fadeIn();
	})
	$('.gd-win-close-btn').on('click', function () {
		$('.gd-win-wrapper, .gd-win-content, .store-reserve-win, .reserve-success-win').fadeOut();
	})
	cutSizeTable();
}
function cutSizeTable () {
	// 切换尺寸对照表
	$('.gd-size-box').on('click', function (e) {
		e.stopPropagation();
		e.preventDefault();
		$(this).siblings('.win-drop-down-list').slideDown();
		$(this).addClass('is-show');
	})
	$('.win-drop-down-item').on('click', function () {
		var _val = $(this).html();
		var imgSrc = $(this).attr('imgsrc');
		$('.win-drop-down-box-result').html(_val);
		$('.win-drop-down-select img').attr('src', imgSrc);
	})
}
function outOfStore () {
	// 缺货尺码预定弹窗
	$('.store-reserve-btn').on('click', function (){
		$('.gd-win-wrapper').show();
		$('.store-reserve-win').fadeIn();
	})
	$('.gd-win-close-btn').on('click', function () {
		$('.gd-win-wrapper, .gd-win-content, .store-reserve-win, .reserve-success-win').fadeOut();
	})
	selectColor('.reserve-win-goods-color-ctr', '.reserve-win-goods-color-name');
	globalInputNum();
	selInformStyle();
}
function selInformStyle () {
	// 选择通知方式
	$('.inform-style-btn-input').change(function () {
		$('.inform-style-btn').removeClass('selected');
		$(this).parent().addClass('selected');
	})
}
function collectGoods () {
	// 收藏操作
	$('.collect-btn').on('click', function () {
		if ($(this).hasClass('collected')) {
			$(this).html('收藏');
			$(this).removeClass('collected');
		} else {
			$(this).html('已收藏')
			$(this).addClass('collected');
		}
	})
}
function bindMobile () {
	$('#bind-mobile-btn').on('click', function () {
		var valIf = $(this).html();
		if (valIf === '无') {
			$('#bind-mobile-email-tle').html('手机号绑定');
			$('.bind-mobile-wrapper .bmew-ct-item-name').html('输入手机号：');
		}
		$('.bind-mobile-email-wrapper').show();
	})
}
function bindEmail () {
	
}
$(function () {
	selectColor('.goods-color-item', '.goods-color-name');
	selectSize('.goods-size-list', '.goods-size-view', '.goods-size-item-num')
	addCart();
	cutBigImg();
	cutImgNav();
	cutRecommend();
	goodsSizeTable();
	outOfStore();
	collectGoods();
	bindMobile();
	bindEmail();
})