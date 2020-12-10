const axios = require('axios');
const express = require('express');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')



const app = express();
const port = 3000;

app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
const templating = require('consolidate');
const handlebars = require('handlebars');
templating.requires.handlebars = handlebars;

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

let obj = { news: [], n: 100 };
let n = 100;

function drawNews(response, n = 100) {

    axios.get('http://yandex.ru').then((res) => {
        //console.log(res.data);
        //response.send('Hello from Express!');
        console.log('Выводим новостей: ' + n);

        var $ = cheerio.load(res.data);
        obj.news = [];
        $('.news__item-content').each(function(i, element) {
            //console.log($(this).text());

            if (i < n) {
                obj.news[i] = $(this).text();
                //console.log('i=' + i + ' n=' + n);
            }
        });
        console.log('Длина массива с новостями: ' + obj.news.length);
        obj.n = n;
        response.render('news', obj);
    }).catch((err) => {
        console.log(err);
    });
}

app.post('/', (req, res) => {
    const request = req.body;
    console.log('Request:', request); //.text
    n = Number(request.numberNews);
    res.cookie('numberNews', n);
    drawNews(res, n); //req.cookies.numberNews
    console.log('Cookies: ', req.cookies.numberNews)
})

app.get('/', (request, response) => {
    drawNews(response, request.cookies.numberNews);
    // axios.get('http://yandex.ru').then((res) => {
    //     //console.log(res.data);
    //     //response.send('Hello from Express!');
    //     var $ = cheerio.load(res.data);
    //     $('.news__item-content').each(function(i, element) {
    //         //console.log($(this).text());
    //         obj.news[i] = $(this).text();
    //     });
    // }).catch((err) => {
    //     console.log(err);
    // })
    // response.render('news', obj);
    // Cookies that have not been signed
    console.log('Cookies: ', request.cookies.numberNews)

    // Cookies that have been signed
    //console.log('Signed Cookies: ', request.signedCookies)
});

//ПОЧЕМУ СПИСОК ВЫДАЁТСЯ ТОЛЬКО ПОСЛЕ ОБНОВЛЕНИЯ СТРАНИЦЫ?



app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
})