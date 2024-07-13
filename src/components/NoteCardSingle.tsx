'use client'
import { useState } from "react";
import { usePathname, useRouter } from 'next/navigation';

import CopyBtn from "./CopyBtn";
import FooterButtons from "./FooterButtons";

export interface Props {
  note_title: string;
  note_created_at: Date;
  note_description: string;
}

const NoteCardSingle = (props: Props) => {
  let date: string[] = String(props.note_created_at).split(' ');
  let dateString: string = `${date[1]} ${date[2]}, ${date[3]}`;

  const router = useRouter()
  const pathChunks = usePathname().split('/');
  const redirectUrl = pathChunks.slice(0, -2).join('/');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("isDeleted", "true");

    try {
      const response = await fetch(`/api/notes/delete/${pathChunks[4]}`, {
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
    <form onSubmit={handleSubmit} className="items-center bg-plum-100 p-5 rounded-2xl mb-16">
      <div className="flex justify-between">
        <h2 className="text-sm text-plum-300 font-bold">{props.note_title}</h2>
        <CopyBtn copyText={props.note_description}/>
      </div>
      <h3 className="text-xs text-plum-300 font-thin">{dateString}</h3>
      <p className="text-sm text-plum-300 pt-2">{props.note_description}</p>
      <FooterButtons buttonPath={`${pathChunks.join('/')}/edit`} buttonType="delete" />      
    </form>
  );
}

export default NoteCardSingle;


