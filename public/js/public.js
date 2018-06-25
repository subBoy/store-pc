function initNav () { 
  var sTop = $(window).scrollTop();
  var sWidth = $(window).width(); 
  if (sWidth < 1340) {
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

$(function () {
	initNav();
	setNavItemStyl();
	setWinNav();
})