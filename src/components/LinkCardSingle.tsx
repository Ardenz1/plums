import { Fragment } from "react";
import CopyBtn from "./CopyBtn";

export interface Props {
  link_title : string;
  link_created_at: Date; 
  link_hyperlink : string;
  link_description: string | null;
}

const LinkCardSingle = (props: Props) => {
  let date: string[] = String(props.link_created_at).split(' ');
  let dateString: string = `${date[1]} ${date[2]}, ${date[3]}`;
  return (
    <Fragment>
      <div className="items-center bg-plum-100 p-5 rounded-2xl mb-2">
        <div className="flex justify-between">
        <h2 className="text-sm text-plum-300 font-bold">{props.link_title}</h2>
        <CopyBtn copyText={props.link_hyperlink}/>
        </div>
        <h3 className="text-xs text-plum-300 font-thin ">{dateString}</h3>
        <a className="text-sm text-plum-300 pt-2 line-clamp-4 underline"  href={props.link_hyperlink}>{props.link_hyperlink}</a>
        <p className="text-sm text-plum-300 pt-2 line-clamp-4">{props.link_description}</p>
      </div>

    </Fragment>
  )
}

export default LinkCardSingle;
