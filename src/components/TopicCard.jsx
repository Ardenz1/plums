
export default function BackButton({ topicName }) {
  return (
    <div className="flex justify-between items-center bg-leaf-200 p-5 rounded-2xl">
      <h2>{topicName}</h2>
      <i className="fa-solid fa-caret-right"></i>
    </div>
  )
}