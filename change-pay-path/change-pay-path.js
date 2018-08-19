function settleFuc () {
	var userAccount = $.trim($(".settle-userAccount").val());
	var  obj = nonNull(userAccount, '账号');
	if (!obj.status) {
		$('#settle-err').html(obj.msg);
    return;
	}

	var userPassword = $.trim($(".settle-userPassword").val());
	var  obj2 = nonNull(userPassword, '密码');
	if (!obj2.status) {
		$('#settle-err').html(obj2.msg);
    return;
	}

	var userCode = $.trim($(".settle-userCode").val());
	var  obj3 = nonNull(userCode, '验证码');
	var imgCodeStatus = true;
	// imgCodeStatus 此变量决定是否验证图片验证码
	if (!obj3.status && imgCodeStatus) {
		$('#settle-err').html(obj3.msg);
    return;
	}
  //在下面执行结算操作
  // ...
  location.href = '../payment-process/payment-process.html';
}
function callerFuc () {
	location.href = '../payment-process/payment-process.html?step=3'
}
$(function () {
	$("#settle-psy-btn-ctr").on('click', settleFuc); // 会员结算;
	$("#caller-psy-btn-ctr").on('click', callerFuc); // 访客结算;
})