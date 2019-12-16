// List depenencies
const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();

// Set the port

const PORT = process.env.PORT || 3000;

// Set up express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Create routes for HTMLa
    // * GET `/notes` -  `notes.html` file.
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "public/assets/notes.html"));
    });
    // * GET `*` -`index.html` file
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "public/assets/index.html"));
    });


// static thing we talked about in class

app.use(express.static('public'))


//make requests

//get function
app.get("/api/notes", function(req, res){
    fs.readFile('db/db.json', 'utf8', function(err, data){
        if(err){
            console.log(err)
            return
        }
        res.send(data);
    });
});



//post function

app.post("/api/notes", function(req, res){
    const newNote = req.body;
    let updatedNotesStringified = "";
    // A new note is created so increase the note id by 1.
    noteIdMaker++;
    newNote.id = noteIdMaker;
    // If the site is starting with db.json empty it will go to the else statement.
    // If this is the site adding a new Note it will create a new note.
    if(newNote){
        console.log(`New note detected: ${newNote}`)
            // gets the data from db.json
        fs.readFile('db/db.json', 'utf8', function(err, notesStringified){
            if(err){
                console.log(`Error occurred during readfile in post notes: ${err}`)
                return
            }
            console.log(`Current Notes: ${notesStringified}`)
            // If notes already exist, this will be used to add to the current notes.
            if(notesStringified){
                const notes = JSON.parse(notesStringified)
                console.log(`A note already exists`)
                // Parses the data from db.json and stores it in notes.
                // Combines new note and current notes into a single array by spreading notes into a new array called combined notes and adding newNote.
                const combinedNotes = [...notes,newNote]
                // Stringifies combined notes so it can be stored as db.json
                updatedNotesStringified = JSON.stringify(combinedNotes);
                // Writes over previous db.json with new db.json data.
            }else{
                updatedNotesStringified = [JSON.stringify(newNote)];
            }

            fs.writeFile('db/db.json', updatedNotesStringified, function(err){
                if(err){
                    console.log(err)
                    return
                }
                res.send(newNote);
            });
        });
}else{
    res.send("[]")
}
})



//delete function




//start server

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });