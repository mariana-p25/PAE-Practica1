declare var Handlebars: any;

const templateSource = document.getElementById('news').innerHTML;
const template = Handlebars.compile(templateSource);

async function loadNews(keyword) {
    var url = 'https://newsapi.org/v2/everything?q=' + keyword + '&apiKey=df468393b9de44d490f48eebd19ff40f';
    var req = new Request(url);

    await fetch(req)
        .then((res) => res.json())
        .then((json) => {
            document.getElementById('news').innerHTML = template({
                news: json.articles
            });
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadNews('');

    document.getElementById('buscar').addEventListener('click', () => {
        let key = document.getElementById("keyword") as HTMLInputElement;
        loadNews(key.value);
    });
});