const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
app.use(express.static('public'));

app.use(session({
  secret: 'someSecretKey123',
  resave: false,
  saveUninitialized: false,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);
const zonalRoutes = require('./routes/zonal');
app.use('/zonal', zonalRoutes);  // This handles /zonal/request

mongoose.connect('mongodb://localhost:27017/orgblock', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log('MongoDB error:', err);
});
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
app.get('/', (req, res) => {
    res.render('home');
  });
  