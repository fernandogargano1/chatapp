const express = require('express');
const app = express();
// We get back function to create random identifiers
const uuidv4 = require('uuid/v4');
const _ = require("lodash");

var rooms = require('./data/rooms.json');

app.set("views", "./views");
app.set("view engine", "jade");

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

// We use more powerful qs library to parse out key value pairs
app.use(express.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render("index", { title: "Home"});
});

app.get('/admin/rooms', function (req, res) { 
    
    res.render("rooms", { 
        title: "Admin Rooms",
        rooms: rooms
    });
});

app.get('/admin/rooms/add', function (req, res) {    
    res.render("add");
});

app.post('/admin/rooms/add', function (req, res) { 
    const chatroom = {
        name: req.body.name,
        id: uuidv4()
    }     

    rooms.push(chatroom);
    
    // res.send() would have had the same effect
    // res.json(chatroom);
    res.redirect('/admin/rooms');
});

app.get('/admin/rooms/edit/:id', function(req, res) {
    const roomId = req.params.id;    

    // Get the room we want to edit.
    const room = _.find(rooms, r => r.id === roomId);
    if (!room) {
        res.sendStatus(404);
        return;        
    }

    // Pass this room to the view
    res.render('edit', { room });
});

app.post('/admin/rooms/edit/:id', function (req, res) { 
    const roomId = req.params.id;    

    // Get the room we want to edit.
    const room = _.find(rooms, r => r.id === roomId);
    if (!room) {
        res.sendStatus(404);
        return;        
    }

    room.name = req.body.name;  
    
    res.redirect('/admin/rooms');
});

app.get('/admin/rooms/delete/:id', function(req, res) {
    const roomId = req.params.id;

    rooms = rooms.filter(r => r.id !== roomId);
    res.redirect('/admin/rooms');
});


app.listen(3000, 'localhost', function() {
    console.log('Chat app listening on port 3000');
});