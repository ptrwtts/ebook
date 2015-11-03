$(document).ready(function () {
    var text = "Once upon a time there lived in a certain village a little country girl, the prettiest creature who was ever seen. Her mother was excessively fond of her; and her grandmother doted on her still more. This good woman had a little red riding hood made for her. It suited the girl so extremely well that everybody called her Little Red Riding Hood.";
    var pieces = text.split(' ');
    var line = 0;
    var height = $("#text").height();
    var item;
    var currentLine = 1;
    var currentWord = 1;
    var lines = {};
    var words = {};
    var lineHeight;
    function getLine(y) {
    	fingerBuffer = 2;
    	newLine = Math.ceil((y-lineHeight*fingerBuffer)/lineHeight);
    	if(newLine<=0) { newLine=1; }
    	return newLine;
    }
    function getWord(x) {
    	theword = 0;
    	$.each(words[currentLine],function(word, left){
    		theword = word;
    		if(left>x) { 
    			theword -= 1;
    			return false; 
    		}
    	});
    	return theword;
    }
    function highlightLine() {
    	$('.word').removeClass('currentLine');
    	$('.line_'+currentLine).addClass('currentLine');
    }
    function highlightWord() {
    	$('.currentWord').removeClass('currentWord');
    	$('.word_'+currentWord).addClass('currentWord');
    }
    $.each(pieces, function(index, word){
    	item = $('<span class="word word_'+index+'">'+word+' </span>');
    	$("#text").append(item);
    	newHeight = $("#text").height();
    	if(height != newHeight) { 
    		line++; 
    		height = newHeight;
    		lines[line] = newHeight;
    		words[line] = {}; [index];
    	}
    	words[line][index] = item.offset().left;
    	$(".word_"+index).addClass('line_'+line);
    });
    lineHeight = height / line;
    highlightLine();
    $('body').bind('touchmove',function(e){
    	e.preventDefault();
    	x = e.originalEvent.pageX;
    	y = e.originalEvent.pageY;
    	line = getLine(y);
    	if(line != currentLine) {
    		currentLine = line;
    		highlightLine();
    	}
    	word = getWord(x);
    	if(word != currentWord) {
    		currentWord = word;
    		highlightWord();
    	}
	});
});

