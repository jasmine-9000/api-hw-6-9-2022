const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let appleDB = {
    "apple1": {
        "name": "red delicious",
        "species": "Malus domestica",
        "date": "1872"
    },
    "apple2":
    {
        "name": "fuji",
        "species": "M. pumila",
        "date": "Late 1930s"
    }
}

let nextID = 3;

app.get('/apple/db', (req, res) => {
    res.json(appleDB);
})

app.post('/apple/db', (req, res) => {
    let newapple = JSON.parse(req.body);
    appleDB[`apple${nextID}`] = newApple;
    res.send("OK");
})

app.delete('/apple/db', (req, res) => {
    let delapple = JSON.parse(req.body);
    appleDB.foreach(apple => {
        if(apple === delapple) {
            delete appleDB[apple];
        }
    })
    res.send("deleted");
});