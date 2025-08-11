const projectService = require('../services/projectService');

const getAllProj = (req, res) => {
    const result = projectService.getAllProjects();
    res.json(result);
};

const getOneProj = (req, res) => {
    const id = parseInt(req.params.id);
    const proj = projectService.getProjectById(id);
    if (!proj) return res.status(404).json({ message: 'Project not found' });
    res.json(proj);
};

// const create = (req, res) => {
//     const { studentName, projectName, statu } = req.body;
//     if (!studentName || !projectName || !statu)
//         return res.status(400).json({ message: 'Missing data' });

//     const newProject = projectService.addProject(studentName, projectName, statu);
//     res.status(201).json(newProject);
// };
const create = (req, res) => {
    const { studentName, projectName, status, description } = req.body;

    if (!studentName || !projectName || !status) {
        return res.status(400).json({ message: 'Missing data' });
    }

    const newProject = projectService.addProject(studentName, projectName, status, description);
    res.status(201).json(newProject);
};

const remove = (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = projectService.deleteProject(id); 
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
};

const updateProject = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    const updated = projectService.updateProject(id, updatedData);
    if (!updated) return res.status(404).json({ message: 'Project not found' });

    res.json(updated);
};

module.exports = {
    getAllProj,
    getOneProj,
    create,
    remove,
    updateProject, 
};
