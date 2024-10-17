const express = require('express');
const Project = require('../models/project');
const auth = require('../middleware/auth');  // Import the auth middleware
const router = express.Router();

// Get all projects (Public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects', message: error.message });
  }
});

// Create new project (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create project', message: error.message });
  }
});

// Update project (Protected)
router.put('/:id', auth, async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) {
    return res.status(404).send('Project not found');
  }
  res.json(project);
});


// Delete project (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project', message: error.message });
  }
});

module.exports = router;
