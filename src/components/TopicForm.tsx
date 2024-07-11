'use client';
import { useState, useEffect } from 'react';
import FooterButtons from "./FooterButtons";
import { usePathname, useRouter } from 'next/navigation';

export interface Props {
  topicName: string;
  topicSubTopic: number | null;
  btnType: string;
  topicId: string;
}

const TopicForm = (props: Props) => {
  const router = useRouter();
  const path = usePathname();
  const redirectUrl = path.split('/').slice(0, -1).join('/');

  let tags = [
        {tag_id: 1, tag: "javascript"},
        {tag_id: 2, tag: "react"},
        {tag_id: 3, tag: "typescript"},
        {tag_id: 4, tag: "python"},
      ]
  
  const [topics, setTopics] = useState<{ topic_id: number, topic_name: string }[]>([]);
  const [topicName, setTopicName] = useState(props.topicName);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(props.topicSubTopic ? props.topicSubTopic.toString() : null);


  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/topics/get');
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopicName(e.target.value);
  };

  const handleSubTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTopicId(value === "" ? null : value);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/topics/edit/${props.topicId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: topicName, subTopicId: selectedTopicId }), // Include subTopicId in the PUT request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update the topic');
      }

      const updatedTopic = await response.json();
      console.log('Topic updated:', updatedTopic);

      router.push(`/`);
    } catch (error: any) {
      console.error('Error updating topic:', error);
    }
  };

  const filteredTopics = topics.filter(topic => topic.topic_id !== parseInt(props.topicId));

  return (
    <form onSubmit={handleSubmit}>
      {/* Topic Name */}
      <label htmlFor="topicName" className="block text-sm font-medium text-plum-300">Topic Name</label>
      <input
        id="topicName"
        name="topicName"
        value={topicName}
        onChange={handleNameChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
      />

      {/* Topic Subtopic */}
      <label htmlFor="topicSubTopic" className="block text-sm font-medium text-plum-300">Subtopic</label>
      <select
        className="bg-transparent block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        id="subtopics"
        name="subtopics"
        value={selectedTopicId !== null ? selectedTopicId : ""}
        onChange={handleSubTopicChange}>
       <option value={""}>None</option>

        {filteredTopics.map((topic) => (
          <option key={topic.topic_id} value={topic.topic_id}>{topic.topic_name}</option>
        ))}

      </select>

      {/* Topic Tags */}
      <label htmlFor="Tags" className="text-sm font-medium text-plum-300">Choose a tag</label>
      <select className="bg-transparent block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full" id="tags" name="tags">
         <option value="none" selected>Select</option>
        {
          tags.map(tag => {
            return (
              <option key={tag.tag_id} value={tag.tag_id}>{tag.tag}</option>
            )
          })
        }
      </select>
      
      <FooterButtons buttonType={props.btnType} buttonPath="/" />
    </form>
  );
};

export default TopicForm;
