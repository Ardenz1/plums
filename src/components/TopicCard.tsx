
export interface Props {
  topicId: number;
  topicName: string;
  parentId: number | null;
}

const TopicCard = (props: Props) => {
  if(props.parentId == null) {
    return (
      <a href={`/topicDetails/${props.topicId}`}>
        <div className="flex justify-between items-center bg-leaf-200 p-5 rounded-2xl mb-2">
          <h2>{props.topicName}</h2>
          <i className="fa-solid fa-caret-right"></i>
        </div>
      </a>
    )
  } else {
    return (
      <div className="flex justify-between items-center bg-leaf-200 p-5 rounded-2xl mb-2">
          <h2>{props.topicName}</h2>
          <button> 
            <span className="flex justify-center items-center w-6 h-6 bg-leaf-100 rounded-full">
            <i className="fa-solid fa-caret-down"></i>
            </span>
          </button>
      </div>
    )
  }
}

export default TopicCard;
