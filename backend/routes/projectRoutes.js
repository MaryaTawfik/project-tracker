const express = require('express');
const router = express.Router();

const controller = require('../controllers/projectcontroller');


router.get('/', controller.getAllProj);

router.get('/:id', controller.getOneProj);


router.delete('/:id', controller.remove);


router.post('/', controller.create);

router.put('/:id', controller.updateProject);

module.exports = router;