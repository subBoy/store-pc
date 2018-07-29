function curdentSide () {
	var sideIdent = GetQueryString('sideIdent');
	$('.user-link-item').each(function () {
		var _sideIdent = $(this).attr('sideIdent');
		if (_sideIdent && _sideIdent === sideIdent) {
			$('.user-link-item').removeClass('now-page');
			$(this).addClass('now-page');
		}
	})
}
function switchTab () {
	$('.ucw-tab-item').on('click', function () {
		var ident = $(this).attr('ident');
		if (ident) {
			$(this).addClass('ident').siblings('.ucw-tab-item').removeClass('ident');
			$('.ucw-tab-content').each(function () {
				var _ident = $(this).attr('ident');
				if (ident === _ident) {
					$(this).fadeIn().siblings('.ucw-tab-content').hide();
					vmCon('not-an');
				}
			})
		}
	})
}
function urlTab () {
	var ident = GetQueryString('ident');
	if (ident) {
		$('.ucw-tab-item').each(function () {
			var _ident = $(this).attr('ident');
			if (ident === _ident) {
				$(this).addClass('ident').siblings('.ucw-tab-item').removeClass('ident');
			}
		})
		$('.ucw-tab-content').each(function () {
			var _ident = $(this).attr('ident');
			if (ident === _ident) {
				$(this).fadeIn().siblings('.ucw-tab-content').hide();
				vmCon('not-an');
			}
		})
	}
}
$(function () {
	curdentSide();
	switchTab();
	urlTab();
})