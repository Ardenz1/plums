'use client';
import { useState } from 'react';
import FooterButtons from "./FooterButtons";

export interface Props {
  photoId: string;
  photoBlob: string;
  photoTitle: string;
  photoDescription: string;
  btnType: string;
  btnPath: string;
}

const PhotoForm = (props: Props) => {
  const [photoTitle, setPhotoTitle] = useState(props.photoTitle);
  const [photoBlob, setPhotoBlob] = useState(props.photoBlob);
  const [photoDescription, setPhotoDescription] = useState(props.photoDescription || "");
  const [error, setError] = useState<string | null>(null);


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoTitle(e.target.value);
  };

  const handleBlobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoBlob(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPhotoDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`/api/photos/edit/${props.photoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: photoTitle,
          description: photoDescription,
          image: photoBlob,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the photo');
      }

      const updatedNote = await response.json();
      console.log('photo updated:', updatedNote);
    } catch (error: any) {
      setError(error.message);
    }
  };


  return (
    <form>
      {/* title */}
      <label htmlFor="photoTitle" className="block text-sm font-medium text-plum-300">Photo title</label>
      <input
        id="photoTitle"
        name="photoTitle"
        value={photoTitle}
        onChange={handleTitleChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
      />
      
      {/* photo */}
      <label htmlFor="photoBlob" className="block text-sm font-medium text-plum-300">Photo Link</label>
      <input
        id="photoBlob"
        name="photoBlob"
        value={photoBlob}
        onChange={handleBlobChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
      />
      
      {/* description */}
      <label htmlFor="photoDescription" className="block text-sm font-medium text-plum-300">Photo description</label>
      <textarea
        id="photoDescription"
        name="photoDescription"
        value={photoDescription}
        onChange={handleDescriptionChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"
      ></textarea>

      {/* <input type="hidden" id="photoCreated" name="photoCreated" value={dateString}/> */}
      <FooterButtons buttonPath={props.btnPath} buttonType={props.btnType} />
      {error && <p className="text-red-500 mt-2">{error}</p>}

    </form>
  );
}

export default PhotoForm;
