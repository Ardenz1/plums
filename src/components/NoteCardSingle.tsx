import { Fragment } from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

export interface Props{
    title : string
    note_created_at: string 
    description: string;
}

const NoteCardSingle = (props: Props) => {
    // database call for number of each items should go here
    return (
        <Fragment>
        <div className="items-center bg-plum-100 p-5 rounded-2xl mb-2">
            <h2 className="text-sm text-plum-300 font-bold">{props.title}</h2>
            <h3 className="text-xs text-plum-300 font-thin">{props.note_created_at}</h3>
            <p className="text-sm text-plum-300 pt-2 line-clamp-4">{props.description}</p>
        </div>
        <div className="absolute bottom-0">
        <div className="mt-auto flex justify-center items-center py-2 space-x-2">
            <EditButton/>
            <DeleteButton/>
        </div>
        </div>
        </Fragment>
    )
}

export default NoteCardSingle;
