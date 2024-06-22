import { Metadata } from "next";

import AttachmentCardSingle from "@/components/AttachmentCardSingle";
import BackButton from "@/components/BackButton";
import FooterButtons from "@/components/FooterButtons";

import { getAttachmentById } from "@/database/database";

export const metadata: Metadata = {
  title: 'Attachment',
};

export default async function AttachmentSingle({ params }: { params: { topicId: string, attachmentId: string } }) {
  const attachment = await getAttachmentById(parseInt(params.attachmentId));


  if (!attachment) {
    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}`} />
        <h1>Attachment</h1>
        <p>No attachment found with the given ID 😞</p>
      </main>
    )
  }
  return (
    <main>
      <BackButton back={`/topicDetails/${params.topicId}/attachments`} />
      <h1>Attachment</h1>
      <AttachmentCardSingle
        key={attachment.attachment_id}
        attachment="file.docx"
        attachmentTitle={attachment.attachment_header}
        attachmentCreated={attachment.attachment_created_at}
        attachmentDescription={attachment.attachment_description!}
      />
      <FooterButtons buttonType="delete" />
    </main>
  )
}



// export default function AttachmentSingle() {
//   let date = new Date();
//   return(
//     <main>
//       <BackButton back="/topicDetails/attachments" />
//       {/* Dynamically put note name in here */}
//       <h1>Attachment</h1>
//       <AttachmentCardSingle attachment="file.docx" attachmentTitle="New Word File" attachmentDescription="This is a new attachment in a word file, look!" attachmentCreated={date} />
//       <DeleteEditBtns />
//     </main>
//   )
// }