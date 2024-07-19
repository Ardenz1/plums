'use client';
import { useState, useEffect, useRef } from 'react';

interface Props {
  tagId: number;
  tagTitle: string;
}

const TagForm = (props: Props) => {
  const [tagName, setTagName] = useState(props.tagTitle);
  const [tagId, setTagId] = useState<number>(props.tagId);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<{ tag_id: number, tag: string }[]>([]);
  const [action, setAction] = useState<'save' | 'delete' | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags/get');
        const tagsData = await response.json();
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleTagNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(e.target.value);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTagId = parseInt(e.target.value);
    setTagId(selectedTagId);
    if (selectedTagId === -1) {
      setTagName('');
    } else {
      const selectedTag = tags.find(tag => tag.tag_id === selectedTagId);
      if (selectedTag) {
        setTagName(selectedTag.tag);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!tagId) {
      setError('Please select a tag to update.');
      return;
    }

    try {
      if (action === 'save') {
        const response = await fetch(`/api/tags/edit/${tagId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tagId, tag: tagName }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        } else {
          window.location.reload();
        }
      } else if (action === 'delete') {
        const response = await fetch(`/api/tags/delete/${tagId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isDeleted: true }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        } else {
          window.location.reload();
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor="tags">Tags</label>
      <select
        name="tags"
        id="tags"
        className="bg-plum-100 block border-solid border-4 border-plum-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        value={tagId || ""}
        onChange={handleTagChange}
      >
        <option value="-1">None</option>
        {tags.map((tag) => (
          <option key={tag.tag_id} value={tag.tag_id}>{tag.tag}</option>
        ))}
      </select>

      <label htmlFor="TagTitle" className="block text-sm font-medium text-plum-300">Tag Name</label>
      <input
        id="TagTitle"
        name="TagTitle"
        value={tagName}
        onChange={handleTagNameChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
        placeholder='Add Name'
      />
      <div className="bg-white mt-auto flex justify-center items-center space-x-2">
        <button
          type="button"
          className="border-4 border-leaf-200 rounded-xl my-3 p-1.5 w-full text-leaf-300 font-bold text-center"
          onClick={() => {
            setAction('delete');
            formRef.current?.requestSubmit();
          }}
        >
          Delete
        </button>
        <button
          type="submit"
          className="bg-leaf-200 rounded-xl my-3 p-2 w-full text-leaf-300 font-bold"
          onClick={() => setAction('save')}
        >
          Save
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default TagForm;
