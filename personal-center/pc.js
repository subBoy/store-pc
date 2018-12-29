function delgeTab () {
	var idx;
	$('.pc-del-btn').on('click', function () {
		idx = $(this).parent().parent().parent().index();
		$('.groove-table-win-wrapper').fadeIn();
		return false;
	})
	$('.groove-table-win-close-btn').on('click', function () {
		$('.groove-table-win-wrapper').fadeOut();
	})
	$('.groove-table-win-sumbit-btn').on('click', function () {
		$('.home-of-home-of-ct-item').eq(idx).remove();
		$('.groove-table-win-wrapper').fadeOut();
	})
}
$(function () {
	delgeTab();
	$('.pc-change-btn').click(function () {
		return false;
	})
})