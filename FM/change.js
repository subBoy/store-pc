function selectImg(file) {
  if (!file.files || !file.files[0]){
  	$('.select-img-btn').show();
  	$('.select-img-again').hide();
    $('.sureCut').removeClass('global-btn-styl');
    $('.circular-desc').html('当前封面');
    return;
  }
  if (file.files[0].type !== 'image/jpeg' && file.files[0].type !== 'image/png') {
  	$('.urio-avatar-desc').html('请上传JPG、PNG等格式的图片！')
  	return;
  }
  if (file.files[0].size > 2 * 1024 * 1024) {
  	$('.urio-avatar-desc').html('请上传小于2M的图片！')
  	return;
  }
  var reader = new FileReader();
  reader.onload = function (evt) {
    var replaceSrc = evt.target.result;
    $('#tailoringImg').cropper('replace', replaceSrc, false);
    $('.select-img-btn').hide();
    $('.select-img-again').show();
    $('.sureCut').addClass('global-btn-styl');
    $('.circular-desc').html('封面预览');
    $('.urio-avatar-desc').html('');
  }
  reader.readAsDataURL(file.files[0]);
}

function cropperImg () {
	$('#tailoringImg').cropper({
	  aspectRatio: 1/1,
	  preview: '.previewImg',
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

	$("#sureCut").on("click",function () {
		if (!$(this).hasClass('global-btn-styl')) {
			return;
		}
		if ($("#tailoringImg").attr("src") == null ){
		  return false;
		} else {
		  var cas = $('#tailoringImg').cropper('getCroppedCanvas');
		  var base64url = cas.toDataURL('image/png');
		  $(".fm-song-group-poster-img").prop("src", base64url);
		  $('.urio-avatar-desc').html('更新成功！');
		  setTimeout(function () {
		  	$('#change-song-list-poster-win').fadeOut();
		  	$('.urio-avatar-desc').html('');
		  }, 1000)
		}
	});

	$(".select-img-again, .select-img-btn").on('click', function () {
		return $('#chooseImg').click();
	})

	var avatarSrc = $('.fm-song-group-poster-img').attr('src');
	$('#finalImg').attr('src', avatarSrc);
}

function getTTaaFontLen () {
	var len = $('.csliw-ct-desc-ttaa').val().length;
	$('.csliw-ct-desc-font-num').html(len + '/100');
}
var thisPidx;
function changeAvatar () {
	$('.chang-fsgp-btn').on('click', function () {
		$('#change-song-list-poster-win').fadeIn();
		vmCon('not-an');
	})
	$('.user-cpm-close-btn').on('click', function () {
		$('#change-song-list-poster-win, #change-song-list-info-success, #add-song-to-success, #add-song-to-err').fadeOut();
	})
	$('.change-song-list-info-btn, #span-btn-change').on('click', function () {
		thisPidx = $(this).parent().index();
		getTTaaFontLen();
		$('#change-song-list-info-win').fadeIn();
		vmCon('not-an');
	})
	$('.csliw-close-btn, .csliw-btn-close').on('click', function () {
		$('#change-song-list-info-win').fadeOut();
	})
	$('.csliw-btn-submit').click(function () {
		var thisDesc = $('#csliw-ct-desc-ttaa').val();
		var thisPoster = $('.fm-song-group-poster-img').attr('src');
		var thisName = $('.csliw-ct-name-inp').val();
		var thisClass = $('.csliw-ct-txt-table').html();
		$('.fm-song-group-item').eq(thisPidx).find('.fm-song-group-desc').html(thisDesc.substring(0, 20) + '...');
		$('.fm-song-group-item').eq(thisPidx).find('.fm-song-group-img').attr('src', thisPoster);
		$('.fm-song-group-item').eq(thisPidx).find('.fm-song-group-tle-link').html(thisName);
		$('#slgi-ct-desc').html(thisDesc);
		$('#slgi-ct-poster').attr('src', thisPoster);
		$('#slgi-ct-name').html(thisName);
		$('#slgi-ct-class').html(thisClass);
		$('#change-song-list-info-success').fadeIn();
		vmCon('not-an');
		$('#change-song-list-info-win').hide();
		setTimeout(function () {
			$('#change-song-list-info-success').fadeOut();
		}, 1000)
	})
	$('.csliw-ct-desc-ttaa').on('input', function () {
		var thisVal = $(this).val();
		var len = thisVal.length;
		if (len > 100) {
			len = 100;
			$(this).val(thisVal.substring(0, 100));
		}
		$('.csliw-ct-desc-font-num').html(len + '/100');
	})
	$('.csliw-ct-txt-table-list-box .fm-tb-txt').click(function (e) {
		e.stopPropagation();
    if($(this).hasClass('seld')) {
      $(this).removeClass('seld');
    } else {
      $(this).addClass("seld").siblings('.fm-tb-txt').removeClass('seld');;
    }
    getTableData();
  })
  $('.csliw-ct-txt-table').click(function (e) {
  	e.stopPropagation();
  	if($(this).hasClass('seled')) {
      $(this).removeClass('seled');
      $('.csliw-ct-txt-table-list-wrapper').slideUp();
    } else {
      $(this).addClass("seled");
      $('.csliw-ct-txt-table-list-wrapper').slideDown();
    }
  })
}

function getTableData () {
	var xDom = $('.csliw-ct-txt-table-list-box').find('.fm-more-table-item');
	var xml = '';
	xDom.each(function (idx) {
		var xxDom = $(this).find('.fm-tb-txt');
		xxDom.each(function (iidx) {
			if ($(this).hasClass('seld')) {
				xml += '/' + $(this).html();
			}
		})
	})
	$('.csliw-ct-txt-table').html(xml.substring(1, xml.length));
}

$(function () {
	changeAvatar();
	cropperImg();
})