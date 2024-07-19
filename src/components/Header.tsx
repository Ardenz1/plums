'use client'

import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();
  let chunks = pathName.split('/');
  let pathEnd = chunks[chunks.length - 1];
  const hasPlus = 
  pathName === '/' ||
  pathEnd === 'attachments' ||
  pathEnd === 'notes' || 
  pathEnd === 'links' ||
  pathEnd === 'photos'
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
        {hasPlus && (
        <div className="flex direction-row space-between">
          {pathName === '/' && (
            <a href="/tags">
              <i className="fa-solid fa-tag p-2 text-plum-300 bg-leaf-100 rounded-xl text-lg"></i>
            </a>
          )}
          <a href={pathName == "/" ? "/new" : `${pathName}/new`}>
            <i className="fa-solid fa-plus p-2 mx-5 bg-leaf-100 rounded-xl text-lg"></i>
          </a>
        </div>
      )}
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