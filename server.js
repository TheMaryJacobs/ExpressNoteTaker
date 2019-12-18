// List dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");

// Set the port
const app = express();
const PORT = process.env.PORT || 3050;

// Set up express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static thing we talked about in class
app.use(express.static('public'));


//REQUESTS: GET/POST/DELETE ===================================================>

//GET functions ================================>
    //home page
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "public/assets/index.html"));
    });

    //notes page
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "public/assets/index.html"));
    });

    //Gets the notes from the db.json file
    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "/db/db.json"));
    });


//POST function ================================>
notes = [];
app.post("/api/notes", function (req, res) {
    jason = path.join(__dirname, "/db/db.json");
    newNote = req.body;

    //gets the JSON file and saves it to the "notes variable"
    function getJason() {
        fs.readFile(jason, "utf8", function (error, response) {
            if (error) {
                console.log(error);
            }
            notes = JSON.parse(response)
            writeJason();
        });
    } getJason()

    function writeJason() {
    //creates IDs for notes 
        notes.push(newNote)
        for (let i = 0; i < notes.length; i++) {
            note = notes[i]
            note.id = i + 1
        }
        // adds new note 
        fs.writeFile(jason, JSON.stringify(notes), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note has been saved.");
        });
    }
    res.sendFile(path.join(__dirname, "/db/db.json"));

});


//DELETE function ================================>
//THIS ISNT WORKING AND IM NOTE... NOT SURE WHY.

app.delete("/api/notes/:id", function (req, res) {
    res.send(req.body.id)
    // set variable to the ID of the note to delete
    const deletedId = (req.params.id);
    console.log(deletedId)
    
    jsonFile = path.join(__dirname, "/db/db.json");
    function getJason() {
        fs.readFile(jsonFile, "utf8", function (error, response) {
            if (error) {
                console.log(error);
            }
            notes = JSON.parse(response)
            deleteJason();
        });
    } getJason()
    // removes the id of the deleted note so it can be used again
    function deleteJason() {
        notes.splice(id - 1, 1);
        writeFile();
    }

    function writeFile() {
        for (let i = 0; i < notes.length; i++) {
            note = notes[i]
            note.id = i + 1
        }
        fs.writeFile(jsonFile, JSON.stringify(notes), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Updating your notes.");
        });
    }
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

//start server

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });