var webpage = require('webpage');

var sizeList = [320, 768, 1024, 1440, 1900];
var url = 'https://www.quick.fr';

var page = webpage.create();
var currentPageIndex = 0;

function renderNextPage() {
	window.setTimeout((function() {
		++currentPageIndex;
		console.log('render next');
		page.close();
		page = webpage.create();
		
		if(currentPageIndex < sizeList.length) {
			return renderPage();
		} else {
			return phantom.exit();
		}
	}), 1000);
}

function renderPage() {
	var size = sizeList[currentPageIndex];
	
	page.viewportSize = {
	    width: size,
	    height: 10000
	};
	page.open(url, function(status) {
		console.log(status);
        if (status === "success") {
            return window.setTimeout((function() {
	            page.render('screenshot-' + size + '.jpg');
                return renderNextPage();
            }), 4000);
        } else {
            return renderNextPage();
        }
	});	
}

renderPage();
