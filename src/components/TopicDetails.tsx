import { getTopicDetails } from "@/database/database";
import { Topic_Detail } from "@prisma/client";

export interface Props {
  topicId: number;
  topicDetails: any;
}

const TopicDetails = (props: Props) => {
  // get counts for detail amounts
  let attachmentCount = props.topicDetails.attachments.length;
  let linkCount = props.topicDetails.links.length;
  let noteCount = props.topicDetails.notes.length;
  let photoCount = props.topicDetails.photos.length;
  return (
    <section>
      <a href={`/topicDetails/${props.topicId}/notes/`}>
        <div className="flex justify-between items-center bg-plum-100 p-5 rounded-2xl mb-2">
          <h2>Notes</h2>
          <div>
            <span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 mr-2 rounded-full">{noteCount}</span>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </a>
      <a href={`/topicDetails/${props.topicId}/links/`}>
        <div className="flex justify-between items-center bg-plum-100 p-5 rounded-2xl mb-2">
          <h2>Links</h2>
          <div>
            <span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 mr-2 rounded-full">{linkCount}</span>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </a>
      <a href={`/topicDetails/${props.topicId}/photos/`}>
        <div className="flex justify-between items-center bg-plum-100 p-5 rounded-2xl mb-2">
          <h2>Photos</h2>
          <div>
            <span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 mr-2 rounded-full">{photoCount}</span>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </a>
      <a href={`/topicDetails/${props.topicId}/attachments/`}>
        <div className="flex justify-between items-center bg-plum-100 p-5 rounded-2xl mb-2">
          <h2>Attachments</h2>
          <div>
            <span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 mr-2 rounded-full">{attachmentCount}</span>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </a>
    </section>
  )
}

export default TopicDetails;