function changeUserInfo () {
	$('.approved .revise-urio-btn').on('click', function () {
		$('.approved').hide();
		$('.not-approve').fadeIn();
	})
	$('.not-approve .revise-urio-btn').on('click', function () {
		$('.not-approve').hide();
		$('.approved').fadeIn();
	})
	$('.urio-item-input').focus(function () {
		$(this).parent().addClass('in-focus');
		$(".urio-item-input-error").removeClass('isError').html('不能使用特殊符号。<br/>可以用6-10位汉字，数字，英文字母！');
	}).blur(function () {
		$(this).parent().removeClass('in-focus')
	})
}
function detectionUserName () {
	var _val = $('.urio-item-input').val();
	if (_val.length < 2) {
		$(".urio-item-input-error").addClass('isError').html('你的用户名不合格，不允许注册！');
		return;
	}
	var reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/g;
	if (reg.test(_val)) {
		$(".urio-item-input-error").addClass('isError').html('你的用户名不合格，不允许注册！')
	} else {
		$(".urio-item-input-error").addClass('isError').html('该用户名可用，允许注册！')
	}
}
function selectSex () {
	$('input[type=radio][name=userSex]').change(function() {
		$(this).parent().siblings('.seled').removeClass('seled');
		$(this).parent().addClass('seled');
	});
}
function changeSignInfo () {
	$('.urio-sign-btn.oper-btn').on('click', function () {
		var _thisVal = $(this).html();

		if (!$(this).hasClass('esp')) {
			if (_thisVal === '修改') {
				$(this).html('关闭修改');
			} else {
				$(this).html('关闭认证');
			}
			$(this).parent().siblings('.urio-sign-oper-box').slideDown();
			$(this).addClass('esp');
		} else {
			if (_thisVal === '关闭修改') {
				$(this).html('修改');
			} else {
				$(this).html('去认证');
			}
			$(this).parent().siblings('.urio-sign-oper-box').slideUp();
			$(this).removeClass('esp');
		}
	})
}
function emailVerify () {
	var emailVal = $('#emailInput').val();
	var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
	if (!reg.test(emailVal)) {
		$('#email-input-err').html('邮箱输入有误，请重新输入！').fadeIn();
		return false;
	}
	return true;
}
function getEmailCode () {
	var times = 60;
	var codeBtnTxt = '';
	var codeClick = true;
	var timer;
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
}
function submitEmail () {
	$('#submitEmail').on('click', function () {
		if (emailVerify()) {
			var code = $(this).siblings('.urio-sign-oper').find('.urio-sign-oper-input').val();
			if (!code) {
				$('#email-input-err').html('验证码输入有误，请重新输入！').fadeIn();
				return;
			}
			$('#email-input-err').html('修改成功！').fadeIn();
			var _this = $(this);
			var res =$(this).parent().parent().siblings('.urio-sign-group');
			setTimeout(function() {
				res.find('.oper-btn').html('修改');
				res.find('.status-btn').html('已认证');
				res.find('.urio-sign-txt').html($('#emailInput').val());
				_this.parent().parent().slideUp();
				$('#email-input-err').fadeOut();
			}, 300);
		}
	})
}
function mobileVerify () {
	var emailVal = $('#mobileInput').val();
	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	if (!reg.test(emailVal)) {
		$('#mobile-input-err').removeClass('desc-status').html('手机号输入有误，请重新输入！').fadeIn();
		return false;
	}
	return true;
}
function getMobileCode () {
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
}
function submitMobile () {
	$('#submitMobile').on('click', function () {
		if (mobileVerify()) {
			var code = $(this).siblings('.urio-sign-oper').find('.urio-sign-oper-input').val();
			if (!code) {
				$('#mobile-input-err').removeClass('desc-status').html('验证码输入有误，请重新输入！').fadeIn();
				return;
			}
			$('#mobile-input-err').html('认证成功！').fadeIn();
			var _this = $(this);
			var res =$(this).parent().parent().siblings('.urio-sign-group');
			setTimeout(function() {
				res.find('.oper-btn').html('修改');
				res.find('.status-btn').html('已认证');
				res.find('.urio-sign-txt').html($('#mobileInput').val());
				_this.parent().parent().slideUp();
				$('#mobile-input-err').fadeOut();
			}, 300);
		}
	})
}
function passWordVerify () {
	var pd1 = $('#old-pd-box').val();
	var pd2 = $('#new-pd-box').val();
	var pd3 = $('#new-pd-config').val();
	var reg = /^[a-zA-Z0-9]\w{7,15}$/;
	if (!pd1) {
		$('#pd-err').html('原密码输入有误，请重新输入！').fadeIn();
		return false;
	}
	if (!reg.test(pd2)) {
		$('#pd-err').html('新密码由6-16位个字符组成且不能还有特殊字符！').fadeIn();
		return false;
	}
	if (pd2 !== pd3) {
		$('#pd-err').html('新密码两次不一样，请重新输入！').fadeIn();
		return false;
	}
	return true;
}
function changePassword () {
	$('#affirm-pd-btn').on('click', function () {
		if (passWordVerify()) {
			$('#pd-err').html('修改成功！').fadeIn();
			var _this = $(this);
			setTimeout(function () {
				$('#pd-err').hide();
				_this.parent().siblings('.urio-sign-oper-box').slideUp();
			}, 500)
		}
	})
	$('#close-pd-btn').on('click', function () {
		$('#pd-err').hide();
		$(this).parent().parent().slideUp();
		$('#old-pd-box').val('');
		$('#new-pd-box').val('');
		$('#new-pd-config').val('');
	})
}
function inputFocus () {
	$('.urio-sign-oper-input').focus(function () {
		$(this).parent().addClass('in-focus');
		$(this).parent().parent().parent().siblings('.urio-sign-group').find('.urio-sign-error').hide().html('');
		var demo = $(this).parent().parent().parent().siblings('.urio-sign-group').find('#mobile-input-err');
		if (demo && demo.length > 0) {
			if (!mobileVerify()) {
				demo.addClass('desc-status').show().html('请输入11位手机号！');
			}
		}
	}).blur(function () {
		$(this).parent().removeClass('in-focus')
		var demo = $(this).parent().parent().parent().siblings('.urio-sign-group').find('#mobile-input-err');
		if (demo && demo.length > 0) {
			if (mobileVerify()) {
				demo.removeClass('desc-status').hide().html('');
			}
		}
	})
}
function changeAvatar () {
	$('#change-avatar-btn').on('click', function () {
		$('#change-user-avatar-win').fadeIn();
		vmCon('not-an');
	})
	$('.user-cpm-close-btn').on('click', function () {
		$('#change-user-avatar-win').fadeOut();
	})
}

function selectImg(file) {
  if (!file.files || !file.files[0]){
  	$('.select-img-btn').show();
  	$('.select-img-again').hide();
    $('.sureCut').removeClass('global-btn-styl');
    $('.circular-desc').html('当前头像');
    return;
  }
  if (file.files[0].type !== 'image/jpeg' && file.files[0].type !== 'image/png') {
  	$('.urio-avatar-desc').html('请上传JPG、PNG等格式的图片！')
  	return;
  }
  if (file.files[0].size > 2 * 1024 * 1024) {
  	$('.urio-avatar-desc').html('请上传小于2M的图片！')
  	return;
  }
  var reader = new FileReader();
  reader.onload = function (evt) {
    var replaceSrc = evt.target.result;
    $('#tailoringImg').cropper('replace', replaceSrc, false);
    $('.select-img-btn').hide();
    $('.select-img-again').show();
    $('.sureCut').addClass('global-btn-styl');
    $('.circular-desc').html('头像预览');
    $('.urio-avatar-desc').html('');
  }
  reader.readAsDataURL(file.files[0]);
}

function cropperImg () {
	$('#tailoringImg').cropper({
	  aspectRatio: 1/1,
	  preview: '.previewImg',
	  guides: false,
	  autoCropArea: 0.5,
	  movable: false,
	  dragCrop: true,
	  movable: true,
	  resizable: true,
	  zoomable: false,
	  mouseWheelZoom: false,
	  touchDragZoom: true,
	  rotatable: true,
	  crop: function(e) {
	    // console.log(e);
	  }
	});

	$("#sureCut").on("click",function () {
		if (!$(this).hasClass('global-btn-styl')) {
			return;
		}
		if ($("#tailoringImg").attr("src") == null ){
		  return false;
		} else {
		  var cas = $('#tailoringImg').cropper('getCroppedCanvas');
		  var base64url = cas.toDataURL('image/png');
		  $(".urio-avatar-img").prop("src", base64url);
		  $('.urio-avatar-desc').html('更新成功！')
		  setTimeout(function () {
		  	$('#change-user-avatar-win').fadeOut();
		  	$('.urio-avatar-desc').html('');
		  }, 1000)
		}
	});

	$(".select-img-again, .select-img-btn").on('click', function () {
		return $('#chooseImg').click();
	})

	var avatarSrc = $('.urio-avatar-img').attr('src');
	$('#finalImg').attr('src', avatarSrc);
}



$(function () {
	changeUserInfo();
	selectSex();
	$('.detection-urio-name').on('click', detectionUserName);
	changeSignInfo();
	getEmailCode();
	getMobileCode();
	submitEmail();
	submitMobile();
	changePassword();
	inputFocus();
	changeAvatar();
	cropperImg();
})