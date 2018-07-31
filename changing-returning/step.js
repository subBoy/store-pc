var serverType = '0'; // '0' 退货 ;'1' 换货
function selType () {
	$('.cr-step-btn').on('click', function () {
		serverType = $(this).attr('serverType');
		$(this).addClass('seled').siblings('.cr-step-btn').removeClass('seled');
		if (serverType === '1') {
			$('#isReturnType').slideUp();
		} else {
			$('#isReturnType').slideDown();
		}
	})
}

function setIssue () {
	var timer;
	$('#cr-step-issue-box').on('keyup', function () {
		var _this = $(this);
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function () {
			var thisVal = _this.val();
			$('.cr-step-issue-font-num').html(thisVal.length + '/ 500');
			if (thisVal.length > 500) {
				$('.cr-step-info-err').fadeIn();
			} else {
				$('.cr-step-info-err').fadeOut();
			}
		}, 50);
	});
}

function telVerity () {
	$('#cr-post-data-btn').on('click', function () {
		var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
		var telVal = $('.cr-step-contact-input').val();
		var textVal = $('#cr-step-issue-box').val();
		if (textVal.length > 500) {
			$('.cr-step-info-err').fadeIn();
			var sTop = $('.cr-step-info-err').offset().top;
			$("html,body").animate({
				scrollTop: sTop - 110 + 'px'
			}, 500);
			return;
		}
		$('.cr-step-info-err').fadeOut();
		if (!reg.test(telVal)) {
			$('.cr-step-info-tel-err').fadeIn();
			var sTop = $('.cr-step-info-tel-err').offset().top;
			$("html,body").animate({
				scrollTop: sTop - 110 + 'px'
			}, 500);
			return;
		}
		$('.cr-step-info-tel-err').fadeOut();

		$('#submit-success-win').fadeIn();
		setTimeout(function () {
			autoHide();
		}, 50);
	})
	$('.cr-step-contact-input').focus(function () {
		$('.cr-step-info-tel-err').fadeOut();
	})
}

function autoHide () {
	var tNUum = 3;
	var sh;
	var to = function () {
		tNUum--;
		if (tNUum < 0) {
			tNUum = 0;
			$('.cr-step-win-time').html(tNUum);
			clearInterval(sh);
			location.href="../user-center/user-center.html";
			$('#submit-success-win').fadeOut();
		}
		$('.cr-step-win-time').html(tNUum);
	}
	sh = setInterval(to, 1000);
}

$(function () {
	selType();
	setIssue();
	telVerity();
})