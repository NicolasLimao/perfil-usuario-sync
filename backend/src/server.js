require('dotenv').config();

const Path = require('path');
const express = require('express');
const cors = require('cors');
const user_routes = require('./routes/userRoutes.js');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(Path.join(__dirname, '../public/uploads')));
app.use('/api', user_routes);

app.listen(port, () => {
    console.log(`Servidor na porta ${port}`);
    console.log(`http://localhost:${port}`);
});

