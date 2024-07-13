'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import FooterButtons from './FooterButtons';

export interface Props {
  photoId?: string; // Include photoId for editing existing photos
  photoTitle: string;
  photoDescription: string;
  photoLink: string;
  btnType: string;
  btnPath: string;
  topicDetailId?: string; // Add topicDetailId for creating new photos
}

const PhotoForm = (props: Props) => {
  const router = useRouter();
  const path = usePathname();
  const redirectUrl = path.split('/').slice(0, -1).join('/');

  const [photoTitle, setPhotoTitle] = useState(props.photoTitle);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoDescription, setPhotoDescription] = useState(props.photoDescription || '');
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>(props.photoLink || '');

  useEffect(() => {
    setPhotoTitle(props.photoTitle);
    setPhotoDescription(props.photoDescription || '');
    setFileName(props.photoLink || '');
  }, [props.photoTitle, props.photoDescription, props.photoLink]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoTitle(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
    setFileName(file ? file.name : '');
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPhotoDescription(e.target.value);
  };

  const handleFileInputClick = () => {
    document.getElementById('actual_file_input')?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('title', photoTitle);
    formData.append('description', photoDescription);
    if (photoFile) {
      formData.append('photo', photoFile);
    }
    if (props.topicDetailId) {
      formData.append('topicDetailId', props.topicDetailId);
    }

    const isEdit = Boolean(props.photoId);
    const url = isEdit ? `/api/photos/edit/${props.photoId}` : `/api/photos/create/${props.topicDetailId}`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process the photo');
      }

      const result = await response.json();
      console.log(isEdit ? 'Photo updated:' : 'Photo created:', result);

      router.push(`${redirectUrl}`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="photo-form" encType="multipart/form-data">
      <label htmlFor="photoTitle" className="block text-sm font-medium text-plum-300">
        Photo Title
      </label>
      <input
        id="photoTitle"
        name="photoTitle"
        value={photoTitle}
        onChange={handleTitleChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
        placeholder='Add Title'
      />

      <label htmlFor="photoBlob" className="block text-sm font-medium text-plum-300">
        Photo
      </label>
      <input
        id="actual_file_input"
        name="photoBlob"
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
        placeholder='Add Photo'
      />

      <label htmlFor="photoDescription" className="block text-sm font-medium text-plum-300">
        Photo Description
      </label>
      <textarea
        id="photoDescription"
        name="photoDescription"
        value={photoDescription}
        onChange={handleDescriptionChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"
        placeholder='Add Description'
      ></textarea>

      <FooterButtons buttonPath={props.btnPath} buttonType={props.btnType} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default PhotoForm;
