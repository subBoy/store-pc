$.extend(window, {
  accountVerify: function (account) {
		// 账号验证
		var obj = {
	  	status: true,
	  	msg: ''
	  };
		if (!account) {
		  obj.status = false;
	  	obj.msg = '账号不能为空！'
		  return obj;
		}
		var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	  var reg1 = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
	  if(!reg.test(account) && !reg1.test(account)){
	  	obj.status = false;
	  	obj.msg = '账号格式错误！'
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
	}
})