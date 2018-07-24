var sh, hr, st;
function initNav () { 
  var sTop = $(window).scrollTop();
  var sWidth = $(window).width(); 
  if (sTop >= 100) {
  	$('.go-to-top-btn').fadeIn();
  } else {
  	$('.go-to-top-btn').fadeOut();
  }
  if (sWidth < 1340) {
  	$(".global-body, .header-wrapper").removeClass('win-nav');
  	$(".header-logo").removeClass('win-nav win-nav-top set-animation');
  	return;
  }
  sTop = parseInt(sTop);
  var timer = '';
  if (sTop >= 10) {
  	clearTimeout(timer);
  	$(".global-body, .header-wrapper").addClass('win-nav');
  	$(".header-logo").addClass('win-nav-top');
  	timer = setTimeout(function () {
  		$(".header-logo").addClass('win-nav set-animation');
  	}, 500);
  } else {
  	$(".global-body, .header-wrapper").removeClass('win-nav');
  	$(".header-logo").removeClass('win-nav win-nav-top set-animation');
  }
}
function setWinNav () {
	$(window).bind("scroll", initNav);
}
function winResize () {
	$(window).resize(initNav);
}
function setNavItemStyl () {
	var navIdx = $("#nav-item-index").val();
	var navItem = $(".header-nav-item");
	navItem.find('.nav-item-link').removeClass('now-link');
	navItem.each(function () {
		var itemIdx = $(this).attr("itemIdx");
		if (navIdx === itemIdx && navIdx !== undefined && itemIdx !== undefined) {
			$(this).find('.nav-item-link').addClass('now-link');
		};
	});
}
function setInputFB () {
	$('input.fb').each(function(){
		var oldVal = $(this).val();
		$(this).focus(function () {
			var nowVal = $(this).val();
			if (nowVal === oldVal) {
				$(this).val('');
			}
		}).blur(function () {
			var nowVal = $(this).val();
			if (nowVal === '') {
				$(this).val(oldVal);
			}
		})
	})

	$('input.sign-input').each(function(){
		$(this).focus(function () {
			$(this).parent().addClass('add-styl');
			$('#err-txt-wrapper').html('');
		}).blur(function () {
			$(this).parent().removeClass('add-styl');
		})
	})
}
function fromVerify () {
	$(".userAccount").focus(function () {
		clearTimeout(st);
		var accmountList = $('.sign-accmount-wrapper .sign-accmount-item');
		if (accmountList.length) {
			$('.sign-accmount-wrapper').show();
			if (!st) {
				shotcut();
			}
		}
	}).blur(function () {
		st = setTimeout(function () {
			$('.sign-accmount-wrapper').hide();
			var userAccount = $.trim($(".userAccount").val());
			var  obj = nonNull(userAccount, '账号');
			if (!obj.status) {
				$('#err-txt-wrapper').html(obj.msg);
			}
		}, 300);
	})

	$(".userPassword").blur(function () {
		var userPassword = $.trim($(".userPassword").val());
		var  obj = nonNull(userPassword, '密码');
		if (!obj.status) {
			$('#err-txt-wrapper').html(obj.msg);
		}
	})

	$(".userCode").blur(function () {
		var userCode = $.trim($(".userCode").val());
		var  obj = nonNull(userCode, '验证码');
		if (!obj.status) {
			$('#err-txt-wrapper').html(obj.msg);
		}
	})
}
function login () {
		var userAccount = $.trim($(".userAccount").val());
		var  obj = nonNull(userAccount, '账号');
		if (!obj.status) {
			$('#err-txt-wrapper').html(obj.msg);
      return;
		}

		var userPassword = $.trim($(".userPassword").val());
		var  obj2 = nonNull(userPassword, '密码');
		if (!obj2.status) {
			$('#err-txt-wrapper').html(obj2.msg);
      return;
		}

		var userCode = $.trim($(".userCode").val());
		var  obj3 = nonNull(userCode, '验证码');
		var imgCodeStatus = true;
		// imgCodeStatus 此变量决定是否验证图片验证码
		if (!obj3.status && imgCodeStatus) {
			$('#err-txt-wrapper').html(obj3.msg);
      return;
		}
    //在下面执行登录操作
    // ...
}
function clearDefault () {
	$('.nav-sp-cart-group').mouseover(function(e){
		e.stopPropagation();
		e.preventDefault();
  });
}
function levelNav () {
	$('.header-nav-item').find('.nav-item-link').hover(function () {
		var levelName = $(this).parent().attr('levelName');
		if (!levelName) {
			return;
		}
		clearTimeout(sh);
		$('.header-nav-list-info').hide();
		$('.header-nav-list-ctr').show();
		var navList = $('.header-nav-list-info');
		for (var i = 0; i < navList.length; i++) {
			(function (i) {
				var _levelName = navList.eq(i).attr('levelName');
				if (levelName === _levelName) {
					navList.eq(i).show();
					navList.eq(i).addClass('fade-In');
				}
			})(i)
		}
	}, function () {
		$('.header-nav-list-info').removeClass('fade-In');
		sh = setTimeout(function () {
			$('.header-nav-list-ctr, .header-nav-list-info').hide();
		}, 300);
	})

	$('.header-nav-list-info').hover(function () {
		clearTimeout(sh);
		$(this).show();
		$('.header-nav-list-ctr').show();
		$(this).addClass('fade-In');
		var levelName = $(this).attr('levelName'); 
		var navlist = $('.header-nav-item');
		for (var i = 0; i < navlist.length; i++) {
			(function (i) {
				var _levelName = navlist.eq(i).attr('levelName');
				if (_levelName && levelName === _levelName) {
					navlist.eq(i).find('.nav-item-link').addClass('now-link');
				}
			})(i)
		}
	}, function () {
		$(this).removeClass('fade-In');
		$('.nav-item-link').removeClass('now-link');
		sh = setTimeout(function () {
			$('.header-nav-list-ctr, .header-nav-list-info').hide();
		}, 300);
	})
}
function headerNavR () {
	$('.header-r').hover(function () {
		clearTimeout(hr);
		$('.header-r-nav-list-ctr').show();
		hr = setTimeout(function () {
			$('.header-r-nav-list-ctr').addClass('unfold');
		}, 10)
	}, function () {
		$('#err-txt-wrapper').html('');
		$('.header-r-nav-list-ctr').removeClass('unfold');
		hr = setTimeout(function () {
			$('.header-r-nav-list-ctr').hide();
			$('.header-r-nav-unfold').hide();
		}, 300)
	})

	$('.header-r-item').hover(function () {
		$('.arrows-top').removeClass('cart-site user-site');
		var _index = $(this).index();
		if (_index === 0) {
			$(".arrows-top").addClass('cart-site');
		} else if (_index === 1) {
			$(".arrows-top").addClass('user-site')
		}
		var unfold = $(this).attr('unfold');
		var rItems = $('.header-r-nav-unfold');
		for (var i = 0; i < rItems.length; i++) {
			(function (i) {
				var _unfold = rItems.eq(i).attr('unfold');
				if (unfold === _unfold) {
					$('.header-r-nav-unfold').hide();
					rItems.eq(i).show();
				}
			})(i)
		}
	}, function () {
		$('#err-txt-wrapper').html('');
	})
}
function delCartSp () {
	$('.del-sp-btn-ctr').on('click', function () {
		$(this).parent().addClass('del');
		var _this = $(this);
		setTimeout(function () {
			_this.parent().remove();
			var spList = $('.nav-sp-cart-item');
			if (!spList.length) {
				$('.nav-sp-cart-group').hide();
				$('.sp-air-cart-wrapper').show();
			}
		}, 300)
		$('.header-r-nav-list-ctr').show();
	})
}
function shotcut () {
	$('.sign-accmount-item').on('click', function () {
		clearTimeout(st);
		var _thisVal = $(this).html();
		$('.userAccount').val(_thisVal);
		$(this).parent().parent().hide();
	})
}
function setFooterStyle () {
	var _child = $('.gl-content-wrapper').find('.footer-nav-wrapper');
	if (!_child.length || _child.length === 0) {
		$('.gl-content-wrapper').find('.footer-omit-wrapper').addClass('ft-2');
	}
}
$(function () {
	setFooterStyle();
	initNav(); // 判断悬浮导航出现的时机
	winResize(); // 浏览器窗口变化做出处理
	setNavItemStyl(); // 设置当前页面所属导航样式
	setWinNav(); // 浏览器滚动操作
	setInputFB(); // input设置聚焦&失焦操作
	fromVerify(); // 表单验证
	$("#login-btn-ctr").on('click', login); // 登录
	clearDefault(); // 阻止冒泡与默认事件
	levelNav(); // 导航列表显隐操作
	headerNavR(); // 头部右侧下拉菜单显隐操作
	delCartSp(); // 头部删除购物车里面的商品操作
	navHighlight(); // 设置导航高亮
	$('.global-body').on('click', function () {
		$('.gl-ct-tle-list, .gl-sort-styles, .goods-size-list, .win-drop-down-list, .trigeminy-address-list').slideUp();
		$('.is-show').removeClass('is-show');
	})
})