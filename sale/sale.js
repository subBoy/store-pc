function judegHasKity (dom, num) {
	var len = dom.find('.sale-kity-box').length;
	console.log(len);
	if (!len || len < num) {
		dom.parent().hide();
		dom.parent().siblings('.sc-not-goods-wrapper').fadeIn();
	}
}
function delKity () {
	$('.sale-kity-del').on('click', function () {
		var thisPa = $(this).parent().parent().parent().parent();
		var thisPa1 = $(this).parent().parent().parent();
		console.log(thisPa);
		judegHasKity(thisPa, 2);
		thisPa1.fadeOut();
		setTimeout(function () {
			thisPa1.remove();
			judegHasKity(thisPa, 1);
		}, 500);
	})
}

$(function () {
	delKity();
})