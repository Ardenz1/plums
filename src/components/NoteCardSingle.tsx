import { Fragment } from "react";
import CopyBtn from "./CopyBtn";

export interface Props {
  note_title: string;
  note_created_at: Date;
  note_description: string;
}

const NoteCardSingle = (props: Props) => {
  let date: string[] = String(props.note_created_at).split(' ');
  let dateString: string = `${date[1]} ${date[2]}, ${date[3]}`;
  return (
    <Fragment>
      <div className="items-center bg-plum-100 p-5 rounded-2xl mb-2">
        <div className="flex justify-between">
        <h2 className="text-sm text-plum-300 font-bold">{props.note_title}</h2>
        <CopyBtn copyText={props.note_description}/>
        </div>
        <h3 className="text-xs text-plum-300 font-thin">{dateString}</h3>
        <p className="text-sm text-plum-300 pt-2 line-clamp-4">{props.note_description}</p>
      </div>
    </Fragment>
  );
};

export default NoteCardSingle;


