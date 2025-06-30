const express = require('express');
const { eventRoutes } = require('./app/controllers/event.controller');
const { userRoutes } = require('./app/controllers/user.controller');
const cors = require("cors")
// const dotenv = require('dotenv');
// import { bookRoutes } from './app/controllers/books.controller';
// import { borrowRoutes } from './app/controllers/borrow.controller';

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // allow Vite frontend
    credentials: true                // if you use cookies
}));

app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome Event Management app')
});

module.exports = app;