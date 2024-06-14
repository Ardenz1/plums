import { Metadata } from "next";

import AttachmentCard from "@/components/AttachmentCard";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: 'Attachments',
};

export default function Attachments() {
  let date = new Date();
  return(
    <main>
      <BackButton back="/topicDetails" />
      <h1>Attachments</h1>
      <AttachmentCard attachment="file.docx" attachmentTitle="New Word File" attachmentDescription="This is a new attachment in a word file, look!" attachmentCreated={date} />
      <AttachmentCard attachment="file.py" attachmentTitle="New Python File" attachmentDescription="This is a new attachment in a python file, look!" attachmentCreated={date} />
      <AttachmentCard attachment="file.txt" attachmentTitle="New Text File" attachmentDescription="This is a new attachment in a text file, look!" attachmentCreated={date} />
      <AttachmentCard attachment="file.pdf" attachmentTitle="New PDF File" attachmentDescription="This is a new attachment in a pdf file, look!" attachmentCreated={date} />
    </main>
  )
}