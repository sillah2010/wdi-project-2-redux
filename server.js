require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

const PlayersController = require('./controllers/PlayersController')
const CharactersController = require('./controllers/CharactersController')
const MVCICharactersController = require('./controllers/MVCICharactersController')
const TeamsController = require('./controllers/TeamsController')
const MVCITeamsController = require('./controllers/MVCITeamsController')

const connection = mongoose.connection;
connection.on('connected', () => {
  console.log('Mongoose Connected Successfully');    
}); 

// If the connection throws an error
connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
}); 

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/build/'));
app.use('/api/players', PlayersController);
app.use('/api/:playerId/teams', TeamsController);
app.use('/api/:playerId/mvciteams', MVCITeamsController);
app.use('/api/characters', CharactersController);
app.use('/api/mvcicharacters', MVCICharactersController)




app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
  })

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Magic happening on port " + PORT);
})