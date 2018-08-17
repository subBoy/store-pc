var cooper = {
	len: $('.co-oper-list').find('.co-oper-item').length,
	zW: $('.co-operating-list').width(),
	idx: 0,
	basics: function () {
		cooper.btnStatus();
		var sTop = cooper.zW;
		$(".co-oper-list").animate({
			left: '-' + cooper.idx * sTop + 'px'
		}, 500);
	},
	prev: function () {
		cooper.idx--;
		if (cooper.idx <= 0) {
			cooper.idx = 0;
		}
		cooper.basics();
	},
	next: function () {
		var _len = Math.ceil(cooper.len / 5) - 1;
		cooper.idx++;
		if (cooper.idx >= _len) {
			cooper.idx = _len;
		}
		cooper.basics();
	},
	btnStatus: function () {
		$('.co-oper-prev, .co-oper-next').addClass('has-more');
		var _len = Math.ceil(cooper.len / 5) - 1;
		if (cooper.idx <= 0) {
			$('.co-oper-prev, .co-oper-next').removeClass('has-more');
			if (_len > 0) {
				$('.co-oper-next').addClass('has-more');
			}
		}
		if (cooper.idx >= _len) {
			$('.co-oper-prev, .co-oper-next').removeClass('has-more');
			if (_len > 0) {
				$('.co-oper-prev').addClass('has-more');
			}
		}
	},
	init: function () {
		cooper.btnStatus();
		cooper.zW = $('.co-operating-list').width();
		var _h = cooper.zW / 5 - 10;
		var _len = Math.ceil(cooper.len / 5);
		$('.co-operating-list').height(_h *0.95);
		$('.co-oper-img-wrapper').height(_h *0.48);
		$('.co-oper-link').css({
			width: _h + 'px',
			height: _h * 0.95 + 'px'
		})
		var lbW = $('.co-oper-link-box').height();
		$('.co-oper-link-box').css('margin-top', '-' + lbW / 2 + 'px');
		$(".co-oper-list").animate({
			left: 0,
			width: _len * cooper.zW + 'px'
		});
	}
};
function cutCoOper () {
	cooper.init();
	$('.co-oper-prev').on('click', cooper.prev);
	$('.co-oper-next').on('click', cooper.next);
	var hr;
	$(window).resize(function () {
		clearTimeout(hr);
		hr = setTimeout(function () {
			cooper.init();
		}, 500);
	})
}

$(function () {
	cutCoOper();
})