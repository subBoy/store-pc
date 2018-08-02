var serverType = '0'; // '0' 退货 ;'1' 换货
function selType () {
	$('.sel-server-type-btn').on('click', function () {
		serverType = $(this).attr('serverType');
		$(this).addClass('seled').siblings('.sel-server-type-btn').removeClass('seled');
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
	$('#look-my-submit').find('.look-big-img-btn').on('click', function () {
		$('#look-big-img-win').fadeIn();
		goToSlide(0);
	})
	$('#look-my-submit').find('.up-load-small-img').on('click', function () {
		var idx = $(this).index();
		$('#look-big-img-win').fadeIn();
		goToSlide(idx);
	})
	$('#step-3-reject').find('.look-big-img-btn').on('click', function () {
		$('#reject-big-img-win').fadeIn();
		goToSlide2(0);
	})
	$('#step-3-reject').find('.up-load-small-img').on('click', function () {
		var idx = $(this).index();
		$('#reject-big-img-win').fadeIn();
		goToSlide2(idx);
	})
	$('.win-close-btn').on('click', function () {
		$('#look-big-img-win, #reject-big-img-win').fadeOut();
	})
}

var cutNav = {
	node: $('body'),
	len: 0,
	idx: 0,
	_h: 750,
	basics: function (node, bool) {
		cutNav.node = node;
		cutNav.len = cutNav.node.find('.big-img-list').find('.big-img-item').length;
		cutNav.btnStatus();
		var _h = 750;
		if (bool) {
			cutNav.node.find('.big-img-list').css({
				left: '-' + cutNav.idx * cutNav._h + 'px'
			});
		}
		cutNav.node.find('.big-img-list').animate({
			left: '-' + cutNav.idx * cutNav._h + 'px'
		}, 500);
	},
	initStatus: function () {
		var _h = 750;
		cutNav.node.find('.big-img-list').animate({
			'width': cutNav.len * cutNav._h + 'px'
		});
	},
	prev: function (node) {
		cutNav.idx--;
		if (cutNav.idx <= 0) {
			cutNav.idx = 0;
		}
		cutNav.basics(node);
	},
	next: function (node) {
		cutNav.idx++;
		if (cutNav.idx >= cutNav.len - 1) {
			cutNav.idx = cutNav.len - 1;
		}
		cutNav.basics(node);
	},
	btnStatus: function () {
		var curIdx = '0' + (cutNav.idx - 0 + 1);
		var zIdx = '0' + cutNav.len;
		cutNav.node.find('.curent-index-num').html(curIdx + '/' + zIdx);
		cutNav.node.find('.big-img-prev, .big-img-next').addClass('has-more');
		if (cutNav.idx <= 0) {
			cutNav.node.find('.big-img-prev, .big-img-next').removeClass('has-more');
			if (cutNav.len > 1) {
				cutNav.node.find('.big-img-next').addClass('has-more');
			}
		}
		if (cutNav.idx >= cutNav.len - 1) {
			cutNav.node.find('.big-img-prev, .big-img-next').removeClass('has-more');
			if (cutNav.len > 1) {
				cutNav.node.find('.big-img-prev').addClass('has-more');
			}
		}
	}
};
function cutImgNav () {
	// 切换索引图
	$('#look-big-img-win').find('.big-img-prev').on('click', function () {
		cutNav.prev($('#look-big-img-win'));
	});
	$('#look-big-img-win').find('.big-img-next').on('click', function () {
		cutNav.next($('#look-big-img-win'));
	});
	cutNav.basics($('#look-big-img-win'));
	cutNav.initStatus();
}

function goToSlide (num) {
	cutNav.idx = num;
	cutNav.basics($('#look-big-img-win'), true);
	cutNav.initStatus();
}

function cutImgNav2 () {
	// 切换驳回索引图
	$('#reject-big-img-win').find('.big-img-prev').on('click', function () {
		cutNav.prev($('#reject-big-img-win'));
	});
	$('#reject-big-img-win').find('.big-img-next').on('click', function () {
		cutNav.next($('#reject-big-img-win'));
	});
	cutNav.basics($('#reject-big-img-win'));
	cutNav.initStatus();
}

function goToSlide2 (num) {
	cutNav.idx = num;
	cutNav.basics($('#reject-big-img-win'), true);
	cutNav.initStatus();
}
$(function () {
	selType();
	setIssue();
	telVerity();
	lookBigImg();
	cutImgNav();
	cutImgNav2();
})