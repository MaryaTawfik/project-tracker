// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const projectRoutes = require('./routes/projectRoutes');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/projects', projectRoutes);

//  app.get('/', (req, res) => {
//  res.send(`${process.env.APP_NAME} is running...`);
//  });

// const port = process.env.PORT || 3000; 

// app.listen(port, () => {
//     console.log(`${process.env.APP_NAME} running on port ${port}`); 
// });
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projectRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/projects', projectRoutes);

// Default root route
app.get('/', (req, res) => {
  res.send(`${process.env.APP_NAME} is running...`);
});

// Start server and connect to MongoDB
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/project_tracker', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 ${process.env.APP_NAME} running on port ${port}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  }
};

startServer();
