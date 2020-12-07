// const express = require('express');
// const app = express();

// app.use(express.static('.'));
// app.get('/', (req, res) => {
//     console.log('Here');
//     console.log(req.query.text);
// });
// app.listen(3000, () => {
//     console.log('server is running on port 3000!');
// });

const express = require('express')
const app = express()
const port = 3000

const IAM_TOKEN = 't1.9euelZqOmJ7Mlp3Jm5rHk56PkZGViu3rnpWamJfGjc6ZlJCWnZaalJbLjcvl8_dgXkgB-u8HCxQ9_d3z9yANRgH67wcLFD39.gzFJmWq60lFOV3K9EWOWhPdq10Dft-xpsnHfiP8TvEHAYvrRe0MIWkluEwVVfm59L_xg_nOYBI1P0J7yr9b4DQ';
const FOLDER = 'b1gfgmr38rngsucl9c6c'

let tr = {
    "folder_id": FOLDER,
    "texts": [],
    "targetLanguageCode": "ru"
};

const axios = require('axios');

app.get('/', (request, response) => {
    response.send('Hello from Express!')
    console.log(request.query.text);
    tr.texts[0] = request.query.text;
    axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate/', tr, {
            headers: {
                'Content-Type': 'aaplication/json',
                'Authorization': 'Bearer ' + IAM_TOKEN
            }
        })
        .then((res) => {
            //console.log(res.data);
            console.log(res.data.translations[0].text);
        }).catch((err) => {
            console.log(err);
        })


})
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})