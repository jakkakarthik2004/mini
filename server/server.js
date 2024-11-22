const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const userApi = require('./APIs/user-api');

const app = express();
const PORT = 5000;
const uri = 'mongodb://localhost:27017';
const dbName = 'store-management';
let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.use(cors());
app.use(express.json());

// Passing the DB instance to the user API route
app.use('/api/users', (req, res, next) => {
  req.db = db;
  next();
}, userApi);

app.get('/', (req, res) => {
  res.send('Store Management API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
