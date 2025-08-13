const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');

const app = express();

app.get('/bookings', (req, res) => {
  res.render('bookings', { title: 'Bookings' });
});

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Layouts
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ACC Valets site running at http://localhost:${PORT}`);
});
