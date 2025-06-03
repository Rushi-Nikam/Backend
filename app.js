require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./Routers/userRoutes');
const contactRoutes = require('./Routers/contactRoutes');
const plantRoutes = require('./Routers/PlantsRoutes');
const GtoolRoutes = require('./Routers/GToolRoutes');
const { connectDb } = require('./Config/db');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()
connectDb();

// Define a test route
app.get("/", (req, res) => {
    res.send("I am server");
});

// Use the routes
app.use('/users', userRoutes);  
app.use('/users/api', contactRoutes); // Changed the path to '/contact' for clarity
app.use('/product',plantRoutes);
app.use('/tool',GtoolRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
