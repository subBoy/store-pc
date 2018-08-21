function stepes () {
	var step = GetQueryString('step');
	if (step == null) {
		step = 2;
	}
	if (step == '2') {
		$('#cr-step-name').html('2.在线审核中');
		$('#step-issue-desc').html('客服在线审核中');
		$('#cr-step-info-not-bar').addClass('border-none');
		return;
	}
	if (step == '00') {
		$('#cr-step-name').html('在线审核不通过!');
		$('#step-issue-desc').html('在线审核不通过，订单关闭');
		$('#cr-order-status-txt').html('订单关闭');
		$('#cr-order-status-txt').parent().addClass('close-order-icon');
		$('#step-3-reject').show();
		$('#cr-step-info-not-bar').addClass('border-none');
		return;
	}
	if (step == '3') {
		$('#cr-step-name').html('3.已审核');
		$('#step-issue-desc').html('已审核，填写退回物流');
		$('#step-3-pass').show();
		$('#cr-step-info-not-bar').addClass('border-none');
		return;
	}
	if (step == '4') {
		$('#cr-step-name').html('4.实物审核中');
		$('#step-issue-desc').html('退货组：审核中');
		$('#step-4-pass').show();
		return;
	}
	if (step == '5') {
		$('#cr-step-name').html('5.退款中');
		$('#step-issue-desc').html('已审核，退款中');
		$('.step-6-pass-only').remove();
		$('#step-4-pass, #step-5-pass').show();
		return;
	}
	if (step == '01') {
		$('#cr-step-name').html('实物审核不通过!');
		$('#step-issue-desc').html('实物审核不通过，订单关闭');
		$('#cr-order-status-txt').html('订单关闭');
		$('#step-reject-txt').html('实物审核驳回理由<a href="../return-policy/return-policy.html?sideIdent=returnPolicy" class="return-policy-link">退换货规则</a>');
		$('#cr-order-status-txt').parent().addClass('close-order-icon');
		$('#step-3-reject, #step-4-pass').show();
		return;
	}
	if (step == '6') {
		$('#cr-step-name').html('6.已完成');
		$('#step-issue-desc').html('已完成');
		$('#cr-order-status-txt').parent().addClass('finish-order-stated');
		$('#step-6-pass').addClass('step-6-pass');
		$('#step-6-pass').removeClass('border-none');
		$('#step-5-pass').remove();
		$('#step-5-pass, #step-4-pass').show();
		lookBigImg();
		cutImgNav3();
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
		$('.stpps-3-submit-err-txt').html('');
		$('.stpps-3-select-list').slideUp();
		$('.stpps-3-select-view').removeClass('is-show');
		$('.stpps-3-select-view').html(thisTxt);
	})
}

function submitWl () {
	$('.stpps-3-input-ctr').focus(function () {
		$('.stpps-3-submit-err-txt').html('');
	})
	$('.stpps-3-submit-btn').on('click', function () {
		var wlType = $('.stpps-3-select-view').html();
		var wlCode = $('.stpps-3-input-ctr').val();
		if (wlType === '物流选择') {
			$('.stpps-3-submit-err-txt').html('请选择物流公司！');
			return;
		}
		if (!wlCode) {
			$('.stpps-3-submit-err-txt').html('请输入物流单号！');
			return;
		}
		$('#success-win-txt').html('物流信息提交成功！');
		$('#success-win-desc').html('物流信息提交成功后，售后组收货3个工作日内处理结果！');
		$('#submit-success-win').fadeIn();
		setTimeout(function () {
			autoHide();
		}, 50);
	})

	$('.step-5-pass-btn').on('click', function () {
		$('#success-win-txt').html('确认成功！');
		$('#success-win-desc').html('您的退单已完成，为您造成不便我们深感歉意！');
		$('#submit-success-win').fadeIn();
		setTimeout(function () {
			autoHide();
		}, 50);
	})
}
$(function () {
	stepes();
	selway();
	submitWl();
})