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
		console.log(0);
		var _this = $(this);
		var thisPar = _this.parent();
		thisPar.siblings('.ceor-imio-oper').each(function () {
			var imioStep = $(this).attr('step');
			if (imioStep === '6') {
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