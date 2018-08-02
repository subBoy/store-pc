function showModal() {
	$('#up-load-img-win').fadeIn();
}

function hideModal() {
	$('#up-load-img-win').fadeOut();
}

function controlModal () {
	$('.up-load-img-item').on('click', function () {
		var clickState = $(this).attr('status');
		if (clickState !== '0') {
			$('#look-big-img-win').fadeIn();
			return;
		}
		showModal();
	})
	var errTimer;
	$('#start-uploading-btn').on('click', function () {
		if (uploadImg.length > 4) {
			clearTimeout(errTimer);
			$('.up-load-img-err-txt').fadeIn();
			errTimer = setTimeout(function () {
				$('.up-load-img-err-txt').fadeOut();
			}, 1000)
			return;
		}
		showModal();
	})
	$('.win-close-btn').on('click', function () {
		hideModal();
		clearAll();
	})
	$('.up-load-img-btn').on('click', function () {
		if (!$(this).hasClass('global-btn-styl')) {
			return;
		}
		for (var i = 0; i < uploadImg.length; i++) {
			$('.up-load-img-item').eq(i).attr('status', 1).find('img').attr('src', uploadImg[i]);
		}
		$('.cr-step-le-desc').hide();
		$('.look-big-img-btn').fadeIn();
		hideModal();
		clearAll();
	})
}

var Dragfiles = (function () {
	var instance;
	return function () {
		if (!instance) {
			instance = new FormData();
		}
		return instance;
	}
}());

FormData.prototype.deleteAll = function () {
	var _this = this;
	this.forEach(function (value, key) {
		_this.delete(key);
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
upLoadArea.ondrop = function (e) {
	e.preventDefault();
	e.stopPropagation();
	$('.cr-step-win-err').html(' ').hide();
	var files = e.dataTransfer.files;
	var len = files.length - 0;
	var xlen = $('.has-img-wrapper').find('p').length - 0;
	var zLen = len + xlen;
	var xxLen = len + uploadImg.length;
	var overNum = 5 - uploadImg.length;
	if (zLen > 5) {
		$('.cr-step-win-err').html('最多只能上传5张图片！').fadeIn();
		return;
	}
	if (xxLen > 5) {
		$('.cr-step-win-err').html('最多只能上传5张图片, 您已上传' + uploadImg.length + '张图片，还可上传' + overNum + '张图片！').fadeIn();
		return;
	}
	var	i = 0;
	var frag = document.createDocumentFragment();
	var fileBox, time, size;
	var newForm = Dragfiles();
	while(i < len){
		size = Math.round(files[i].size * 100 / 1024) / 100 + 'KB';
		if (files[i].type.indexOf("image") == -1 || size > 1024) {
			$('.cr-step-win-err').html('仅支持1M以内jpg、jpeg、gif、png格式图片上传！').fadeIn();
			return;
		}
		fileBox = document.createElement('p');
		time = files[i].lastModifiedDate.toLocaleDateString() + ' ' + files[i].lastModifiedDate.toTimeString().split(' ')[0];
		fileBox.innerHTML = '<span class="upload-files-name in-block">' + files[i].name + '</span><span class="upload-files-time in-block">' + time + '</span><span class="upload-files-size in-block">' + size + '</span><span class="upload-files-del-btn in-block">删除</span>';
		frag.appendChild(fileBox);
		newForm.append(files[i].name, files[i]);
		(function (i) {
			var fr = new FileReader();
			fr.readAsDataURL(files[i]);
			fr.onload = function (ev){
			  var Url = ev.target.result;
			  uploadImg.push(Url);
			}
		})(i)
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
	var data = Dragfiles(); 
	data.deleteAll();
	$('.has-img-wrapper').hide().empty();
	$('.not-img-wrapper').fadeIn();
	$('.cr-step-win-err').html(' ').hide();
	$('.up-load-img-btn').removeClass('global-btn-styl');
}

function delOne () {
	$(".upload-files-del-btn").on('click', function () {
		var temp = Dragfiles();
		var key = $(this).siblings('.upload-files-name').html();
		temp.delete(key);
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