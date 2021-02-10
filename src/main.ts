declare var Handlebars: any;

var url = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=df468393b9de44d490f48eebd19ff40f';

var req = new Request(url);

const news = fetch(req)
    .then((res) => res.json())
    .then((json) => {
        const templateSource = document.getElementById('news').innerHTML;
        const template = Handlebars.compile(templateSource);
        document.getElementById('news').innerHTML = template({
            news: json.articles
        });
    });

//var keyword;

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('keyword').addEventListener('change', () => {
        console.log("!!!!!11");
    });
});