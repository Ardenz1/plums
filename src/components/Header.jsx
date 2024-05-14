
export default function Header({ hasPlus }) {
  if (hasPlus == "true") {
    return(
      <div className="flex justify-between items-center bg-plum-300">
        <div className="flex items-center">
          <img className="max-h-20 my-3 ml-1" src="plums_logo.svg" alt="PLUMS logo" />
          <p className="text-white text-xl">PLUMS</p>
        </div>
        <i className="fa-solid fa-plus p-2 mx-5 bg-leaf-100 rounded-xl text-lg"></i>
      </div>
    )
  } else {
    return(
      <div className="flex items-center bg-plum-300">
        <img className="max-h-20 my-3 ml-1" src="plums_logo.svg" alt="PLUMS logo" />
        <p className="text-white text-xl">PLUMS</p>
      </div>
    )
  }
}