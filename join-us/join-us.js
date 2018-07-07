function showSlide () {
	var sTop = $(window).scrollTop();
	if (sTop >= 350) {
		$('.ju-silde-wrapper').fadeIn();
	} else {
		$('.ju-silde-wrapper').hide();
	}
}
function slideAn () {
	var timer;
	$('.ju-silde-item').on('click', function () {
		clearTimeout(timer);
		timer = setTimeout(function () {
			scrollToId();
		}, 100)
	})
}
function scrollToId () {
	var url = location.href;
	console.log(url);
	var id = url.split('#')[1];
	var targetId = $('.' + id);
	if (id && targetId.length) {
		var sTop = targetId.offset().top;
		$("html,body").animate({
			scrollTop: sTop - 110 + 'px'
		}, 500);
		var slide = $('.ju-silde-item');
		$.each(slide, function () {
			var slideId = $(this).find('.ju-silde-link').attr('href');
			if (slideId === '#' + id) {
				$(this).addClass('now-station').siblings().removeClass('now-station');
			}
		})
	}
}
$(function () {
	scrollToId();
	showSlide();
	$(window).bind("scroll", showSlide);
	slideAn();
})