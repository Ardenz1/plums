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

  const [topics, setTopics] = useState<{ topic_id: number, topic_name: string }[]>([]);
  const [topicName, setTopicName] = useState(props.topicName);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(props.topicSubTopic ? props.topicSubTopic.toString() : null);
  const [selectedTags, setSelectedTags] = useState<{ tag_id: number, tag: string }[]>([]);
  const [tagSelectValue, setTagSelectValue] = useState("");
  const [tags, setTags] = useState<{ tag_id: number, tag: string }[]>([]); // Fetch tags from the backend

  useEffect(() => {
    const fetchTopicsAndTags = async () => {
      try {
        const [topicsResponse, tagsResponse] = await Promise.all([
          fetch('/api/topics/get'),
          fetch('/api/tags/get')
        ]);

        const topicsData = await topicsResponse.json();
        const tagsData = await tagsResponse.json();

        setTopics(topicsData);
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching topics or tags:', error);
      }
    };

    fetchTopicsAndTags();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopicName(e.target.value);
  };

  const handleSubTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTopicId(value === "" ? null : value);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = tags.find(tag => tag.tag_id === parseInt(e.target.value));
    if (selectedTag) {
      if (selectedTags.some(tag => tag.tag_id === selectedTag.tag_id)) {
        setSelectedTags(selectedTags.filter(tag => tag.tag_id !== selectedTag.tag_id));
      } else {
        setSelectedTags([...selectedTags, selectedTag]);
      }
    }
    setTagSelectValue(""); 
  };

  const handleRemoveTag = (tag_id: number) => {
    setSelectedTags(selectedTags.filter(tag => tag.tag_id !== tag_id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/topics/edit/${props.topicId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: topicName, subTopicId: selectedTopicId ? parseInt(selectedTopicId) : null, tags: selectedTags.map(tag => tag.tag_id), // Include selected tags
        }),
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
      <select
        className="bg-transparent block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        id="tags"
        name="tags"
        value={tagSelectValue}
        onChange={handleTagChange}>
        {!selectedTags.length && <option value="none">Select</option>}
        {tags.map(tag => (
          <option key={tag.tag_id} value={tag.tag_id}>{tag.tag}</option>
        ))}
      </select>

      {/* Selected Tags */}
      <div className="mt-2">
        {selectedTags.map(tag => (
          <div key={tag.tag_id} className="inline-flex items-center bg-leaf-200 px-2 py-1 rounded-full text-sm font-medium text-plum-300 mr-2 mb-2">
            {tag.tag}
            <button
              type="button"
              className="ml-2 text-plum-500"
              onClick={() => handleRemoveTag(tag.tag_id)}>
              &times;
            </button>
          </div>
        ))}
      </div>

      <FooterButtons buttonType={props.btnType} buttonPath="/" />
    </form>
  );
};

export default TopicForm;
