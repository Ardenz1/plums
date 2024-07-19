'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FooterButtons from './FooterButtons';

interface Props {
  tagId: number;
  tagTitle: string;
  btnType: string;
  btnPath: string;
}

const TagForm = (props: Props) => {
  const router = useRouter();
  const [tagTitle, setTagTitle] = useState(props.tagTitle);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const url = `/api/tags/create`;
    const method = 'POST';

    const body = JSON.stringify({
      tag: tagTitle, // Sending 'tag' instead of 'title'
    });

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const result = await response.json();
      router.push(props.btnPath);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tagTitle" className="block text-sm font-medium text-plum-300">Tag Title</label>
      <input
        id="tagTitle"
        name="tagTitle"
        value={tagTitle}
        onChange={handleTitleChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
        placeholder='Add Title'
      />

      <FooterButtons buttonPath={props.btnPath} buttonType={props.btnType} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default TagForm;
