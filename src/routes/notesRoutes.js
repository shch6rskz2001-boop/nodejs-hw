import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const notesRouter = Router();

notesRouter.use(authenticate);

notesRouter.get(
  '/notes',
  celebrate({ [Segments.QUERY]: getAllNotesSchema }),
  getAllNotes,
);

notesRouter.get(
  '/notes/:noteId',
  celebrate({ [Segments.PARAMS]: noteIdSchema }),
  getNoteById,
);

notesRouter.post(
  '/notes',
  celebrate({ [Segments.BODY]: createNoteSchema }),
  createNote,
);

notesRouter.delete(
  '/notes/:noteId',
  celebrate({ [Segments.PARAMS]: noteIdSchema }),
  deleteNote,
);

notesRouter.patch(
  '/notes/:noteId',
  celebrate({
    [Segments.PARAMS]: noteIdSchema,
    [Segments.BODY]: updateNoteSchema,
  }),
  updateNote,
);

export default notesRouter;