'use client';
import { useState } from 'react';
import FooterButtons from "./FooterButtons";

export interface Props {
  noteTitle: string;
  noteDescription: string;
  btnType: string;

}

const NoteForm = (props: Props) => {
  const [noteTitle, setNoteTitle] = useState(props.noteTitle);
  const [noteDescription, setNoteDescription] = useState(props.noteDescription || "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteDescription(e.target.value);
  };

  return (
    <form>
      {/* title */}
      <label htmlFor="noteTitle" className="block text-sm font-medium text-plum-300">Note title</label>
      <input
        id="noteTitle"
        name="noteTitle"
        value={noteTitle}
        onChange={handleTitleChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
      />

      {/* description */}
      <label htmlFor="noteDescription" className="block text-sm font-medium text-plum-300">Note description</label>
      <textarea
        id="noteDescription"
        name="noteDescription"
        value={noteDescription}
        onChange={handleDescriptionChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"
      ></textarea>

<FooterButtons buttonType={props.btnType} />
</form>
  );
}

export default NoteForm;
