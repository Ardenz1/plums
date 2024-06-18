import { Metadata } from "next";

import AttachmentCard from "@/components/AttachmentCard";
import BackButton from "@/components/BackButton";

import { getAllAttachments } from "@/database/database";
import { Attachment } from "@prisma/client";

export const metadata: Metadata = {
  title: 'Attachments',
};

export default async function Attachments({ params }: { params: { topicId: string } }) {
  let attachments: Attachment[] = await getAllAttachments(parseInt(params.topicId));
  if (attachments.length == 0) {
    return(
      <main>
        <BackButton back={`/topicDetails/${params.topicId}`} />
        <h1>Attachments</h1>
        <p>Nothing to see here...</p>
      </main>
    )
  } else {
    return(
      <main>
        <BackButton back={`/topicDetails/${params.topicId}`} />
        <h1>Attachments</h1>
        {
          attachments.map(attachment => {
            return (
              <AttachmentCard 
                key={attachment.attachment_id}
                // need new attribute for attachment_link
                // and maybe update column_name from attachment_link to attachment_???
                attachment="file.docx"
                attachmentTitle={attachment.attachment_header}
                attachmentCreated={attachment.attachment_created_at} 
                attachmentDescription={attachment.attachment_description} 
                attachmentSingleView={`/topicDetails/${params.topicId}/attachments/${attachment.attachment_id}`}
              />
            )
          })
        }
      </main>
        // sample cards
        // <AttachmentCard attachment="file.docx" attachmentTitle="New Word File" attachmentDescription="This is a new attachment in a word file, look!" attachmentCreated={date} />
        // <AttachmentCard attachment="file.py" attachmentTitle="New Python File" attachmentDescription="This is a new attachment in a python file, look!" attachmentCreated={date} />
        // <AttachmentCard attachment="file.txt" attachmentTitle="New Text File" attachmentDescription="This is a new attachment in a text file, look!" attachmentCreated={date} />
        // <AttachmentCard attachment="file.pdf" attachmentTitle="New PDF File" attachmentDescription="This is a new attachment in a pdf file, look!" attachmentCreated={date} />
    )
  }
}