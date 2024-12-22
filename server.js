require('dotenv').config();
const express = require("express")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const eventRouter = require("./routes/eventsRouter")

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURL = process.env.MONGODB_URL;
mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));




app.use("/events/", eventRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

