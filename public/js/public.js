function initNav () { 
  var sTop = $(window).scrollTop();
  var sWidth = $(window).width(); 
  if (sWidth < 1340) {
  	$(".global-body, .header-wrapper, .header-logo").removeClass('win-nav');
  	return;
  }
  sTop = parseInt(sTop);
  if (sTop >= 10) {
  	$(".global-body, .header-wrapper, .header-logo").addClass('win-nav');
  } else { 
  	$(".global-body, .header-wrapper, .header-logo").removeClass('win-nav');
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
	$('input[class*=input]').each(function(){
		var oldVal = $(this).val();
		$(this).focus(function () {
			var nowVal = $(this).val();
			$(this).parent().addClass('add-styl');
			$(this).parent().find('.err-txt-wrapper').html('');
			if (nowVal === oldVal) {
				$(this).val('');
			}
		}).blur(function () {
			var nowVal = $(this).val();
			$(this).parent().removeClass('add-styl');
			if (nowVal === '') {
				$(this).val(oldVal);
			}
		})
	})
}
function checkedItem () {
	$(".global-select-input").change(function() { 
		var status = $(this).attr('checked');
		if (status) {
			$(this).parent().addClass('checked-item')
		} else {
			$(this).parent().removeClass('checked-item')
		}
	});
}
function fromVerify () {
	$(".userAccount").blur(function () {
		var userAccount = $.trim($(this).val());
		var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    var reg1 = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if(!reg.test(userAccount) && !reg1.test(userAccount)){
      $(this).parent().find('.err-txt-wrapper').html('请输入有效的手机号或邮箱！')
    }
	})
	$(".userPassword").blur(function () {
		var userPassword = $.trim($(this).val());
    if(userPassword === '请确认密码'){
      $(this).parent().find('.err-txt-wrapper').html('请输入密码！')
      return;
    }
    if(userPassword.length < 8 || userPassword.length > 16){
      $(this).parent().find('.err-txt-wrapper').html('密码长度需控制在8-16位！')
      return;
    }
    var reg2 = /^[a-zA-Z0-9]\w{7,15}$/
    if(!reg2.test(userPassword)){
      $(this).parent().find('.err-txt-wrapper').html('密码不能还有特殊字符！');
    }
	})
	$(".userCode").blur(function () {
		var userCode = $.trim($(this).val());
    if(!userCode){
      $(this).parent().find('.err-txt-wrapper').html('请输入验证码！')
    }
	})
}
function login () {
		var userAccount = $.trim($(".userAccount").val());
		var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    var reg1 = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if(!reg.test(userAccount) && !reg1.test(userAccount)){
      $(".userAccount").parent().find('.err-txt-wrapper').html('请输入有效的手机号或邮箱！');
      return;
    }
		var userPassword = $.trim($(".userPassword").val());
		var reg2 = /^[a-zA-Z0-9]\w{7,15}$/
    if(userPassword === '请确认密码'){
      $(".userPassword").parent().find('.err-txt-wrapper').html('请输入密码！');
      return;
    }
    if(!reg2.test(userPassword)){
      $(".userPassword").parent().find('.err-txt-wrapper').html('密码不能还有特殊字符！');
      return;
    }
		var userCode = $.trim($(".userCode").val());
		var imgCodeStatus = true;
		// imgCodeStatus 此变量决定是否验证图片验证码
    if(!userCode && imgCodeStatus){
      $(".userCode").parent().find('.err-txt-wrapper').html('请输入验证码！');
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
var sh;
function levelNav () {
	$('.header-nav-item').hover(function () {
		clearTimeout(sh);
		$('.header-nav-list-info').hide();
		var levelName = $(this).attr('levelName');
		if (!levelName) {
			return;
		}
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
		console.log(navlist);
		for (var i = 0; i < navlist.length; i++) {
			(function (i) {
				var _levelName = navlist.eq(i).attr('levelName');
				if (levelName === _levelName) {
					navlist.eq(i).addClass('now-link');
				}
			})(i)
		}
	}, function () {
		$(this).removeClass('fade-In');
		sh = setTimeout(function () {
			$('.header-nav-list-ctr, .header-nav-list-info').hide();
		}, 300);
	})
}
$(function () {
	initNav(); // 判断悬浮导航出现的时机
	winResize(); // 浏览器窗口变化做出处理
	setNavItemStyl(); // 设置当前页面所属导航样式
	setWinNav(); // 浏览器滚动操作
	setInputFB(); // input设置聚焦&失焦操作
	checkedItem(); // 复选框状态改变处理
	fromVerify(); // 表单验证
	$("#login-btn-ctr").on('click', login); // 登录
	clearDefault(); // 阻止冒泡与默认事件
	levelNav(); // 导航列表显隐操作
})