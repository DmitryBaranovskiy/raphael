function twitterQuotes(json) {
    function ify(tweet) {
        var res = tweet.replace(/(^|\s)(?:#([\d\w_]*)|@([\d\w_]{1,15}))|(https?:\/\/[^\s"]+[\d\w_\-])|([^\s:@"]+@[^\s:@"]*)/gi, function (all, space, hash, at, url, email) {
            var res = '<a href="mailto:' + email + '">' + email + '</a>';
            hash && (res = space + '<a href="http://search.twitter.com/search?q=%23' + hash + '">#' + hash + '</a>');
            at && (res = space + '<a href="http://twitter.com/' + at + '">@' + at + "</a>");
            url && (res = '<a href="' + encodeURI(decodeURI(url.replace(/<[^>]*>/g, ""))) + '">' + url + '</a>');
            return res;
        });
        return res;
    }
    var q = document.getElementById("quotes"),
        l = q.getElementsByTagName("ol")[0],
        item,
        tweet;
    q.style.display = "block";
    l.innerHTML = "";
    if (json.results) {
        for (var i = 0, ii = json.results.length; i < ii; i++) {
            item = document.createElement("li");
            tweet = json.results[i];
            item.innerHTML = '<a href="http://twitter.com/' + tweet.from_user + '"><img src="' + tweet.profile_image_url + '" width="16" height="16" alt="avatar" title="@' + tweet.from_user + '" class="avatar"></a>' + ify(tweet.text);
            l.appendChild(item);
        }
    }
}
var script = document.createElement("script");
script.src = "http://search.twitter.com/search.json?callback=twitterQuotes&q=raphaeljs&lang=en&rpp=10";
document.body.appendChild(script);