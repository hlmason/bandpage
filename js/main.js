function requestCrossDomain(site, callback) {

	var yql = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('SELECT title, link, description FROM feed WHERE url="' + site + '"') + '&format=json&callback=?';

	$.getJSON(yql, function(data) {
		// console.log(data);
		var blogPostHTML = '';
		$.each(data.query.results.item, function(i, blogPost) {
			// console.log(i + ' ' + blogPost);
			blogPostHTML += '<div class="blog-post">';
			blogPostHTML += '<h4>' + blogPost.title + '</h4>';
			blogPostHTML += '<div class="center"><a href="' + blogPost.link + '" target="blank">' + 'Read Full Post' + '</a></div>';
			blogPostHTML += '<p>' + blogPost.description + '</p>';
			blogPostHTML += '</div>';
			$('#blogPostContainer').html(blogPostHTML);
		});

		// Pagination plugin
		$(function() {
		  $(".holder").jPages({
		    containerID : "blogPostContainer",
		    perPage: 5,
		    keyBrowse: true // Enables left and right arrows
		  });
		});

	});

}

$('form').submit(function(event) { // When form is submitted,
    var path = $('#search').val() + '/feed'; // get user's blog URL input.

    requestCrossDomain(path, function(results) {

    });

	// Moves page to blog posts
	$('html, body').animate({
	    scrollTop: $("#blogPostContainer").offset().top
	}, 1000);

    return false; // Disables default form submit action
});
