function hideWin () {
	$('.user-cpm-wrapper').fadeOut();
	$('.user-cpm-error').html('').fadeOut();
	$('#add-user-address-win').find('.as-us-name').val('');
	$('#add-user-address-win').find('.as-shen').html('请选择地区、省份');
	$('#add-user-address-win').find('.as-shi').html('请选择城市');
	$('#add-user-address-win').find('.as-xian').html('请选择区');
	$('#add-user-address-win').find('.as-jiedao').val('');
	$('#add-user-address-win').find('.as-youbian').val('');
	$('#add-user-address-win').find('.as-tel').val('');
}
var cgOrAdd = false;
function showWin (str) {
	if (str === 'add') {
		$('#add-user-address-win').fadeIn();
		vmCon('not-an');
		cgOrAdd = false;
		return;
	}
	if (str === 'change') {
		$('#change-user-address-win').fadeIn();
		vmCon('not-an');
		cgOrAdd = true;
		return;
	}
}
var changeIndex = 0;
function setAddress () {
	$('.add-address-btn-ctr').on('click', function () {
		showWin('add');
	});
	$('.cg-btn').on('click', function () {
		changeIndex = $(this).parent().parent().parent().parent().parent().index();
		showWin('change');
	})
	$('.set-default-address-btn, .default-address-btn').on('click', function () {
		$('.default-address-btn').addClass('set-default-address-btn').removeClass('default-address-btn');
		$(this).addClass('default-address-btn').removeClass('set-default-address-btn');
		setTimeout(function () {
			vmCon();
		}, 500)
	})
	$('.del-btn').on('click', function () {
		var _box = $(this).parent().parent().parent().parent().parent();
		_box.slideUp();
		var len = $('.user-address-info').length;
		if (len < 2) {
			$('.has-address-wrapper').hide();
			$('.not-address-wrapper').fadeIn();
		}
		setTimeout(function () {
			_box.remove();
			var len = $('.user-address-info').length;
			if (len < 1) {
				$('.has-address-wrapper').hide();
				$('.not-address-wrapper').fadeIn();
			}
		}, 500)
	})
}
function selTrigeminy () {
	$('.trigeminy-address-view').on('click', function (e) {
		e.stopPropagation();
		$('.trigeminy-address-list').hide();
		$(this).siblings('.trigeminy-address-list').slideDown();
	})
	$('.trigeminy-address-item').on('click', function () {
		var thisPs = $(this).parent().siblings('.trigeminy-address-view');
		var thisGe = thisPs.attr('grade');
		$('.trigeminy-address-list').slideUp();
		if ($(this).hasClass('air-item')) {
			if (thisGe === '1') {
				thisPs.html('请选择地区、省份');
				return;
			}
			if (thisGe === '2') {
				thisPs.html('请选择城市');
				return;
			}
			if (thisGe === '3') {
				thisPs.html('请选择区');
				return;
			}
			return;
		}
		var _val = $(this).html();
		thisPs.html(_val);
		$('.user-cpm-error').html('').fadeOut();
	})
	$('.set-dt-checkbox').change(function () {
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('selected');
		} else {
			$(this).parent().removeClass('selected');
		}
	})
	$('.user-cpm-input-ctr').focus(function () {
		$('.user-cpm-error').html('').fadeOut();
	})
}
var fromData = {};
function getFromData (str) {
	fromData = {};
	var _this = $(str);
	fromData.name = _this.find('.as-us-name').val();
	fromData.asShen = _this.find('.as-shen').html();
	fromData.asShi = _this.find('.as-shi').html();
	fromData.asXian = _this.find('.as-xian').html();
	fromData.asJiedao = _this.find('.as-jiedao').val();
	fromData.asYoubian = _this.find('.as-youbian').val();
	fromData.asTel = _this.find('.as-tel').val();
	fromData.asDefault = _this.find('.set-dt-checkbox').is(':checked');
	if (!fromData.name) {
		_this.find('.user-cpm-error').html('请输入收货人姓名！').fadeIn();
		return false;
	}
	if (fromData.asShen.indexOf('请选择') !== -1 || fromData.asShi.indexOf('请选择') !== -1 || fromData.asXian.indexOf('请选择') !== -1) {
		_this.find('.user-cpm-error').html('请选择地址！').fadeIn();
		return false;
	}
	if (!fromData.asJiedao) {
		_this.find('.user-cpm-error').html('请输入街道地址！').fadeIn();
		return false;
	}
	if (!fromData.asTel) {
		_this.find('.user-cpm-error').html('请输入手机号/电话！').fadeIn();
		return false;
	}
	_this.find('.user-cpm-error').html('').fadeOut();
	return true;
}
function renderFc () {
	var youbian = '--';
	if (fromData.asYoubian) {
		youbian = fromData.asYoubian
	}
	var len = fromData.asTel.length;
	var ipNum = fromData.asTel.substr(0, 3) + '****' + fromData.asTel.substr(len - 4, len);
	var clsNe = 'set-default-address-btn';
	if (fromData.asDefault) {
		clsNe = 'default-address-btn';
		$('.default-address-btn').addClass('set-default-address-btn').removeClass('default-address-btn');
	}

	var xml = '<ul class="uras-info-list">'+
			'<li class="uras-info-item wd-li-1">'+
				'<div class="uras-info-view cr-info-vm">'+
					'<span class="io-vw in-block">' + fromData.name + '</span>'+
				'</div>'+
			'</li>'+
			'<li class="uras-info-item wd-li-2">'+
				'<div class="uras-info-view cr-info-vm">'+
					'<div class="uras-io-vw">'+
						'<span class="in-block">' + fromData.asShen + '</span>'+
						'<span class="in-block">' + fromData.asShi + '</span>'+
						'<span class="in-block">' + fromData.asXian + '</span>'+
					'</div>'+
				'</div>'+
			'</li>'+
			'<li class="uras-info-item wd-li-3">'+
				'<div class="uras-info-view cr-info-vm">'+
					'<span class="io-vw in-block">' + fromData.asJiedao + '</span>'+
				'</div>'+
			'</li>'+
			'<li class="uras-info-item wd-li-4">'+
				'<div class="uras-info-view cr-info-vm">'+
					'<span class="io-vw in-block">' + youbian + '</span>'+
				'</div>'+
			'</li>'+
			'<li class="uras-info-item wd-li-5">'+
				'<div class="uras-info-view cr-info-vm">'+
				'<span class="io-vw in-block">' + ipNum + '</span>'+
			'</div>'+
			'</li>'+
			'<li class="uras-info-item wd-li-6">'+
				'<div class="uras-info-view cr-info-vm">'+
					'<div class="uras-info-item-btns">'+
						'<span class="uras-info-item-btn cg-btn in-block">修改</span>'+
						'<span class="uras-info-item-btn del-btn in-block">删除</span>'+
					'</div>'+
					'<span class="' + clsNe + ' in-block">默认地址</span>'+
				'</div>'+
			'</li>'+
		'</ul>';

	if (cgOrAdd) {
		$('.user-address-info').eq(changeIndex).html(xml);
	} else {
		var html = '<div class="user-address-info">' + xml + '</div>';
		$(".user-address-wrapper").prepend(html);
		$('.not-address-wrapper').hide();
		$('.has-address-wrapper').fadeIn();
	}
	vmCon();
	setAddress();
	hideWin();
}
function submitFc () {
	// 修改保存
	$('.submit-cg-btn').on('click', function () {
		// 保存到数据库操作
		if(getFromData('#change-user-address-win')) {
			renderFc();
		}
	})
	// 新增保存
	$('.submit-add-btn').on('click', function () {
		// 保存到数据库操作
		if(getFromData('#add-user-address-win')) {
			renderFc();
		}
	})
}
$(function () {
	$('.user-cpm-close-btn, .close-cg-btn').on('click', hideWin);
	setAddress();
	selTrigeminy();
	submitFc();
})