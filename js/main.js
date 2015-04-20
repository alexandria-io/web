var fadeTimer = 200;
var BTCRec;
var BTCUSD;
var FLOCost;
var FLOLTC;
var LTCUSD;
var FLOUSD;

var BittrexFLO;

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
	var daysLeft = Math.round(47 - ((((Date.parse(new Date()) - 1429038124000)/1000)/60)/60)/24);
	document.getElementById('daysleft').innerHTML = daysLeft;
	
	$.get('https://api.blocktrail.com/v1/BTC/address/1AaMehNHLRDH4JPKaCkBjn8WFjJ8nEwvsr?api_key=d25b4b06d87b30b419ecbcf5bcc8c63fda3ecd49').fail(function (response, message, xhr) {
		displayWarning();
	}).done(function (e, message, xhr) {
		var el = $( '#sketchpad' );
		el.html(e.results[0]);
		var data = $.parseJSON($(el).html());
    	BTCRec = data.received;
    	document.getElementById('btc-received').innerHTML = 'Total Received: '+BTCRec/100000000+' BTC';
    	getBTCUSD();
	});
});

function getBTCUSD() {
	$.get('https://api.bitcoinaverage.com/ticker/global/USD/').fail(function (response, message, xhr) {
		displayWarning();
	}).done(function (e, message, xhr) {
		var el = $( '#sketchpad' );
		el.html(e.results[0]);
		var data = $.parseJSON($(el).html());
		BTCUSD = data.last;
		getBittrexLast();
		$('.btc-usd .btc-usd-output').text(Math.round((1/BTCUSD)*100000000)/100000000);
	});
}

function getBittrexLast() {
	$.get('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-flo').fail(function (response, message, xhr) {
	    displayWarning();
	}).done(function (e, message, xhr) {
		var el = $( '#sketchpad' );
		el.html(e.results[0]);
		BittrexFLO = $.parseJSON($(el).html());
		populateProgress();
		
	});
}

function populateProgress() {
	var BTCfunded = (BTCRec/100000000)*BTCUSD;
	var FLOfunded = (200.8/100000000)*BittrexFLO.result[0].Last;
	var PayPalfunded = 245;
	var fundGoal = 36000;
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

function lightbox(obj) {
	$('#lightbox').html('<div id="lightbox-img"><img src="'+obj+'" /></div>');
	$('#lightbox').fadeIn(fadeTimer);
}