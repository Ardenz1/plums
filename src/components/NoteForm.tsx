import FooterButtons from "./FooterButtons";

export interface Props {
  // noteId: number;
  noteTitle: string;
  noteDescription: string;
}

const NoteForm = (props: Props) => {
  return (
    <form>
      {/* title */}
      <label htmlFor="noteTitle" className="block text-sm font-medium text-plum-300">Note title</label>
      <input id="noteTitle" name="noteTitle" value={props.noteTitle || ""} className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full" type="text"/>

      {/* description */}
      <label htmlFor="noteDescription" className="block text-sm font-medium text-plum-300">Note description</label>
      <textarea id="noteDescription" name="noteDescription" value={props.noteDescription || ""} className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"></textarea>

      <FooterButtons buttonType="create"/>
    </form>
  )
}
  
export default NoteForm;