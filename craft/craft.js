function videoPlayer () {
  if (!document.addEventListener || !1 in document.documentElement.style) {
    $('#video').hide();
  } else {
    jsModern.video("#video");
  }
}
$(function () {
  videoPlayer();
})