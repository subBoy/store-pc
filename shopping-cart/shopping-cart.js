function selSp () {
	$(".sp-select-input").change(function() { 
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('checked-item');
		} else {
			$(this).parent().removeClass('checked-item');
			$('.sc-all-sel-input').prop('checked', false).change();
			$('.sc-all-sel-input').parent().removeClass('checked-item')
		}
		allSel();
	});
	$('.sc-all-sel-input').on('click', function () {
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('checked-item');
			$(".sp-select-input").prop('checked', 'checked').change();
		} else {
			$(this).parent().removeClass('checked-item');
			$(".sp-select-input").prop('checked', false).change();
		}
		allSel();
	});
}
function allSel () {
	var len = 0;
	var price = 0;
	$.each($('.sp-select-input'), function () {
    if(this.checked){
    	var numInput = $(this).parent().parent().parent().siblings('.sc-goods-item').find('.reserve-goods-input');
    	var priceInput = $(this).parent().parent().parent().siblings('.sc-goods-item').find('.preice-num');
    	var _len = numInput.val() - 0;
    	var _price = priceInput.text() - 0;
    	len = len + _len;
    	price = _len * _price + price;
    }
  });
  var totalPrice = price.toFixed(2);
	$('.sel-num').html(len);
	$('.total-price-num').html('￥' + totalPrice);
}
function delOne () {
	$('.del-btn').on('click', function () {
		$(this).parent().remove();
		allSel();
		showNotGoods();
	})
}
function delSel () {
	$('.sc-all-del-btn').on('click', function () {
		$.each($('.sp-select-input'), function () {
	    if(this.checked){
	    	$(this).parent().parent().parent().parent().remove();
	    	allSel();
	    	showNotGoods();
	    }
	  });
	})
}
function showNotGoods () {
	var len = $('.sc-goods-list').length;
	console.log(len);
	if (!len || len < 0) {
		$('.sc-has-goods-wrapper').hide();
		$('.sc-not-goods-wrapper').fadeIn();
	} else {
		$('.sc-has-goods-wrapper').fadeIn();
		$('.sc-not-goods-wrapper').hide();
	}
}
$(function () {
	selSp(); // 选择商品
	delOne(); // 删除单个商品
	delSel(); // 删除已选商品
	showNotGoods(); // 是否有商品显示
	globalInputNum(allSel);// 数量控制 /util/util.js
})