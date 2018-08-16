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
function outOfStore () {
	// 新设计单品预定
	$('.cr-new-pt-btn').on('click', function (){
		$('.gd-win-wrapper').show();
		$('.store-reserve-win').fadeIn();
	})
	$('.gd-win-close-btn').on('click', function () {
		$('.gd-win-wrapper, .store-reserve-win, .reserve-success-win').fadeOut();
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
function spItemSH () {
	// 切换商品
	$('.gl-ct-series-ctr .series-ctr').on('click', function () {
		var _index = $(this).index();
		var _li = $(this).parent().parent().find('.gl-ct-item-list .gl-ct-series-item');
		_li.hide();
		_li.eq(_index).fadeIn();
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
	spItemSH();
	selectColor('.goods-color-item', '.goods-color-name');
	selectSize('.goods-size-list', '.goods-size-view', '.goods-size-item-num')
	outOfStore();
	collectGoods();
	$('.go-to-top-btn').on('click', goToTop);
	bindMobile();
	bindEmail();
	ipEmVer();
	seserveSubmit();
})