const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');
const trainRouter = require('./routes/train.routes');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', trainRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
