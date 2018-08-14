function selSp () {
	$(".collect-gooods .sp-select-input").change(function() { 
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('checked-item');
		} else {
			$(this).parent().removeClass('checked-item');
			$('.collect-gooods .sc-all-sel-input').prop('checked', false).change();
			$('.collect-gooods .sc-all-sel-input').parent().removeClass('checked-item')
		}
	});
	$('.collect-gooods .sc-all-sel-input').on('click', function () {
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('checked-item');
			$(".collect-gooods .sp-select-input").prop('checked', 'checked').change();
		} else {
			$(this).parent().removeClass('checked-item');
			$(".collect-gooods .sp-select-input").prop('checked', false).change();
		}
	});
}
function delSel () {
	$('.collect-gooods .sc-all-del-btn').on('click', function () {
		$.each($('.collect-gooods .sp-select-input'), function () {
	    if($(this).is(':checked')){
	    	$(this).parent().parent().parent().parent().remove();
	    	showNotGoods();
	    }
	  });
	})
}
function showNotGoods () {
	var len = $('.collect-gooods .sc-goods-list').length;
	if (!len || len < 0) {
		$('.collect-gooods .sc-has-goods-wrapper').hide();
		$('.collect-gooods .sc-not-goods-wrapper').fadeIn();
	} else {
		$('.collect-gooods .sc-has-goods-wrapper').fadeIn();
		$('.collect-gooods .sc-not-goods-wrapper').hide();
	}

}
$(function () {
	showNotGoods();
	selSp();
	delSel();
})