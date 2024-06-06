import Image from "next/image";
import TopicCard from "../components/TopicCard";
import SubTopicCard from "@/components/SubTopicCard";

export default function Home() {
  return (
    <main className="">
      <h1>Topics</h1>
      {/* this is an example to show what the component looks like */}
      {/* from database info, we can generate topic cards dynamically */}
      <TopicCard topicName="React" parentId={1} />
      <SubTopicCard topicName="syntax" />
      <TopicCard topicName="Type Script" parentId={null}/>
    </main>
  );
}
