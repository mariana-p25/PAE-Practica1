var url = 'http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=df468393b9de44d490f48eebd19ff40f';
var req = new Request(url);
const news = fetch(req)
    .then((res) => res.json())
    .then((json) => {
    const templateSource = document.getElementById('news-container').innerHTML;
    const template = Handlebars.compile(templateSource);
    document.getElementById('news-container').innerHTML = template({
        news: json.articles
    });
});
