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
$(function () {
	changeUserInfo();
	selectSex();
	$('.detection-urio-name').on('click', detectionUserName);
})