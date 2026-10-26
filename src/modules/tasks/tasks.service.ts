import { prisma } from '../../config/db.js';

export async function createTask(title: string, description : string) {
  return prisma.task.create({ 
    data: { title, description }, 
    select: { id: true, title: true, description: true, createdAt: true } 
  });
}

export async function findTaskById(id: number) {
  return prisma.task.findUnique({ 
    where: { id },
    select: { id: true, title: true, description: true, createdAt: true }
  });
}

export async function listTasks() {
  return prisma.task.findMany({ 
    select: { id: true, title: true, description: true, createdAt: true },
    orderBy: { id: 'asc' }
  });
}

export async function updateTask(id: number, data: { title?: string; description?: string }) {
  return prisma.task.update({
    where: { id },
    data,
    select: { id: true, title: true, description: true, createdAt: true }
  });
}

export async function deleteTask(id: number) {
  return prisma.task.delete({ where: { id } });
}
