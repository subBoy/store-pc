function operBtn () {
	var ceorItem = $('.ceor-item');
	ceorItem.each(function () {
		var itemStep = $(this).attr('step');
		var ceorImio = $(this).find('.ceor-imio-oper');
		ceorImio.each(function () {
			var imioStep = $(this).attr('step');
			if (imioStep === itemStep) {
				$(this).show();
			}
		})
	})
}

function confirmCollection () {
	$('.ceor-imio-oper-btn').on('click', function () {
		$('.gd-win-wrapper').show();
		$('.reserve-success-win').fadeIn();
		autoHide();
		var _this = $(this);
		var thisPar = _this.parent();
		var hrefBox = _this.parent().parent().parent().parent().find('.ceor-detail');
		var _href = hrefBox.attr('href');
		_href = _href.substr(0, _href.length - 1) + '4';
		hrefBox.attr('href', _href);
		thisPar.siblings('.ceor-imio-oper').each(function () {
			var imioStep = $(this).attr('step');
			if (imioStep === '4') {
				thisPar.hide();
				$(this).fadeIn();
			}
		})
	})
	$('.order-wuliu').on('click', function () {
		$('.gd-win-wrapper').show();
		$('.look-logistics-win').fadeIn();
	})
	$('.gd-win-close-btn').on('click', function () {
		$('.gd-win-wrapper').fadeOut();
		$('.look-logistics-win').hide();
		$('.reserve-success-win').hide();
	})
}

function delOrder () {
	$('.ceor-imio-oper-delbtn').on('click', function () {
		var thisPar = $(this).parent().parent().parent().parent();
		if (thisPar.siblings('.ceor-item').length === 0) {
			thisPar.parent().parent().hide();
			thisPar.parent().parent().siblings('.sc-not-goods-wrapper').fadeIn();
		}
		thisPar.slideUp();
		setTimeout(function () {
			thisPar.remove();
		}, 300)
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

$(function () {
	operBtn();
	confirmCollection();
	delOrder();
})