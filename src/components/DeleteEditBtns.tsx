export default function DeleteEditBtns() {
  return (
    <div className=" bg-white sticky bottom-0 mt-auto flex justify-center items-center space-x-2">
      <button className="bg-leaf-200 rounded-2xl my-3 p-3 px-6 text-leaf-300 font-bold">Delete</button>
      <button className="border-4 border-leaf-200 rounded-2xl my-3 p-2 px-8 text-leaf-300 font-bold">Edit</button>
    </div>
  )
}