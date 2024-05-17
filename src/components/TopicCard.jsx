
export default function TopicCard({ topicName }) {
  return (
    <div className="flex justify-between items-center bg-leaf-200 p-5 rounded-2xl mb-2">
      <h2>{topicName}</h2>
      <i className="fa-solid fa-caret-right"></i>
    </div>
  )
}