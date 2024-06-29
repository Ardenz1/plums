'use client';
import { useState } from 'react';
import FooterButtons from "./FooterButtons";

export interface Props {
  linkId?: string;
  linkTitle: string;
  linkHyperlink: string;
  linkDescription: string | null;
  btnType: string;

}

const LinkForm = (props: Props) => {
  const [linkTitle, setLinkTitle] = useState(props.linkTitle);
  const [linkHyperlink, setLinkHyperlink] = useState(props.linkHyperlink);
  const [linkDescription, setLinkDescription] = useState(props.linkDescription || "");
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkTitle(e.target.value);
  };

  const handleHyperlinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkHyperlink(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLinkDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`/api/links/edit/${props.linkId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: linkTitle,
          description: linkDescription,
          hyperlink: linkHyperlink,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the note');
      }

      const updatedNote = await response.json();
      console.log('Note updated:', updatedNote);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* title */}
      <label htmlFor="link_title" className="block text-sm font-medium text-plum-300">Link title</label>
      <input
        id="link_title"
        name="link_title"
        value={linkTitle}
        onChange={handleTitleChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
      />

      {/* hyperlink */}
      <label htmlFor="link_hyperlink" className="block text-sm font-medium text-plum-300">Hyperlink</label>
      <input
        id="link_hyperlink"
        name="link_hyperlink"
        value={linkHyperlink}
        onChange={handleHyperlinkChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
      />

      {/* description */}
      <label htmlFor="link_description" className="block text-sm font-medium text-plum-300">Link description</label>
      <textarea
        id="link_description"
        name="link_description"
        value={linkDescription}
        onChange={handleDescriptionChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"
      ></textarea>

      <FooterButtons buttonType={props.btnType} />
      {error && <p className="text-red-500 mt-2">{error}</p>}

    </form>
  );
}

export default LinkForm;