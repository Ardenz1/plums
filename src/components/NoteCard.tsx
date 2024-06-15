
export interface Props{
    note_title : string;
    note_created_at: Date;
    note_description: string | null;
    singleView:string;
}

const NoteCard = (props: Props) => {
    let date: string[] = String(props.note_created_at).split(' ');
    let dateString: string = `${date[1]} ${date[2]}, ${date[3]}`;
    return (
        <div>
            <a href={props.singleView}>
            <div className="items-center bg-plum-100 p-5 rounded-2xl mb-2">
                <h2 className="text-sm text-plum-300 font-bold">{props.note_title}</h2>
                <h3 className="text-xs text-plum-300 font-thin">{dateString}</h3>
                <p className="text-sm text-plum-300 pt-2 line-clamp-4">{props.note_description}</p>
            </div>
            </a>
        </div>
    )
}

export default NoteCard;