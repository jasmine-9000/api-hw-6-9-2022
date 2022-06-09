const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const PORT = 80;
const DEBUG = true;

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
/*
({name: "granny smith", species: "malus domestica x malus sylvestris", date: "1868"})}
granny
{name: 'granny smith', species: 'malus domestica x malus sylvestris', date: '1868'}
*/
let nextID = 3;

app.get('/apple/db', (req, res) => {
    res.json(appleDB);
})

app.post('/apple/db', (req, res) => {
    console.log(req.body);
    let newapple = req.body;
    console.log(newapple);
    appleDB[`apple${nextID}`] = newapple;
    console.log(appleDB);
    nextID += 1;
    res.send("OK");
})

app.delete('/apple/db/:appleid', (req, res) => {
    let delapple = req.params.appleid;
    if(delapple in appleDB) {
        if(DEBUG) {
            console.log(appleDB);
        }
        delete appleDB[delapple];
        if(DEBUG) {
            console.log(appleDB);
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}! You better go catch it!`)
})