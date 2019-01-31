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
		var thisVal = $(this).val();
		var len = thisVal.length;
		if (len > 200) {
			len = 200;
			$(this).val(thisVal.substring(0, 200));
		}
		$('#font-length').html(len + '/200字');
	})
}
function delgeTab () {
	var idx;
	$('.getb-del-btn-wrapper').on('click', function () {
		idx = $(this).parent().parent().parent().index();
		$('.groove-table-win-wrapper').fadeIn();
	})
	$('.pc-del-btn').on('click', function () {
		idx = $(this).parent().parent().parent().index();
		$(this).parent().parent().parent().parent().addClass('del_this_dom');
		$('.groove-table-win-wrapper').fadeIn();
	})
	$('.groove-table-win-close-btn').on('click', function () {
		$('.groove-table-win-wrapper').fadeOut();
		$('.del_this_dom').removeClass('del_this_dom');
	})
	$('.groove-table-win-sumbit-btn').on('click', function () {
		$('.groove-table-itrm').eq(idx).remove();
		$('.del_this_dom .groove-item-js').eq(idx).remove();
		$('.groove-table-win-wrapper').fadeOut();
		var len = $('.del_this_dom').find('.groove-item-js').length;
		if (len < 1) {
			$('.del_this_dom').siblings('.groove-not-data').fadeIn();
			$('.del_this_dom').hide();
		}
		$('.del_this_dom').removeClass('del_this_dom');
	})
	$('.groove-item-link').on('click', function () {
		$('#groove-table-content').hide();
		$('#groove-list-content').fadeIn();
	})
}
function isReport () {
	$('.report-btn-wrapper').on('click', function () {
		$('.groove-win-wrapper').fadeIn();
	})
	$('.groove-win-close-btn, .groove-win-sumbit-btn').on('click', function () {
		$('.groove-win-wrapper').fadeOut();
		$('.sel-geim-checkbox').attr('checked', false);
		$('.sel-geim-checkbox').parent().removeClass('seled');
	})
}
function clickDrop () {
	$('#geUpImgBtn').on('click', function () {
		return $('#chooseImg').click();
	})
}
function selectImg(file) {
	var files = file.files;
	var fr = new FileReader();
	fr.readAsDataURL(files[0]);
	fr.onload = function (ev){
	  var Url = ev.target.result;
	  $('#geViewImg').attr('src', Url);
	  setTimeout(function () {
	  	$('.up-ge-img-view').fadeIn();
	  }, 20)
	}
}
function delImg () {
	$('.up-ge-close').on('click', function () {
		$('.up-ge-img-view').fadeOut();
		setTimeout(function () {
			$('#geViewImg').attr('src', '');
	  }, 1000)
	})
}
function addTate () {
	$('#geAddTate').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		$('.up-ge-tate-view').fadeIn();
	})
	$('.up-ge-tate-view').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
	})
	$('.ge-tate-item').on('click', function () {
		var thisVal = $(this).html();
		$('.up-ge-tate-view').fadeOut();
	})
}
var audioTime = 0;
function setRecordFuc () {
	var isInit = 1;
	$('.ly-btn').hover(function () {
		if (isInit === 1) {
			$('.ge-record-desc').fadeIn();
		}
	}, function () {
		$('.ge-record-desc').fadeOut();
	})
	var sTime = 0;
	var sh;
	$('.ly-btn').on('click', function () {
		if (!recorder) {
			return;
		}
		if (isInit === 1 || isInit === 3) {
			funStart();
			isInit = 2;
			sTime = 0;
			$('.retime-wrapper').html('00:00');
			$('.ge-record-desc, .recording-ctr').hide();
			$('.ly-btn').addClass('start').removeClass('end');
			sh = setInterval(function () {
				sTime++;
				var hours = '0' + parseInt(sTime / 60);
				var ms = '0' + (sTime % 60);
				hours = hours.substring(hours.length - 2, hours.length);
				ms = ms.substring(ms.length - 2, ms.length);
				$('.retime-wrapper').html(hours + ':' + ms);
			}, 1000);
			$('.recording-time').fadeIn();
			return;
		}
		if (isInit === 2) {
			$('.recording-time').hide();
			clearInterval(sh);
			audioTime = sTime;
			funStop();
			sTime = 0;
			$('.recording-ctr').fadeIn();
			isInit = 3;
			$('.ly-btn').addClass('end').removeClass('start');
		}
	})
	$('.recording-play-btn').on('click', function () {
		var geAudio = document.getElementById('geAudio');
		var paused = geAudio.paused;
		if (paused) {
			$(this).addClass('isPlay');
			geAudio.play();
			SW.setNoise(0.5);
		} else {
			$(this).removeClass('isPlay');
			geAudio.pause();
			SW.setNoise(0);
		}
		geAudio.onended = function () {
			$('.recording-play-btn').removeClass('isPlay');
			SW.setNoise(0);
		}
	})
	$('.recording-del-btn').on('click', function () {
		isInit = 1;
		$('.recording-ctr, .recording-time').hide();
		$('.ly-btn').removeClass('start end');
	})
}
var recorder = new MP3Recorder({
  debug:true,
  funOk: function () {
  },
  funCancel: function (msg) {
  	$('.ge-record-desc').html(msg);
    recorder = null;
  }
});
var mp3Blob;
function funStart () {
  recorder.start();
}
function funStop () {
  recorder.stop();
  recorder.getMp3Blob(function (blob) {
    mp3Blob = blob;
    var url = URL.createObjectURL(mp3Blob);
    var div = document.createElement('div');
    var au = document.createElement('audio');
    var hf = document.createElement('a');
    au.controls = true;
    au.id = 'geAudio';
    au.src = url;
    hf.href = url;
    hf.download = new Date().toISOString() + '.mp3';
    hf.innerHTML = hf.download;
    div.appendChild(au);
    div.appendChild(hf);
    $('#recordingslist').html(div);
		$('.recording-times').html(audioTime + '"');
  });
}
function funUpload () {
  var fd = new FormData();
  var mp3Name = encodeURIComponent('audio_recording_' + new Date().getTime() + '.mp3');
  fd.append('mp3Name', mp3Name);
  fd.append('file', mp3Blob);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      recordingslist.innerHTML += '上传成功：<a href="' + xhr.responseText + '" target="_blank">' + mp3Name + '</a>';
    }
  };
  xhr.open('POST', 'upload.ashx');
  xhr.send(fd);
}

function SiriWave(opt){
	this.opt = opt || {};

	this.K = 2;
	this.F = 6;
	this.speed = this.opt.speed || 0.1;
	this.noise = this.opt.noise || 0;
	this.phase = this.opt.phase || 0;

	if (!devicePixelRatio) devicePixelRatio = 1;
	this.width = devicePixelRatio * (this.opt.width || 320);
	this.height = devicePixelRatio * (this.opt.height || 100);
	this.MAX = (this.height/2)-4;

	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.canvas.style.width = (this.width/devicePixelRatio)+'px';
	this.canvas.style.height = (this.height/devicePixelRatio)+'px';
	(this.opt.container || document.body).appendChild(this.canvas);
	this.ctx = this.canvas.getContext('2d');

	this.run = false;
}

SiriWave.prototype = {
	_globalAttenuationFn: function(x){
		return Math.pow(this.K*4/(this.K*4+Math.pow(x,4)),this.K*2);
	},
	_drawLine: function(attenuation, color, width){
		this.ctx.moveTo(0,0);
		this.ctx.beginPath();
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = width || 1;
		var x, y;
		for (var i=-this.K; i<=this.K; i+=0.01) {
			x = this.width*((i+this.K)/(this.K*2));
			y = this.height/2 + this.noise * this._globalAttenuationFn(i) * (1/attenuation) * Math.sin(this.F*i-this.phase);
			this.ctx.lineTo(x, y);
		}
		this.ctx.stroke();
	},
	_clear: function(){
		this.ctx.globalCompositeOperation = 'destination-out';
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.globalCompositeOperation = 'source-over';
	},
	_draw: function(){
		if (!this.run) return;
		this.phase = (this.phase+this.speed)%(Math.PI*64);
		this._clear();
		this._drawLine(-2, 'rgba(240,62,77,0.1)');
		this._drawLine(-6, 'rgba(240,62,77,0.2)');
		this._drawLine(4, 'rgba(240,62,77,0.4)');
		this._drawLine(2, 'rgba(240,62,77,0.6)');
		this._drawLine(1, 'rgba(240,62,77,1)', 1.5);
		requestAnimationFrame(this._draw.bind(this), 1000);
	},
	start: function(){
		this.phase = 0;
		this.run = true;
		this._draw();
	},

	stop: function(){
		this.run = false;
		// this._clear();
	},
	setNoise: function(v){
		this.noise = Math.min(v, 1)*this.MAX;
	},
	setSpeed: function(v){
		this.speed = v;
	},
	set: function(noise, speed) {
		this.setNoise(noise);
		this.setSpeed(speed);
	}
};

var SW = new SiriWave({
  width: 70,
  height: 26,
  container: document.getElementById('recording-line-bar')
});
SW.setSpeed(0.2);
SW.setNoise(0);
SW.start();

function sortFuc () {
	if ($('.groove-item-icon-bool').length < 1) {
		return;
	}
	$('.groove-table-itrm').arrangeable({dragSelector: '.groove-item-icon-bool'});
}
$(function () {
	getNowTime();
	setPl();
	delgeTab();
	isReport();
	clickDrop();
	delImg();
	addTate();
	setRecordFuc();
	sortFuc();
})