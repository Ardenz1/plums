import FooterButtons from "./FooterButtons";

export interface Props {
  attachmentTitle : string;
  attachmentLink : string;
  attachmentDescription: string | null;
}

const LinkForm = (props: Props) => {
  return (
    <form>
      {/* title */}
      <label htmlFor="attachment_title" className="block text-sm font-medium text-plum-300">Attachment title</label>
      <input id="attachment_title" name="link_title" value={props.attachmentTitle || ""} className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full" type="text"/>
      
      {/* attachment path */}
      {/* this will need to be a file upload */}
      <label htmlFor="attachment_link" className="block text-sm font-medium text-plum-300">Attachment</label>
      <input id="attachment_link" name="link_hyperlink" value={props.attachmentLink || ""} className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full" type="text"/>
      
      {/* description */}
      <label htmlFor="attachment_description" className="block text-sm font-medium text-plum-300">Attachment description</label>
      <textarea id="attachment_description" name="link_description" value={props.attachmentDescription || ""} className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full resize-y"></textarea>

      <FooterButtons buttonType="create"/>
    </form>
  )
}
  
export default LinkForm;