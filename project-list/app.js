const express = require('express');
const mongoose = require('mongoose');
const projectsRoutes = require('./routes/projects');
const adminRoutes = require('./routes/admin');
const app = express();

// Middleware
app.use(express.json());
const cors = require('cors');
app.use(cors());

// login
app.use('/api/admin', adminRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/projectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Failed to connect to MongoDB", err));

// Use Routes
app.use('/api/projects', projectsRoutes);



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

