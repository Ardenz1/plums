export interface Props{
  link_title : string;
  link_created_at: Date; 
  link_hyperlink : string;
  link_description: string | null;
}

const LinkCard = (props: Props) => {
  let date: string[] = String(props.link_created_at).split(' ');
  let dateString: string = `${date[1]} ${date[2]}, ${date[3]}`;
  return (
    <div className="items-center bg-plum-100 p-5 rounded-2xl mb-2">
      <h2 className="text-sm text-plum-300 font-bold">{props.link_title}</h2>
      <h3 className="text-xs text-plum-300 font-thin ">{dateString}</h3>
      <a className="text-sm text-plum-300 pt-2 line-clamp-4 underline"  href={props.link_hyperlink}>{props.link_hyperlink}</a>
      <p className="text-sm text-plum-300 pt-2 line-clamp-4">{props.link_description}</p>
    </div>
  )
}

export default LinkCard;