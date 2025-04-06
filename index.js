const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/cruddb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Schema & Model
const Item = mongoose.model('Item', { name: String });

app.post('/items', async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.send(item);
});

app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

app.listen(3000, () => console.log("Node server running on port 3000"));
