var fadeTimer = 200;
// DOCUMENT READY JQUERY STUFF
$(document).ready(function(){
	var FLOaddress = document.getElementById('alexandriaFLO').innerHTML;
	var FLOqrWrapper = document.getElementById('flo-qr-wrap');
	GenerateQR(FLOaddress, FLOqrWrapper, 100, 100, 'florincoin');
	var BTCaddress = document.getElementById('alexandriaBTC').innerHTML;
	var BTCqrWrapper = document.getElementById('btc-qr-wrap');
	GenerateQR(BTCaddress, BTCqrWrapper, 100, 100, 'bitcoin');
	// Modal controls
	$(document).on("keyup", function (e) {
		var code = e.keyCode || e.which;
		if (code == 27) {
			// esc pressed
			if ($('#lightbox').css('display') == 'block') {
				$('#lightbox').fadeOut(fadeTimer);
			}
		}
	});	
});
// SELECTABLE TEXT
function selectText(containerid) {
	if (document.selection) {
	    var range = document.body.createTextRange();
	    range.moveToElementText(document.getElementById(containerid));
	    range.select();
	} else if (window.getSelection) {
	    var range = document.createRange();
	    range.selectNode(document.getElementById(containerid));
	    window.getSelection().addRange(range);
	}
}
// Generate QR CODE
function GenerateQR(address, wrapper, qrw, qrh, crypto) {
	wrapper.innerHTML = '';
	wrapper.setAttribute('onclick','loadQR("'+crypto+':'+address+'")');
	var qrcode = new QRCode(wrapper, {
		text: crypto+':'+address,
		width: qrw,
		height: qrh,
		colorDark : "#000000",
		colorLight : "#FFFFFF",
		correctLevel : QRCode.CorrectLevel.H
	});
}
// DISPLAY QR CODE FOR BTC
function loadQR(obj) {
	$('#lightbox').html('<div id="qrcode-lightbox"></div>');
	var qrcode = new QRCode("qrcode-lightbox", {
		text: obj,
		width: 400,
		height: 400,
		colorDark : "#000000",
		colorLight : "#FFFFFF",
		correctLevel : QRCode.CorrectLevel.H
	});
	$('#lightbox').fadeIn(fadeTimer);
}