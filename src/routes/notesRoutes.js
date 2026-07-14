import { Router } from 'express';
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

notesRouter.get('/notes', getAllNotesSchema, getAllNotes);
notesRouter.get('/notes/:noteId', noteIdSchema, getNoteById);
notesRouter.post('/notes', createNoteSchema, createNote);
notesRouter.delete('/notes/:noteId', noteIdSchema, deleteNote);
notesRouter.patch('/notes/:noteId', updateNoteSchema, updateNote);

export default notesRouter;