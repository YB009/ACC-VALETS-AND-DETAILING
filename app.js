const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');

const app = express();

// === Body parsers (needed for JSON form submissions) ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === View engine / layouts ===
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// === Static files ===
app.use(express.static(path.join(__dirname, 'public')));

// === Main routes ===
app.use('/', indexRouter);

// === Start server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ACC Valets site running at http://localhost:${PORT}`);
});
