function signIn () {
	var userAccount = $.trim($(".signin-userAccount").val());
	var  obj = nonNull(userAccount, '账号');
	if (!obj.status) {
		$('#snwr-err').html(obj.msg);
    return;
	}

	var userPassword = $.trim($(".signin-userPassword").val());
	var  obj2 = nonNull(userPassword, '密码');
	if (!obj2.status) {
		$('#snwr-err').html(obj2.msg);
    return;
	}

	var userCode = $.trim($(".signin-userCode").val());
	var  obj3 = nonNull(userCode, '验证码');
	var imgCodeStatus = true;
	// imgCodeStatus 此变量决定是否验证图片验证码
	if (!obj3.status && imgCodeStatus) {
		$('#snwr-err').html(obj3.msg);
    return;
	}
  //在下面执行登录操作
  // ...
}
function signUp () {
	$('.random-user-sup-input, .urio-item-select').focus(function () {
		$('#snwr-err').html('');
	})
	$('.ppw-sign-up-btn').on('click', function () {
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

		var yearVal = $('#select-year').val();
		var monthVal = $('#select-month').val();
		var dayVal = $('#select-day').val();
		var yearVer = nonNull(yearVal);
		if (!yearVer.status) {
			$('#snwr-err').html('请选择您的出生年月！');
			return;
		}
		var monthVer = nonNull(monthVal);
		if (!monthVer.status) {
			$('#snwr-err').html('请选择您的出生年月！');
			return;
		}
		var dayVer = nonNull(dayVal);
		if (!dayVer.status) {
			$('#snwr-err').html('请选择您的出生年月！');
			return;
		}
		if (sexVal === 3) {
			$('#snwr-err').html('请选择您的性别！');
			return;
		}

		// 注册操作
		// ...
	})
}
var sexVal = 3;
function selectSex () {
	$('input[type=radio][name=userSex]').change(function() {
		sexVal = $(this).val();
		$('#snwr-err').html('');
		$(this).parent().siblings('.seled').removeClass('seled');
		$(this).parent().addClass('seled');
	});
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
function thirdBind () {
	$('.ppw-third-btn').on('click', function () {
		var accountVal = $('#third-account-input-ctr').val();
		var objVer = ipVerify(accountVal);
		if (!objVer.status) {
			$('#snwr-err').html(objVer.msg);
			return;
		}

		var codeVal = $('#third-code-input-ctr').val();
		var codeName = '';
		if (objVer.type === 'mobile') {
			codeName = '手机验证码';
		}
		var codeVer = nonNull(codeVal, codeName);
		if (!codeVer.status) {
			$('#snwr-err').html(codeVer.msg);
			return;
		}
		// 手机号是否已绑定其他账户
		if (false) {
			$('#snwr-err').html('该手机号已绑定其他账户,请直接<a class="sign-in-link-btn" href="../sign-in/sign-in.html">登录</a>或更换其他手机号绑定！');
		}
		// 绑定操作
		// ...

		$('#third-bind-oper').hide();
		$('#third-bind-succ').fadeIn();
	})
}
function thirdGetCode () {
	var times = 60;
	var codeBtnTxt = '';
	var codeClick = true;
	var timer;
	var setval = function () {
	  times--;
	  codeBtnTxt = times + 's后重试';
	  $('#third-getCode').addClass('not-click').html(codeBtnTxt);
	  if (times < 1) {
	    clearInterval(timer);
	    times = 60;
	    codeBtnTxt = '重新发送';
	    codeClick = true;
	    $('#third-getCode').removeClass('not-click').html(codeBtnTxt);
	  }
	};
	$('#third-getCode').on('click', function () {
		if (!codeClick) {
			return;
		}
		var accountVal = $('#third-account-input-ctr').val();
		var objVer = ipVerify(accountVal);
		if (!objVer.status) {
			$('#snwr-err').html(objVer.msg);
			return;
		}
		codeClick = false;
		timer = setInterval(setval, 1000)
	})
}
$(function () {
	$("#signin-psy-btn-ctr").on('click', signIn); // 登录;
	signUp(); // 注册;
	selectSex(); // 选择性别
	getCode(); // 获取手机或者邮箱验证码
	thirdBind(); //第三方绑定
	thirdGetCode(); //第三方绑定验证码
})