// const projectService = require('../services/projectService');

// const getAllProj = (req, res) => {
//     const result = projectService.getAllProjects();
//     res.json(result);
// };

// const getOneProj = (req, res) => {
//     const id = parseInt(req.params.id);
//     const proj = projectService.getProjectById(id);
//     if (!proj) return res.status(404).json({ message: 'Project not found' });
//     res.json(proj);
// };

// // const create = (req, res) => {
// //     const { studentName, projectName, statu } = req.body;
// //     if (!studentName || !projectName || !statu)
// //         return res.status(400).json({ message: 'Missing data' });

// //     const newProject = projectService.addProject(studentName, projectName, statu);
// //     res.status(201).json(newProject);
// // };
// const create = (req, res) => {
//     const { studentName, projectName, status, description } = req.body;

//     if (!studentName || !projectName || !status) {
//         return res.status(400).json({ message: 'Missing data' });
//     }

//     const newProject = projectService.addProject(studentName, projectName, status, description);
//     res.status(201).json(newProject);
// };

// const remove = (req, res) => {
//     const id = parseInt(req.params.id);
//     const deleted = projectService.deleteProject(id); 
//     if (!deleted) return res.status(404).json({ message: 'Project not found' });
//     res.json({ message: 'Project deleted' });
// };

// const updateProject = (req, res) => {
//     const id = parseInt(req.params.id);
//     const updatedData = req.body;

//     const updated = projectService.updateProject(id, updatedData);
//     if (!updated) return res.status(404).json({ message: 'Project not found' });

//     res.json(updated);
// };

// module.exports = {
//     getAllProj,
//     getOneProj,
//     create,
//     remove,
//     updateProject, 
// };
const projectService = require('../services/projectService');
const mongoose = require('mongoose');
const getAllProj = async (req, res) => {
  try {
    const result = await projectService.getAllProjects();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


const getOneProj = async (req, res) => {
  try {
    const id = req.params.id;
    const proj = await projectService.getProjectById(id);
    if (!proj) return res.status(404).json({ message: 'Project not found' });
    res.json(proj);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { studentName, projectName, status, description } = req.body;
    if (!studentName || !projectName || !status) {
      return res.status(400).json({ message: 'Missing data' });
    }
    const newProject = await projectService.addProject(studentName, projectName, status, description);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const deleted = await projectService.deleteProject(id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }

    const updated = await projectService.updateProject(id, updatedData);

    if (!updated) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


module.exports = { getAllProj, getOneProj, create, remove, updateProject };
