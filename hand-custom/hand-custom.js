function setHdNav () {
	var url = location.href;
	var id = url.split('#')[1];
	if (id === 'reflectShop') {
		$('#nav-item-index').val(4);
	} else {
		$('#nav-item-index').val(3);
	}
	navHighlight();
	var targetId = $('.' + id);
	if (id && targetId.length) {
		var sTop = targetId.offset().top;
		$("html,body").animate({
			scrollTop: sTop - 110 - status + 'px'
		}, 500);
	}
}
function curdentPage () {
	$('.nav-item-link').on('click', function () {
		var itemidx = $(this).attr('itemidx');
		if (itemidx === '4') {
			$('#nav-item-index').val(4);
			navHighlight();
			var sTop = $('.reflectShop').offset().top;
			$("html,body").animate({
				scrollTop: sTop - 110 - status + 'px'
			}, 500);
			return;
		}
		if (itemidx === '3') {
			$('#nav-item-index').val(3);
			navHighlight();
			$("html,body").animate({
				scrollTop: 0 + 'px'
			}, 500);
			return;
		}
	})
}

var cutNav = {
	len: $('.hcpt-slide-ctr').find('.hcpt-slide').length,
	idx: 0,
	basics: function () {
		cutNav.btnStatus();
		var _h = $('.hcpt-slide-wrapper').width();
		var boxlen = Math.ceil(cutNav.len / 5);
		$(".hcpt-slide-ctr").animate({
			'width': boxlen * _h + 'px'
		});
		$(".hcpt-slide").animate({
			'width': _h / 5 + 'px'
		});
		$(".hcpt-slide-ctr").animate({
			left: '-' + cutNav.idx * _h + 'px'
		}, 500);
	},
	prev: function () {
		cutNav.idx--;
		if (cutNav.idx <= 0) {
			cutNav.idx = 0;
		}
		cutNav.basics();
	},
	next: function () {
		var _len = Math.ceil(cutNav.len / 5) - 1;
		cutNav.idx++;
		if (cutNav.idx >= _len) {
			cutNav.idx = _len;
		}
		cutNav.basics();
	},
	btnStatus: function () {
		$('.img-prev-btn, .img-next-btn').addClass('has-more');
		var _len = Math.ceil(cutNav.len / 5) - 1;
		if (cutNav.idx <= 0) {
			$('.img-prev-btn, .img-next-btn').removeClass('has-more');
			if (_len > 0) {
				$('.img-next-btn').addClass('has-more');
			}
		}
		if (cutNav.idx >= _len) {
			$('.img-prev-btn, .img-next-btn').removeClass('has-more');
			if (_len > 0) {
				$('.img-prev-btn').addClass('has-more');
			}
		}
	}
};
function cutImgNav () {
	// 切换索引图
	$('.img-prev-btn').on('click', cutNav.prev);
	$('.img-next-btn').on('click', cutNav.next);
	var hr;
	cutNav.basics();
	$(window).resize(function () {
		clearTimeout(hr);
		hr = setTimeout(function () {
			cutNav.basics();
		}, 500);
	})
}
$(function () {
	setHdNav();
	curdentPage();
	cutImgNav();
})