'use client';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import FooterButtons from "./FooterButtons";

export interface Props {
  linkId?: string;
  linkTitle: string;
  linkHyperlink: string;
  linkDescription: string | null;
  btnType: string;
  btnPath: string;
  topicDetailId?: string; // Add topicDetailId for creating new links
}

const LinkForm = (props: Props) => {
  const router = useRouter();
  const path = usePathname();
  const redirectUrl = path.split('/').slice(0, -1).join('/');

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

    const isEdit = Boolean(props.linkId);
    const url = isEdit ? `/api/links/edit/${props.linkId}` : `/api/links/create/${props.topicDetailId}`;
    const method = isEdit ? 'PUT' : 'POST';

    const body = JSON.stringify({
      title: linkTitle,
      hyperlink: linkHyperlink,
      description: linkDescription,
      ...(isEdit ? {} : { topicDetailId: props.topicDetailId }), 
    });

    console.log('Submitting request:', { url, method, body });

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
      console.log(isEdit ? 'Link updated:' : 'Link created:', result);

      router.push(`${redirectUrl}`);
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
        placeholder='Add Title'
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
        placeholder='Add Hyperlink'
      />

      {/* description */}
      <label htmlFor="link_description" className="block text-sm font-medium text-plum-300">Link description</label>
      <textarea
        id="link_description"
        name="link_description"
        value={linkDescription}
        onChange={handleDescriptionChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"
        placeholder='Add Description'
      ></textarea>

      <FooterButtons buttonPath={props.btnPath} buttonType={props.btnType} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}

export default LinkForm;
