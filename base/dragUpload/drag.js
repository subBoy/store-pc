function showModal() {
	$('#up-load-img-win').fadeIn();
}

function hideModal() {
	$('#up-load-img-win').fadeOut();
}

function controlModal () {
	$('.up-load-unit-img').on('click', function () {
		var clickState = $(this).attr('status');
		var idx = $(this).index();
		if (clickState !== '0') {
			$('#look-big-img-win').fadeIn();
			goToSlide(idx);
			return;
		}
		showModal();
	})
	var errTimer;
	$('#start-uploading-btn').on('click', function () {
		if (autofiles.length > 4) {
			clearTimeout(errTimer);
			$('.up-load-img-err-txt').fadeIn();
			errTimer = setTimeout(function () {
				$('.up-load-img-err-txt').fadeOut();
			}, 1000)
			return;
		}
		showModal();
	})
	$('#close-up-load-img-btn').on('click', function () {
		var afLen = autofiles.length - gloLen;
		autofiles.splice(afLen, gloLen);
		hideModal();
		clearAll();
	})
	$('.up-load-img-btn').on('click', function () {
		if (!$(this).hasClass('global-btn-styl')) {
			return;
		}
		uploadFc();
	})
}

var upLoadWin = document.getElementById('up-load-img-win');
var upLoadArea = document.getElementById('up-load-area');

upLoadWin.ondragover = function (e) {
	e.preventDefault();
}
upLoadWin.ondragleave = function (e) {
	e.preventDefault();
}
upLoadWin.ondrop = function (e) {
	e.preventDefault();
	$('.cr-step-win-err').html('请把文件拖到上传区域！').fadeIn();
}
upLoadArea.ondragover = function (e) {
	e.preventDefault();
}
upLoadArea.ondragleave = function (e) {
	e.preventDefault();
}
var uploadImg = [];
var autofiles = [];
var gloLen = 0;
upLoadArea.ondrop = function (e) {
	e.preventDefault();
	e.stopPropagation();
	$('.cr-step-win-err').html(' ').hide();
	var files = e.dataTransfer.files;
	if (!files) {
		$('.cr-step-win-err').html('您使用的浏览器不支持拖拽上传图片, 请更换浏览器再来使用！').fadeIn();
		return;
	}
	gloLen = files.length;
	var len = files.length - 0;
	var xlen = $('.has-img-wrapper').find('p').length - 0;
	var zLen = len + xlen;
	var xxLen = len + autofiles.length;
	var overNum = 5 - autofiles.length;
	if (zLen > 5) {
		$('.cr-step-win-err').html('最多只能上传5张图片！').fadeIn();
		return;
	}
	if (xxLen > 5) {
		$('.cr-step-win-err').html('最多只能上传5张图片, 您已上传' + autofiles.length + '张图片，还可上传' + overNum + '张图片！').fadeIn();
		return;
	}
	var	i = 0;
	var frag = document.createDocumentFragment();
	var fileBox, time, size;
	while (i < len) {
		size = Math.round(files[i].size * 100 / 1024) / 100 + 'KB';
		if (files[i].type.indexOf("image") == -1 || size > 1024) {
			$('.cr-step-win-err').html('仅支持1M以内jpg、jpeg、gif、png格式图片上传！').fadeIn();
			return;
		}
		fileBox = document.createElement('p');
		time = files[i].lastModifiedDate.toLocaleDateString() + ' ' + files[i].lastModifiedDate.toTimeString().split(' ')[0];
		fileBox.innerHTML = '<span class="upload-files-name in-block">' + files[i].name + '</span><span class="upload-files-time in-block">' + time + '</span><span class="upload-files-size in-block">' + size + '</span><span class="upload-files-del-btn in-block">删除</span>';
		frag.appendChild(fileBox);
		autofiles.push(files[i]);
		i++;
	}
	$('.not-img-wrapper').hide();
	$('.has-img-wrapper').fadeIn().append(frag);
	$('.up-load-img-btn').addClass('global-btn-styl');
	delOne();
	var plen = $('.has-img-wrapper').find('p');
	if (plen.length > 5) {
		$('.cr-step-win-err').html('最多只能上传5张图片，请删除超出的图片！').fadeIn();
		$('.up-load-img-btn').removeClass('global-btn-styl');
		return;
	}
	var fnameArr = [];
	plen.each(function () {
		var fname = $(this).find('.upload-files-name').html();
		fnameArr.push(fname);
	})
	var iqueArr = unique(fnameArr);
	if (iqueArr.length !== fnameArr.length) {
		$('.cr-step-win-err').html('请删除重复的图片！').fadeIn();
		$('.up-load-img-btn').removeClass('global-btn-styl');
		return;
	}
}

function uploadFc () {
	uploadImg = [];
	for (var i = 0; i < autofiles.length; i++) {
		(function (i) {
			var fr = new FileReader();
			fr.readAsDataURL(autofiles[i]);
			fr.onload = function (ev){
			  var Url = ev.target.result;
			  uploadImg.push(Url);
			  if (uploadImg.length === autofiles.length) {
			  	var iqueArr = unique(uploadImg);
					if (iqueArr.length !== uploadImg.length) {
						$('.cr-step-win-err').html('请删除重复的图片！').fadeIn();
						$('.up-load-img-btn').removeClass('global-btn-styl');
						return;
					}
					var xhtml = '';
			  	for (var j = 0; j < uploadImg.length; j++) {
						$('.up-load-unit-img').eq(j).attr('status', 1).find('img').attr('src', uploadImg[j]);
						xhtml += '<li class="big-img-item"><img src="' + uploadImg[j] + '" height="100%"></li>';
					}
					$('.big-img-list').html(xhtml);
					$('.cr-step-le-desc').hide();
					$('.look-big-img-btn').fadeIn();
					hideModal();
					clearAll();
			  }
			}
		})(i)
	}
}

function unique (arr) {
  var hash=[];
  for (var i = 0; i < arr.length; i++) {
		if (hash.indexOf(arr[i]) == -1) {
			hash.push(arr[i]);
		}
  }
  return hash;
}

function clearAll () {
	if($('.has-img-wrapper').find('p').length < 1){
		return;
	}
	$('.has-img-wrapper').hide().empty();
	$('.not-img-wrapper').fadeIn();
	$('.cr-step-win-err').html(' ').hide();
	$('.up-load-img-btn').removeClass('global-btn-styl');
}

function delOne () {
	$(".upload-files-del-btn").on('click', function () {
		var _idx = $(this).siblings('.upload-files-name').html();
		for (var i = 0; i < autofiles.length; i++) {
			var forstate = (function (i) {
				if (autofiles[i].name === _idx) {
					autofiles.splice(i, 1);
					return false;
				}
				return true;
			})(i);
			if (!forstate) {
				break;
			}
		}
		var key = $(this).siblings('.upload-files-name').html();
		$(this).parent().remove();
		var plen = $('.has-img-wrapper').find('p');
		if (plen.length > 5) {
			$('.cr-step-win-err').html('最多只能上传5张图片，请删除超出的图片！').fadeIn();
			$('.up-load-img-btn').removeClass('global-btn-styl');
			return;
		}
		if (plen.length < 1) {
			$('.has-img-wrapper').hide();
			$('.not-img-wrapper').fadeIn();
			$('.cr-step-win-err').html(' ').hide();
			$('.up-load-img-btn').removeClass('global-btn-styl');
			return;
		}
		var fnameArr = [];
		plen.each(function () {
			var fname = $(this).find('.upload-files-name').html();
			fnameArr.push(fname);
		})
		var iqueArr = unique(fnameArr);
		if (iqueArr.length !== fnameArr.length) {
			$('.cr-step-win-err').html('请删除重复的图片！').fadeIn();
			$('.up-load-img-btn').removeClass('global-btn-styl');
			return;
		}
		$('.cr-step-win-err').html(' ').hide();
		$('.up-load-img-btn').addClass('global-btn-styl');
	});
}

$(function () {
	controlModal();
})