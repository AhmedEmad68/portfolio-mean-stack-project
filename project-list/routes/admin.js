const express = require('express');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Admin Registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed', message: err.message });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', message: err.message });
  }
});

module.exports = router;
