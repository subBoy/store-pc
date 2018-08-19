var step = GetQueryString('step');
if (!step || step === null) {
	step = 1;
}
function selTypeFuc () {
	$('.sel-pay-type-ctr, .ppw-sel-address-ctr').on('change', function () {
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('seled');
		} else {
			$(this).parent().removeClass('seled');
		}
	})
	$('.ppw-sel-address-btn').on('click', function () {
		if ($(this).hasClass('seled')) {
			return;
		}
		$('.ppw-sel-address-btn').find('.ppw-sel-address-ctr').prop('checked', false).change();
		$(this).find('.ppw-sel-address-ctr').prop('checked', true).change();
	})
	$('.ppw-type-item').on('click', function () {
		if ($(this).hasClass('seled')) {
			return;
		}
		$('.ppw-type-item').find('.sel-pay-type-ctr').prop('checked', false).change();
		$(this).find('.sel-pay-type-ctr').prop('checked', true).change();
	})
}
function selTrigeminy () {
	$('.trigeminy-address-view').on('click', function (e) {
		e.stopPropagation();
		$('.trigeminy-address-list').hide();
		$(this).siblings('.trigeminy-address-list').slideDown();
	})
	$('.trigeminy-address-item').on('click', function () {
		var thisPs = $(this).parent().siblings('.trigeminy-address-view');
		var thisGe = thisPs.attr('grade');
		$('.trigeminy-address-list').slideUp();
		if ($(this).hasClass('air-item')) {
			if (thisGe === '1') {
				thisPs.html('省');
				return;
			}
			if (thisGe === '2') {
				thisPs.html('市');
				return;
			}
			if (thisGe === '3') {
				thisPs.html('县/区');
				return;
			}
			return;
		}
		var _val = $(this).html();
		thisPs.html(_val);
		$('.user-cpm-error').html('').fadeOut();
	})
	$('.set-dt-checkbox').change(function () {
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('selected');
		} else {
			$(this).parent().removeClass('selected');
		}
	})
	$('.user-cpm-input-ctr').focus(function () {
		$('.user-cpm-error').html('').fadeOut();
		$(this).addClass('esp');
	})
	$('.user-cpm-input-ctr').blur(function () {
		$(this).removeClass('esp');
	})
	$('.sel-vip-input').change(function () {
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('selected');
			$(this).parent().parent().siblings('.random-user-sup').slideDown();
			$(this).parent().parent().parent().addClass('esp');
		} else {
			$(this).parent().removeClass('selected');
			$(this).parent().parent().siblings('.random-user-sup').slideUp();
			$(this).parent().parent().parent().removeClass('esp');
		}
	})
}
var fromData = {};
function getFromData (str) {
	fromData = {};
	var _this = $(str);
	fromData.name = _this.find('.as-us-name').val();
	fromData.asShen = _this.find('.as-shen').html();
	fromData.asShi = _this.find('.as-shi').html();
	fromData.asXian = _this.find('.as-xian').html();
	fromData.asJiedao = _this.find('.as-jiedao').val();
	fromData.asYoubian = _this.find('.as-youbian').val();
	fromData.asTel = _this.find('.as-tel').val();
	fromData.asDefault = _this.find('.set-dt-checkbox').is(':checked');
	console.log(fromData);
	if (!fromData.name) {
		_this.find('.user-cpm-error').html('请输入收货人姓名！').fadeIn();
		return false;
	}
	if (fromData.asShen === '省' || fromData.asShi === '市' || fromData.asXian === '县/区') {
		_this.find('.user-cpm-error').html('请选择地址！').fadeIn();
		return false;
	}
	if (!fromData.asJiedao) {
		_this.find('.user-cpm-error').html('请输入街道地址！').fadeIn();
		return false;
	}
	if (!fromData.asTel) {
		_this.find('.user-cpm-error').html('请输入手机号/电话！').fadeIn();
		return false;
	}
	_this.find('.user-cpm-error').html('').fadeOut();
	return true;
}
function submitFc () {
	// 新增保存
	$('.submit-add-btn').on('click', function () {
		if(getFromData('#ppw-add-user-address')) {
			// 保存到数据库操作
			step = 1;
			showStep();
		}
	})
	$('#ppw-submit-order-btn').on('click', function () {
		// 已登录没有地址
		if (step == '2' && !getFromData('#ppw-add-user-address')) {
			$("html, body").animate({
				scrollTop: 0 + 'px'
			}, 500);
			return
		}
		// 游客则执行
		if (step == '3' && !getFromData('#ppw-random-user-address')) {
			$("html, body").animate({
				scrollTop: 0 + 'px'
			}, 500);
			return
		}
		location.href = '../payment-process/start-payment.html';
	})
}
function getCode () {
	var times = 60;
	var codeBtnTxt = '';
	var codeClick = true;
	var timer;
	var setval = function () {
	  times--;
	  codeBtnTxt = times + 's后重试';
	  $('#getCode').addClass('not-click').html(codeBtnTxt);
	  if (times < 1) {
	    clearInterval(timer);
	    times = 60;
	    codeBtnTxt = '重新发送';
	    codeClick = true;
	    $('#getCode').removeClass('not-click').html(codeBtnTxt);
	  }
	};
	$('#getCode').on('click', function () {
		if (!codeClick) {
			return;
		}
		var accountVal = $('#account-input-ctr').val();
		var objVer = accountVerify(accountVal);
		if (!objVer.status) {
			$('.ppw-sign-up-btn-wrapper .ppw-sign-up-err').html(objVer.msg);
			return;
		}
		codeClick = false;
		timer = setInterval(setval, 1000)
	})
}
function selectSex () {
	$('input[type=radio][name=userSex]').change(function() {
		$(this).parent().siblings('.seled').removeClass('seled');
		$(this).parent().addClass('seled');
	});
}
function useKity () {
	$('.ppw-use-yh-input').on('focus', function () {
		$(this).addClass('focused');
		$(this).siblings('.ppw-use-yh-list-wrapper').slideDown();
	})
	$('.ppw-use-yh-input').on('blur', function () {
		$(this).removeClass('focused');
		$(this).siblings('.ppw-use-yh-list-wrapper').slideUp();
	})
	$('.ppw-use-yh-item').on('click', function () {
		var kityCode = $(this).attr('kityCode');
		$(this).parent().parent().siblings('.ppw-use-yh-input').blur().val(kityCode);
	})
}
function goBack () {
	$('.ppw-go-to-back-btn').on('click', function () {
		history.back(-1);
	})
}
function showStep () {
	var stepItem = $('.ppw-step-wrapper');
	stepItem.each(function () {
		var itStep = $(this).attr('step');
		if (step == itStep) {
			$(this).fadeIn();
			setTimeout(function () {
				vmCon('not-an');
			}, 20)
		} else {
			$(this).hide();
		}
	})
}
function signUp () {
	$('.random-user-sup-input, .urio-item-select').focus(function () {
		$('.ppw-sign-up-btn-wrapper .ppw-sign-up-err').html('');
	})
	$('.ppw-sign-up-btn').on('click', function () {
		var accountVal = $('#account-input-ctr').val();
		var objVer = accountVerify(accountVal);
		if (!objVer.status) {
			$(this).siblings('.ppw-sign-up-err').html(objVer.msg);
			return;
		}

		var codeVal = $('#code-input-ctr').val();
		var codeName = '';
		if (objVer.type === 'mobile') {
			codeName = '手机验证码';
		}
		if (objVer.type === 'email') {
			codeName = '邮箱验证码';
		}
		var codeVer = nonNull(codeVal, codeName);
		if (!codeVer.status) {
			$(this).siblings('.ppw-sign-up-err').html(codeVer.msg);
			return;
		}

		var passVal = $('#passward-input-ctr').val();
		var passVer = passwordVerify(passVal);
		if (!passVer.status) {
			$(this).siblings('.ppw-sign-up-err').html(passVer.msg);
			return;
		}

		var passVal2 = $('#passward-input-ctr-2').val();
		var passVer2 = nonNull(passVal2, '确认密码');
		if (!passVer2.status) {
			$(this).siblings('.ppw-sign-up-err').html(passVer2.msg);
			return;
		}
		if(passVal !== passVal2) {
			$(this).siblings('.ppw-sign-up-err').html('两次密码输入不一致！');
			return;
		}

		var yearVal = $('#select-year').val();
		var monthVal = $('#select-month').val();
		var dayVal = $('#select-day').val();
		var yearVer = nonNull(yearVal, '出生年月');
		if (!yearVer.status) {
			$(this).siblings('.ppw-sign-up-err').html('请选择您的出生年月！');
			return;
		}
		var monthVer = nonNull(monthVal, '出生年月');
		if (!monthVer.status) {
			$(this).siblings('.ppw-sign-up-err').html('请选择您的出生年月！');
			return;
		}
		var dayVer = nonNull(dayVal, '出生年月');
		if (!dayVer.status) {
			$(this).siblings('.ppw-sign-up-err').html('请选择您的出生年月！');
			return;
		}
		step = 2;
		showStep();
		$("html, body").animate({
			scrollTop: 0 + 'px'
		}, 500);
	})
}
$(function () {
	selTypeFuc();
	selTrigeminy();
	submitFc();
	getCode();
	selectSex();
	useKity();
	goBack();
	showStep();
	signUp();
})