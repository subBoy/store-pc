function stepes () {
	var step = GetQueryString('step');
	if (!step || step === null) {
		step = 1;
	}
	var stepItem = $('.issue-pay-btn-wrapper');
	stepItem.each(function () {
		var itStep = $(this).attr('step');
		console.log(step, itStep);
		if (step == itStep) {
			$(this).addClass('esp').show();
		} else {
			$(this).removeClass('esp').hide();
		}
	})
	if (step == '1') {
		$('#cr-step-name').html('待付款');
		$('#cr-step-name').siblings('.cr-step-icon').removeClass('thanks');
		$('#step-issue-desc').html('待付款');
		setInterval(countDown, 1000);
		return;
	}
	if (step == '2') {
		$('#cr-step-name').html('已付款');
		$('#step-issue-desc').html('待发货');
		$('#cr-step-info-txt-ctr').html('注：付款完成后<span class="count-time">1-2</span>工作日内会有库管安排为您发货，敬请期待！');
		return;
	}
	if (step == '3') {
		$('#cr-step-name').html('已付款');
		$('#step-issue-desc').html('待收货');
		$('#cr-step-info-txt-ctr').html('注：货物签收以后，<span class="count-time">3</span>个工作日后系统自动确认收货！');
		$('#od-step-3').show();
		$('.cr-order-stated').addClass('finish-order-stated');
		$('#cr-order-status-txt').html('配送中');
		return;
	}
	if (step == '4') {
		$('#cr-step-name').html('已付款');
		$('#step-issue-desc').html('已签收');
		$('#cr-step-info-txt-ctr').html('注：货物签收以后，<span class="count-time">3</span>个工作日内符合<a class="cr-shop-desc" target= "_blank" href="../return-policy/return-policy.html?sideIdent=returnPolicy">《退换货说明》</a>可申请退换货！');
		$('#od-step-3').show();
		$('.cr-order-stated').addClass('od-over-icon');
		$('#cr-order-status-txt').html('已签收');
		return;
	}
	if (step == '5') {
		$('#cr-step-name').html('已付款');
		$('#step-issue-desc').html('已完成');
		$('#cr-step-info-txt-ctr').html('感谢您购买<span class="ob-fwb">RACK ROD</span>的相关产品，我们将尽最大努力服务为您！');
		$('#od-step-3').show();
		$('.cr-order-stated').addClass('od-over-icon');
		$('#cr-order-status-txt').html('已签收');
		return;
	}
	if (step == '6') {
		$('#cr-step-name').html('订单过期');
		$('#step-issue-desc').html('订单过期');
		$('#cr-step-name').siblings('.cr-step-icon').removeClass('thanks').addClass('closed');
		$('#cr-step-info-txt-ctr').html('注：由于您没能在规定的时间内完成付款，订单关闭，如您还需要请重新下单！');
		return;
	}
	if (step == '7') {
		$('#cr-step-name').html('订单取消');
		$('#step-issue-desc').html('订单取消');
		$('#cr-step-name').siblings('.cr-step-icon').removeClass('thanks').addClass('air-icon');
		$('#cr-step-info-txt-ctr').html('注：您的订单已取消，如您还需要请重新下单！');
		return;
	}
}
function submitWl () {
	$('.confirm-receipt-btn').on('click', function () {
		$('#success-win-txt').html('确认成功！');
		$('#success-win-desc').html('您的订单已完成，感谢您对RACK ROD品牌的支持，谢谢！');
		$('#submit-success-win').fadeIn();
		setTimeout(function () {
			autoHide();
		}, 50);
	})
}
$(function () {
	stepes();
	submitWl();
})