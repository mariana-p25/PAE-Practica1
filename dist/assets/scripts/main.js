var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const templateSource = document.getElementById('news').innerHTML;
const template = Handlebars.compile(templateSource);
function loadNews(keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        var url = 'https://newsapi.org/v2/everything?q=' + keyword + '&apiKey=df468393b9de44d490f48eebd19ff40f';
        var req = new Request(url);
        yield fetch(req)
            .then((res) => res.json())
            .then((json) => {
            document.getElementById('news').innerHTML = template({
                news: json.articles
            });
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    loadNews('');
    document.getElementById('buscar').addEventListener('click', () => {
        let key = document.getElementById("keyword");
        loadNews(key.value);
    });
});
