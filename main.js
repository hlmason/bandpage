function requestCrossDomain(site, callback) {

	if(!site) {
		alert('Please enter a blog url');
		$('#search').css('border', '2px solid orange');
		return false;
	}

	// var yql = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + site + '"') + '&format=xml&callback=?';

	// $.getJSON(yql, function(data) {
	// 	if(data.results[0]) {
	// 		data = data.results[0].replace(/<script[^>]*>[\s\S]*?<\/script>/);

	// 		if(typeof callback == 'function') {
	// 			callback(data);
	// 		}
	// 	}
		
	// 	else throw new Error('Nothing returned from getJSON.');
	// });

	var yql = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('SELECT title, link, description FROM feed where url="' + site + '"') + '&format=json&callback=?';

	$.getJSON(yql, function(results) {
		// console.log(results);
		var blogPostHTML = '';
		$.each(results.query.results.item, function(i, blogPost) {
			// console.log(i + ' ' + blogPost);
			blogPostHTML += '<div class="blog-post">';
			blogPostHTML += '<h4>' + blogPost.title + '</h4>';
			blogPostHTML += '<div class="center"><a href="' + blogPost.link + '" target="blank"></a></div>';
			blogPostHTML += '<p>' + blogPost.description + '</p>';
			blogPostHTML += '</div>';
			$('#blog-posts-container').html(blogPostHTML);
		});
	});

}