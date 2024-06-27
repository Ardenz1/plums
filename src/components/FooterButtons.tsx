
export interface Props {
  buttonType: string;
}
// OPTIONS:
// create
// delete
// save

const FooterButtons = (props: Props) =>  {
  let buttonOneText: string = "";
  let buttonTwoText: string = "";

  if (props.buttonType === "create") {
    buttonOneText = "Cancel";
    buttonTwoText = "Create";
  } else if (props.buttonType === "delete") {
    buttonOneText = "Edit";
    buttonTwoText = "Delete";
  } else if (props.buttonType === "save") {
    buttonOneText = "Cancel";
    buttonTwoText = "Save";
  } else if (props.buttonType === "edit") {
  buttonOneText = "Save";
  buttonTwoText = "Delete";
}
  
  return (
    <div className=" bg-white sticky bottom-0 mt-auto flex justify-center items-center space-x-2">
      <button className="border-4 border-leaf-200 rounded-xl my-3 p-1.5 w-full text-leaf-300 font-bold">{buttonOneText}</button>
      <button className="bg-leaf-200 rounded-xl my-3 p-2 w-full text-leaf-300 font-bold">{buttonTwoText}</button>
    </div>
  )
}

export default FooterButtons;