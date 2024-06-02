
export interface Props {
  attachment: string;
  attachmentTitle: string;
  attachmentDescription: string;
  attachmentCreated: Date;
}

const AttachmentCard = (props: Props) => {
  let date: string[] = String(props.attachmentCreated).split(' ');
  let dateString: string = `${date[1]} ${date[2]}, ${date[3]}`;

  let fileType: string = String(props.attachment.split('.')[1]).toLowerCase();
  let fileIcon: string;
  
  if (fileType == 'doc' || fileType == 'docx') {
    fileIcon = 'fa-solid fa-file-word'
  } else if (fileType == 'pdf') {
    fileIcon = 'fa-solid fa-file-pdf'
  } else if (fileType == 'py') {
    fileIcon = 'fa-brands fa-python'
  } else if (fileType == 'py') {
    fileIcon = 'fa-brands fa-python'
  } else if (fileType == 'html') {
    fileIcon = 'fa-solid fa-file-code'
  } else {
    fileIcon = 'fa-solid fa-file'
  }
  return (
    <div className="bg-plum-100 p-5 rounded-2xl mb-2">
      <i className={`${fileIcon} text-4xl mb-3`}></i>
      <h2 className="font-bold text-sm">{props.attachmentTitle}</h2>
      <p className="font-thin text-xs mb-3">{dateString}</p>
      <p className="text-sm line-clamp-4">{props.attachmentDescription}</p>
    </div>
  )
}

export default AttachmentCard;