$(document).ready(function () {
    // Function to handle search
    function performSearch() {
        var searchTerm = $('#searchInput').val();

        // Wikipedia API endpoint
        var apiUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + searchTerm + "&callback=?";

        $.getJSON(apiUrl, function (data) {
            // Clear previous search results
            $('#searchResults').empty();

            // Display search results
            if (data.query && data.query.search) {
                var results = data.query.search;
                results.forEach(function (result) {
                    var title = result.title;
                    var snippet = result.snippet;

                    // Create a link to the Wikipedia page
                    var link = $('<a>').attr('href', 'https://en.wikipedia.org/wiki/' + title.replace(/ /g, '_')).attr('target', '_blank');

                    // Create a wrapper div for the search result
                    var resultDiv = $('<div>').addClass('search-result');

                    // Create a paragraph element for the snippet
                    var paragraph = $('<p>').html(snippet);

                    // Append the link and snippet to the wrapper div
                    resultDiv.append(link.append(title)).append(paragraph);

                    // Append the wrapper div to the search results container
                    $('#searchResults').append(resultDiv).append('<hr>');
                });
            } else {
                $('#searchResults').html('<p>No results found</p>');
            }
        });
    }

    // Trigger search when button is clicked
    $('#searchButton').click(performSearch);

    // Trigger search when Enter key is pressed
    $('#searchInput').keypress(function (e) {
        if (e.which == 13) { // Enter key pressed
            performSearch();
        }
    });
});