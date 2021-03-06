var sh, hr, st;
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
			$('#err-txt-wrapper, .convert-intergral-err, #settle-err, #snwr-err, #payment-sign-err').html('');
		}).blur(function () {
			$(this).parent().removeClass('add-styl');
		})
	})
}
function fromVerify () {
	$(".glo-userAccount").focus(function () {
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
					navlist.eq(i).find('.nav-item-link').addClass('hover-now-link');
				}
			})(i)
		}
	}, function () {
		$(this).removeClass('fade-In');
		$('.nav-item-link').removeClass('hover-now-link');
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
		$('.glo-userAccount').val(_thisVal);
		$('.sign-accmount-wrapper').hide();
	})
}
function setFooterStyle () {
	var _child = $('.gl-content-wrapper').find('.footer-nav-wrapper');
	if (!_child.length || _child.length === 0) {
		$('.gl-content-wrapper').find('.footer-omit-wrapper').addClass('ft-2');
	}
}
function checkedItem () {
	$(".global-select-input").change(function() {
		var status = $(this).is(':checked');
		if (status) {
			$(this).parent().addClass('checked-item');
		} else {
			$(this).parent().removeClass('checked-item');
			var _thisPar = $(this).parent().parent().parent().parent().find('.global-all-select-input');
			_thisPar.prop('checked', false).change();
			_thisPar.parent().removeClass('checked-item')
		}
	});
	$('.global-all-select-input').on('click', function () {
		var status = $(this).is(':checked');
		var _thisPar = $(this).parent().parent().parent().siblings('.gl-condition-item-threelevel').find('.global-select-input');
		if (status) {
			$(this).parent().addClass('checked-item');
			_thisPar.prop('checked', 'checked').change();
		} else {
			$(this).parent().removeClass('checked-item');
			_thisPar.prop('checked', false).change();
		}
	});
}
var recommend = {
	len: $('.recommended-goods-list').find('.recommended-goods-item').length,
	idx: 0,
	basics: function () {
		recommend.btnStatus();
		var _h = $('.recommended-goods-item').width();
		var sTop = _h * 4;
		$(".recommended-goods-list").animate({
			left: '-' + recommend.idx * sTop + 'px'
		}, 500);
	},
	prev: function () {
		recommend.idx--;
		if (recommend.idx <= 0) {
			recommend.idx = 0;
		}
		recommend.basics();
	},
	next: function () {
		var _len = Math.ceil(recommend.len / 4) - 1;
		recommend.idx++;
		if (recommend.idx >= _len) {
			recommend.idx = _len;
		}
		recommend.basics();
	},
	btnStatus: function () {
		$('.recommend-prev, .recommend-next').addClass('has-more');
		var _len = Math.ceil(recommend.len / 4) - 1;
		if (recommend.idx <= 0) {
			$('.recommend-prev, .recommend-next').removeClass('has-more');
			if (_len > 0) {
				$('.recommend-next').addClass('has-more');
			}
		}
		if (recommend.idx >= _len) {
			$('.recommend-prev, .recommend-next').removeClass('has-more');
			if (_len > 0) {
				$('.recommend-prev').addClass('has-more');
			}
		}
	},
	init: function () {
		var _h = $('.recommended-goods-item').width();
		$(".recommended-goods-list").animate({
			left: 0,
			width: recommend.len * _h + 'px'
		});
	}
};
function cutRecommend () {
	// 切换推荐商品
	recommend.init();
	$('.recommend-prev').on('click', recommend.prev);
	$('.recommend-next').on('click', recommend.next);
}

function getCodeFuc () {
	var times = 60;
	var codeBtnTxt = '';
	var codeClick = true;
	var timer;
	var setval = function () {
	  times--;
	  codeBtnTxt = times + 's后重试';
	  $('#getCodeBtn').addClass('not-click').html(codeBtnTxt);
	  if (times < 1) {
	    clearInterval(timer);
	    times = 60;
	    codeBtnTxt = '重新发送';
	    codeClick = true;
	    $('#getCodeBtn').removeClass('not-click').html(codeBtnTxt);
	  }
	};
	$('#getCodeBtn').on('click', function () {
		if (!codeClick) {
			return;
		}
		// var accountVal = $('#account-input-ctr').val();
		// var objVer = accountVerify(accountVal);
		// if (!objVer.status) {
		// 	$('.ppw-sign-up-btn-wrapper .ppw-sign-up-err').html(objVer.msg);
		// 	return;
		// }
		codeClick = false;
		timer = setInterval(setval, 1000)
	})
}
function setSignTypeFuc () {
	$('.sign-type-tab').on('click', function () {
		$('.glo-userAccount').val('');
		var bool = $(this).attr('isIp');
		$(this).addClass('esp').siblings().removeClass('esp');
		if (bool === 't') {
			$('.singTabType1').show();
			$('.singTabType2').hide();
			return;
		}
		$('.singTabType1').hide();
		$('.singTabType2').show();
	})
}

function ploginFuc () {
  $('#p-gd-win-wrapper').fadeOut();
}
function pwinFuc () {
	$('.gd-win-close-btn').on('click', function () {
		$('#p-gd-win-wrapper').fadeOut();
	})
	$('.glo-adu').on('click', function () {
		$('#p-gd-win-wrapper').fadeIn();
	})
}
$(function () {
	pwinFuc();
	ploginFuc();
	setSignTypeFuc();
	getCodeFuc();
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
	checkedItem();
	cutRecommend();
	$('.global-body').on('click', function () {
		$('.gl-ct-tle-list, .gl-sort-styles, .goods-size-list, .win-drop-down-list, .trigeminy-address-list, .gl-ct-tle-list, .stpps-3-select-list, .hf-sy-nav-solt-list, .ypjf-table-list').slideUp();
		$('.up-ge-tate-view').fadeOut();
		$('.is-show').removeClass('is-show');
		$('.csliw-ct-txt-table').removeClass('seled');
		$('.hm-sy-nav-solt-view, .hf-sy-nav-solt-view').removeClass('seld seled');
		$('.csliw-ct-txt-table-list-wrapper, .fm-more-table-wrapper, .emoji-img-wrapper, .emoji-img-wrapper1').slideUp();
	})
	$('.stpps-3-select-list, .sp-cart-list-wrapper, .gl-condition-list-threelevel, .fsgl-list-box, .csliw-ct-txt-table-list-wrapper').bind("scroll", function (e) {
		e.stopPropagation();
	});
	$('.go-to-top-btn').on('click', goToTop);
	$('.logo-img').on('click', function () {
		location.href = '../index/index.html';
	})
})