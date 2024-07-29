const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authenticationRouter = require('./routers/authentication');
const tictactoeRouter = require('./routers/tictactoe');
const todoListRouter = require('./routers/todolist');

const app = express();

app.use(
  cors({
    // needed to do this to get the cookies working,
    // [NOTE] need to understand why I needed to do this and what credentials are
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/', authenticationRouter);
app.use('/tictactoe', tictactoeRouter);
app.use('/todolist', todoListRouter);

app.listen(2500);
