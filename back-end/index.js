const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/christmas', {
  useNewUrlParser: true
});

// Set up Schema
const listSchema = new mongoose.Schema({
  name: String,
  age: String,
  gift: String,
  price: String,
});

const traditionSchema = new mongoose.Schema({
  name: String,
  years: String,
  tradition: String,
});

const ListItem = mongoose.model('ListItem', listSchema);
const TraditionItem = mongoose.model('TraditionItem', traditionSchema);

// Set up endpoints for Christmas List
app.post('/api/list', async (req, res) => {
  const item = new ListItem({
    name: req.body.name,
    age: req.body.age,
    gift: req.body.gift,
    price: req.body.price,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/list', async (req, res) => {
  try {
    let items = await ListItem.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/list/:id', async (req, res) => {
  try {
    await ListItem.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/list/:id', async (req, res) => {
  try {
    let item = await ListItem.findOne({
      _id: req.params.id
    });
    item.name = req.body.name;
    item.age = req.body.age;
    item.gift = req.body.gift;
    item.price = req.body.price;
    await item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Set up endpoint for Traditions List
app.post('/api/traditions', async (req, res) => {
  const item = new TraditionItem({
    name: req.body.name,
    years: req.body.years,
    tradition: req.body.tradition,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/traditions', async (req, res) => {
  try {
    let items = await TraditionItem.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/traditions/:id', async (req, res) => {
  try {
    await TraditionItem.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/traditions/:id', async (req, res) => {
  try {
    let item = await TraditionItem.findOne({
      _id: req.params.id
    });
    item.name = req.body.name;
    item.years = req.body.years;
    item.tradition = req.body.tradition;
    await item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3001, () => console.log('Server listening on port 3001!'));
