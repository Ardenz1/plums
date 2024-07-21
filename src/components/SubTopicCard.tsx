"use client";

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
    const hideSubTopics = () => {
      let subTopics = document.querySelectorAll(`.subtopic-${props.topicId}`);
      subTopics.forEach((subTopic) => {
        subTopic.classList.add("hidden");
      });
    };

    hideSubTopics(); // Hide subtopics when component mounts
  }, [props.topicId]); // Adding props.topicId as dependency to be safe

  const toggleSubTopics = () => {
    let subTopics = document.querySelectorAll(`.subtopic-${props.topicId}`);
    subTopics.forEach((subTopic) => {
      subTopic.classList.toggle("hidden");
    });
  };

  return (
    <div>
      <div id={`subtopic-${props.topicId}`} className="flex justify-between items-center bg-plum-100 p-4 rounded-2xl mb-2 subtopic">
        <a href={`edit/${props.topicId}`} className="text-leaf-300 pr-2">
          <i className="fa-solid fa-pen"></i>
        </a>
        <a href={`/topicDetails/${props.topicId}`} className="flex-grow">
          <div className="flex items-center space-x-2 cursor-pointer">
            <h2 className="text-black">{props.topicName}</h2>
          </div>
        </a>
        {props.hasSubTopics && (
          <button onClick={toggleSubTopics}>
            <span className="flex justify-center items-center w-6 h-6 bg-leaf-100 rounded-full">
              <i className="fa-solid fa-caret-down"></i>
            </span>
          </button>
        )}
      </div>
      {props.hasSubTopics &&
        props.subTopics &&
        props.subTopics.map((subTopic, index) => (
          <div key={index} className={`subtopic-${props.topicId} hidden`}>
            {subTopic}
          </div>
        ))}
    </div>
  );
};

export default SubTopicCard;
