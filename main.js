function requestCrossDomain(site, callback) 
{

	var yql = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('SELECT title, link, description FROM feed where url="' + site + '"') + '&format=json&callback=?';

	$.getJSON(yql, function(data) 
	{
		// console.log(data);
		var blogPostHTML = '';
		$.each(data.query.results.item, function(i, blogPost) 
		{
			// console.log(i + ' ' + blogPost);
			blogPostHTML += '<div class="blog-post">';
			blogPostHTML += '<h4>' + blogPost.title + '</h4>';
			blogPostHTML += '<div class="center"><a href="' + blogPost.link + '" target="blank">' + 'Read Full Blog' + '</a></div>';
			blogPostHTML += '<p>' + blogPost.description + '</p>';
			blogPostHTML += '</div>';
			$('#blog-posts-container').html(blogPostHTML);
			if(i === 4) 
			{
				return false;
			}
		});
	});

}