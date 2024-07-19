'use client';
import { useEffect } from "react";
export interface Props {
  tagId: number;
  tagName: string;

}

const TagCard = (props: Props) => {
  
    return (
      <div>
      <a href={`/topicDetails/${props.tagId}`} className="block">
        <div className="flex justify-between bg-leaf-200 p-5 rounded-2xl mb-2">
          <div className="flex justify-start cursor-pointer">
            <a href={`edit/${props.tagId}`} className="pr-2 text-leaf-300">
              <i className="fa-solid fa-pen"></i>
            </a>
            <h2 className="text-black">{props.tagName}</h2>
          </div>
          <i className="fa-solid fa-caret-right text-black"></i> 
        </div>
      </a>
      </div>
    );
  } 
export default TagCard;