function convert () {
	$('.cl-button-wrapper').on('click', function () {
		var thisVal = $('.sale-itl-code').val();
		console.log(thisVal);
		if (thisVal === '输入优惠券兑换码') {
			$('.convert-intergral-err').html('输入优惠券兑换码');
			setTimeout(function () {
				$('.convert-intergral-err').fadeIn();
			}, 30);
			return;
		}
		// 当兑换码无效时
		if (true) {
			$('.convert-intergral-err').html('很抱歉，兑换码无效，请检查并重新输入兑换码');
			setTimeout(function () {
				$('.convert-intergral-err').fadeIn();
			}, 30);
			return;
		}
		$('.convert-intergral-err').fadeOut();
		setTimeout(function () {
			$('.convert-intergral-err').html('');
		}, 30);
	})
}

$(function () {
	convert();
})