$.extend(window, {
  accountVerify: function (account) {
		// 账号验证
		var obj = {
	  	status: true,
	  	msg: ''
	  };
		if (!account) {
		  obj.status = false;
	  	obj.msg = '账号不能为空！';
		  return obj;
		}
		var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	  var reg1 = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
	  if(!reg.test(account) && !reg1.test(account)){
	  	obj.status = false;
	  	obj.msg = '账号格式错误！';
	  	return obj;
	  }
	  if(reg.test(account)){
	  	obj.status = true;
	  	obj.type = 'mobile';
	  	obj.msg = '';
	  	return obj;
	  }
	  if(reg1.test(account)){
	  	obj.status = true;
	  	obj.type = 'email';
	  	obj.msg = '';
	  	return obj;
	  } 
	  return obj;
	},
	passwordVerify: function (password) {
		// 密码验证
		var obj = {
	  	status: true,
	  	msg: ''
	  };
		if (!password) {
		  obj.status = false;
	  	obj.msg = '密码不能为空！';
		  return obj;
		}
		if(password.length < 8 || password.length > 16){
	    obj.status = false;
	  	obj.msg = '密码长度需控制在8-16位！';
		  return obj;
	  }
	  var reg2 = /^[a-zA-Z0-9]\w{7,15}$/;
	  if(!reg2.test(password)){
	    obj.status = false;
	  	obj.msg = '密码不能还有特殊字符！';
		  return obj;
	  }
	  return obj;
	},
	nonNull: function (str, name) {
		// 必填验证
		var obj = {
	  	status: true,
	  	msg: ''
	  };
		if (!str) {
		  obj.status = false;
	  	obj.msg = name + '不能为空！';
		  return obj;
		}
		return obj;
	},
	navHighlight: function () {
		// 设置导航高亮
		var itemIndex = $('#nav-item-index').val();
		$('.header-nav-item .nav-item-link').removeClass('now-link');
		$('.header-nav-item').eq(itemIndex).find('.nav-item-link').addClass('now-link');
	},
	globalInputNum: function (callback) {
		$('.remove-btn').on('click', function () {
			var _input = $(this).siblings('.reserve-goods-input');
			var _val = _input.val()
			_val--;
			if (_val <= 1) {
				_val = 1;
				$(this).addClass('islimit');
			} else {
				$(this).removeClass('islimit');
			};
			_input.val(_val);
			if (callback) {
				callback();
			}
		})
		$('.add-btn').on('click', function () {
			var _input = $(this).siblings('.reserve-goods-input');
			$(this).siblings('.remove-btn').removeClass('islimit');
			var _val = _input.val()
			_val = _val - 0 + 1;
			_input.val(_val);
			if (callback) {
				callback();
			}
		})
	},
	globalLoading: function () {
		var prg = 0;
		var timer = setInterval(function () {
			if (prg >= 90) {
				clearInterval(timer);
				prg = 90;
			} else {
				prg = prg - 0 + 1.5;
			}
			$('.loading-bar').animate({
				width: prg + '%'
			}, 50)
		}, 50);
		window.onload = function () {
			clearInterval(timer);
			prg = 100;
		  $('.loading-bar').animate({
				width: prg + '%'
			}, 100, function () {
				$('#loading-wrapper').delay(300).hide(0);
				setTimeout(function () {
					$('body').removeClass('not-scroll');
				}, 300);
			})
			initNav();
		}
	},
	goToTop: function () {
		var sTop = $(window).scrollTop();
		var cardinal = 0;
    var _to = function () {
			cardinal = (sTop - cardinal) / 20;
      if (cardinal < 300) {
      	if (sh) {
        	clearInterval(sh);
      	}
      	$("html,body").animate({
					scrollTop: 0 + 'px'
				}, 500);
      } else {
      	$("html,body").animate({
					scrollTop: cardinal + 'px'
				}, 500);
      }
    };
    var sh = setInterval(_to, 10);
  },
  vmCon: function (str) {
  	$('.cr-info-vm').each(function () {
  		var _h = $(this).height();
  		if (str === 'not-an') {
  			$(this).animate({
					'margin-top': '-' + _h / 2 + 'px'
				}, 0)
				return;
  		}
			$(this).animate({
				'margin-top': '-' + _h / 2 + 'px'
			}, 500)
  	})
  },
  goBack: function () {
  	window.history.go(-1)
  },
  GetQueryString: function (name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r!=null) {
			return  unescape(r[2]);
		} 
		return null;
	},
	countDown: function () {
		var _obj = $('.count-time-group');
		_obj.each(function () {
			var date = $(this).attr('endTime');
			var txt = '', _html = '', _d, _h, _m, _s;
			var _date = new Date(date).getTime();
			var _now = new Date().getTime();
			var _differ = parseInt(_now - _date);
			if (_differ >= 0) {
				_d = '00';
				_h = '00';
				_m = '00';
				_s = '00';
			} else {
				_differ = -parseInt(_differ / 1000);
				_d = parseInt(_differ / 24 / 3600);
				_h = parseInt((_differ % (24 * 3600)) / 3600);
				_m = parseInt(((_differ % (24 * 3600)) % 3600) / 60);
				_s = parseInt(((_differ % (24 * 3600)) % 3600) % 60);
				_d = padLeftZero(_d + '');
				_h = padLeftZero(_h + '');
				_m = padLeftZero(_m + '');
				_s = padLeftZero(_s + '');
			}

			txt = _h + _m + _s + '';
			var arr = txt.split('');
			_html += '<span class="c-all in-block">' + arr[0] + '</span>'
				    +'<span class="c-all in-block">' + arr[1] + '</span>'
				    +'<span class="c-all in-block c-styl">:</span>'
				    +'<span class="c-all in-block">' + arr[2] + '</span>'
				    +'<span class="c-all in-block">' + arr[3] + '</span>'
				    +'<span class="c-all in-block c-styl">:</span>'
				    +'<span class="c-all in-block">' + arr[4] + '</span>'
				    +'<span class="c-all in-block">' + arr[5] + '</span>';

			$(this).html(_html);
		});
	},
	padLeftZero: function (str) {
	  return ('00' + str).substr(str.length);
	},
	initNav: function () { 
	  var sTop = $(window).scrollTop();
	  var sWidth = $(window).width(); 
	  var sHeight = $(window).height(); 
	  var bH = $('body').height();
	  if (bH > sHeight * 2) {
	  	$('.scroll').show();
	  } else {
	  	$('.scroll').hide();
	  }
	  if (sTop > sHeight) {
	  	$('.go-to-top-btn').fadeIn();
	  	$('.scroll').hide();
	  } else {
	  	$('.go-to-top-btn').fadeOut();
	  	if (bH > sHeight * 2) {
		  	$('.scroll').show();
		  }
	  }
	  if (sWidth < 1340) {
	  	$(".global-body, .header-wrapper").removeClass('win-nav');
	  	$(".header-logo").fadeIn();
	  	$(".header-logo-l").removeClass('win-nav-top set-animation');
	  	return;
	  }
	  sTop = parseInt(sTop);
	  var timer = '';
	  var timer1 = '';
	  if (sTop >= 10) {
	  	$(".global-body, .header-wrapper").addClass('win-nav');
	  	$(".header-logo").hide();
	  	$(".header-logo-l").addClass('win-nav-top set-animation');
	  } else {
	  	$(".global-body, .header-wrapper").removeClass('win-nav');
	  	$(".header-logo").fadeIn();
	  	$(".header-logo-l").removeClass('win-nav-top set-animation');
	  }
	}
})
$(function () {
	globalLoading();
	vmCon();
})