const express = require('express');
const app = express();

app.set("views", "./views");
app.set("view engine", "jade");

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));

// We use more powerful qs library to parse out key value pairs
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render("home", { title: "Home"});
});

var adminRouter = require('./admin');
var apiRouter = require('./api');

app.use('/admin',adminRouter);
app.use('/api', apiRouter);

app.use("/admin", function(req, res, next) {
    console.log('admin request: ' + req.url);

    next();
});

app.listen(3000, 'localhost', function() {
    console.log('Chat app listening on port 3000');
});