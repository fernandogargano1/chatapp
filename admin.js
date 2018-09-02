// We get back function to create random identifiers
const uuidv4 = require('uuid/v4');
const _ = require("lodash");

var express = require('express');

var rooms = require('./data/rooms.json');

var router = express.Router();

module.exports = router;


router.get('/rooms', function (req, res) { 

    res.render("rooms", { 
        title: "Admin Rooms",
        rooms: rooms,
        baseUrl: req.baseUrl
    });
});

// router.get('/rooms/add', function (req, res) {    
//     res.render("add", { baseUrl: req.baseUrl });
// });

// router.post('/rooms/add', function (req, res) { 
//     const chatroom = {
//         name: req.body.name,
//         id: uuidv4()
//     }     

//     rooms.push(chatroom);
    
//     // res.send() would have had the same effect
//     // res.json(chatroom);
//     // res.redirect('/admin/rooms');
//     res.redirect(req.baseUrl + "/rooms");
// });

router.route('/rooms/add')
    .get(function (req, res) {    
        res.render("add", { baseUrl: req.baseUrl });
    })

    .post(function (req, res) { 
        const chatroom = {
            name: req.body.name,
            id: uuidv4()
        }     

        rooms.push(chatroom);
    
    // res.send() would have had the same effect
    // res.json(chatroom);
    // res.redirect('/admin/rooms');
        res.redirect(req.baseUrl + "/rooms");
    });

// router.get('/rooms/edit/:id', function(req, res) {
//     const roomId = req.params.id;    

//     // Get the room we want to edit.
//     const room = _.find(rooms, r => r.id === roomId);
//     if (!room) {
//         res.sendStatus(404);
//         return;        
//     }

//     // Pass this room to the view
//     res.render('edit', { room, baseUrl: req.baseUrl });
// });

// router.post('/rooms/edit/:id', function (req, res) { 
//     const roomId = req.params.id;    

//     // Get the room we want to edit.
//     const room = _.find(rooms, r => r.id === roomId);
//     if (!room) {
//         res.sendStatus(404);
//         return;        
//     }

//     room.name = req.body.name;  
    
//     // res.redirect('/admin/rooms');
//     res.redirect(req.baseUrl + "/rooms");
//     // res.redirect("./");
// });

router.route('/rooms/edit/:id')
    .all(function(req, res, next) {
        const roomId = req.params.id;    

        // Get the room we want to edit.
        const room = _.find(rooms, r => r.id === roomId);
        if (!room) {
            res.sendStatus(404);
            return;        
        }
        res.locals.room = room;
        next();
    })
    .get(function(req, res) {         

        // Pass this room to the view
        // res.render('edit', { room: res.locals.room, baseUrl: req.baseUrl });
        res.locals.baseUrl = req.baseUrl
        res.render('edit');
    })    
    .post(function (req, res) {        

        // room.name = req.body.name;  
        res.locals.room.name = req.body.name
        
        // res.redirect('/admin/rooms');
        res.redirect(req.baseUrl + "/rooms");
        // res.redirect("./");
    });

router.get('/rooms/delete/:id', function(req, res) {
    const roomId = req.params.id;

    rooms = rooms.filter(r => r.id !== roomId);
    //res.redirect('/admin/rooms');
    res.redirect(req.baseUrl + "/rooms");
});


