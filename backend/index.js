const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projectRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);

 app.get('/', (req, res) => {
 res.send(`${process.env.APP_NAME} is running...`);
 });

const port = process.env.PORT || 3000; 

app.listen(port, () => {
    console.log(`${process.env.APP_NAME} running on port ${port}`); 
});