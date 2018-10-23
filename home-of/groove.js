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
function delgeTab () {
	var idx;
	$('.getb-del-btn-wrapper').on('click', function () {
		idx = $(this).parent().parent().parent().index();
		$('.groove-table-win-wrapper').fadeIn();
	})
	$('.groove-table-win-close-btn').on('click', function () {
		$('.groove-table-win-wrapper').fadeOut();
	})
	$('.groove-table-win-sumbit-btn').on('click', function () {
		$('.groove-table-itrm').eq(idx).remove();
		$('.groove-table-win-wrapper').fadeOut();
	})
	$('.groove-item-link').on('click', function () {
		$('#groove-table-content').hide();
		$('#groove-list-content').fadeIn();
	})
}
$(function () {
	getNowTime();
	setPl();
	delgeTab();
})