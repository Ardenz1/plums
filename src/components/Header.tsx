'use client'

import Image from "next/image";
import { usePathname } from "next/navigation";

// export interface Props {
//   hasPlus: boolean;
//   page: string; 
// }

const Header = () => {
  // console.log(props.hasPlus)
  const pathname = usePathname();
  let chunks = pathname.split('/');
  let path = chunks[chunks.length - 1];
  const hasPlus = 
  pathname === '/' ||
  path === 'attachments' ||
  path === 'notes' || 
  path === 'links' ||
  path === 'photos'
  ? true : false;

  if (hasPlus == true) {
    return (
      <div className="flex justify-between items-center bg-plum-300">
        <a href="/" className="flex items-center">
          <Image
            src="/plums_logo.svg"
            width={82}
            height={75}
            alt="PLUMS logo"
            className="max-h-20 my-3 ml-1"
          />
          <p className="text-white text-xl">PLUMS</p>
        </a>
        <i className="fa-solid fa-plus p-2 mx-5 bg-leaf-100 rounded-xl text-lg"></i>
      </div>
     
    )
  } else {
    return (
      <div className="flex items-center bg-plum-300">
        <a href="/" className="flex items-center">
          <Image
            src="/plums_logo.svg"
            width={82}
            height={75}
            alt="PLUMS logo"
            className="max-h-20 my-3 ml-1"
          /> 
          <p className="text-white text-xl">PLUMS</p>
        </a>
      </div>
    )
  }
}

export default Header;