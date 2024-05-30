
export interface Props{
    title : string
    note_created_at: string 
    description: string;
}

const NoteCard = (props: Props) => {
    // database call for number of each items should go here
    return (
        <div className="items-center bg-plum-100 p-5 rounded-2xl mb-2">
            <h2 className="text-sm text-plum-300 font-bold">{props.title}</h2>
            <h3 className="text-xs text-plum-300 font-thin">{props.note_created_at}</h3>
            <p className="text-sm text-plum-300 pt-2 line-clamp-4">{props.description}</p>
        </div>
    )
}

export default NoteCard;