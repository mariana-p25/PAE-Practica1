function loadNews(keyword) {
    var url = 'https://newsapi.org/v2/everything?q=' + keyword + '&apiKey=df468393b9de44d490f48eebd19ff40f';
    console.log(url);
    var req = new Request(url);
    fetch(req)
        .then((res) => res.json())
        .then((json) => {
        const templateSource = document.getElementById('news').innerHTML;
        const template = Handlebars.compile(templateSource);
        document.getElementById('news').innerHTML = template({
            news: json.articles
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    loadNews('bit');
    document.getElementById('buscar').addEventListener('click', () => {
        let key = document.getElementById("keyword");
        loadNews(key.value);
    });
});
