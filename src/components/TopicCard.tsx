'use client';
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

  if (!props.hasSubTopics) {
    return (
      <a href={`/topicDetails/${props.topicId}`}>
        <div className="flex justify-between items-center bg-leaf-200 p-5 rounded-2xl mb-2">
          <h2>{props.topicName}</h2>
          <i className="fa-solid fa-caret-right"></i>
        </div>
      </a>
    );
  } else {
    return (
      <div className="flex items-center bg-leaf-200 p-5 rounded-2xl mb-2">
        <a href={`/topicDetails/${props.topicId}`} className="flex-grow">
          <div>
            <h2>{props.topicName}</h2>
          </div>
        </a>
        <button onClick={toggleSubTopics}>
          <span className="flex justify-center items-center w-6 h-6 bg-leaf-100 rounded-full">
            <i className="fa-solid fa-caret-down"></i>
          </span>
        </button>
      </div>
    );
  }
};

export default TopicCard;