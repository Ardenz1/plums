'use client';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import FooterButtons from './FooterButtons';

interface Props {
  noteId?: string;
  noteTitle: string;
  noteDescription: string;
  btnType: string;
  btnPath: string;
  topicDetailId?: string; // Add topicDetailId for creating new notes
}

const NoteForm = (props: Props) => {
  const router = useRouter();
  const path = usePathname();
  const redirectUrl = path.split('/').slice(0, -1).join('/');

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

    const isEdit = Boolean(props.noteId);
    const url = isEdit ? `/api/notes/edit/${props.noteId}` : `/api/notes/create/${props.topicDetailId}`;
    ;
    const method = isEdit ? 'PUT' : 'POST';

    const body = JSON.stringify({
      title: noteTitle,
      description: noteDescription,
      ...(isEdit ? {} : { topicDetailId: props.topicDetailId }), // Include topicDetailId only for creating new notes
    });


    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const result = await response.json();
      // console.log(isEdit ? 'Note updated:' : 'Note created:', result);

      router.push(`${redirectUrl}`);
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
        placeholder='Add Title'

      />

      <label htmlFor="noteDescription" className="block text-sm font-medium text-plum-300">Note description</label>
      <textarea
        id="noteDescription"
        name="noteDescription"
        value={noteDescription}
        onChange={handleDescriptionChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"
        placeholder='Add Description'

      ></textarea>

      <FooterButtons buttonPath={props.btnPath} buttonType={props.btnType} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default NoteForm;
