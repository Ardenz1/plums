'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export interface Props {
  topicName: string;
  topicSubTopic: number | null | string;
  topicId: string;
}

const TopicForm = (props: Props) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [topics, setTopics] = useState<{ topic_id: number, topic_name: string }[]>([]);
  const [topicName, setTopicName] = useState(props.topicName);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(props.topicSubTopic ? props.topicSubTopic.toString() : null);
  const [selectedTags, setSelectedTags] = useState<{ tag_id: number, tag: string }[]>([]);
  const [tagSelectValue, setTagSelectValue] = useState("");
  const [tags, setTags] = useState<{ tag_id: number, tag: string }[]>([]);
  const [action, setAction] = useState<'save' | 'delete' | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    try {
      if (action === 'save') {
        const response = await fetch(`/api/topics/edit/${props.topicId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: topicName,
            subTopicId: selectedTopicId ? parseInt(selectedTopicId) : null,
            tags: selectedTags.map(tag => tag.tag_id),
          }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        router.push(`/`);
      } else if (action === 'delete') {
        const response = await fetch(`/api/topics/delete/${props.topicId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isDeleted: true }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        router.push(`/`);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const filteredTopics = topics.filter(topic => topic.topic_id !== parseInt(props.topicId));

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor="topicName" className="block text-sm font-medium text-plum-300">Topic Name</label>
      <input
        id="topicName"
        name="topicName"
        value={topicName}
        onChange={handleNameChange}
        className="block border-solid border-4 border-leaf-200 rounded-xl p-1 px-2 mb-2 focus:border-plum-200 focus-visible:outline-none w-full"
        type="text"
      />

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

      <div className="bg-white mt-auto flex justify-center items-center space-x-2">
        <button
          type="button"
          className="border-4 border-leaf-200 rounded-xl my-3 p-1.5 w-full text-leaf-300 font-bold text-center"
          onClick={() => {
            setAction('delete');
            formRef.current?.requestSubmit();
          }}
        >
          Delete
        </button>
        <button
          type="submit"
          className="bg-leaf-200 rounded-xl my-3 p-2 w-full text-leaf-300 font-bold"
          onClick={() => setAction('save')}
        >
          Save
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default TopicForm;
