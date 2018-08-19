function fgpwStep1 () {
	$('.random-user-sup-input, .urio-item-select').focus(function () {
		$('#snwr-err').html('');
	})
	$('#next-fgpw-btn').on('click', function () {
		var accountVal = $('#account-input-ctr').val();
		var objVer = accountVerify(accountVal);
		if (!objVer.status) {
			$('#snwr-err').html(objVer.msg);
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
			$('#snwr-err').html(codeVer.msg);
			return;
		}
		$('.forget-pw-step-1').hide();
		$('.forget-pw-step-2').fadeIn();
		$('#snw-tle-txt').html('设置新密码');
	})
}
function fgpwStep2 () {
	$('#finif-fgpw-btn').on('click', function () {
		var passVal = $('#passward-input-ctr').val();
		var passVer = passwordVerify(passVal);
		if (!passVer.status) {
			$('#snwr-err').html(passVer.msg);
			return;
		}

		var passVal2 = $('#passward-input-ctr-2').val();
		var passVer2 = nonNull(passVal2, '确认密码');
		if (!passVer2.status) {
			$('#snwr-err').html(passVer2.msg);
			return;
		}
		if(passVal !== passVal2) {
			$('#snwr-err').html('两次密码输入不一致！');
			return;
		}
		$('#snwr-err').html('新密码设置成功！');
		setTimeout(function () {
			history.back(-1);
		}, 500)
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
			$('#snwr-err').html(objVer.msg);
			return;
		}
		codeClick = false;
		timer = setInterval(setval, 1000)
	})
}
$(function () {
	fgpwStep1();
	fgpwStep2();
	getCode();
})