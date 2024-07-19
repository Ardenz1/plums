
export interface Props {
  buttonType: string;
  buttonPath: string;
}
// OPTIONS:
// create
// delete
// save
let location = "sticky bottom-0";
const FooterButtons = (props: Props) =>  {
  let buttonOneText: string = "";
  let buttonTwoText: string = "";

  if (props.buttonType === "create") {
    buttonOneText = "Cancel";
    buttonTwoText = "Create";
  } else if (props.buttonType === "delete") {
    buttonOneText = "Edit";
    buttonTwoText = "Delete";
    location = "fixed right-0 left-0 bottom-0 px-5";
  } else if (props.buttonType === "save" || props.buttonType === "edit") {
    buttonOneText = "Cancel";
    buttonTwoText = "Save";
  } else if (props.buttonType === "deleteSave") {
    buttonOneText = "Delete";
    buttonTwoText = "Save";
  } 
  
  return (
    <div className={`${location} bg-white mt-auto flex justify-center items-center space-x-2`}>
      <a href={props.buttonPath} className="border-4 border-leaf-200 rounded-xl my-3 p-1.5 w-full text-leaf-300 font-bold text-center">{buttonOneText}</a>
      <button className="bg-leaf-200 rounded-xl my-3 p-2 w-full text-leaf-300 font-bold">{buttonTwoText}</button>
    </div>
  )
}

export default FooterButtons;