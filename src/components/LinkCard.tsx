'use client'
export interface Props{
  link_title : string;
  link_created_at: Date; 
  link_hyperlink : string;
  link_description: string | null;
  link_single_view: string;
}

const LinkCard = (props: Props) => {
  let date: string[] = String(props.link_created_at).split(' ');
  let dateString: string = `${date[1]} ${date[2]}, ${date[3]}`;
  let url: string = props.link_hyperlink;
  if (!props.link_hyperlink.includes("https://") || !props.link_hyperlink.includes("http://")) {
    url = `https://${props.link_hyperlink}`;
  } else {
    url = props.link_hyperlink;
  }

  const openLink = () => {
    window.open(`${url}`, "_blank")
  }
  return (
      <a href={props.link_single_view}>
        <div className="items-center bg-plum-100 p-5 rounded-2xl mb-2">
          <h2 className="text-sm text-plum-300 font-bold">{props.link_title}</h2>
          <h3 className="text-xs text-plum-300 font-thin ">{dateString}</h3>
          <span className="text-sm text-plum-300 pt-2 line-clamp-4 underline" onClick={openLink}>{props.link_hyperlink}</span>
          <p className="text-sm text-plum-300 pt-2 line-clamp-4">{props.link_description}</p>
        </div>
      </a>
  )
}

export default LinkCard;