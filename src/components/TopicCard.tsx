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
      <a href={`/topicDetails/${props.topicId}`} className="block">
        <div className="flex justify-between bg-leaf-200 p-5 rounded-2xl mb-2">
          <div className="flex justify-start cursor-pointer">
            <a href={`edit/${props.topicId}`} className="pr-2 text-leaf-300">
              <i className="fa-solid fa-pen"></i>
            </a>
            <h2 className="text-black">{props.topicName}</h2>
          </div>
          <i className="fa-solid fa-caret-right text-black"></i> 
        </div>
      </a>
    );
  } else {
    return (
      <div className="flex justify-between bg-leaf-200 p-5 rounded-2xl mb-2">
            <a href={`/topicDetails/${props.topicId}`} className="flex-grow">
            <div className="flex justify-start cursor-pointer">
                <a href={`edit/${props.topicId}`} className="pr-2 text-leaf-300">
                    <i className="fa-solid fa-pen"></i>
                </a>
              <h2 className="text-black">{props.topicName}</h2>
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