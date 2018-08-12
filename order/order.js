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

$(function () {
	operBtn();
	confirmCollection();
	delOrder();
})