import { getTopicDetails } from "@/database/database";
import { Attachment, Link, Note, Photo } from "@prisma/client";

export interface Props {
  topicId: number;
  topicDetails: any;
}

const TopicDetails = (props: Props) => {
  // get counts for detail amounts
  let details = props.topicDetails
  
  let attachmentCount: number = 0;
  let linkCount: number = 0;
  let noteCount: number = 0;
  let photoCount: number = 0;
  if (details.attachments.length > 0) details.attachments.forEach((attachment: Attachment) => {if (!attachment.is_deleted) attachmentCount++});
  if (details.links.length > 0) details.links.forEach((link: Link) => {if (!link.is_deleted) linkCount++});
  if (details.notes.length > 0) details.notes.forEach((note: Note) => {if (!note.is_deleted) noteCount++});
  if (details.photos.length > 0) details.photos.forEach((photo: Photo) => {if (!photo.is_deleted) photoCount++});

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