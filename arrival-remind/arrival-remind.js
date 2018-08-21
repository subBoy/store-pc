function selSp () {
	$(".oos-wrapper .sp-select-input").change(function() { 
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('checked-item');
		} else {
			$(this).parent().removeClass('checked-item');
			$('.oos-wrapper .sc-all-sel-input').prop('checked', false).change();
			$('.oos-wrapper .sc-all-sel-input').parent().removeClass('checked-item')
		}
	});
	$('.oos-wrapper .sc-all-sel-input').on('click', function () {
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('checked-item');
			$(".oos-wrapper .sp-select-input").prop('checked', 'checked').change();
		} else {
			$(this).parent().removeClass('checked-item');
			$(".oos-wrapper .sp-select-input").prop('checked', false).change();
		}
	});

	$(".crNewSp-wrapper .sp-select-input").change(function() { 
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('checked-item');
		} else {
			$(this).parent().removeClass('checked-item');
			$('.crNewSp-wrapper .sc-all-sel-input').prop('checked', false).change();
			$('.crNewSp-wrapper .sc-all-sel-input').parent().removeClass('checked-item')
		}
	});
	$('.crNewSp-wrapper .sc-all-sel-input').on('click', function () {
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('checked-item');
			$(".crNewSp-wrapper .sp-select-input").prop('checked', 'checked').change();
		} else {
			$(this).parent().removeClass('checked-item');
			$(".crNewSp-wrapper .sp-select-input").prop('checked', false).change();
		}
	});
}
function delSel () {
	$('.oos-wrapper .sc-all-del-btn').on('click', function () {
		$.each($('.oos-wrapper .sp-select-input'), function () {
	    if($(this).is(':checked')){
	    	$(this).parent().parent().parent().parent().remove();
	    	showNotGoods();
	    }
	  });
	})

	$('.crNewSp-wrapper .sc-all-del-btn').on('click', function () {
		$.each($('.crNewSp-wrapper .sp-select-input'), function () {
	    if($(this).is(':checked')){
	    	$(this).parent().parent().parent().parent().remove();
	    	showNotGoods();
	    }
	  });
	})
}
function showNotGoods () {
	var len = $('.oos-wrapper .sc-goods-list').length;
	console.log(len);
	if (!len || len < 1) {
		$('.oos-wrapper .sc-has-goods-wrapper').hide();
		$('.oos-wrapper .sc-not-goods-wrapper').fadeIn();
	} else {
		$('.oos-wrapper .sc-has-goods-wrapper').fadeIn();
		$('.oos-wrapper .sc-not-goods-wrapper').hide();
	}

	var len1 = $('.crNewSp-wrapper .sc-goods-list').length;
	if (!len1 || len1 < 1) {
		$('.crNewSp-wrapper .sc-has-goods-wrapper').hide();
		$('.crNewSp-wrapper .sc-not-goods-wrapper').fadeIn();
	} else {
		$('.crNewSp-wrapper .sc-has-goods-wrapper').fadeIn();
		$('.crNewSp-wrapper .sc-not-goods-wrapper').hide();
	}
}
$(function () {
	showNotGoods();
	selSp();
	delSel();
})