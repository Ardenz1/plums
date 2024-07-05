// 'use client';
// import React, { useState } from 'react';
// import FooterButtons from './FooterButtons';

// interface Props {
//   photoId: string;
//   photoTitle: string;
//   photoDescription: string;
//   photoBlob: string | null;
//   btnType: string;
//   btnPath: string;
// }

// const PhotoForm = (props: Props) => {
//   const [photoTitle, setPhotoTitle] = useState(props.photoTitle);
//   const [photoBlob, setPhotoBlob] = useState<string | null>(null); // State to hold string URL or null
//   const [photoDescription, setPhotoDescription] = useState(props.photoDescription || '');
//   const [error, setError] = useState<string | null>(null);

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPhotoTitle(e.target.value);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Assuming you want to store the file URL
//       const fileUrl = URL.createObjectURL(file);
//       setPhotoBlob(fileUrl); // Set file URL to state
//     }
//   };

//   const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setPhotoDescription(e.target.value);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
  
//     try {
//       if (!photoBlob) {
//         throw new Error('No image selected');
//       }
  
//       const response = await fetch(`/api/photos/edit/${props.photoId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: photoTitle,
//           description: photoDescription,
//           photoImage: photoBlob, // Use the stored file URL directly
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to update the photo');
//       }
  
//       const updatedPhoto = await response.json();
//       console.log('Photo updated:', updatedPhoto);
//     } catch (error: any) {
//       setError(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} id="photo-form">
//       <label htmlFor="photoTitle" className="block text-sm font-medium text-plum-300">
//         Photo Title
//       </label>
//       <input
//         id="photoTitle"
//         name="photoTitle"
//         value={photoTitle}
//         onChange={handleTitleChange}
//         className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
//         type="text"
//       />

//       <label htmlFor="photoBlob" className="block text-sm font-medium text-plum-300">
//         Photo
//       </label>
//       <input
//         id="photoBlob"
//         name="photoBlob"
//         type="file"
//         onChange={handleFileChange}
//         className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
//       />

//       <label htmlFor="photoDescription" className="block text-sm font-medium text-plum-300">
//         Photo Description
//       </label>
//       <textarea
//         id="photoDescription"
//         name="photoDescription"
//         value={photoDescription}
//         onChange={handleDescriptionChange}
//         className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"
//       ></textarea>

//       <FooterButtons buttonPath={props.btnPath} buttonType={props.btnType} />
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </form>
//   );
// };

// export default PhotoForm;
'use client';
import React, { useState } from 'react';
import FooterButtons from './FooterButtons';

interface Props {
  photoId: string;
  photoTitle: string;
  photoDescription: string;
  photoBlob: string | null;
  btnType: string;
  btnPath: string;
}

const PhotoForm = (props: Props) => {
  const [photoTitle, setPhotoTitle] = useState(props.photoTitle);
  const [photoBlob, setPhotoBlob] = useState<string | null>(props.photoBlob);
  const [photoDescription, setPhotoDescription] = useState(props.photoDescription || '');
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoTitle(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPhotoBlob(fileUrl);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPhotoDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('title', photoTitle);
    formData.append('description', photoDescription);
    if (photoBlob) {
      const file = await fetch(photoBlob).then((res) => res.blob());
      const fileUrl = URL.createObjectURL(file);
      formData.append('photo', file, fileUrl.split('/').pop()); 
    }// Use the actual filename dynamically

    try {
      const response = await fetch(`/api/photos/edit/${props.photoId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update the photo');
      }

      const updatedPhoto = await response.json();
      console.log('Photo updated:', updatedPhoto);
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
      />

      <label htmlFor="photoBlob" className="block text-sm font-medium text-plum-300">
        Photo
      </label>
      <input
        id="photoBlob"
        name="photoBlob"
        type="file"
        onChange={handleFileChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
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
      ></textarea>

      <FooterButtons buttonPath={props.btnPath} buttonType={props.btnType} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default PhotoForm;
