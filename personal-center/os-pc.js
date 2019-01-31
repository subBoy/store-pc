function setListBorder () {
	$('.ithr-1').remove();
	var len = $('.my-jian-gedan .fm-song-list-group-box').find('.fm-song-group-item').length;
	if (len < 5) {
		return;
	}
	var xLen = Math.floor(len / 4);
	for (var i = 0; i < xLen; i++) {
		var _html = '<div class="song-item-hr ithr-1" style="top:' + 330 * (i + 1) + 'px"></div>';
		$('.my-jian-gedan .fm-song-list-group-box').parent().append(_html);
	}
}
function setListBorder1 () {
	$('.ithr-2').remove();
	var len = $('.my-fabu-fm .fm-song-list-group-box').find('.fm-song-group-item').length;
	if (len < 5) {
		return;
	}
	var xLen = Math.floor(len / 4);
	for (var i = 0; i < xLen; i++) {
		var _html = '<div class="song-item-hr ithr-2" style="top:' + 330 * (i + 1) + 'px"></div>';
		$('.my-fabu-fm .fm-song-list-group-box').parent().append(_html);
	}
}
function setListBorder2 () {
	$('.ithr-3').remove();
	var len = $('.my-shoucang-gedan .fm-song-list-group-box').find('.fm-song-group-item').length;
	if (len < 5) {
		return;
	}
	var xLen = Math.floor(len / 4);
	for (var i = 0; i < xLen; i++) {
		var _html = '<div class="song-item-hr ithr-3" style="top:' + 330 * (i + 1) + 'px"></div>';
		$('.my-shoucang-gedan .fm-song-list-group-box').parent().append(_html);
	}
}
function delgeTab () {
	var idx;
	$('.pc-del-btn, .fsbc-item-del').on('click', function () {
		idx = $(this).parent().parent().parent().index();
		$(this).parent().parent().parent().parent().addClass('del_this_dom');
		$('.groove-table-win-wrapper').fadeIn();
		return false;
	})
	$('.groove-table-win-close-btn').on('click', function () {
		$('.groove-table-win-wrapper').fadeOut();
		$('.del_this_dom').removeClass('del_this_dom');
	})
	$('.groove-table-win-sumbit-btn').on('click', function () {
		$('.del_this_dom .home-of-home-of-ct-item').eq(idx).remove();
		$('.del_this_dom .fm-song-group-item').eq(idx).remove();
		$('.del_this_dom .groove-item').eq(idx).remove();
		setListBorder();
		setListBorder1();
		setListBorder2();
		$('.groove-table-win-wrapper').fadeOut();
		var len = $('.del_this_dom').find('.home-of-home-of-ct-item').length;
		var len2 = $('.del_this_dom').find('.fm-song-group-item').length;
		var len3 = $('.del_this_dom').find('.groove-item').length;
		if (len < 1 && len2 < 1 && len3 < 1) {
			$('#pcuAw').fadeIn();
			$('.pcuHw').hide();
		}
		$('.del_this_dom').removeClass('del_this_dom');
	})
}
var loadPage = null;
function loadPageFuc (obj, dom, status) {
	obj.on('click', function () {
		$('.hf-sy-nav-solt-view').removeClass('seled').html('所有');
		loadPage = $(this).attr('loadPage');
		if (status) {
			var childList = $(this).parent().siblings('.pcumd-item-list').find('.pcumd-item-txt');
			$(this).parent().parent().siblings('.pcumd-item').removeClass('seled');
			$(this).parent().parent().addClass('seled');
			childList.each(function (item) {
				childList.removeClass('seled');
				var _loadPage = $(this).attr('loadPage');
				if (loadPage === _loadPage) {
					$(this).addClass('seled');
					return false;
				}
			})
		} else {
			$(this).siblings('.pcumd-item-txt').removeClass('seled');
			$(this).addClass('seled');
		}

		if (loadPage === 'page8') {
			dom.hide();
			$('#pcuAw').fadeIn();
			return false;
		}

		dom.each(function () {
			var _loadPage2 = $(this).attr('loadPage');
			if (loadPage === _loadPage2) {
				$('#pcuAw').hide();
				dom.hide();
				if ($(this).find('img').length < 1) {
					$(this).hide();
					$('#pcuAw').fadeIn();
					return;
				}
				$('#pcuAw').hide();
				$(this).fadeIn();
				return false;
			}
		});
	})
}

function soltFuc () {
	$('.hf-sy-nav-solt-view').on('click', function (e) {
		e.stopPropagation();
		$(this).addClass('seled');
		if (loadPage === 'page3' || loadPage === 'page4') {
			$('.ypjf-table-list').slideDown();
		} else {
			$(this).siblings('.hf-sy-nav-solt-list').slideDown();
		}
	})
	$('.hf-sy-nav-solt-item').on('click', function (e) {
		e.stopPropagation();
		var thisVal = $(this).html();
		$('.hf-sy-nav-solt-view').removeClass('seled').html(thisVal);
		$(this).parent().slideUp();
	})
	$('.ypjf-item').on('click', function (e) {
		e.stopPropagation();
		var thisVal = $(this).html();
		$('.hf-sy-nav-solt-view').removeClass('seled').html(thisVal);
		$(this).parent().slideUp();
	})
}

function loadXxFuc (obj, dom) {
	obj.on('click', function () {
		$('.pcu-txb-item, .pcum-nav, .qqh-btn-s').removeClass('seled');
		var pageIdx = $(this).attr('pageIdx');
		$(this).addClass('seled').siblings().removeClass('seled');
		dom.each(function () {
			var _pageIdx = $(this).attr('pageIdx');
			if (pageIdx === _pageIdx) {
				dom.hide();
				$(this).fadeIn();
				return false;
			}
		})
	})
}

function isReport2 () {
	$('.report-btn-wrapper').on('click', function () {
		$('.groove-win-wrapper').fadeIn();
	})
	$('.groove-win-close-btn, .groove-win-sumbit-btn').on('click', function () {
		$('.groove-win-wrapper').fadeOut();
		$('.sel-geim-checkbox').attr('checked', false);
		$('.sel-geim-checkbox').parent().removeClass('seled');
	})
}
function qqhFuc () {
	$('.qqh-btn-s').on('click', function () {
		$('.pcu-txb-item').removeClass('seled');
		$(this).addClass('seled');
		$('#pumw-nav-1, .pcum-nav-item, #pumw-nav-4, .pcumni-ct, #pumw-nav-6').hide();
		$('#pumw-nav-2, #pumw-nav-3, .pumw-nav-5').fadeIn();
	})
}
$(function () {
	qqhFuc();
	isReport2();
	soltFuc();
	setListBorder();
	setListBorder1();
	setListBorder2();
	delgeTab();
	$('.pc-change-btn').click(function () {
		return false;
	});
	if ($("img.fm-song-group-img").length > 0) {
    $("img.fm-song-group-img").lazyload({effect: "fadeIn"});
  };
  loadPageFuc($('.pcumd-item-txt'), $('.pcuHw'), false);
  loadPageFuc($('.pcumd-item-te'), $('.pcuHw'), true);
  loadXxFuc($('.pcumni-table'), $('.pcumni-ct'));
  loadXxFuc($('.pcum-nav'), $('.pcum-nav-item'));
  loadXxFuc($('.pcu-txb-item'), $('.pcum-nav-item'));
})