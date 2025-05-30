//backend\server\index.js
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = 3000;
require('dotenv').config();

app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use(express.json());

const ragRoutes = require('./routes/rag');
// const authRoutes = require('./routes/auth'); // For Auth
// const userRoutes = require('./routes/user'); // For User Management

app.use('/api/rag', ragRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

const { loadEmbeddings } = require('./utils/ragUtils');  // Import loadEmbeddings

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    loadEmbeddings();
});