function getNowTime () {
	var thisYear = new Date().getFullYear();
	var mstr = '0' + (new Date().getMonth() + 1);
	var thisMonth = mstr.substring(1, mstr.length);
	var thisDay = new Date().getDate();
	$('#gip-desc-time').html(thisYear + '-' + thisMonth + '-' + thisDay);
}
function setPl () {
	$('#groove-ipt-ctr').on('focus', function () {
		$('.groove-input-placeholder').hide();
	})
	$('#groove-ipt-ctr').on('blur', function () {
		var thisVal = $(this).val();
		if (!thisVal) {
			$('.groove-input-placeholder').show();
			return;
		}
		$('.groove-input-placeholder').hide();
	})
	$('#groove-ipt-ctr').on('input', function () {
		var len = $(this).val().length;
		$('#font-length').html(len + '/200字');
	})
}
$(function () {
	getNowTime();
	setPl();
})