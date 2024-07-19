'use client'
import { useState } from "react";
import { usePathname, useRouter } from 'next/navigation';

import CopyBtn from "./CopyBtn";
import FooterButtons from "./FooterButtons";
 
export interface Props {
  attachment: string;
  attachmentTitle: string;
  attachmentDescription: string;
  attachmentCreated: Date;
}

const AttachmentCardSingle = (props: Props) => {
  console.log('Attachment ID:', props.attachment); // Example line to log attachment ID or related props

  let date: string[] = String(props.attachmentCreated).split(' ');
  let dateString: string = `${date[1]} ${date[2]}, ${date[3]}`;

  let fileType: string = String(props.attachment.split('.')[1]).toLowerCase();
  let fileIcon: string;

  if (fileType == 'doc' || fileType == 'docx') {
    fileIcon = 'fa-solid fa-file-word';
  } else if (fileType == 'pdf') {
    fileIcon = 'fa-solid fa-file-pdf';
  } else if (fileType == 'py') {
    fileIcon = 'fa-brands fa-python';
  } else if (fileType == 'html') {
    fileIcon = 'fa-solid fa-file-code';
  } else {
    fileIcon = 'fa-solid fa-file';
  }

  const router = useRouter()
  const pathChunks = usePathname().split('/');
  const redirectUrl = pathChunks.slice(0, -1).join('/');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("isDeleted", "true");

    try {
      const response = await fetch(`/api/attachments/delete/${pathChunks[4]}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log(result);

      router.push(`${redirectUrl}`);
    } catch (error: any) {
      setError(error.message);
    }
  }
 
  return (
    <form onSubmit={handleSubmit} className=" bg-plum-100 p-5 rounded-2xl mb-16">
      <a href={props.attachment} download>
        <i className={`${fileIcon} text-4xl`}></i>
        <p className=" text-plum-300 mb-3 " style={{ fontSize: '0.5rem' }}>Download</p>
      </a>
      <div className="flex justify-between">
        <h2 className="font-bold text-sm">{props.attachmentTitle}</h2>
        <CopyBtn copyText={props.attachmentDescription}/>
      </div>
      <p className="font-thin text-xs mb-3">{dateString}</p>
      <p className="text-sm">{props.attachmentDescription}</p>
      <FooterButtons buttonPath={`${pathChunks.join('/')}/edit`} buttonType="delete" />
    </form>
  )
}
 
export default AttachmentCardSingle;
