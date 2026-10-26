import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { updateTaskSchema } from './tasks.schema.js';
import { createTaskSchema } from './tasks.schema.js';
import { listTasksCtrl, getTaskCtrl, updateTaskCtrl, deleteTaskCtrl, createTaskCtrl } from './tasks.controller.js';

const router = Router();

router.get('/', listTasksCtrl);
router.get('/:id', getTaskCtrl);
router.patch('/:id', validate(updateTaskSchema), updateTaskCtrl);
router.post('/', validate(createTaskSchema), createTaskCtrl);
router.delete('/:id', deleteTaskCtrl);

export default router;

