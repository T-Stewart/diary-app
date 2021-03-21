const express  = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const routes = require('./Routes/api')

mongoose.connect('mongodb://localhost/diary-post', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Mogoose is connected!')
})

app.use(express.json());
app.use(express.urlencoded({ extended: false}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
//HTTP request Logger
app.use(cors());
app.use(morgan('tiny'));
app.use('/api/posts', routes );

app.listen(PORT, console.log(`Server is starting at ${PORT}`));