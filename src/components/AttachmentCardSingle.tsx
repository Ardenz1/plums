import CopyBtn from "./CopyBtn";

export interface Props {
  attachment: string;
  attachmentTitle: string;
  attachmentDescription: string;
  attachmentCreated: Date;
}

const AttachmentCardSingle = (props: Props) => {
  console.log('Attachment ID:', props.attachment); // Example line to log attachment ID or related props

  let date: string[] = String(props.attachmentCreated).split(' ');
  let dateString: string = `${date[1]} ${date[2]}, ${date[3]}`;

  let fileType: string = String(props.attachment.split('.')[1]).toLowerCase();
  let fileIcon: string;

  if (fileType == 'doc' || fileType == 'docx') {
    fileIcon = 'fa-solid fa-file-word';
  } else if (fileType == 'pdf') {
    fileIcon = 'fa-solid fa-file-pdf';
  } else if (fileType == 'py') {
    fileIcon = 'fa-brands fa-python';
  } else if (fileType == 'html') {
    fileIcon = 'fa-solid fa-file-code';
  } else {
    fileIcon = 'fa-solid fa-file';
  }

  return (
    <div className="bg-plum-100 p-5 rounded-2xl mb-2">
            {/* <i className={`${fileIcon} text-4xl mb-3`}></i> */}
          <a
          href={props.attachment}
          download>
              <i className={`${fileIcon} text-4xl`}></i>
              <p className=" text-plum-300 mb-3 " style={{ fontSize: '0.5rem' }}>Download</p>
        </a>
         <div className="flex justify-between">
        <h2 className="font-bold text-sm">{props.attachmentTitle}</h2>
        <CopyBtn copyText={props.attachmentDescription} />
      </div>
      <p className="font-thin text-xs mb-3">{dateString}</p>
      <p className="text-sm">{props.attachmentDescription}</p>
  
    </div>
  );
};

export default AttachmentCardSingle;
