function checkedItem () {
	$(".global-select-input").change(function() {
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('checked-item');
		} else {
			$(this).parent().removeClass('checked-item');
			var _thisPar = $(this).parent().parent().parent().parent().find('.global-all-select-input');
			_thisPar.prop('checked', false).change();
			_thisPar.parent().removeClass('checked-item')
		}
	});
	$('.global-all-select-input').on('click', function () {
		var status = $(this).is(':checked');
		var _thisPar = $(this).parent().parent().parent().siblings('.gl-condition-item-threelevel').find('.global-select-input');
		if (status) {
			$(this).parent().addClass('checked-item');
			_thisPar.prop('checked', 'checked').change();
		} else {
			$(this).parent().removeClass('checked-item');
			_thisPar.prop('checked', false).change();
		}
	});
}
function range () {
	var _w = $('.gl-ct-side-item').width() - 15;
	var _val = $('.slider-range-input').val();
	var fromVal = _val.split(',')[0];
	var toVal = _val.split(',')[1];
	var rangeVal = fromVal + '-' + toVal;
	$('.slider-range-val').html(rangeVal);
	$('.slider-range-input').jRange({ 
    from: fromVal, 
    to: toVal, 
    step: 100, 
    // scale: [220, 2200], 
    format: '%s', 
    width: _w, 
    showLabels: false, 
    showScale: false,
    isRange: true
	});
	$('.slider-range-input').on('change', rangeInit);
}
function rangeInit () {
	var _val = $('.slider-range-input').val();
	var fromVal = _val.split(',')[0];
	var toVal = _val.split(',')[1];
	var rangeVal = fromVal + '-' + toVal;
	$('.slider-range-val').html(rangeVal);
}
function slideSH () {
	$('.gl-item-stair-name, .gl-item-secondleve-name').on('click', function () {
		var _par = $(this).siblings('.gl-condition-list-secondlevel');
		var _threePar = $(this).siblings('.gl-condition-list-threelevel');
		if ($(this).hasClass('isShow')) {
			$(this).removeClass('isShow');
			_par.slideUp();
			_threePar.slideUp();
		} else {
			$(this).addClass('isShow');
			_par.slideDown();
			_threePar.slideDown();
		}
	})
}
function spItemSH () {
	$('.gl-ct-series-ctr .series-ctr').on('click', function () {
		var _index = $(this).index();
		var _li = $(this).parent().parent().find('.gl-ct-item-list .gl-ct-series-item');
		_li.hide();
		_li.eq(_index).fadeIn();
	})
	$('.gl-ct-tle-view').on('click', function (e) {
		e.stopPropagation();
		$('.gl-ct-tle-list').slideDown();
		$('.gl-sort-styles').slideUp();
		$(this).addClass('isShow');
	})

	// 排序
	$('.gl-sort-view').on('click', function (e) {
		e.stopPropagation();
		$('.gl-sort-styles').slideDown();
		$('.gl-ct-tle-list').slideUp();
		$(this).addClass('isShow');
	})
	$('.gl-sort-item').on('click', function () {
		var _val = $(this).html();
		$('.gl-sort-view').html(_val);
		$('.gl-sort-styles').slideUp();
		$('.gl-sort-view').removeClass('isShow');
	})
}
function manWoman () {
	var gl_index = $('#nav-item-index').val();
	var _html = '';
	var _htmlct = '';
	if (gl_index == 1) {
		_html = "MAN'S";
		_htmlct = '<li class="gl-ct-tle-item"><span class="gl-tle-item-txt">MAN\'S</span> / 男士</li><li class="gl-ct-tle-item"><span class="gl-tle-item-txt">WOMAN\'S</span> / 女士</li>';
	} else {
		_html = "WOMAN'S";
		_htmlct = '<li class="gl-ct-tle-item"><span class="gl-tle-item-txt">WOMAN\'S</span> / 女士</li><li class="gl-ct-tle-item"><span class="gl-tle-item-txt">MAN\'S</span> / 男士</li>';
	}
	$('.gl-ct-tle-view').html(_html);
	$('.gl-ct-tle-list').html(_htmlct);
	$('.gl-ct-tle-item').on('click', function () {
		var _val = $(this).find('.gl-tle-item-txt').html();
		$('.gl-ct-tle-view').html(_val);
		if (_val === "MAN'S") {
			$('#nav-item-index').val(1);
		}
		if (_val === "WOMAN'S") {
			$('#nav-item-index').val(2);
		}
		navHighlight();
		$('.gl-ct-tle-list').slideUp();
		$('.gl-ct-tle-view').removeClass('isShow');
		manWoman();
	})
}
function mwInit () {
	var cmd = GetQueryString('cmd');
	if (cmd === 'woman') {
		$('#nav-item-index').val(2);
	} else {
		$('#nav-item-index').val(1);
	}
	manWoman();
	navHighlight();
}
$(function () {
	range(); // 价格区间
	slideSH(); // 侧边显隐
	spItemSH(); // 切换商品
	mwInit(); //切换男女装
	checkedItem(); // 复选框状态改变处理
	var hr;
	$(window).resize(function () {
		clearTimeout(hr);
		hr = setTimeout(function () {
			window.location.reload();
		}, 500);
	})
})