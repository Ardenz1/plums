import Image from "next/image";
import TopicCard from "../components/TopicCard";

export default function Home() {
  return (
    <main className="">
      <h1>Topics</h1>
      {/* this is an example to show what the component looks like */}
      {/* from database info, we can generate topic cards dynamically */}
      <TopicCard topicName="React" />
      <TopicCard topicName="Type Script" />
    </main>
  );
}
