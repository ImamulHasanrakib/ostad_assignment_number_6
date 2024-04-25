const express = require('express');
const hpp = require('hpp');
const cors = require('cors');
const path = require('path');
const { errorHandler } = require('./middlewares/errorHandler');
const rateLimit = require('express-rate-limit');
const dbConnect = require('./db/db');
require('dotenv').config();
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));
app.use(hpp());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
const limiter = rateLimit({
  windowMs: process.env.REQUEST_LIMIT_TIME,
  max: process.env.REQUEST_LIMIT_NUMBER,
});
app.use(limiter);

app.use('/api/v1/food', require('./routes/foodRoutes'));

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Resource not found, please try again',
  });
});
app.use(errorHandler);

const PORT = process.env.PORT;

dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
  });
});
