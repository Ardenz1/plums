
export default function TopicDetails() {
  // database call for number of each items should go here
  return (
    <section>
      <a href="/topicDetails/notes">
        <div className="flex justify-between items-center bg-plum-100 p-5 rounded-2xl mb-2">
          <h2>Notes</h2>
          <div>
            <span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 mr-2 rounded-full">0</span>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </a>
      <a href="/topicDetails/links">
        <div className="flex justify-between items-center bg-plum-100 p-5 rounded-2xl mb-2">
          <h2>Links</h2>
          <div>
            <span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 mr-2 rounded-full">0</span>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </a>
      <a href="/topicDetails/photos">
        <div className="flex justify-between items-center bg-plum-100 p-5 rounded-2xl mb-2">
          <h2>Photos</h2>
          <div>
            <span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 mr-2 rounded-full">0</span>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </a>
      <a href="/topicDetails/attachments">
        <div className="flex justify-between items-center bg-plum-100 p-5 rounded-2xl mb-2">
          <h2>Attachments</h2>
          <div>
            <span className="bg-plum-300 text-plum-100 text-xs px-1.5 py-0.5 mr-2 rounded-full">0</span>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </a>
    </section>
  )
}
