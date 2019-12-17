// List depenencies
const fs = require("fs");
const express = require("express");
const path = require("path");


// Set the port
const app = express();
const PORT = process.env.PORT || 3050;

// Set up express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Create routes for HTML
    // * GET `/notes` -  `notes.html` file.
    // app.get("/notes", function(req, res) {
    //     res.sendFile(path.join(__dirname, "public/assets/notes.html"));
    // });
    // * GET `*` -`index.html` file
    // app.get("/", function(req, res) {
    //     res.sendFile(path.join(__dirname, "public/assets/index.html"));
    // });


// static thing we talked about in class

// app.use(bodyParser.urlencoded({ extended: true }));


//make requests: GET/POST/DELETE

//get function
//home page
// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, "public/assets/index.html"));
// });


//notes page
// app.get("/notes", function (req, res) {
//     res.sendFile(path.join(__dirname, "public/assets/notes.html"));
// });

//Gets the notes from the db.json file
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});


//post function
// let noteIdMaker = 0

app.post("/api/notes", function(req, res){
    fs.readFile("/db/db.json", "utf8", function(error, response) {
        if (error) {
            console.log(error);
        }
        const notes = JSON.parse(response);
        console.log(notes);
        const noteRequest = req.body;
        console.log(noteRequest);
        const newNoteId = notes.length + 1;
        const newNote = {
            id: newNoteId,
            message: noteRequest.message
        };
        notes.push(newNote);
        res.json(newNote);
        fs.writeFile("db.json", JSON.stringify(notes, null, 2), function(err) {
            if (err) throw err;
        });
    });
});
















    //req.dat body
//     const newNote = req.body;
//     let postedNote = "";
//     // A new note is created so increase the note id by 1 in db file
//     noteIdMaker++;
//     newNote.id = noteIdMaker;
//     fs.readFile('db/db.json', 'utf8', function(err, notesStringified){
//         if(err){
//             console.log(`Error occurred during readfile in post notes: ${err}`)
//             return
//         }
//         console.log(`Current Notes: ${notesStringified}`)
//         // If notes already exist, this will be used to add to the current notes.
//         const notes = JSON.parse(notesStringified)
//         // Parses the data from db.json and stores it in notes.
//         // Combines new note and current notes into a single array by spreading notes into a new array called combined notes and adding newNote.
//         const combinedNotes = [...notes,newNote]
//         // Stringifies combined notes so it can be stored as db.json
//         postedNote = JSON.stringify(combinedNotes);
//         // Writes over previous db.json 
//         fs.writeFile('/db/db.json', postedNote, function(err){
//             if(err){
//                 console.log(err)
//                 return
//             }
//             res.send(newNote);
//         });
//     });
// })



//delete function
app.delete('/api/notes/:id', function (req, res) {
    // Stores the of the note that should be deleted.
    // -- id is a string so it needs to be converted to a integer
    const noteToDeleteId = parseInt(req.params.id);
    console.log(noteToDeleteId)
    // Sends a response back to the page that the delete request was completed
    // let notesStringified= "";
    
    // gets the data from db.json
    fs.readFile("/db/db.json", 'utf8', function(err, notesStringified){
        if(err){
            console.log(err)
            return
        }
        // Parses the data from db.json and stores it in notes.
        const notes = JSON.parse(notesStringified);
        console.log(notes);
        // Combines new note and current notes into a single array by spreading notes into a new array called combined notes and adding newNote.
        for(let i = 0; i < notes.length; i++){
            console.log("notes.length", notes.length)
            console.log("notes i",notes[i])
            console.log("notes id", notes[i].id)
            if(notes[i].id === noteToDeleteId){
                notes.splice(i,1);
                notesStringified = JSON.stringify(notes);
                console.log("note deleted.", notesStringified)
            }
        }




    //write the db file

        fs.writeFile("/db/db.json", notesStringified, function(err){
        if(err){
                console.log(err)
                return
            }
        });
        res.send('Got a DELETE request at /user')
        });
})


//start server

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });