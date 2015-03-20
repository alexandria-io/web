var uagent = navigator.userAgent.toLowerCase();
if (uagent.search("iphone") > -1) {
/*	var logoObj = document.getElementById('logo');
	logoObj.style.width = '40%';
	logoObj.style.height = 'auto';
	logoObj.style.minHeight = '0';
*/}
function resizeTheHero() {
	if (uagent.search("iphone") == -1) {
		var heroObj = document.getElementById('hero');
		var logoObj = document.getElementById('logo');
		if (heroObj.offsetHeight < window.innerHeight) {
			heroObj.style.minHeight = '100%';
			heroObj.style.height = window.innerHeight+'px';
//			logoObj.style.height = window.innerHeight/2.5+'px';
		} else {
			heroObj.style.height = 'initial';
			heroObj.style.minHeight = window.innerHeight+'px';
//			logoObj.style.height = window.innerHeight/2.5+'px';
		}
	}
}
document.addEventListener('DOMContentLoaded', function(){
	resizeTheHero();
});
window.addEventListener('resize', function(event){
	resizeTheHero();
});

var clickcoin = document.getElementsByClassName('cryptocoin');
function toArray(obj) {
  var array = [];
  for (var i = obj.length >>> 0; i--;) { 
	array[i] = obj[i];
  }
  return array;
}
toArray(clickcoin);
var arrayLength = clickcoin.length;
if ("ontouchstart" in document.documentElement) {
	// Touch devices
	for (var i = 0; i < arrayLength; i++) {
		myTap = new Tap(clickcoin[i]);
		clickcoin[i].children[2].style.display = 'none';
		clickcoin[i].addEventListener('tap', tapDidOccur, false); 
	}
} else {
	// Others devices
}
function tapDidOccur (e) {
	var cointap = e.target.parentElement.children;
	cointap[2].style.display = (cointap[2].style.display == "none") ? "block" : "none";
}
// SELECT TEXT ON SINGLE CLICK
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
