const express = require('express');
const app = express();
const upload = require('express-fileupload');
const bodyParser = require('body-parser');
const handles = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const PORT = process.env.PORT | 8080;

const {mongoDbUrl} = require('./config/database');
mongoose.connect(mongoDbUrl)
  .then((db)=>{console.log(`${mongoDbUrl} connected`);})
  .catch(error=>console.log(error));

app.use(upload());

app.engine('handlebars', handles({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const index = require('./routes/index');
app.use('', index);

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});