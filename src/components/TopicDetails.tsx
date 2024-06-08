import { getTopicDetails } from "@/database/database";

export interface Props {
  id: number;
  // topicDetails: object;
}

const TopicDetails = (props: Props) => {
  // database call for number of each items should go here
  // console.log("cool details", props.topicDetails)
  return (
    <section>
      <a href={`/topicDetails/notes/${props.id}`}>
        <div className="flex justify-between items-center bg-plum-100 p-5 rounded-2xl mb-2">
          <h2>Notes</h2>
          <div>
            <span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 mr-2 rounded-full">0</span>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </a>
      <a href={`/topicDetails/links/${props.id}`}>
        <div className="flex justify-between items-center bg-plum-100 p-5 rounded-2xl mb-2">
          <h2>Links</h2>
          <div>
            <span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 mr-2 rounded-full">0</span>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </a>
      <a href={`/topicDetails/photos/${props.id}`}>
        <div className="flex justify-between items-center bg-plum-100 p-5 rounded-2xl mb-2">
          <h2>Photos</h2>
          <div>
            <span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 mr-2 rounded-full">0</span>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </a>
      <a href={`/topicDetails/attachments/${props.id}`}>
        <div className="flex justify-between items-center bg-plum-100 p-5 rounded-2xl mb-2">
          <h2>Attachments</h2>
          <div>
            <span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 mr-2 rounded-full">0</span>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </a>
    </section>
  )
}

export default TopicDetails;