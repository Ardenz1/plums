
export interface Props {
    topicName: string;
    parentId: number | null;
    topicId: number;
  }
  
  const SubTopicCard = (props: Props) => {
    return (
<div className="flex justify-between items-center bg-plum-100 p-4 rounded-2xl mb-2">
        <h2>{props.topicName}</h2>
        <i className="fa-solid fa-caret-right"></i>
      </div>
    )
  }
  
  export default SubTopicCard;