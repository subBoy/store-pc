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

function lookBigImg () {
	$('.look-big-img-btn').on('click', function () {
		$('#look-big-img-win').fadeIn();
	})
	$('.win-close-btn').on('click', function () {
		$('#look-big-img-win').fadeOut();
	})
}

var cutNav = {
	len: $('.big-img-list').find('.big-img-item').length,
	idx: 0,
	_h: 750,
	basics: function () {
		cutNav.btnStatus();
		var _h = 750;
		$(".big-img-list").animate({
			left: '-' + cutNav.idx * cutNav._h + 'px'
		}, 500);
	},
	initStatus: function () {
		var _h = 750;
		$(".big-img-list").animate({
			'width': cutNav.len * cutNav._h + 'px'
		});
	},
	prev: function () {
		cutNav.idx--;
		if (cutNav.idx <= 0) {
			cutNav.idx = 0;
		}
		cutNav.basics();
	},
	next: function () {
		cutNav.idx++;
		if (cutNav.idx >= cutNav.len - 1) {
			cutNav.idx = cutNav.len - 1;
		}
		cutNav.basics();
	},
	btnStatus: function () {
		var curIdx = '0' + (cutNav.idx - 0 + 1);
		var zIdx = '0' + cutNav.len;
		$('.curent-index-num').html(curIdx + '/' + zIdx);
		$('.big-img-prev, .big-img-next').addClass('has-more');
		if (cutNav.idx <= 0) {
			$('.big-img-prev, .big-img-next').removeClass('has-more');
			if (cutNav.len > 1) {
				$('.big-img-next').addClass('has-more');
			}
		}
		if (cutNav.idx >= cutNav.len - 1) {
			$('.big-img-prev, .big-img-next').removeClass('has-more');
			if (cutNav.len > 1) {
				$('.big-img-prev').addClass('has-more');
			}
		}
	}
};
function cutImgNav () {
	// 切换索引图
	$('.big-img-prev').on('click', cutNav.prev);
	$('.big-img-next').on('click', cutNav.next);
	var hr;
	cutNav.basics();
	cutNav.initStatus();
}

function goToSlide (num) {
	cutNav.idx = num;
	cutNav.basics();
	cutNav.initStatus();
}

$(function () {
	selType();
	setIssue();
	telVerity();
	lookBigImg();
	cutImgNav();
	goToSlide(3);
})