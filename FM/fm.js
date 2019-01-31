function setListBorder () {
	$('.song-item-hr').remove();
	var len = $('.fm-song-list-group-box').find('.fm-song-group-item').length;
	if (len < 5) {
		return;
	}
	var xLen = Math.floor(len / 4);
	for (var i = 0; i < xLen; i++) {
		var _html = '<div class="song-item-hr" style="top:' + 330 * (i + 1) + 'px"></div>';
		$('.fm-song-list-group-box').parent().append(_html);
	}
}
function delgeTab () {
	var idx;
	$('.fsbc-item-del').on('click', function () {
		idx = $(this).parent().parent().index();
		$('.groove-table-win-wrapper').fadeIn();
	})
	$('.groove-table-win-close-btn').on('click', function () {
		$('.groove-table-win-wrapper').fadeOut();
	})
	$('.groove-table-win-sumbit-btn').on('click', function () {
		$('.fm-song-group-item').eq(idx).remove();
		setListBorder();
		$('.groove-table-win-wrapper').fadeOut();
	})
}
$(function () {
	setListBorder();
	delgeTab();
})