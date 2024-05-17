
export interface Props {
  topicName: string;
}

const TopicCard = (props: Props) => {
  return (
    <div className="flex justify-between items-center bg-leaf-200 p-5 rounded-2xl mb-2">
      <h2>{props.topicName}</h2>
      <i className="fa-solid fa-caret-right"></i>
    </div>
  )
}

export default TopicCard;