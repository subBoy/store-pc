function range () {
	$('.slider-range-input').jRange({ 
    from: 220, 
    to: 2200, 
    step: 1, 
    scale: [220, 2200], 
    format: '%s', 
    width: 300, 
    showLabels: true, 
    showScale: true 
	}); 
}

$(function () {
	range();
})