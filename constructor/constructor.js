function selectColor (control, view) {
	// 选择颜色
	var control = $(control);
	control.on('click', function () {
		$(this).addClass('colorSel').siblings().removeClass('colorSel');
		var colorName = $(this).attr('colorname');
		control.parent().siblings(view).html(colorName)
	})
}
function selectSize (control, view, sizeItem) {
	// 选择尺码
	var view1 = $(view);
	var sizeItem1 = view1.siblings(control).children().find(sizeItem);
	view1.on('click', function (e) {
		e.stopPropagation();
		var control1 = $(this).siblings(control);
		$(this).addClass('is-show');
		control1.slideDown();
	});
	sizeItem1.on('click', function () {
		var view2 = $(this).parent().parent().siblings(view).find('.size-view-num');
		var _val = $(this).html();
		view2.html(':' + _val);
		$('.add-goods-btn').find('.add-goods-err').fadeOut();
		$(this).parent().parent().slideUp();
	});
}
function outOfStore () {
	// 新设计单品预定
	$('.cr-new-pt-btn').on('click', function (){
		$('.gd-win-wrapper').show();
		$('.store-reserve-win').fadeIn();
	})
	$('.gd-win-close-btn').on('click', function () {
		$('.gd-win-wrapper, .store-reserve-win, .reserve-success-win').fadeOut();
	})
	selectColor('.reserve-win-goods-color-ctr', '.reserve-win-goods-color-name');
	globalInputNum();
	selInformStyle();
}
function selInformStyle () {
	// 选择通知方式
	$('.inform-style-btn-input').change(function () {
		$('.inform-style-btn').removeClass('selected');
		$(this).parent().addClass('selected');
	})
}
function collectGoods () {
	// 收藏操作
	$('.collect-btn').on('click', function () {
		if ($(this).hasClass('collected')) {
			$(this).html('收藏');
			$(this).removeClass('collected');
		} else {
			$(this).html('已收藏')
			$(this).addClass('collected');
		}
	})
}
function spItemSH () {
	// 切换商品
	$('.gl-ct-series-ctr .series-ctr').on('click', function () {
		var _index = $(this).index();
		var _li = $(this).parent().parent().find('.gl-ct-item-list .gl-ct-series-item');
		_li.hide();
		_li.eq(_index).fadeIn();
	})
}
function vmCon () {
	var _h = $('.cr-info-vm').height();
	$('.cr-info-vm').animate({
		'margin-top': '-' + _h / 2 + 'px'
	}, 500)
}
$(function () {
	spItemSH();
	selectColor('.goods-color-item', '.goods-color-name');
	selectSize('.goods-size-list', '.goods-size-view', '.goods-size-item-num')
	outOfStore();
	collectGoods();
	vmCon();
})