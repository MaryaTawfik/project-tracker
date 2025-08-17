const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectcontroller');

// Route definitions
router.get('/', projectController.getAllProj);
router.get('/:id', projectController.getOneProj);
router.post('/', projectController.create);
router.delete('/:id', projectController.remove);
router.put('/:id', projectController.updateProject);

module.exports = router;
