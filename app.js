function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function render() {	
	var dataset = countWords($("#text").val());

	$("#vis").html("");

	d3.select("#vis").selectAll("span").data(dataset).enter().append("span")
		.html(function (d) { return "<b style='color:"+getRandomColor()+";font-size:"+d.quantity/3.0+"em'> "+d.word+"</b>" });
}

function countWords(text) {
	var ret = [];
	var _map = {};
	var _words = text.split(" ");

	for (var i = 0 ; i < _words.length ; i++) {
		if (_map[_words[i]]) {
			_map[_words[i]]++;
		} else {
			_map[_words[i]] = 1;
		}
	}

	for (var key in _map) {
	  if (_map.hasOwnProperty(key)) {
	  	ret.push({ word: key, quantity: _map[key] })
	  }
	}
	
	return ret;
}