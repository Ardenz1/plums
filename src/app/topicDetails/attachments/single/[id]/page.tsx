import AttachmentCardSingle from "@/components/AttachmentCardSingle";
import BackButton from "@/components/BackButton";
import DeleteEditBtns from "@/components/DeleteEditBtns";

export default function photos() {
  let date = new Date();
  return(
    <main>
      <BackButton back="/topicDetails/attachments" />
      {/* Dynamically put note name in here */}
      <h1>Attachment</h1>
      <AttachmentCardSingle attachment="file.docx" attachmentTitle="New Word File" attachmentDescription="This is a new attachment in a word file, look!" attachmentCreated={date} />
      <DeleteEditBtns />
    </main>
  )
}