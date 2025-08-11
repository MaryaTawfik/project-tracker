const btn = document.getElementById("btn");
const formContainer = document.getElementById("formContainer");
const projectForm = document.getElementById("projectForm");
const tasks = document.getElementById("tasks");
const updateFormContainer = document.getElementById("updateFormContainer");
const updateProjectForm = document.getElementById("updateProjectForm");

btn.addEventListener("click", () => {
  formContainer.style.display =
    formContainer.style.display === "none" ? "block" : "none";
});

projectForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
  const data = {
    studentName: document.getElementById("studentName").value,
    projectName: document.getElementById("projectName").value,
    status: document.getElementById("status").value,
    description: document.getElementById("description").value,
  };

  try {
    const response = await fetch("http://localhost:3000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    await response.json();
    displayProjects();
    projectForm.reset();
    formContainer.style.display = "none";
  } catch (error) {
    console.log("Error:", error);
  }
});

const displayProjects = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/projects");
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched projects:", data);

    const projects = Array.isArray(data) ? data : data.projects;
    tasks.innerHTML = "";

    projects.forEach((project) => {
      const projectDiv = document.createElement("div");
      projectDiv.innerHTML = `
                <h2>Student name: ${project.studentName}</h2>
                <h3>Project name: ${project.projectName}</h3>
                <p>Status: ${project.status}</p>
                <p>Description: ${
                  project.description || "No description provided"
                }</p>
                <button onclick="deleteProject(${project.id})">Delete</button>
                <button onclick="showUpdateForm(${project.id})">Update</button>
            `;
      tasks.appendChild(projectDiv);
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

const deleteProject = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    displayProjects();
  } catch (error) {
    console.log("Error:", error);
  }
};

const showUpdateForm = async (id) => {
  const response = await fetch(`http://localhost:3000/api/projects/${id}`);
  const project = await response.json();

  document.getElementById("updateProjectId").value = project.id;
  document.getElementById("updateStudentName").value = project.studentName;
  document.getElementById("updateProjectName").value = project.projectName;
  document.getElementById("updateStatus").value = project.status;

  updateFormContainer.style.display = "block";
};

updateProjectForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("updateProjectId").value;
  const updatedData = {
    studentName: document.getElementById("updateStudentName").value,
    projectName: document.getElementById("updateProjectName").value,
    status: document.getElementById("updateStatus").value,
  };

  try {
    const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    displayProjects();
    updateFormContainer.style.display = "none";
  } catch (error) {
    console.log("Error:", error);
  }
});

displayProjects();
