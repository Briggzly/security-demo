const express = require("express");
const cors = require("cors");
const ctrl = require('./controllers/ctrl')
const {createMessage} = ctrl

const app = express();

app.use(express.json());
app.use(cors());
app.post('/api/messages', createMessage)

app.listen(4004, () => console.log(`running on 4004`));
