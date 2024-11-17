const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var db, collection;

const url = 'mongodb+srv://DEMO:DEMO@cluster0.ulmcg.mongodb.net/VideoGames?retryWrites=true&w=majority&appName=Cluster0';
const dbName = "VideoGames";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    db.collection('Games').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.render('index.ejs', { comics: result });
    });
});

app.post('/comics/add', (req, res) => {
    db.collection('Games').insertOne(
        { title: req.body.title, author: req.body.author, read:false},
        (err, result) => {
            if (err) return console.log(err);
            console.log('saved to database');
            res.redirect('/');
        }
    );
});

app.put('/comics/move-to-read', (req, res) => {
    db.collection('Games').findOneAndUpdate(
        { title: req.body.title, author: req.body.author },
        {
            $set: {
                read: true
            }
        },
        {
            sort: { _id: -1 },
            upsert: true
        },
        (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        }
    );
});

app.put('/comics/move-to-want', (req, res) => {
    db.collection('Games').findOneAndUpdate(
        { title: req.body.title, author: req.body.author },
        {
            $set: {
                read: false
            }
        },
        {
            sort: { _id: -1 },
            upsert: true
        },
        (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        }
    );
});

app.delete('/comics', (req, res) => {
    db.collection('Games').findOneAndDelete(
        { title: req.body.name, author: req.body.msg },
        (err, result) => {
            if (err) return res.send(500, err);
            res.send('Message deleted!');
        }
    );
});

