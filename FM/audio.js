var playList = [
	{
		songName: '爱你今生到永远',
		songSrc: 'http://mp3.9ku.com/m4a/82693.m4a',
		singer: '顾建华',
		lrcSrc: './lrc/ai_ni_jin_sheng_dao_yong_yuan.lrc',
    duration: '03:51'
	},
	{
		songName: '谁伴我闯荡',
		songSrc: 'http://win.web.ra01.sycdn.kuwo.cn/f017d5a6f9fbbb758dd44a3322b16090/5bfb6dfa/resource/n3/192/22/16/4241161724.mp3',
		singer: 'Beyond',
		lrcSrc: './lrc/shui_ban_wo_chuang_dang.lrc',
    duration: '04:10'
	},
	// {
	// 	songName: '沙漠骆驼',
	// 	songSrc: 'http://111.202.98.149/amobile.music.tc.qq.com/C400002QebDm1vdHdE.m4a?guid=4757203178&vkey=A69AB83F21E6841E05D5CEC2C99E9C378BACC5BC8AD719AFB9C587E95B4E05D089D2CA0745361A78DA9DC472564C838F7155A4B88F0152CA&uin=0&fromtag=66',
	// 	singer: '展展与罗罗',
	// 	lrcSrc: './lrc/sha_mo_luo_tuo.lrc',
 //    duration: '05:38'
	// },
	{
		songName: '38度6',
		songSrc: 'http://win.web.nf01.sycdn.kuwo.cn/e648f1fb65ab4dd4b1093251593d7d57/5bfb6c11/resource/n2/28/96/1096023424.mp3',
		singer: '黑龙',
		lrcSrc: './lrc/38_du_6.lrc',
    duration: '03:11'
	},
	{
		songName: '起风了',
		songSrc: 'http://sc1.111ttt.cn:8282/2018/1/03m/13/396131213056.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3',
		singer: '买辣椒也用券',
		lrcSrc: './lrc/qi_feng_le.lrc',
    duration: '05:23'
	},
	{
		songName: '一晃就老了',
		songSrc: 'http://sc1.111ttt.cn:8282/2017/1/11m/11/304112003368.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3',
		singer: '秋裤大叔',
		lrcSrc: './lrc/yi_huang_jiu_lao_le.lrc',
    duration: '04:15'
	},
	{
		songName: '广东爱情故事',
		songSrc: 'http://sc1.111ttt.cn:8282/2018/1/03m/13/396131203208.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3',
		singer: '广东雨神',
		lrcSrc: './lrc/guang_dong_ai_qing_gu_shi.lrc',
    duration: '03:34'
	},
	{
		songName: '最后我们没在一起',
		songSrc: 'http://sc1.111ttt.cn:8282/2018/1/03m/13/396131155339.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3',
		singer: '白小白',
		lrcSrc: './lrc/zui_hou_wo_men_mei_zai_yi_qi.lrc',
    duration: '03:19'
	},
	{
		songName: '差一步',
		songSrc: 'http://sc1.111ttt.cn:8282/2018/1/03m/13/396131202109.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3',
		singer: '大壮',
		lrcSrc: './lrc/cha_yi_bu.lrc',
    duration: '04:05'
	},
	{
		songName: '兰芷铃音·记兰生襄铃',
		songSrc: 'http://www.17sucai.com/preview/94311/2014-05-23/sync-lyric-wit/content/songs/lan_zhi_ling_yin.mp3',
		singer: 'HITA 肉肉',
		lrcSrc: './lrc/lan_zhi_ling_yin.lrc',
    duration: '04:34'
	},
	{
		songName: '那年初夏',
		songSrc: 'http://www.17sucai.com/preview/94311/2014-05-23/sync-lyric-wit/content/songs/na_nian_chu_xia.mp3',
		singer: '任然',
		lrcSrc: './lrc/na_nian_chu_xia.lrc',
    duration: '05:08'
	}
];

var Selected = function() {
  this.audio = document.getElementById('audio');
  this.lyricContainer = document.getElementById('lyricContainer');
  this.playlist = playList;
  this.currentIndex = 0;
  this.volume = localStorage.volume || 0.5;
  this.lyric = null;
  this.timeout = null;
  this.mode = localStorage.mode || '0';
  this.playOne = []
};

Selected.prototype = {
  constructor: Selected,
  init: function() {
    var that = this,
      allSongs = this.playlist,
      currentSong, randomSong, isHasLrc;
     // this.currentIndex = Math.floor(Math.random() * allSongs.length);
    currentSong = allSongs[this.currentIndex];
    this.playOne = allSongs[this.currentIndex];
    $('.fm-auido-song').html(currentSong.songName);
    $('.fm-auido-songer').html(currentSong.singer);
    this.audio.onended = function() {
    	if (that.mode === '1') {
    		that.play(that.playOne);
    		return;
    	}
      that.playNext(that);
    }
    this.audio.onerror = function(e) {
      that.lyricContainer.textContent = '歌曲加载失败! :(';
    };
    this.audio.src = currentSong.songSrc;
    $('.fm-audio-progress .fm-audio-slider').slider({
      step: 0.1,
      slide: function (event, ui) {
        $(this).addClass('enable');
        that.setProgress(that.audio.duration * ui.value / 100);
        clearInterval(that.timeout);
      }, 
      stop: function (event, ui) {
        that.audio.currentTime = that.audio.duration * ui.value / 100;
        $(this).removeClass('enable');
        that.timeout = setInterval(that.updateProgress.bind(that), 500);
      }
    });
    $('.fm-auido-volume-progress .fm-audio-volume-slider').slider({
      max: 1, min: 0, step: 0.01, value: that.volume, slide: function (event, ui) {
        that.setVolume(ui.value);
        $(this).addClass('enable');
        $('.mute').removeClass('enable');
      }, stop: function () {
        $(this).removeClass('enable');
      }
    }).children('.fm-audio-volume-pace').css('width', that.volume * 100 + '%');
    $('.fm-auido-min-volume').click(function () {
        that.setVolume(0);
    });
    $('.fm-auido-max-volume').click(function () {
      that.setVolume(1);
    });
    that.play(currentSong, true);
    $('.fm-auido-play').click(function () {
    	if (that.audio.paused) {
    		$('.fm-auido-play').addClass('playing');
        $('.music-group-cd-img').addClass('isPlaying');
    		that.audio.play();
        $('.fm-song-box-ctr').removeClass('isPlaying').eq(that.currentIndex).addClass('isPlaying');
    		return;
    	}
    	that.audio.pause();
    	$('.fm-auido-play').removeClass('playing');
      $('.music-group-cd-img, .fm-song-box-ctr').removeClass('isPlaying');
    })
    $('.fm-auido-next').click(function () {
    	that.playNext(that);
    })
    $('.fm-auido-prev').click(function () {
    	that.playPrev(that);
    })
    if (that.mode === '1') {
      $('.fm-auido-mode').addClass('onlyOne');
    } else {
      $('.fm-auido-mode').removeClass('onlyOne');
    }
    $('.fm-auido-mode').click(function () {
    	if ($(this).hasClass('onlyOne')) {
    		$(this).removeClass('onlyOne');
    		that.mode = localStorage.mode = '0';
    	} else {
    		$(this).addClass('onlyOne');
    		that.mode = localStorage.mode = '1';
    	}
    })
    renderFuc(that);
    renderFuc2(that);
    songlistDetailFuc(that);
  },
  play: function(songInfo, status) {
    var that = this;
    $('.fm-auido-song').html(songInfo.songName);
    $('.fm-auido-songer').html(songInfo.singer);
    this.audio.src = songInfo.songSrc;
    this.lyricContainer.style.top = '0px';
    this.lyric = null;
    this.lyricContainer.textContent = 'loading...';
    this.audio.oncanplay = function() {
      if (songInfo.lrcSrc && songInfo.lrcSrc.length > 0) {
      	that.getLyric(songInfo.lrcSrc);
      } else {
        that.lyricContainer.textContent = '抱歉，没有匹配到歌词...';
      }
      if (!status) {
      	this.play();
    		$('.fm-auido-play').addClass('playing');
      }
      $('.fm-audio-progress .fm-audio-loaded').css('width', '100%');
      that.timeout = setInterval(that.updateProgress.bind(that), 500);
    };
    this.audio.ontimeupdate = function(e) {
      if (!that.lyric) return;
      for (var i = 0, l = that.lyric.length; i < l; i++) {
        if (this.currentTime > that.lyric[i][0] - 0.50) {
          var line = document.getElementById('line-' + i),
            prevLine = document.getElementById('line-' + (i > 0 ? i - 1 : i));
          if (prevLine) {
        		prevLine.className = '';
          }
          if (line) {
	          line.className = 'current-line';
            if (line.offsetTop >= 60) {
              that.lyricContainer.style.top = 62 - line.offsetTop + 'px';
            }
          }
        };
      };
    };
    // this.audio.onprogress = function () {
    //   var endVal = this.buffered && this.buffered.length ? this.buffered.end(0) : 0;
    //   $('.fm-audio-progress .fm-audio-loaded').css('width', (endVal / (this.duration || 1) * 100) + '%');
    // }
    // this.audio.durationchange = function () {
    //   var endVal = this.buffered && this.buffered.length ? this.buffered.end(0) : 0;
    //   $('.fm-audio-progress .fm-audio-loaded').css('width', (endVal / (this.duration || 1) * 100) + '%');
    // }
    $('.fm-song-box-ctr').removeClass('isPlaying').eq(that.currentIndex).addClass('isPlaying');
  },
  playAssign: function(that, crtIdx) {
    var allSongs = this.playlist,
      assignItem;
    that.currentIndex = crtIdx - 0;
    assignItem = allSongs[that.currentIndex];
    that.play(assignItem);
  },
  playNext: function(that) {
    var allSongs = this.playlist,
      nextItem;
    if (that.currentIndex === allSongs.length - 1) {
      that.currentIndex = 0;
    } else {
      that.currentIndex += 1;
    };
    nextItem = allSongs[that.currentIndex];
    that.play(nextItem);
  },
  playPrev: function(that) {
    var allSongs = this.playlist,
      prevItem;
    if (that.currentIndex === 0) {
      that.currentIndex = allSongs.length - 1;
    } else {
      that.currentIndex -= 1;
    };
    prevItem = allSongs[that.currentIndex];
    // that.setClass(that.currentIndex);
    that.play(prevItem);
  },
  setClass: function(index) {
    var allSongs = this.playlist.children[0].children;
    for (var i = allSongs.length - 1; i >= 0; i--) {
      allSongs[i].className = '';
    };
    allSongs[index].className = 'current-song';
  },
  getLyric: function(url) {
    var that = this,
      request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'text';
    request.onload = function() {
      that.lyric = that.parseLyric(request.response);
      that.appendLyric(that.lyric);
    };
    request.onerror = function(e) {
      that.lyricContainer.textContent = '歌词加载失败! :(';
    }
    this.lyricContainer.textContent = 'loading lyric...';
    request.send();
  },
  parseLyric: function(text) {
    var lines = text.split('\n'),
      pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
      result = [];
    while (!pattern.test(lines[0])) {
      lines = lines.slice(1);
    };
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function(v, i, a) {
      var time = v.match(pattern),
        value = v.replace(pattern, '');
      time.forEach(function(v1, i1, a1) {
        var t = v1.slice(1, -1).split(':');
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
      });
    });
    result.sort(function(a, b) {
      return a[0] - b[0];
    });
    return result;
  },
  appendLyric: function(lyric) {
    var that = this,
      lyricContainer = this.lyricContainer,
      fragment = document.createDocumentFragment();
    this.lyricContainer.innerHTML = '';
    lyric.forEach(function(v, i, a) {
      var line = document.createElement('p');
      line.id = 'line-' + i;
      line.textContent = v[1];
      fragment.appendChild(line);
    });
    lyricContainer.appendChild(fragment);
  },
  updateProgress: function () {
    var that = this;
    this.setProgress(that.audio.currentTime);
  },
  setProgress: function(value) {
  	var remainTime = this.audio.duration - value;
    var currentSec = parseInt(remainTime % 60) < 10 ? '0' + parseInt(remainTime % 60) : parseInt(remainTime % 60),
      ratio = value / this.audio.duration * 100;
    if (currentSec) {
      $('.fm-auido-duration').html(parseInt(remainTime / 60) + ':' + currentSec);
    }
    $('.fm-audio-progress .fm-audio-pace').css('width', ratio + '%');
  },
  setVolume: function (value) {
    this.audio.volume = localStorage.volume = value;
    $('.fm-auido-volume-progress .fm-audio-volume-slider .fm-audio-volume-pace').css('width', value * 100 + '%');
  }
}


function renderFuc (that) {
  var renderDom = '';
  for (var i = 0; i < playList.length; i++) {
    var strI = i + 1 + '';
    renderDom += '<ul class="fm-song-box-ctr">'
              +'<li class="fsbc-item fs-i-1">'
                +'<span class="fsbc-item-unitl in-block">' + ('00' + (i + 1)).substr(strI.length) + '</span>'
                +'<span class="fsbc-item-play in-block" crtIdx="' + i + '"></span>'
              +'</li>'
              +'<li class="fsbc-item fs-i-2">'
                +'<span class="fsbc-item-name">' + playList[i].songName + '</span>'
                +'<div class="itm-wrapper itm-ctr in-block">'
                  +'<div class="itm-box itm-1"></div>'
                  +'<div class="itm-box itm-2"></div>'
                  +'<div class="itm-box itm-3"></div>'
                  +'<div class="itm-box itm-4"></div>'
                +'</div>'
              +'</li>'
              +'<li class="fsbc-item fs-i-3">' + playList[i].singer + '</li>'
              +'<li class="fsbc-item fs-i-4">' + playList[i].duration + '</li>'
              +'<li class="fsbc-item fs-i-5">'
                +'<span class="fsbc-item-del fm-auido-commend in-block" crtIdx="' + i + '"></span>'
                +'<span class="fm-auido-share-wrapper in-block">'
                  +'<span class="fm-auido-share fm-auido-commend in-block"></span>'
                  +'<span class="fm-auido-share-type in-block">'
                    +'<span class="fm-auido-weixin fm-auido-commend in-block">'
                      +'<span class="fm-auido-weixin-code in-block">'
                        +'<img class="weixin-code-img" src="../home-of/images/ec.jpg">'
                      +'</span>'
                    +'</span>'
                    +'<span class="fm-auido-weibo fm-auido-commend in-block"></span>'
                    +'<span class="fm-auido-qq fm-auido-commend in-block"></span>'
                    +'<span class="fm-auido-duoban fm-auido-commend in-block"></span>'
                  +'</span>'
                +'</span>'
              +'</li>'
            +'</ul>';
  }
  $('#fm-song-group-data-wrapper').html(renderDom);
  setTimeout(function () {
    $('#fm-song-group-data-wrapper .fsbc-item-play').click(function () {
      if ($(this).parent().parent().hasClass('isPlaying')) {
        that.audio.pause();
        $('.fm-auido-play').removeClass('playing');
        $('.music-group-cd-img').removeClass('isPlaying');
        $(this).parent().parent().removeClass('isPlaying')
        return;
      }
      var crtIdx = $(this).attr('crtIdx');
      that.playAssign(that, crtIdx);
      $('.fm-song-box-ctr').removeClass('isPlaying');
      $('.music-group-cd-img').addClass('isPlaying');
      $(this).parent().parent().addClass('isPlaying');
    }) 
    var idx;
    $('#fm-song-group-data-wrapper .fsbc-item-del').on('click', function () {
      idx = $(this).attr('crtIdx');
      $('.fm-collected-song-body .groove-table-win-wrapper').fadeIn();
    })
    $('.fm-collected-song-body .groove-table-win-close-btn').on('click', function () {
      $('.fm-collected-song-body .groove-table-win-wrapper').fadeOut();
    })
    $('.fm-collected-song-body .groove-table-win-sumbit-btn').on('click', function () {
      $('#fm-song-group-data-wrapper .fm-song-box-ctr').eq(idx).remove();
      $('.fm-collected-song-body .groove-table-win-wrapper').fadeOut();
      playList.splice(idx, 1);
      $('.fm-collected-song-body .fm-auido-play, .fm-collected-song-body .fm-auido-mode').unbind();
      new Selected().init();
    }) 
  }, 20)
}

var isTor = GetQueryString('isTor');
function renderFuc2 (that) {
  var renderDom = '';
  for (var i = 0; i < playList.length; i++) {
    var strI = i + 1 + '';
    var cDom = '';
    if (isTor == '1') {
      cDom = '<span class="fsbc-item-del fm-auido-commend in-block" crtIdx="' + i + '"></span>';
    }
    renderDom += '<ul class="fm-song-box-ctr">'
              +'<li class="fsbc-item fs-i-1">'
                +'<span class="fsbc-item-unitl in-block">' + ('00' + (i + 1)).substr(strI.length) + '</span>'
                +'<span class="fsbc-item-play in-block" crtIdx="' + i + '"></span>'
              +'</li>'
              +'<li class="fsbc-item fs-i-2">'
                +'<span class="fsbc-item-name">' + playList[i].songName + '</span>'
                +'<div class="itm-wrapper itm-ctr in-block">'
                  +'<div class="itm-box itm-1"></div>'
                  +'<div class="itm-box itm-2"></div>'
                  +'<div class="itm-box itm-3"></div>'
                  +'<div class="itm-box itm-4"></div>'
                +'</div>'
              +'</li>'
              +'<li class="fsbc-item fs-i-3">' + playList[i].singer + '</li>'
              +'<li class="fsbc-item fs-i-4">' + playList[i].duration + '</li>'
              +'<li class="fsbc-item fs-i-5">'
                +'<span class="fsbc-item-collected fm-auido-commend in-block" crtIdx="' + i + '"></span>'
                +cDom
                +'<span class="fm-auido-share-wrapper in-block">'
                  +'<span class="fm-auido-share fm-auido-commend in-block"></span>'
                  +'<span class="fm-auido-share-type in-block">'
                    +'<span class="fm-auido-weixin fm-auido-commend in-block">'
                      +'<span class="fm-auido-weixin-code in-block">'
                        +'<img class="weixin-code-img" src="../home-of/images/ec.jpg">'
                      +'</span>'
                    +'</span>'
                    +'<span class="fm-auido-weibo fm-auido-commend in-block"></span>'
                    +'<span class="fm-auido-qq fm-auido-commend in-block"></span>'
                    +'<span class="fm-auido-duoban fm-auido-commend in-block"></span>'
                  +'</span>'
                +'</span>'
              +'</li>'
            +'</ul>';
  }
  $('#song-list-group-details').html(renderDom);
  setTimeout(function () {
    $('#song-list-group-details .fsbc-item-play').click(function () {
      if ($(this).parent().parent().hasClass('isPlaying')) {
        that.audio.pause();
        $('.fm-auido-play').removeClass('playing');
        $('.music-group-cd-img').removeClass('isPlaying');
        $(this).parent().parent().removeClass('isPlaying')
        return;
      }
      var crtIdx = $(this).attr('crtIdx');
      that.playAssign(that, crtIdx);
      $('.fm-song-box-ctr').removeClass('isPlaying');
      $('.music-group-cd-img').addClass('isPlaying');
      $(this).parent().parent().addClass('isPlaying');
    }) 
    var idx;
    $('#song-list-group-details .fsbc-item-del').on('click', function () {
      idx = $(this).attr('crtIdx');
      $('.fm-song-detail-body .groove-table-win-wrapper').fadeIn();
    })
    $('.fm-song-detail-body .groove-table-win-close-btn').on('click', function () {
      $('.fm-song-detail-body .groove-table-win-wrapper').fadeOut();
    })
    $('.fm-song-detail-body .groove-table-win-sumbit-btn').on('click', function () {
      $('#song-list-group-details .fm-song-box-ctr').eq(idx).remove();
      $('.fm-song-detail-body .groove-table-win-wrapper').fadeOut();
      playList.splice(idx, 1);
      $('.fm-song-detail-body .fm-auido-play, .fm-song-detail-body .fm-auido-mode').unbind();
      new Selected().init();
    })
    $('#add-song-to-win-wrapper .add-song-close-btn').click(function () {
      $('#add-song-to-win-wrapper').fadeOut();
    })
    $('#new-song-to-win-wrapper .new-song-close-btn, #new-song-to-win-wrapper .csliw-btn-close').click(function () {
      $('#new-song-to-win-wrapper').fadeOut();
    })
    $('#song-list-group-details .fsbc-item-collected').click(function () {
      $('#add-song-to-win-wrapper').fadeIn();
      vmCon('not-an');
    })
    $('#add-song-to-win-wrapper .nb-sl-btn').click(function () {
      $('#new-song-to-win-wrapper').fadeIn();
      vmCon('not-an');
    })
    $('#add-song-to-win-wrapper .add-song-to-sl-btn').click(function () {
      $('#add-song-to-win-wrapper').hide();
      $('#add-song-to-success').fadeIn(); // 成功
      // $('#add-song-to-err').fadeIn(); // 失败
      vmCon('not-an');
      setTimeout(function () {
        $('#add-song-to-err, #add-song-to-success').fadeOut();
      }, 1000)
    })
    $('.nbsl-ct-table-item').click(function () {
      if($(this).hasClass('seled')) {
        $(this).removeClass('seled');
      } else {
        $(this).addClass("seled").siblings('.nbsl-ct-table-item').removeClass('seled');;
      }
    })
    var timer;
    $('#nb-sl-btn-submit').click(function () {
      var thisName = $('.set-nbsl-name-inp').val();
      if (!thisName) {
        clearTimeout(timer);
        $('.nbsl-vy-wrapper').html('请输入新建歌单的标题！');
        timer = setTimeout(function () {
          $('.nbsl-vy-wrapper').html('');
        }, 1000)
        return;
      }
      // console.log('vySonglistname(thisName)', vySonglistname(thisName));
      // if (!vySonglistname(thisName)) {
      //   clearTimeout(timer);
      //   $('.nbsl-vy-wrapper').html('该歌单的标题已存在！');
      //   timer = setTimeout(function () {
      //     $('.nbsl-vy-wrapper').html('');
      //   }, 1000)
      //   return;
      // }
      var songListName = $('.asti-txt-name');
      var jnum = 0;
      songListName.each(function () {
        if ($(this).html() !== thisName) {
          jnum++
        }
      })
      if (jnum < songListName.length) {
        $('.nbsl-vy-wrapper').html('该歌单的标题已存在！');
        timer = setTimeout(function () {
          $('.nbsl-vy-wrapper').html('');
        }, 1000)
        return;
      }
      var thisSongListDom = '<div class="add-song-to-item add-song-to-sl-btn set-animation">'
          +'<span class="asti-img-wrapper">'
            +'<img src="../FM/images/song-poster.jpg" class="add-btn-img in-block" width="48" height="48">'
            +'<span class="in-block center-v"></span>'
          +'</span>'
          +'<p class="asti-txt-wrapper">'
            +'<span class="in-block center-v"></span>'
            +'<span class="in-block">'
              +'<span class="asti-txt-name">' + thisName + '</span>'
              +'<span class="asti-txt-desc">0首单曲</span>'
            +'</span>'
          +'</p>'
        +'</div>';
        $('#add-song-to-ct-wrapper').append(thisSongListDom);
        $('#add-song-to-nbsl').remove();
        $('.nbsl-vy-wrapper').html('创建成功');
        setTimeout(function () {
          $('.nbsl-vy-wrapper').html('');
        }, 1000)
      $('#new-song-to-win-wrapper').fadeOut();
      $('#add-song-to-win-wrapper .add-song-to-sl-btn').unbind();
      $('#add-song-to-win-wrapper .add-song-to-sl-btn').click(function () {
        $('#add-song-to-win-wrapper').hide();
        $('#add-song-to-success').fadeIn(); // 成功
        // $('#add-song-to-err').fadeIn(); // 失败
        vmCon('not-an');
        setTimeout(function () {
          $('#add-song-to-err, #add-song-to-success').fadeOut();
        }, 1000)
      })
    })
  }, 20)
}

function songlistDetailFuc (that) {
  if (isTor == '1') {
    $('#span-btn-collected').hide();
    $('#span-btn-change').show();
  } else {
    $('#span-btn-change').hide();
    $('#span-btn-collected').show();
  }
  $('#span-btn-collected').click(function () {
    if ($(this).hasClass('seled')) {
      $(this).removeClass('seled');
    } else {
      $(this).addClass('seled');
    }
  })
  $('#play-this-spng-list').click(function () {
    if (!that.audio.paused) {
      return;
    }
    $('.fm-auido-play').addClass('playing');
    $('.music-group-cd-img').addClass('isPlaying');
    that.playAssign(that, 0);
    $('.fm-song-box-ctr').removeClass('isPlaying').eq(that.currentIndex).addClass('isPlaying');
  })
}

$(function () {
  if ($("img.fm-song-group-img").length > 0) {
    $("img.fm-song-group-img").lazyload({effect: "fadeIn"});
  }
	new Selected().init();
	$('.fm-auido-collection').click(function () {
    var isLogin = false;
    if (!isLogin) {
      showHintSign();
      return;
    }
		if ($(this).hasClass('collected')) {
			$(this).removeClass('collected');
		} else {
			$(this).addClass('collected');
		}
	})
  $('.fm-auido-expand, .fm-auido-expand-btn-add').click(function () {
    $('.fm-audio-wrapper, .fm-hd-txt-wrapper').hide();
    $('.fm-auido-expand-wrapper').show();
    setTimeout(function () {
      $('.fm-auido-expand-wrapper').addClass('an-mate');
    }, 20);
  })
  $('.fm-auido-pack-up').click(function () {
    $('.fm-audio-wrapper, .fm-hd-txt-wrapper').show();
    $('.fm-auido-expand-wrapper').hide();
    setTimeout(function () {
      $('.fm-auido-expand-wrapper').removeClass('an-mate');
    }, 20);
  })
  $('.close-lrc-btn').click(function () {
    $('.lyric-wrapper-box').hide();
    $('.music-group-avtatar-wrapper').show();
  })
  $('.fm-auido-song-lrc').click(function () {
    $('.lyric-wrapper-box').show();
    $('.music-group-avtatar-wrapper').hide();
  })

  $('.fm-more-table-wrapper .fm-tb-txt').click(function (e) {
    e.stopPropagation();
    if($(this).hasClass('seld')) {
      $(this).removeClass('seld');
    } else {
      $(this).addClass("seld").siblings('.fm-tb-txt').removeClass('seld');
    }
  })
  $('.fm-more-table-submit-btn').click(function () {
    $('.fm-more-table-wrapper').slideUp();
    $('.hm-sy-nav-solt-view').removeClass('seld');
  })
  $('.hm-sy-nav-solt-view').click(function (e) {
    e.stopPropagation();
    if ($(this).hasClass('seld')) {
      $('.fm-more-table-wrapper').slideUp();
      $(this).removeClass('seld');
    } else {
      $(this).addClass('seld');
      $('.fm-more-table-wrapper').slideDown();
    }
  })
  $('.fsgl-list-close').click(function (e) {
    e.stopPropagation();
    $('.fm-song-group-list-win').slideUp();
    $('.fm-song-group-tle-wrapper .itm-ctr').removeClass('sled')
  })
  $('.fsgtw-btn').click(function () {
    $('.fm-song-group-list-win').slideDown();
    $('.fm-song-group-tle-wrapper .itm-ctr').addClass('sled')
  })
})