'use client';

import { useEffect } from "react";

export interface Props {
    topicName: string;
    parentId: number | null;
    topicId: number;
    hasSubTopics: boolean;
    subTopics?: string[];
  }
  
 
  const SubTopicCard = (props: Props) => {
    useEffect(() => {
      hideSubTopics(); // Hide subtopics when component mounts
    }, []); // Empty dependency array ensures this runs only once on mount
  
    const hideSubTopics = () => {
      let subTopics = document.querySelectorAll(`.subtopic-${props.topicId}`);
      subTopics.forEach(subTopic => {
        subTopic.classList.add('hidden');
      });
    };
  
    const toggleSubTopics = () => {
      let subTopics = document.querySelectorAll(`.subtopic-${props.topicId}`);
      subTopics.forEach(subTopic => {
        subTopic.classList.toggle('hidden');
      });
    };
  
    return (
      <div>
        <div id={`subtopic-${props.topicId}`} className="flex justify-between items-center bg-plum-100 p-4 rounded-2xl mb-2 subtopic">
          <a href={`/topicDetails/${props.topicId}`} className="flex-grow">
            <h2>{props.topicName}</h2>
          </a>
          {props.hasSubTopics && (
            <button onClick={toggleSubTopics}>
              <span className="flex justify-center items-center w-6 h-6 bg-leaf-100 rounded-full">
                <i className="fa-solid fa-caret-down"></i>
              </span>
            </button>
          )}
        </div>
        {props.hasSubTopics && props.subTopics && (
          props.subTopics.map((subTopic, index) => (
            <div key={index} className={`subtopic-${props.topicId} hidden`}>
              {subTopic}
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default SubTopicCard;