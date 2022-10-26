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
        "name": "macintosh", 
        "species": "steve jobs",
        "date": "1976"
    },
    "apple3": {
        
        "name": "fuji",
        "species": "M. pumila",
        "date": "Late 1930s"
    }, 
    "apple4": {
        "name": "European Crab Apple",
        "species": "malus sylvestris",
        "date": "unknown"
    },
    "appleunknown": {
        "name": "unknown",
        "species": "unknown",
        "date": "unknown"
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

app.get('/apple/db/id/:appleid', (req, res) => {
    res.json(appleDB[req.params.appleid]);
})
app.get('/apple/db/:applename', (req, res) => {
    let name = req.params.applename;
    let k = Object.keys(appleDB);
    k.forEach((key, index) => {
        let apple = appleDB[key];
        if(apple.name === name) {
            res.json(apple);
        }
    })
    res.json(appleDB["appleunknown"]);
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

// in a PUT request, put the new apple in the body.
app.put('/apple/db/:appleid', (req, res) => {
    let putapple = req.params.appleid;
    let newapple = req.body;
    if(delapple in appleid) {
        if(DEBUG) {
            console.log(appleDB);
        }
        appleDB[putapple] = newapple;
        if(DEBUG) {
            console.log(appleDB);
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${process.env.PORT || PORT}! You better go catch it!`)
})