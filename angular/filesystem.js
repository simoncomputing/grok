var _src = yew.mkdir(null, "src");


var rawOpen = XMLHttpRequest.prototype.open;

XMLHttpRequest.prototype.open = function() {
	alert('hacked!');
	rawOpen.apply(this, arguments);
}