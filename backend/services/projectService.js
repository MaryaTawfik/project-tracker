// let projects = require('../data/projects');
// console.log('Imported projects:', projects);
// console.log('Is array:', Array.isArray(projects));

// const getAllProjects = () => projects;

// const getProjectById = (id) => projects.find(p => p.id === id);

// const addProject = (studentName, projectName, status,description) => {
//     const newProject = {
//         id: projects.length + 1,
//         studentName,
//         projectName,
//         status,
//         description
//     };
//     projects.push(newProject);
//     return newProject;
// };

// const deleteProject = (id) => {
//     const initialLength = projects.length;
//     projects = projects.filter(p => p.id !== id);
//     return projects.length < initialLength;
// };

// const updateProject = (id, updatedData) => {
//     const projectToUpdate = projects.find(p => p.id === id);
//     if (!projectToUpdate) {
//         return null;
//     }
//     const updatedProject = { ...projectToUpdate, ...updatedData };
//     projects = projects.map(p => (p.id === id ? updatedProject : p));
//     return updatedProject; 
// };

// module.exports = {
//     getAllProjects,
//     getProjectById,
//     addProject,
//     deleteProject,
//     updateProject,
// };
const Project = require('../data/projects');

const getAllProjects = async () => {
  return await Project.find();
};

const getProjectById = async (id) => {
  return await Project.findById(id);
};

const addProject = async (studentName, projectName, status, description) => {
  const newProject = new Project({ studentName, projectName, status, description });
  return await newProject.save();
};

const deleteProject = async (id) => {
  const result = await Project.findByIdAndDelete(id);
  return !!result;
};

const updateProject = async (id, updatedData) => {
  const result = await Project.findByIdAndUpdate(id, updatedData, { new: true });
  return result;
};

module.exports = {
  getAllProjects,
  getProjectById,
  addProject,
  deleteProject,
  updateProject,
};
