// pages/api/notes.js

// In-memory array to store notes (simulating a database)
let notes = [
    {
        "id":1,
        "heading":"Haider",
        "description":"desc"

    }, {
        "id":2,
        "heading":"Haider",
        "description":"desc"
    }
];

export default function handler(req, res) {

  if (req.method === 'GET') {
    res.status(200).json(notes);

  } else if (req.method === 'POST') {
      console.log("req", req)
      const newNote = req.body;

    if (!newNote || !newNote.title || !newNote.content) {
      res.status(400).json({ error: 'Invalid request body' });
      return;
    }
    notes.push(newNote);
    res.status(201).json(newNote);

  } else if (req.method === 'PATCH') {
    const { id, updatedNote } = req.body;

    if (!id || !updatedNote || !updatedNote.title || !updatedNote.content) {
      res.status(400).json({ error: 'Invalid request body' });
      return;
    }
    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }
    notes[index] = updatedNote;

    res.status(200).json(updatedNote);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ error: 'Invalid request body' });
      return;
    }

    notes = notes.filter((note) => note.id !== id);

    // Respond with success message
    res.status(200).json({ message: 'Note deleted successfully' });
  } else {
    // Method not allowed
    res.status(405).json({ error: 'Method not allowed' });
  }
}