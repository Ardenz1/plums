"use client";
import { useEffect } from "react";
export interface Props {
  topicId: number;
  topicName: string;
  parentId: number | null;
  hasSubTopics: boolean;
}

const TopicCard = (props: Props) => {
  useEffect(() => {
    hideSubTopics(); // Hide subtopics when component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  const hideSubTopics = () => {
    let subTopics = document.querySelectorAll(`.subtopic-${props.topicId}`);
    subTopics.forEach((subTopic) => {
      subTopic.classList.add("hidden");
    });
  };

  const toggleSubTopics = () => {
    let subTopics = document.querySelectorAll(`.subtopic-${props.topicId}`);
    subTopics.forEach((subTopic) => {
      subTopic.classList.toggle("hidden");
    });
  };

  if (!props.hasSubTopics) {
    return (
      <div className="bg-leaf-200 p-5 rounded-2xl mb-2">
        <div className="flex justify-start cursor-pointer">
          <a href={`edit/${props.topicId}`} className="pr-2 text-leaf-300">
            <i className="fa-solid fa-pen"></i>
          </a>
          <a href={`/topicDetails/${props.topicId}`} className="flex-grow flex justify-between">
            <h2 className="text-black">{props.topicName}</h2>
            <i className="fa-solid fa-caret-right text-black"></i>
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between items-center bg-leaf-200 parent-padding rounded-2xl mb-2">
        <div className="flex justify-start cursor-pointer">
          <a href={`edit/${props.topicId}`} className="pr-2 text-leaf-300">
            <i className="fa-solid fa-pen"></i>
          </a>
          <a href={`/topicDetails/${props.topicId}`} className="flex-grow">
            <h2 className="text-black">{props.topicName}</h2>
          </a>
        </div>
        <button onClick={toggleSubTopics} className="flex justify-center items-center w-6 h-6 bg-leaf-100 rounded-full">
          <i className="fa-solid fa-caret-down"></i>
        </button>
      </div>
    );
  }
};

export default TopicCard;
