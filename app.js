const express = require('express');
const app = express();

app.set("views", "./views");
app.set("view engine", "jade");

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

// We use more powerful qs library to parse out key value pairs
app.use(express.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render("index", { title: "Home"});
});

var adminRouter = require('./admin');
app.use('/admin',adminRouter);

app.listen(3000, 'localhost', function() {
    console.log('Chat app listening on port 3000');
});