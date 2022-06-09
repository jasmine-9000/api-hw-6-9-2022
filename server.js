const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const PORT = 80;

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

app.delete('/apple/db', (req, res) => {
    let delapple = JSON.parse(req.body);
    appleDB.foreach(apple => {
        if(apple === delapple) {
            delete appleDB[apple];
        }
    })
    res.send("deleted");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}! You better go catch it!`)
})