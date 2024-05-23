interface Props{
  back: string;
}

const BackButton = (props: Props) => {
  return (
    <div>
    <a href={props.back}>
    <div className="flex items-center mb-2 hover:text-leaf-200 active:text-plum-100">
      <i className="fa-solid fa-caret-left "></i>
      <p className="text-sm pl-0.5 font-semibold">back</p>
    </div>
    </a>
    </div>
  )
}

export default BackButton