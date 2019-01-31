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
		$('.pcu-txb-item, .pcum-nav').removeClass('seled');
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
var userNamePc = '';
var userNameDesc = '';
var userNameImg = '';
function changePcInfo () {
	$('.change-u-info-btn').on('click', function () {
		userNamePc = $('#urio-avatar-name').html();
		userNameDesc = $('#urio-avatar-desc').html();
		if (userNameDesc === '这是个还没有简介的Racker...') {
			userNameDesc = '';
		}
		userNameImg = $('#urio-avatar-img2').attr('src');
		$('.urio-avatar-name').val(userNamePc);
		$('.urio-avatar-textarea').val(userNameDesc);
		$('.urio-avatar-img1').attr('src', userNameImg);
		$('#pcUserInfo').hide();
		$('#changUserInfo').fadeIn();
	})
}

function changeAvatar1 () {
	$('#change-avatar-btn').on('click', function () {
		$('#change-user-avatar-win').fadeIn();
		vmCon('not-an');
	})
	$('.user-cpm-close-btn').on('click', function () {
		$('#change-user-avatar-win').fadeOut();
	})
}

function selectImg2(file) {
  if (!file.files || !file.files[0]){
  	$('.select-img-btn1').show();
  	$('.select-img-again1').hide();
    $('.sureCut1').removeClass('global-btn-styl');
    $('.circular-desc1').html('当前头像');
    return;
  }
  if (file.files[0].type !== 'image/jpeg' && file.files[0].type !== 'image/png') {
  	$('.urio-avatar-desc1').html('请上传JPG、PNG等格式的图片！')
  	return;
  }
  if (file.files[0].size > 2 * 1024 * 1024) {
  	$('.urio-avatar-desc1').html('请上传小于2M的图片！')
  	return;
  }
  var reader = new FileReader();
  reader.onload = function (evt) {
    var replaceSrc = evt.target.result;
    $('#tailoringImg1').cropper('replace', replaceSrc, false);
    $('.select-img-btn1').hide();
    $('.select-img-again1').show();
    $('.sureCut1').addClass('global-btn-styl');
    $('.circular-desc1').html('头像预览');
    $('.urio-avatar-desc1').html('');
  }
  reader.readAsDataURL(file.files[0]);
}

function cropperImg1 () {
	$('#tailoringImg1').cropper({
	  aspectRatio: 1/1,
	  preview: '.previewImg1',
	  guides: false,
	  autoCropArea: 0.5,
	  movable: false,
	  dragCrop: true,
	  movable: true,
	  resizable: true,
	  zoomable: false,
	  mouseWheelZoom: false,
	  touchDragZoom: true,
	  rotatable: true,
	  crop: function(e) {
	    // console.log(e);
	  }
	});

	$("#sureCut1").on("click",function () {
		if (!$(this).hasClass('global-btn-styl')) {
			return;
		}
		if ($("#tailoringImg1").attr("src") == null ){
		  return false;
		} else {
		  var cas = $('#tailoringImg1').cropper('getCroppedCanvas');
		  var base64url = cas.toDataURL('image/png');
		  $(".urio-avatar-img1").prop("src", base64url);
		  $('.urio-avatar-desc1').html('更新成功！')
		  setTimeout(function () {
		  	$('#change-user-avatar-win').fadeOut();
		  	$('.urio-avatar-desc1').html('');
		  }, 1000)
		}
	});

	$(".select-img-again1, .select-img-btn1").on('click', function () {
		return $('#chooseImg1').click();
	})

	var avatarSrc = $('.urio-avatar-img1').attr('src');
	$('#finalImg1').attr('src', avatarSrc);

	$('.urio-avatar-submit-btn').on('click', function () {
		var thisInp = $('.urio-avatar-name').val();
		var thisArea = $('.urio-avatar-textarea').val();
		var thisImg = $('.urio-avatar-img1').attr('src');
		if (thisInp) {
			userNamePc = thisInp
		}
		if (thisArea) {
			userNameDesc = thisArea;
		} else {
			userNameDesc === '这是个还没有简介的Racker...';
		}
		$('#urio-avatar-name').html(userNamePc);
		$('#urio-avatar-desc').html(userNameDesc);
		$('#urio-avatar-img2').attr('src', thisImg);
		$('#pcUserInfo').fadeIn();
		$('#changUserInfo').hide();
	})
}
$(function () {
	cropperImg1();
	changeAvatar1();
	changePcInfo();
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