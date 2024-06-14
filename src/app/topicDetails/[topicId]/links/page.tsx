import { Metadata } from "next";

import BackButton from "@/components/BackButton"
import LinkCard from "@/components/LinkCard"

import { Link } from "@prisma/client";
import { getAllLinks } from "@/database/database";

export const metadata: Metadata = {
  title: 'Links',
};

export default async function Links({ params }: { params: { topicId: string } }) {
  let links: Link[] = await getAllLinks(parseInt(params.topicId));
  if (links.length == 0) {
    return(
      <main>
        <BackButton back={`/topicDetails/${params.topicId}`} />
        <h1>Links</h1>
        <p>Nothing to see here...</p>
      </main>
    )
  } else {
    return(
      <main>
        <BackButton back={`/topicDetails/${params.topicId}`} />
        <h1>Links</h1>
        {
          links.map(link => {
            return (
              <LinkCard 
              key={link.link_id}
                link_title={link.link_header}
                link_created_at={link.link_created_at} 
                link_hyperlink={link.link_hyperlink} 
                link_description={link.link_description}
              />
            )
          })
        }
      </main>
    )
      // Sample link cards
      // <LinkCard title="Link 1" link_created_at="April 1, 2024" link="https://www.google.com" description="this is a link description!!!"/>
      // <LinkCard title="Link 2" link_created_at="April 7, 2024" link="https://www.canvas.com" description="this is another link description"/>
  }
}
  