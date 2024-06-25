'use client';
import { useState } from 'react';
import FooterButtons from "./FooterButtons";

export interface Props {
  attachmentTitle : string;
  attachmentLink : string;
  attachmentDescription: string | null;
  btnType: string;
}

const AttachmentForm = (props: Props) => {
  const [attachmentTitle, setAttachmentTitle] = useState(props.attachmentTitle);
  const [attachmentLink, setAttachmentLink] = useState(props.attachmentLink);
  const [attachmentDescription, setAttachmentDescription] = useState(props.attachmentDescription || "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachmentTitle(e.target.value);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachmentLink(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAttachmentDescription(e.target.value);
  };

  return (
    <form>
      {/* title */}
      <label htmlFor="attachment_title" className="block text-sm font-medium text-plum-300">Attachment title</label>
      <input
        id="attachment_title"
        name="attachment_title"
        value={attachmentTitle}
        onChange={handleTitleChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
      />
      
      {/* attachment path */}
      {/* this will need to be a file upload */}
      <label htmlFor="attachment_link" className="block text-sm font-medium text-plum-300">Attachment</label>
      <input
        id="attachment_link"
        name="attachment_link"
        value={attachmentLink}
        onChange={handleLinkChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
      />
      
      {/* description */}
      <label htmlFor="attachment_description" className="block text-sm font-medium text-plum-300">Attachment description</label>
      <textarea
        id="attachment_description"
        name="attachment_description"
        value={attachmentDescription}
        onChange={handleDescriptionChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"
      ></textarea>

      <FooterButtons buttonType={props.btnType} />
    </form>
  );
}
  
export default AttachmentForm;