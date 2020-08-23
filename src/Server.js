const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/Auth');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
const DBconnect = 'mongodb+srv://usuarioC:30448298@aplicacoespessoais.jewxs.mongodb.net/AirCnC?retryWrites=true&w=majority';

dotenv.config();
mongoose.connect( DBconnect, { useNewUrlParser: true, useUnifiedTopology: true,}, 
    () => {console.log('Connected do db!')}
)

app.use(express.json());


app.use('/api/user', authRoute);
app.listen(port, () => console.log(`this server is online in port ${port}!`));