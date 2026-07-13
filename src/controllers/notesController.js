import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export async function getAllNotes(req, res, next) {
  try {
    const { page = 1, perPage = 10, tag, search } = req.query;

    const skip = (page - 1) * perPage;

    const notesQuery = Note.find();

    if (tag) {
      notesQuery.where('tag').equals(tag);
    }

    if (search) {
      notesQuery.where({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ],
      });
    }

    const [notes, totalNotes] = await Promise.all([
      notesQuery.skip(skip).limit(perPage).exec(),
      Note.countDocuments(notesQuery.getFilter()),
    ]);

    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({
      page: Number(page),
      perPage: Number(perPage),
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
}

export async function getNoteById(req, res, next) {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
}

export async function createNote(req, res, next) {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
}

export async function deleteNote(req, res, next) {
  try {
    const { noteId } = req.params;
    const note = await Note.findByIdAndDelete(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
}

export async function updateNote(req, res, next) {
  try {
    const { noteId } = req.params;
    const note = await Note.findByIdAndUpdate(noteId, req.body, {
      new: true,
    });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
}
