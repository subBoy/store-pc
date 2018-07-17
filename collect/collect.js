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
	});
	$('.sc-all-sel-input').on('click', function () {
		var status = $(this).is(':checked');
		console.log(status);
		if (status) {
			$(this).parent().addClass('checked-item');
			$(".sp-select-input").prop('checked', 'checked').change();
		} else {
			$(this).parent().removeClass('checked-item');
			$(".sp-select-input").prop('checked', false).change();
		}
	});
}
function delSel () {
	$('.sc-all-del-btn').on('click', function () {
		$.each($('.sp-select-input'), function () {
	    if(this.checked){
	    	$(this).parent().parent().parent().parent().remove();
	    	showNotGoods();
	    }
	  });
	})
}
function showNotGoods () {
	var len = $('.sc-goods-list').length;
	if (!len || len < 0) {
		$('.sc-has-goods-wrapper').fadeOut();
		$('.sc-not-goods-wrapper').fadeIn();
	} else {
		$('.sc-has-goods-wrapper').fadeIn();
		$('.sc-not-goods-wrapper').fadeOut();
	}
}
$(function () {
	selSp(); // 选择商品
	delSel(); // 删除已选商品
	showNotGoods(); // 是否有商品显示
})