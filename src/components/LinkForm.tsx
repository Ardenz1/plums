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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkTitle(e.target.value);
  };

  const handleHyperlinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkHyperlink(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLinkDescription(e.target.value);
  };


  return (
    <form>
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

      {/* <input type="hidden" id="link_created_at" name="link_created_at" value={dateString}/> */}
      <FooterButtons buttonType={props.btnType} />
    </form>
  );
}

export default LinkForm;