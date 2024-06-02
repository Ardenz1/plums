export default function DeleteEditBtns() {
  return (
    <>
      <div className="absolute bottom-0">
        <div className="mt-auto flex justify-center items-center py-2 space-x-2">
          <button className="bg-leaf-200 rounded-2xl p-3 px-6 mb-1 text-leaf-300 font-bold">Delete</button>
          <button className="border-4 border-leaf-200 rounded-2xl p-2 px-8 mb-1 text-leaf-300 font-bold">Edit</button>
        </div>
      </div>
    </>
  )
}