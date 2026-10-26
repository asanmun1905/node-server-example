import type { Request, Response } from 'express';
import { listTasks, findTaskById, updateTask, deleteTask, createTask } from './tasks.service.js';

export async function listTasksCtrl(_req: Request, res: Response) {
  try {
    const tasks = await listTasks();
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getTaskCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    
    const task = await findTaskById(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateTaskCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    
    const task = await updateTask(id, req.body);
    res.json(task);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'El título ya está en uso' });
    }
    res.status(500).json({ message: error.message });
  }
}

export async function createTaskCtrl(req: Request, res: Response) {
  try {
    const { title, description } = req.body;
    const task = await createTask(title, description, );
    res.status(201).json(task);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'El título ya está en uso' });
    }
    res.status(500).json({ message: error.message });
  }
}

export async function deleteTaskCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    
    await deleteTask(id);
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(500).json({ message: error.message });
  }
}

