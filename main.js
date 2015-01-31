$(document).ready(function() 
{	
	$('form').submit(function(event) 
	{
		event.preventDefault();

		var $searchField = $('#search');
		var $submitButton = $('#submit');
		var $blogPostsContainer = $('#blog-posts-container');
		$searchField.prop("disabled", true); // Disables search field until search is finished
		$submitButton.attr("disabled", true).val("Searching..."); // Disables search button and displays message until search is finished
	
		// blogPostsContainer.html('');
		
		var blogAPI = "http://www.mytime.com/api/v1/deals.json?what=Massage&when=Anytime&where=34.052200,-118.242800?callback=?";
		var blogURL = $searchField.val(); // Get user's search word or phrase
		var blogOptions = 
		{
			format: "json"
		};
		function displayBlogPosts(data) 
		{
			var blogPostsHTML = '';
			if(data.items.length > 0) 
			{
				$.each(data.items, function(i, blogPost) 
				{
					blogPostsHTML += '<div class="blog-post-1">';
					blogPostsHTML += '<h4>' + blogPost.title + '</h4>';
					blogPostsHTML += '<p>' + blogPost.description + '</p>';
					blogPostsHTML += '<a href="' + blogPost.link + '" target="blank"></a>';
					blogPostsHTML += '</div>';
				});
			} else 
			{
				blogPostsHTML = "<p>No blog posts found</p>"
			}
			blogPostsContainer.html(blogPostsHTML);
		    $searchField.prop("disabled", false); // Reactivates search field once search is finished
      		$submitButton.attr("disabled", false).val("Search"); // Reactivates search button once search is finished
		}
		$.getJSON(blogAPI, blogOptions, displayBlogPosts);
	});

});