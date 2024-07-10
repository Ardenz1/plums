'use client';
import { useState } from 'react';
import FooterButtons from "./FooterButtons";
import { usePathname, useRouter } from 'next/navigation';


export interface Props {
  topicName: string;
  btnType: string;
  topicId : string; 
}
  
const TopicForm = (props: Props) => {
  const router = useRouter();
  const path = usePathname();
  const redirectUrl = path.split('/').slice(0, -1).join('/');
  // replace with call to the database
  let tags = [
    {tag_id: 1, tag: "javascript"},
    {tag_id: 2, tag: "react"},
    {tag_id: 3, tag: "typescript"},
    {tag_id: 4, tag: "python"},
  ]

  const [topicName, setTopicName] = useState(props.topicName);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopicName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/topics/edit/${props.topicId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: topicName }),
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
  return (
      <form onSubmit={handleSubmit}>
      <label htmlFor="topicName" className="block text-sm font-medium text-plum-300">Topic Name</label>
      <input
        id="topicName"
        name="topicName"
        value={topicName}
        onChange={handleNameChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
      />

      {/* this is just a visual for now, we will need to change this later to be able to pick multiple */}
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
      <FooterButtons buttonType={props.btnType} buttonPath="/"/>
    </form>
  )
}

export default TopicForm;