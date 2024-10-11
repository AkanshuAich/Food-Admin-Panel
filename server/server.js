// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://zuup:zuup@zuup.zddfb.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});