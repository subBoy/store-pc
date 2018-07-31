var serverType = '0'; // '0' 退货 ;'1' 换货
function selType () {
	$('.cr-step-btn').on('click', function () {
		serverType = $(this).attr('serverType');
		$(this).addClass('seled').siblings('.cr-step-btn').removeClass('seled');
		if (serverType === '1') {
			$('#isReturnType').slideUp();
		} else {
			$('#isReturnType').slideDown();
		}
	})
}

function setIssue () {
	var timer;
	$('#cr-step-issue-box').on('keyup', function () {
		var _this = $(this);
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function () {
			var thisVal = _this.val();
			$('.cr-step-issue-font-num').html(thisVal.length + '/ 500');
			if (thisVal.length > 500) {
				$('.cr-step-info-err').fadeIn();
			} else {
				$('.cr-step-info-err').fadeOut();
			}
		}, 50);
	});
}

$(function () {
	selType();
	setIssue();
})