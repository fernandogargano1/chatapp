const express = require('express');
const app = express();

var rooms = require('./data/rooms.json');

app.set("views", "./views");
app.set("view engine", "jade");

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

app.get('/', function (req, res) {
    res.render("index", { title: "Home"}, function(err, html) {
        console.log(html);  
        
        return res.send(html);
    });
});

app.get('/admin/rooms', function (req, res) {    
    res.render("rooms", { 
        title: "Admin Rooms",
        rooms: rooms
    });
});

app.listen(3000, 'localhost', function() {
    console.log('Chat app listening on port 3000');
});