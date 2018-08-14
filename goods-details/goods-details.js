
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
		var valIf = $(this).siblings('.inform-name-txt').html();
		if (valIf === '无') {
			$('#bind-mobile-email-tle').html('手机号绑定');
			$('.bind-mobile-wrapper .bmew-ct-item-name.bmew-ic-1').html('输入手机号：');
		} else {
			$('#bind-mobile-email-tle').html('手机号修改');
			$('.bind-mobile-wrapper .bmew-ct-item-name.bmew-ic-1').html('新的手机号：');
		}
		$('.bind-email-wrapper').hide();
		$('.bind-mobile-email-wrapper').show();
		$('.bind-mobile-wrapper').fadeIn();
	})
	$('.bmew-close-btn').on('click', function () {
		$('.bind-mobile-email-err').html('');
		$('.bmew-ct-item-input input').val('');
		$('.bind-mobile-wrapper, .bind-email-wrapper').hide();
		$('.bind-mobile-email-wrapper').fadeOut();
	})
	submitMobile();
}
function bindEmail () {
	$('#bind-eamil-btn').on('click', function () {
		var valIf = $(this).siblings('.inform-name-txt').html();
		if (valIf === '无') {
			$('#bind-mobile-email-tle').html('邮箱地址绑定');
			$('.bind-email-wrapper .bmew-ct-item-name.bmew-ic-3').html('输入邮箱：');
		} else {
			$('#bind-mobile-email-tle').html('邮箱地址修改');
			$('.bind-email-wrapper .bmew-ct-item-name.bmew-ic-3').html('新的邮箱：');
		}
		$('.bind-mobile-wrapper').hide();
		$('.bind-mobile-email-wrapper').show();
		$('.bind-email-wrapper').fadeIn();
	})
	submitEmail();
}
function ipEmVer () {
	$('.bmew-ct-item-input input').focus(function () {
		$('.bind-mobile-email-err').html('');
	})
}
function emailVerify () {
	var emailVal = $('#emailInput').val();
	var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
	if (!reg.test(emailVal)) {
		$('.bind-mobile-email-err').html('邮箱有误，请重新输入！');
		return false;
	}
	return true;
}
function submitEmail () {
	var times = 60;
	var codeBtnTxt = '';
	var codeClick = true;
	var timer;
	if (status) {
		clearInterval(timer);
		return;
	}
	var setval = function () {
	  times--;
	  codeBtnTxt = times + 's后重试';
	  $('#getEmailCode').addClass('not-click').html(codeBtnTxt);
	  if (times < 1) {
	    clearInterval(timer);
	    times = 60;
	    codeBtnTxt = '重新发送';
	    codeClick = true;
	    $('#getEmailCode').removeClass('not-click').html(codeBtnTxt);
	  }
	};
	$('#getEmailCode').on('click', function () {
		if (!codeClick) {
			return;
		}
		if (emailVerify()) {
			codeClick = false;
			timer = setInterval(setval, 1000)
		}
	})
	$('#submitEmail').on('click', function () {
		if (emailVerify()) {
			var code = $(this).siblings('.bmew-ct-item-gp').find('.bind-code-input').val();
			if (!code) {
				$('.bind-mobile-email-err').html('验证码有误，请重新输入！');
				return;
			}
			var txt = $('#bind-eamil-btn').html();
			if (txt !== '修改') {
				$('.bind-mobile-email-err').html('认证成功！');
			} else {
				$('.bind-mobile-email-err').html('修改成功！');
			}
			var _this = $(this);
			var res =$(this).parent().parent().siblings('.urio-sign-group');
			setTimeout(function() {
				$('#bind-eamil-btn').html('修改');
				$('#bind-eamil-btn').siblings('.inform-name-txt').html($('#emailInput').val());
				$('.bind-mobile-email-wrapper').slideUp();
				$('.bind-mobile-email-err').html('');
				$('#emailInput').val('');
				$('.bind-code-input').val('');
				clearInterval(timer);
				times = 60;
				codeClick = true;
	    	$('#getEmailCode').removeClass('not-click').html('发送邮箱验证码');
	    	$('#bind-eamil-btn').parent().siblings('.inform-style-btn').show();
			}, 300);
		}
	})
	$('.bmew-close-btn').on('click', function () {
		$('.bind-mobile-email-err').html('');
		$('.bmew-ct-item-input input').val('');
		$('.bind-mobile-wrapper, .bind-email-wrapper').hide();
		$('.bind-mobile-email-wrapper').fadeOut();
		clearInterval(timer);
		times = 60;
		codeClick = true;
  	$('#getEmailCode').removeClass('not-click').html('发送邮箱验证码');
  	$('#getMobileCode').removeClass('not-click').html('发送手机验证码');
	})
}
function mobileVerify () {
	var emailVal = $('#mobileInput').val();
	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	if (!reg.test(emailVal)) {
		$('.bind-mobile-email-err').html('手机号有误，请重新输入！');
		return false;
	}
	return true;
}
function submitMobile () {
	var times = 60;
	var codeBtnTxt = '';
	var codeClick = true;
	var timer;
	var setval = function () {
	  times--;
	  codeBtnTxt = times + 's后重试';
	  $('#getMobileCode').addClass('not-click').html(codeBtnTxt);
	  if (times < 1) {
	    clearInterval(timer);
	    times = 60;
	    codeBtnTxt = '重新发送';
	    codeClick = true;
	    $('#getMobileCode').removeClass('not-click').html(codeBtnTxt);
	  }
	};
	$('#getMobileCode').on('click', function () {
		if (!codeClick) {
			return;
		}
		if (mobileVerify()) {
			codeClick = false;
			timer = setInterval(setval, 1000)
		}
	})
	$('#submitMobile').on('click', function () {
		if (mobileVerify()) {
			var code = $(this).siblings('.bmew-ct-item-gp').find('.bind-code-input').val();
			if (!code) {
				$('.bind-mobile-email-err').html('验证码有误，请重新输入！');
				return;
			}
			var txt = $('#bind-mobile-btn').html();
			if (txt !== '修改') {
				$('.bind-mobile-email-err').html('认证成功！');
			} else {
				$('.bind-mobile-email-err').html('修改成功！');
			}
			setTimeout(function() {
				$('#bind-mobile-btn').html('修改');
				$('#bind-mobile-btn').siblings('.inform-name-txt').html($('#mobileInput').val());
				$('.bind-mobile-email-wrapper').slideUp();
				$('.bind-mobile-email-err').html('');
				$('#mobileInput').val('');
				$('.bind-code-input').val('');
				$('#bind-mobile-btn').parent().siblings('.inform-style-btn').show();
				clearInterval(timer);
				times = 60;
				codeClick = true;
	    	$('#getMobileCode').removeClass('not-click').html('发送手机验证码');
			}, 300);
		}
	})
	$('.bmew-close-btn').on('click', function () {
		$('.bind-mobile-email-err').html('');
		$('.bmew-ct-item-input input').val('');
		$('.bind-mobile-wrapper, .bind-email-wrapper').hide();
		$('.bind-mobile-email-wrapper').fadeOut();
		clearInterval(timer);
		times = 60;
		codeClick = true;
  	$('#getEmailCode').removeClass('not-click').html('发送邮箱验证码');
  	$('#getMobileCode').removeClass('not-click').html('发送手机验证码');
	})
}
function autoHide () {
	var tNUum = 3;
	var sh;
	var to = function () {
		tNUum--;
		if (tNUum < 1) {
			tNUum = 1;
			$('.cr-step-win-time').html(tNUum);
			clearInterval(sh);
			location.href="../user-center/user-center.html";
			$('#submit-success-win').fadeOut();
		}
		$('.cr-step-win-time').html(tNUum);
	}
	sh = setInterval(to, 1000);
}
function seserveSubmit () {
	$('#reserve-submit-self').on('click', function () {
		$('#submit-success-win').fadeIn();
		setTimeout(function () {
			autoHide();
		}, 50);
	})
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
	ipEmVer();
	seserveSubmit();
})