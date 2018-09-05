const uuidv4 = require('uuid/v4');
const express = require('express');
const _ = require("lodash");
const rooms = require('./data/rooms.json');
let messages = require('./data/messages.json');

const router = express.Router();
module.exports = router;

router.get("/rooms", function(req, res) {
    res.json(rooms);
});

router.route("/rooms/:roomId/messages")
    .get(function(req, res) {
        const roomId = req.params.roomId;

        const roomMessages = messages
            .filter( m => m.roomId === roomId);

        var room = _.find(rooms, r => r.id === roomId);
        if (!room) {
            res.sendStatus(404);        
            return;        
        }
        res.json({
            room: room,
            messages: roomMessages
        });
    })
    .post(function(req, res) {
        const roomId = req.params.roomId;

        const message = {
            roomId: roomId,
            text: req.body.text,
            "userId": "44f885e8-87e9-4911-973c-4074188f408a",
            "id": uuidv4() 
        };

        messages.push(message);

        res.sendStatus(200);
    })
    .delete(function(req, res) {
        const roomId = req.params.roomId;

        /* 
            Careful! You are changing the reference to messages, so you are no longer 
            using the same messages array as admin.js. For now this is not important

            But what you could do is put that array in a module, and export some functionality 
            to manipulate the array, and share that module between the other modules using it.
        */
        messages = messages.filter(m => m.roomId !== roomId);

        res.sendStatus(200);
    });
