function bannerSlider () {
	var mySwiper = new Swiper('.swiper-container',{
		autoplay: 4000,
    pagination: '.pagination',
    loop:true,
    grabCursor: true,
    paginationClickable: true
  })
  $('.arrow-left').on('click', function(e){
    e.preventDefault()
    mySwiper.swipePrev()
  })
  $('.arrow-right').on('click', function(e){
    e.preventDefault()
    mySwiper.swipeNext()
  })
}
function spItemSH () {
	// 切换商品
	$('.gl-ct-series-ctr .series-ctr').on('click', function () {
		var _index = $(this).index();
		var _li = $(this).parent().parent().find('.gl-ct-item-list .gl-ct-series-item');
		_li.hide();
		_li.eq(_index).fadeIn();
	})
}
$(function () {
	bannerSlider();
	spItemSH();
})