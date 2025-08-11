let projects = require('../data/projects');
console.log('Imported projects:', projects);
console.log('Is array:', Array.isArray(projects));

const getAllProjects = () => projects;

const getProjectById = (id) => projects.find(p => p.id === id);

const addProject = (studentName, projectName, status,description) => {
    const newProject = {
        id: projects.length + 1,
        studentName,
        projectName,
        status,
        description
    };
    projects.push(newProject);
    return newProject;
};

const deleteProject = (id) => {
    const initialLength = projects.length;
    projects = projects.filter(p => p.id !== id);
    return projects.length < initialLength;
};

const updateProject = (id, updatedData) => {
    const projectToUpdate = projects.find(p => p.id === id);
    if (!projectToUpdate) {
        return null;
    }
    const updatedProject = { ...projectToUpdate, ...updatedData };
    projects = projects.map(p => (p.id === id ? updatedProject : p));
    return updatedProject; 
};

module.exports = {
    getAllProjects,
    getProjectById,
    addProject,
    deleteProject,
    updateProject,
};