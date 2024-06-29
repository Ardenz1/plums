'use client';
import { useState } from 'react';
import FooterButtons from './FooterButtons';

interface Props {
  noteId: string;
  noteTitle: string;
  noteDescription: string;
  btnType: string;
  btnPath: string;
}

const NoteForm = (props: Props) => {
  const [noteTitle, setNoteTitle] = useState(props.noteTitle);
  const [noteDescription, setNoteDescription] = useState(props.noteDescription || '');
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`/api/notes/edit/${props.noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: noteTitle,
          description: noteDescription,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the note');
      }

      const updatedNote = await response.json();
      console.log('Note updated:', updatedNote);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="noteTitle" className="block text-sm font-medium text-plum-300">Note title</label>
      <input
        id="noteTitle"
        name="noteTitle"
        value={noteTitle}
        onChange={handleTitleChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
      />

      <label htmlFor="noteDescription" className="block text-sm font-medium text-plum-300">Note description</label>
      <textarea
        id="noteDescription"
        name="noteDescription"
        value={noteDescription}
        onChange={handleDescriptionChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"
      ></textarea>

      <FooterButtons buttonPath={props.btnPath} buttonType={props.btnType} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default NoteForm;
