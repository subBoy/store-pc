function selSp () {
	// 商品收藏
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
	// 设计师收藏
	$(".collect-der-singer .sp-select-input").change(function() { 
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('checked-item');
		} else {
			$(this).parent().removeClass('checked-item');
			$('.collect-der-singer .sc-all-sel-input').prop('checked', false).change();
			$('.collect-der-singer .sc-all-sel-input').parent().removeClass('checked-item')
		}
	});
	$('.collect-der-singer .sc-all-sel-input').on('click', function () {
		var status = $(this).is(':checked');
		console.log(status);
		if (status) {
			$(this).parent().addClass('checked-item');
			$(".collect-der-singer .sp-select-input").prop('checked', 'checked').change();
		} else {
			$(this).parent().removeClass('checked-item');
			$(".collect-der-singer .sp-select-input").prop('checked', false).change();
		}
	});
}
function delSel () {
	$('.collect-gooods .sc-all-del-btn').on('click', function () {
		$.each($('.collect-gooods .sp-select-input'), function () {
	    if(this.checked){
	    	$(this).parent().parent().parent().parent().remove();
	    	showNotGoods();
	    }
	  });
	})
	$('.collect-der-singer .sc-all-del-btn').on('click', function () {
		$.each($('.collect-der-singer .sp-select-input'), function () {
	    if(this.checked){
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
		selSp(); // 选择商品
		delSel(); // 删除已选商品
	}

	var len2 = $('.collect-der-singer .sc-goods-list').length;
	if (!len2 || len2 < 0) {
		$('.collect-der-singer .sc-has-goods-wrapper').hide();
		$('.collect-der-singer .sc-not-goods-wrapper').fadeIn();
	} else {
		$('.collect-der-singer .sc-has-goods-wrapper').fadeIn();
		$('.collect-der-singer .sc-not-goods-wrapper').hide();
		selSp(); // 选择商品
		delSel(); // 删除已选商品
	}
}
$(function () {
	showNotGoods(); // 是否有商品显示
})