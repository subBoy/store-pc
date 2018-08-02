function stepes () {
	var step = GetQueryString('step');
	if (!step == null) {
		step = 2;
	}
	if (step == '2') {
		$('#cr-step-name').html('2.在线审核中');
		$('#step-issue-desc').html('客服在线审核中');
		return;
	}
	if (step == '00') {
		$('#cr-step-name').html('在线审核不通过!');
		$('#step-issue-desc').html('在线审核不通过，订单关闭');
		$('#cr-order-status-txt').html('订单关闭');
		$('#cr-order-status-txt').parent().addClass('close-order-icon');
		$('#step-3-reject').show();
		return;
	}
	if (step == 3) {
		$('#cr-step-name').html('3.已审核');
		$('#step-issue-desc').html('已审核，填写退回物流');
		$('#step-3-pass, #step-3-pass-2').show();
		return;
	}
	if (step == 4) {
		$('#cr-step-name').html('');
		$('#step-issue-desc').html('');
		$('#cr-order-status-txt').html('');
		return;
	}
	if (step == 5) {
		$('#cr-step-name').html('');
		$('#step-issue-desc').html('');
		$('#cr-order-status-txt').html('');
		return;
	}
}

function selway () {
	$('.stpps-3-select-view').on('click', function (e) {
		e.stopPropagation();
		$('.stpps-3-select-list').slideDown();
		$(this).addClass('is-show');
	})
	$('.stpps-3-select-item').on('click', function (e) {
		e.stopPropagation();
		var thisTxt = $(this).html();
		if (thisTxt === '请选择') {
			return;
		}
		$('.stpps-3-select-list').slideUp();
		$('.stpps-3-select-view').removeClass('is-show');
		$('.stpps-3-select-view').html(thisTxt);
	})
}

$(function () {
	stepes();
	selway();
})