import { Router } from 'express';
import { notes } from '../db/notes.js';

export const notesRouter = Router();

notesRouter.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'Successfully found notes!',
    data: notes,
  });
});

notesRouter.get('/:noteId', (req, res, next) => {
  const { noteId } = req.params;
  const note = notes.find((n) => n.id === noteId);

  if (!note) {
    return next(new Error(`Note with id ${noteId} not found`));
  }

  res.json({
    status: 200,
    message: `Successfully found note with id ${noteId}!`,
    data: note,
  });
});
