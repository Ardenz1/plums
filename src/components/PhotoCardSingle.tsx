'use client'
import { useState } from "react";
import { usePathname, useRouter } from 'next/navigation';

import Image from "next/image";
import CopyBtn from "./CopyBtn";
import FooterButtons from "./FooterButtons";

export interface Props {
  photoLink: string;
  photoTitle: string;
  photoDescription: string;
  photoCreated: Date;
}

const PhotoCardSingle = (props: Props) => {
  let date = String(props.photoCreated).split(' ');
  let dateString = `${date[1]} ${date[2]}, ${date[3]}`;

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
      const response = await fetch(`/api/photos/delete/${pathChunks[4]}`, {
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
    <form onSubmit={handleSubmit} className="bg-plum-100 p-5 rounded-2xl mb-16">
      <Image
        src={props.photoLink}
        alt={props.photoTitle}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-auto rounded-xl mb-2"
      />
      <div className="flex justify-between">
        <h2 className="text-sm font-bold">{props.photoTitle}</h2>
        <CopyBtn copyText={props.photoDescription}/>
      </div>
      <p className="text-xs mb-3 font-thin">{dateString}</p>
      <p className="text-sm line-clamp-4">{props.photoDescription}</p>
      <FooterButtons buttonPath={`${pathChunks.join('/')}/edit`} buttonType="delete" />
    </form>
  )
}

export default PhotoCardSingle;