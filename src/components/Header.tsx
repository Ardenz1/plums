import Image from "next/image";

export interface Props {
  hasPlus: string;
}

const Header = (props: Props) => {
  if (props.hasPlus == "true") {
    return (
      <div className="flex justify-between items-center bg-plum-300">
        <div className="flex items-center">
          <Image
            src="plums_logo.svg"
            width={82}
            height={75}
            alt="PLUMS logo"
            className="max-h-20 my-3 ml-1"
          ></Image>
          <p className="text-white text-xl">PLUMS</p>
        </div>
        <i className="fa-solid fa-plus p-2 mx-5 bg-leaf-100 rounded-xl text-lg"></i>
      </div>
    )
  } else {
    return (
      <div className="flex items-center bg-plum-300">
        <Image
          src="plums_logo.svg"
          width={82}
          height={75}
          alt="PLUMS logo"
          className="max-h-20 my-3 ml-1"
        ></Image>
        <p className="text-white text-xl">PLUMS</p>
      </div>
    )
  }
}

export default Header;