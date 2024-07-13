'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import FooterButtons from "./FooterButtons";

export interface Props {
  attachmentId?: string;
  attachmentTitle: string;
  attachmentLink: string;
  attachmentDescription: string | null;
  btnType: string;
  btnPath: string;
  topicDetailId?: string; // Add topicDetailId for creating new attachments
}

const AttachmentForm = (props: Props) => {
  const router = useRouter();
  const path = usePathname();
  const redirectUrl = path.split('/').slice(0, -1).join('/');

  const [attachmentTitle, setAttachmentTitle] = useState(props.attachmentTitle);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [attachmentDescription, setAttachmentDescription] = useState(props.attachmentDescription || "");
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>(props.attachmentLink);

  useEffect(() => {
    setAttachmentTitle(props.attachmentTitle);
    setAttachmentDescription(props.attachmentDescription || "");
    setFileName(props.attachmentLink);
  }, [props.attachmentTitle, props.attachmentDescription, props.attachmentLink]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachmentTitle(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAttachmentFile(file);
    setFileName(file ? file.name : '');
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAttachmentDescription(e.target.value);
  };

  const handleFileInputClick = () => {
    document.getElementById('actual_file_input')?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("title", attachmentTitle);
    formData.append("description", attachmentDescription);
    if (attachmentFile) {
      formData.append("file", attachmentFile);
    }
    if (props.topicDetailId) {
      formData.append("topicDetailId", props.topicDetailId); // Ensure topicDetailId is included in formData
    }

    const isEdit = Boolean(props.attachmentId);
    const url = isEdit ? `/api/attachments/edit/${props.attachmentId}` : `/api/attachments/create/${props.topicDetailId}`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process the attachment');
      }

      const result = await response.json();
      console.log(isEdit ? 'Attachment updated:' : 'Attachment created:', result);

      router.push(`${redirectUrl}`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="attachment-form" encType="multipart/form-data">
      <label htmlFor="attachment_title" className="block text-sm font-medium text-plum-300">Attachment title</label>
      <input
        id="attachment_title"
        name="attachment_title"
        value={attachmentTitle}
        onChange={handleTitleChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
        placeholder='Add Title'

      />

      <label htmlFor="attachment_link" className="block text-sm font-medium text-plum-300">Attachment</label>
      <input
        id="actual_file_input"
        name="attachment_link"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        type="text"
        readOnly
        value={fileName}
        onClick={handleFileInputClick}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full cursor-pointer"
        placeholder='Click To Add Attachment'

      />

      <label htmlFor="attachment_description" className="block text-sm font-medium text-plum-300">Attachment description</label>
      <textarea
        id="attachment_description"
        name="attachment_description"
        value={attachmentDescription}
        onChange={handleDescriptionChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"
        placeholder='Add Description'
      ></textarea>

      <FooterButtons buttonPath={props.btnPath} buttonType={props.btnType} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}

export default AttachmentForm;
