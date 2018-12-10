var imgClass = ["D83DDE0A","D83DDE03","D83DDE09","D83DDE06","D83DDE1C","D83DDE0B","D83DDE0D","D83DDE0E","D83DDE12","D83DDE0F","D83DDE14","D83DDE22","D83DDE2D","D83DDE29","D83DDE28","D83DDE10","D83DDE0C","D83DDE04","D83DDE07","D83DDE30","D83DDE32","D83DDE33","D83DDE37","D83DDE02","2764","D83DDE1A","D83DDE15","D83DDE2F","D83DDE26","D83DDE35","D83DDE20","D83DDE21","D83DDE1D","D83DDE34","D83DDE18","D83DDE1F","D83DDE2C","D83DDE36","D83DDE2A","D83DDE2B","263A","D83DDE00","D83DDE25","D83DDE1B","D83DDE16","D83DDE24","D83DDE23","D83DDE27","D83DDE11","D83DDE05","D83DDE2E","D83DDE1E","D83DDE19","D83DDE13","D83DDE01","D83DDE31","D83DDE08","D83DDC7F","D83DDC7D","D83DDC4D","D83DDC4E","261D","270C","D83DDC4C","D83DDC4F","D83DDC4A","270B","D83DDE4F","D83DDC43","D83DDC46","D83DDC47","D83DDC48","D83DDCAA","D83DDC42","D83DDC8B","D83DDCA9","2744","D83CDF4A","D83CDF77","D83CDF78","D83CDF85","D83DDCA6","D83DDC7A","D83DDC28","D83DDD1E","D83DDC79","26BD","26C5","D83CDF1F","D83CDF4C","D83CDF7A","D83CDF7B","D83CDF39","D83CDF45","D83CDF52","D83CDF81","D83CDF82","D83CDF84","D83CDFC1","D83CDFC6","D83DDC0E","D83DDC0F","D83DDC1C","D83DDC2B","D83DDC2E","D83DDC03","D83DDC3B","D83DDC3C","D83DDC05","D83DDC13","D83DDC18","D83DDC94","D83DDCAD","D83DDC36","D83DDC31","D83DDC37","D83DDC11","23F3","26BE","26C4","2600","D83CDF3A","D83CDF3B","D83CDF3C","D83CDF3D","D83CDF4B","D83CDF4D","D83CDF4E","D83CDF4F","D83CDF6D","D83CDF37","D83CDF38","D83CDF46","D83CDF49","D83CDF50","D83CDF51","D83CDF53","D83CDF54","D83CDF55","D83CDF56","D83CDF57","D83CDF69","D83CDF83","D83CDFAA","D83CDFB1","D83CDFB2","D83CDFB7","D83CDFB8","D83CDFBE","D83CDFC0","D83CDFE6","D83DDE38","D83DDE39","D83DDE3C","D83DDE3D","D83DDE3E","D83DDE3F","D83DDE3B","D83DDE40","D83DDE3A","23F0","2601","260E","2615","267B","26A0","26A1","26D4","26EA","26F3","26F5","26FD","2702","2708","2709","270A","270F","2712","2728","D83CDC04","D83CDCCF","D83CDD98","D83CDF02","D83CDF0D","D83CDF1B","D83CDF1D","D83CDF1E","D83CDF30","D83CDF31","D83CDF32","D83CDF33","D83CDF34","D83CDF35","D83CDF3E","D83CDF3F","D83CDF40","D83CDF41","D83CDF42","D83CDF43","D83CDF44","D83CDF47","D83CDF48","D83CDF5A","D83CDF5B","D83CDF5C","D83CDF5D","D83CDF5E","D83CDF5F","D83CDF60","D83CDF61","D83CDF62","D83CDF63","D83CDF64","D83CDF65","D83CDF66","D83CDF67","D83CDF68","D83CDF6A","D83CDF6B","D83CDF6C","D83CDF6E","D83CDF6F","D83CDF70","D83CDF71","D83CDF72","D83CDF73","D83CDF74","D83CDF75","D83CDF76","D83CDF79","D83CDF7C","D83CDF80","D83CDF88","D83CDF89","D83CDF8A","D83CDF8B","D83CDF8C","D83CDF8D","D83CDF8E","D83CDF8F","D83CDF90","D83CDF92","D83CDF93","D83CDFA3","D83CDFA4","D83CDFA7","D83CDFA8","D83CDFA9","D83CDFAB","D83CDFAC","D83CDFAD","D83CDFAF","D83CDFB0","D83CDFB3","D83CDFB4","D83CDFB9","D83CDFBA","D83CDFBB","D83CDFBD","D83CDFBF","D83CDFC2","D83CDFC3","D83CDFC4","D83CDFC7","D83CDFC8","D83CDFC9","D83CDFCA","D83DDC00","D83DDC01","D83DDC02","D83DDC04","D83DDC06","D83DDC07","D83DDC08","D83DDC09","D83DDC0A","D83DDC0B","D83DDC0C","D83DDC0D","D83DDC10","D83DDC12"];
var wheelStatus = true;
function renderEmoji (arr) {
	var emDom = '';
	for (var i = 0; i < arr.length; i++) {
		emDom += '<span class="emoji-img-item" emoji="' + arr[i] + '">'
								+'<i class="emoji-img-ctr in-block ke ke-' + arr[i] + '"></i>'
							+'</span>';
	}
	$('#emojiImgList').html(emDom);
	var navDom = '';
	var navNum = arr.length / 50;
	navNum = Math.ceil(navNum);
	for (var j = 0; j < navNum; j++) {
		var seledClass = '';
		if (j === 0) {
			seledClass = 'seled';
		}
		navDom += '<span class="in-block emimg-nav ' + seledClass + '"></span>'
	}
	$('.emoji-img-nav').html(navDom);

	var nIdx = 0;
	$('#emojiImgList').bind('mousewheel', function(event, delta) {
		if (!wheelStatus) {
			return false;
		}
		wheelStatus = false;
		if (delta > 0) {
			if (nIdx < 1) {
				wheelStatus = true;
				return false;
			}
			nIdx--;
		} else {
			if (nIdx >= navNum - 1) {
				wheelStatus = true;
				return false;
			}
			nIdx++;
		}
		emojiAn(nIdx, 130);
		return false;
	});
	$('.emimg-nav').click(function () {
		nIdx = $(this).index();
		emojiAn(nIdx, 130);
	})
	$('.emoji-img-item').click(function (e) {
		e.stopPropagation();
		var zLen = jsEmojiLen();
		var emoji = $(this).attr('emoji');
		var img = document.createElement("IMG");
		img.setAttribute("class", "ke in-block ke-" + emoji);
		img.setAttribute("src", "../FM/images/opacity.png");
		var edit = document.getElementById('emoji-input-wrapper');
		edit.focus();
		var s = window.getSelection().getRangeAt(0);
    s.insertNode(img);
    if (zLen > 120) {
			$('.emoji-submit-err').fadeIn();
		} else {
			$('.emoji-submit-err').fadeOut();
		}
    $('.emoji-txt-len').html(zLen + '/120');
    var e = document.createRange();
    e.setStartAfter(img);
    e.setEndAfter(img);
    if (document.getSelection) {
      var wg = window.getSelection();
      wg.removeAllRanges();
      wg.addRange(e);
    }
	})
}

function emojiAn (idx, xh) {
	$('.emimg-nav').eq(idx).addClass('seled').siblings('.emimg-nav').removeClass('seled');
	$('#emojiImgList').animate({
		top: '-' + idx * xh + 'px'
	}, 500, function () {
		wheelStatus = true;
	})
}

function jsEmojiLen () {
	var emHtml = $('#emoji-input-wrapper').html();
	$('#emoji-len-num-wrapper').html(emHtml);
	var imgLen = $('#emoji-input-wrapper').find('img').length;
	$('#emoji-len-num-wrapper').find('img').remove();
	var txtBox = $('#emoji-len-num-wrapper').html();
	var txtLen = txtBox.length;
	return imgLen * 3 + txtLen;
}

function renderTextNode (txt) {
	var emojiText = document.createTextNode(txt);
	var edit = document.getElementById('emoji-input-wrapper');
	edit.focus();
	var s = window.getSelection().getRangeAt(0);
  s.insertNode(emojiText);
  var zLen = jsEmojiLen();
  if (zLen > 120) {
		$('.emoji-submit-err').fadeIn();
	} else {
		$('.emoji-submit-err').fadeOut();
	}
  $('.emoji-txt-len').html(zLen + '/120');
  var e = document.createRange();
  e.setStartAfter(emojiText);
  e.setEndAfter(emojiText);
  if (document.getSelection) {
    var wg = window.getSelection();
    wg.removeAllRanges();
    wg.addRange(e);
  }
}

function isReport () {
	$('.slcl-btn-1, .essay-btn-5').on('click', function () {
		$('.groove-win-wrapper').fadeIn();
	})
	$('.groove-win-close-btn, .groove-win-sumbit-btn').on('click', function () {
		$('.groove-win-wrapper').fadeOut();
		$('.sel-geim-checkbox').attr('checked', false);
		$('.sel-geim-checkbox').parent().removeClass('seled');
	})
	$('.slcl-btn-3').click(function () {
		replayId = $(this).parent().parent().find('.slcl-item-desc-txt').html();
		var userName = $(this).attr('userName');
		var cmTxt = '回复' + userName + '：';
		$('#emoji-input-wrapper').html('');
		renderTextNode(cmTxt);
	})
	$('.slcl-btn-2').click(function () {
		var cdLen = $(this).attr('cdLen');
		if ($(this).hasClass('seled')) {
			cdLen = cdLen - 1;
			$(this).removeClass('seled')
		} else {
			cdLen = cdLen - 0 + 1;
			$(this).addClass('seled')
		}
		$(this).attr('cdLen', cdLen);
		if (cdLen === 0) {
			$(this).addClass('not-zan').html('');
			return;
		}
		$(this).removeClass('not-zan').html('( ' + cdLen + ' )');
	})
	$('.slcl-btn-4').click(function () {
		$(this).parent().parent().remove();
	})
	$('.essay-btn-2').click(function () {
		var cdLen = $(this).attr('cdLen');
		if ($(this).hasClass('seled')) {
			cdLen = cdLen - 1;
			$(this).removeClass('seled');
			$('.essay-f-btn-2').removeClass('seled')
		} else {
			cdLen = cdLen - 0 + 1;
			$(this).addClass('seled');
			$('.essay-f-btn-2').addClass('seled');
		}
		$(this).attr('cdLen', cdLen);
		$('.essay-f-btn-2').attr('cdLen', cdLen);
		$(this).html('点赞<i class="essay-btn-desc">(' + cdLen + ')</i>');
		$('.essay-f-btn-2').html('点个赞走<i class="essay-btn-desc">(' + cdLen + ')</i>');
	})
	$('.essay-f-btn-2').click(function () {
		var cdLen = $(this).attr('cdLen');
		if ($(this).hasClass('seled')) {
			cdLen = cdLen - 1;
			$(this).removeClass('seled');
			$('.essay-btn-2').removeClass('seled');
		} else {
			cdLen = cdLen - 0 + 1;
			$(this).addClass('seled');
			$('.essay-btn-2').addClass('seled');
		}
		$(this).attr('cdLen', cdLen);
		$('.essay-btn-2').attr('cdLen', cdLen);
		$(this).html('点个赞走<i class="essay-btn-desc">(' + cdLen + ')</i>');
		$('.essay-btn-2').html('点赞<i class="essay-btn-desc">(' + cdLen + ')</i>');
	})
}
var replayId;
var isCommend = 0;

function isShowlistOrcommend () {
	$('.hf-sy-nav-link, .essay-btn').removeClass('seled');
	if (isCommend === 1) {
		$('.nav-item-2, essay-btn-3').addClass('seled');
		$('#song-list-commend-wrapper').fadeIn();
		$('#song-list-ctr-wrapper, #essay-wrapper').hide();
	} else {
		$('.nav-item-1, .essay-btn-1').addClass('seled');
		$('#song-list-commend-wrapper').hide();
		$('#song-list-ctr-wrapper, #essay-wrapper').fadeIn();
	}
}
function videoPlayer () {
  if (!document.addEventListener || !1 in document.documentElement.style) {
    $('#video').hide();
  } else {
    jsModern.video("#video");
  }
}
$(function () {
	videoPlayer();
	isShowlistOrcommend();
	isReport();
	renderEmoji(imgClass);
	$('#emoji-input-wrapper').on('input', function () {
		var zLen = jsEmojiLen();
		if (zLen > 120) {
			$('.emoji-submit-err').html('评论字数超出最大值范围！');
			$('.emoji-submit-err').fadeIn();
		} else {
			$('.emoji-submit-err').fadeOut();
		}
		$('.emoji-txt-len').html(zLen + '/120');
	})
	$('.emoji-btn-1').click(function (e) {
		e.stopPropagation();
		$('.emoji-img-wrapper').slideDown();
	})
	$('.emoji-btn-2').click(function () {
		renderTextNode('@');
	})
	$('.emoji-btn-3').click(function () {
		var emVal = $('#emoji-input-wrapper').html();
		var emSta = emVal.indexOf('#输入想说的话题#');
		if (emSta !== -1) {
			return;
		}
		renderTextNode('#输入想说的话题#');
	})
	$('.emoji-submit-btn').click(function () {
		var zLen = jsEmojiLen();
		if (zLen > 120) {
			return;
		}
		if (zLen < 1) {
			$('.emoji-submit-err').html('写点东西吧，内容不能为空哦！');
			$('.emoji-submit-err').fadeIn();
			return;
		}
		var cdCt = $('#emoji-input-wrapper').html();
		$('#lg-dom').html(replayId);
		var cssTxt = '回复' + $('#lg-dom').find('.slcl-item-user-name').html();
		var cssTxt2 = '@' + $('#lg-dom').find('.slcl-item-user-name').html();
		var xxHtml = '';
		$('#lg-dom').find('.slcl-item-user-name').html(cssTxt2);
		if (replayId && cdCt.indexOf(cssTxt) !== -1) {
			cdCt = cdCt.split(cssTxt)[1];
			xxHtml = '<div class="replay-slcl-item">' + $('#lg-dom').html() + '</div>';
		}
		var reHtml = '<li class="slcl-item">'
						+'<div class="slcl-item-user-avatar">'
							+'<img src="../FM/images/song-poster.jpg" width="100%" height="100%">'
						+'</div>'
						+'<p class="slcl-item-desc-txt">'
							+'<span class="slcl-item-user-name">aabbcc：</span>' + cdCt
						+'</p>'
						+'<div class="replay-slcl-item-wrapper">' + xxHtml + '</div>'
						+'<p class="slcl-item-time">2018年11月21日 12 : 23</p>'
						+'<div class="slcl-item-opr-btn">'
							// +'<span class="in-block slcl-btn set-animation slcl-btn-1">举报</span>'
							+'<span class="in-block slcl-btn set-animation slcl-btn-4">删除</span>'
							+'<span class="in-block slcl-btn-hr"></span>'
							+'<span class="in-block slcl-btn set-animation slcl-btn-2 not-zan" cdLen="0"></span>'
							+'<span class="in-block slcl-btn-hr"></span>'
							+'<a href="#gmBtn" class="in-block slcl-btn set-animation slcl-btn-3" userName="aabbcc">回复</a>'
						+'</div>'
					+'</li>'
		$('#latest-commend-list').prepend(reHtml);
		$('#emoji-input-wrapper').html('');
		$('.emoji-txt-len').html('0/120');
		$('.slcl-btn-1, .slcl-btn-2, .slcl-btn-3, .slcl-btn-4').unbind();
		isReport();
		$('.emoji-submit-err').html('评论成功！');
		$('.emoji-submit-err').fadeIn();
		setTimeout(function () {
			$('.emoji-submit-err').fadeOut();
		}, 2000);
	})
	$('.nav-item-2, .essay-btn-3').click(function () {
		isCommend = 1;
		isShowlistOrcommend();
	})
	$('.nav-item-1, .essay-btn-1').click(function () {
		isCommend = 0;
		isShowlistOrcommend();
	})
})