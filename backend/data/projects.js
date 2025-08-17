    //  const projects=[{
    //     id:1,
    //     studentName:"Jihad",
    //     projectName:"project one",
    //     description: "Building a responsive portfolio website using HTML, CSS, and JavaScript.",
    //     status:"ongoing"
    // },
    // {
    //     id:2,
    //     studentName:"Jude",
    //     projectName:"project two",
    //     description: "Creating a RESTful API for a task manager app using Node.js and Express.",
    //     status:"completed" 
    // }
    // ];
    // module.exports = projects;
    const mongoose=require('mongoose');
    const projectSchema=new mongoose.Schema({
        studentName: {type:String, reqired: true},
        projectName: {type:String, reqired: true},
        description: { type: String },
  status: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('projects', projectSchema);
    