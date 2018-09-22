const express = require('express');
const app = express();
const passport = require('passport');

require('./passport-init');

app.set("views", "./views");
app.set("view engine", "jade");

app.use(require('./logging'));

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));

// We use more powerful qs library to parse out key value pairs
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var authRouter = require('./auth');
app.use(authRouter);

app.use(function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        next();
        return;
    }    

    res.redirect('/login');
});

// require('express-debug')(app, {});

app.get('/', function (req, res, next) {
    res.render("home", { title: "Home"});
    // fs.readFile("./data/roomss.json", "utf8", function(error, data) {
    //     if (error) {
    //         next(error);
    //         return;
    //     }
    //     res.send(data);
    // });
    // throw new Error("Oh no!");
    // setTimeout(function() {
    //     try {
    //         throw new Error("Oh no!");
    //         res.render("home", { title: "Home"});
    //     } catch (error) {
    //         next(error);
    //     }
        
    // },1000);    
});

var adminRouter = require('./admin');
var apiRouter = require('./api');

app.use('/admin',adminRouter);
app.use('/api', apiRouter);

app.use("/admin", function(req, res, next) {
    console.log('admin request: ' + req.url);

    next();
});

// app.use(function(error, req, res, next) {
//     res.send('Super secret error handler');
// });

app.listen(3000, 'localhost', function() {
    console.log('Chat app listening on port 3000');
});