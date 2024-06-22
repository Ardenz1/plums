import { Metadata } from "next";

import BackButton from "@/components/BackButton"
import LinkCardSingle from "@/components/LinkCardSingle"
import FooterButtons from "@/components/FooterButtons"
<<<<<<< Updated upstream

import { getLinkById } from "@/database/database";
=======
>>>>>>> Stashed changes

export const metadata: Metadata = {
  title: 'Link',
};

export default async function SingleLink({ params }: { params: { topicId: string, linkId: string } }) {
  const link = await getLinkById(parseInt(params.linkId));

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
<<<<<<< Updated upstream
      <LinkCardSingle
        key={link.link_id}
        link_title={link.link_header}
        link_hyperlink={link.link_hyperlink}
        link_created_at={link.link_created_at}
        link_description={link.link_description!}
      />
      <DeleteEditBtns />
=======
      <LinkCardSingle title="Link 1" link_created_at="April 1, 2024" link="https://www.google.com" description="this is a link description!!!"/>
      <FooterButtons buttonType="delete"/>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
  