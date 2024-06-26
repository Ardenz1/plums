'use client';
import React, { useState } from 'react';
import FooterButtons from "./FooterButtons";

export interface Props {
  attachmentId: string;
  attachmentTitle: string;
  attachmentLink: string; // This can be removed since we're handling it in state
  attachmentDescription: string | null;
  btnType: string;
  btnPath: string;
}

const AttachmentForm = (props: Props) => {
  const [attachmentTitle, setAttachmentTitle] = useState(props.attachmentTitle);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [attachmentDescription, setAttachmentDescription] = useState(props.attachmentDescription || "");
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachmentTitle(e.target.value);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAttachmentFile(file);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAttachmentDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!attachmentFile) {
      setError("Please select a file to upload.");
      return;
    }

    try {
      const byteArray = await fileToByteArray(attachmentFile);

      const response = await fetch(`/api/attachments/edit/${props.attachmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: attachmentTitle,
          description: attachmentDescription,
          attachment: byteArray,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the attachment');
      }

      const updatedAttachment = await response.json();
      console.log('attachment updated:', updatedAttachment);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fileToByteArray = (file: File): Promise<number[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        resolve(Array.from(byteArray));
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <form onSubmit={handleSubmit} id="attachment-form">
      <label htmlFor="attachment_title" className="block text-sm font-medium text-plum-300">Attachment title</label>
      <input
        id="attachment_title"
        name="attachment_title"
        value={attachmentTitle}
        onChange={handleTitleChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
      />
      
      <label htmlFor="attachment_link" className="block text-sm font-medium text-plum-300">Attachment</label>
      <input
        id="attachment_link"
        name="attachment_link"
        type="file"
        // value={attachmentLink}
        onChange={handleLinkChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
      />
      
      <label htmlFor="attachment_description" className="block text-sm font-medium text-plum-300">Attachment description</label>
      <textarea
        id="attachment_description"
        name="attachment_description"
        value={attachmentDescription}
        onChange={handleDescriptionChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"
      ></textarea>

      <FooterButtons buttonPath={props.btnPath} buttonType={props.btnType} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}

export default AttachmentForm;
