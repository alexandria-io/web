var fadeTimer = 200;
var BTCRec;
var BTCUSD;
// DOCUMENT READY JQUERY STUFF
$(document).ready(function(){
	var FLOaddress = document.getElementById('alexandriaFLO').innerHTML;
	var FLOqrWrapper = document.getElementById('flo-qr-wrap');
//	GenerateQR(FLOaddress, FLOqrWrapper, 64, 64, 'florincoin');
	var BTCaddress = document.getElementById('alexandriaBTC').innerHTML;
	var BTCqrWrapper = document.getElementById('btc-qr-wrap');
	GenerateQR(BTCaddress, BTCqrWrapper, 80, 80, 'bitcoin');
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

// FUNDING + CRYPTO
	var daysLeft = Math.round(46 - ((((Date.parse(new Date()) - 1429038124000)/1000)/60)/60)/24);
	document.getElementById('daysleft').innerHTML = daysLeft;

	$.ajax({
	    url: 'https://api.blocktrail.com/v1/BTC/address/1AaMehNHLRDH4JPKaCkBjn8WFjJ8nEwvsr?api_key=d25b4b06d87b30b419ecbcf5bcc8c63fda3ecd49',
	    success: function(e) {
	    	console.info(e);
	    	BTCRec = e.received;
	    	document.getElementById('btc-received').innerHTML = 'Total Received: '+BTCRec/100000000+' BTC';
	    	getBTCUSD();
	    }
	});
});

function getBTCUSD() {
	$.ajax({
	    url: 'http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=2',
	    type: 'GET',
	    success: function(e) {
			var el = $( '#sketchpad' );
			el.html(e.responseText);
			var data = $.parseJSON($(el).html());
			BTCUSD = parseFloat(data.return.markets.BTC.lasttradeprice);
			populateProgress();
			$('.btc-usd .btc-usd-output').text(Math.round((1/BTCUSD)*100000000)/100000000);
		}
	});
}

function populateProgress() {
	var BTCfunded = BTCRec/100000000;
	var FLOfunded = 0;
	var PayPalfunded = 0;
	var fundGoal = 24000;
	var funded = BTCfunded + FLOfunded + PayPalfunded;
	var fundedToGoal = (funded/fundGoal)*100;
	var fundedDisplay = Math.round(fundedToGoal*100)/100;
	console.log(BTCfunded +' '+ FLOfunded+' '+ PayPalfunded+' '+ fundGoal + ' ' + funded + ' ' + fundedToGoal);
	$('#fund-progress-wrap').prepend('<span>'+ fundedDisplay +'%</span>');
	$('#fund-progress-bar').width(fundedToGoal+'%');
}

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