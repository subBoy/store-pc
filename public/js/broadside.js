function showSlide (callback) {
	var sTop = $(window).scrollTop();
	if (sTop >= 350) {
		$('.ju-silde-wrapper').addClass('fixed-slide');
		// $('.ju-silde-wrapper').fadeIn();
	} else {
		$('.ju-silde-wrapper').removeClass('fixed-slide')
		// $('.ju-silde-wrapper').hide();
	}
	if (callback) {
		callback();
	}
}
function slideAn () {
	var timer;
	$('.ju-silde-item').on('click', function () {
		clearTimeout(timer);
		timer = setTimeout(function () {
			scrollToId(0);
		}, 100)
	})
}
function scrollToId (status) {
	var url = location.href;
	var id = url.split('#')[1];
	var targetId = $('.' + id);
	if (id && targetId.length) {
		var sTop = targetId.offset().top;
		$("html,body").animate({
			scrollTop: sTop - 110 - status + 'px'
		}, 500);
		var slide = $('.ju-silde-item');
		$.each(slide, function () {
			var slideId = $(this).find('.ju-silde-link').attr('href').split('#')[1];
			if (slideId === id) {
				$(this).addClass('now-station').siblings().removeClass('now-station');
			}
		})
	}
}
$(function () {
	scrollToId(70);
	showSlide();
	slideAn();
})