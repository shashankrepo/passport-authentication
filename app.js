const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .then(() => console.log('connected to mongoDB'))
  .catch(err => console.log('Could not connect to mongodb', err));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressLayouts);
app.use('/home', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.listen(port, console.log(`Server created on port ${port}`));
