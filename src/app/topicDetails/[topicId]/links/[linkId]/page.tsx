import { Metadata } from "next";

import BackButton from "@/components/BackButton"
import LinkCardSingle from "@/components/LinkCardSingle"
import DeleteEditBtns from "@/components/DeleteEditBtns"

import { getLinkById } from "@/database/database";

export const metadata: Metadata = {
  title: 'Link',
};

export default async function SingleLink({ params }: { params: { topicId: string, linkId: string } }) {
  const link = await getLinkById(parseInt(params.topicId));

  if (!link) {
    return (
      <main>
        <BackButton back={`/topicDetails/${params.topicId}/links`} />
        <h1>Link</h1>
        <p>No link found with the given ID 😞</p>
      </main>
    );
  }
  return (
    <main>
      <BackButton back={`/topicDetails/${params.topicId}/links`} />
      <h1>Link</h1>
      <LinkCardSingle
        key={link.note_id}
        link_title={link.note_header}
        link_hyperlink={link.note_hyperlink}
        link_created_at={link.note_created_at}
        link_description={link.note_description!}
      />
      <DeleteEditBtns />
    </main>
  );
}


// export default function SingleLink() {
//   return (
//     <main>
//       <BackButton back="/topicDetails/links"/>
//       <h1>Link</h1>
//       <LinkCardSingle link_title="Link 1" link_created_at="April 1, 2024" link_hyperlink="https://www.google.com" description="this is a link description!!!"/>
//       <DeleteEditBtns/>
//     </main>
//   )
// }
  