import { api } from "@component/utils/api";
import type { NextPage } from "next";
import { useState } from "react";
import { getSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import Link from "next/link";
// import { mostImportantTheatreSchoolBlogObject } from "@component/data/InitialBlogs";
import { useEffectOnce } from "@component/components/AddProgramResult/helpers";

export type BlogObj = {
  author: string;
  slug: string;
  title: string;
  body: string;
  image: string;
};

//#H2#: h2
//#H3#: h3
//#UL#...#LI#: ul, then li (no \n in middle)
//#IT#: italic, indented
//####: divider
//#H2LINK#...#HREF#: h2 link

const newBlog = {
  author: "Nadya Corscadden",
  slug: "black-owned-arts-organizations-2024",
  title: `Incredible Black-Owned Arts Organizations to Support in 2024`,
  body: "There are so many incredible Black-owned arts organizations in Canada. Here are just a few of the best!\n\n#H2LINK#Black Theatre Workshop#HREF#https://blacktheatreworkshop.ca/\nMontreal, Quebec\n#IT#Produces shows, workshops and school tours, and also runs an Artist Mentorship Program and Celebratory Gala\n\n#H2LINK#Obsidian Theatre Company#HREF#https://www.obsidiantheatre.com/\nToronto, Ontario\n#IT#Produces plays and provides training programs for up-and-coming playwrights and other theatre professionals.\n\n#H2LINK#Crossfield House Productions#HREF#https://www.crossfieldhouseproductions.com/\nToronto, Ontario\n#IT#Produces theatre, film and music\n\n#H2LINK#Nia Centre for the Arts#HREF#https://niacentre.org/\nToronto, Ontario\n#IT#A multidisciplinary artistic hub that provides opportunities for training and showcasing work.\n\n#H2LINK#The Black Arts Centre#HREF#https://theblackartscentre.ca/\nSurrey, BC\n#IT#A community space that supports and facilitates training opportunities and presentations for artists in many genres.\n\n#H2LINK#b current Performing Arts#HREF#https://www.bcurrent.ca/\nToronto, Ontario\n#IT#Produce new works and provide training opportunities to nurture emerging and highly celebrated talent.\n\n#H2LINK#Voices Black Theatre Ensemble#HREF#https://www.facebook.com/VoicesBlackTheatreNS/\nHalifax, NS\n#IT#Theatre and storytelling performance company\n\n#H2LINK#Advance  - Canada’s Black Music Business Collective#HREF#https://www.advancemusic.org/\nCanada Wide\n#IT#Provides programming, job opportunities and other resources for musicians.\n\n#H2LINK#Black Artists’ Networks in Dialogue (BAND)#HREF#https://www.bandgallery.com/\nToronto, On\n#IT#Fosters opportunities for artists of all kinds to showcase and develop their craft.\n\n#H2LINK#Building A Legacy in Acting, Cinema and Knowledge Canada (B.L.A.C.K.)#HREF#https://blackisnow.com/\nToronto, ON\n#IT#Provides support for emerging black artists through education, mentorship and networking opportunities.\n\n#H2LINK#Black Actors Film Guild Canada#HREF#https://www.bafgcanada.com/\nToronto, ON\n#IT#Promotes creatives such as actors, filmmakers and other artists.\n\n#H2LINK#Ballet Creole#HREF#https://balletcreole.org/\nToronto, ON\n#IT#Support traditional and contemporary dance artists through performances and training opportunities.\n\n#H2LINK#Dance Immersion#HREF#https://danceimmersion.ca/\nToronto, ON\n#IT#Cultivate opportunities for dancers in the form of presentations, education, mentorship and other opportunities.\n\n####\n#H3#A few other sites of note:\n#H2LINK#BlackCanadian Theatre#HREF#https://www.thecanadianencyclopedia.ca/en/article/black-canadian-theatre\n#IT#Details the history of Black theatre companies in Canada.\n\n#H2LINK#It’s About Time#HREF#https://www.dancingblackcanada.ca/\n#IT#An exhibition highlighting the lesser-known dance history in Canada.\n",
  image: `<a data-flickr-embed="true" href="https://www.flickr.com/photos/199087648@N03/53552348385/in/dateposted-public/" title="Black Companies to Support"><img src="https://live.staticflickr.com/65535/53552348385_07282a8444_c.jpg" width="800" height="533" alt="Black Companies to Support"/></a>`,
};

type BlogUploadProps = {
  admin: boolean;
};

const BlogUpload: NextPage<BlogUploadProps> = ({ admin }) => {
  const [newPost, setNewPost] = useState<null | BlogObj>(null);

  const { mutate: createPost } = api.post.add.useMutation({
    onSuccess(data) {
      console.log("Created Post: ", data.title);
      setNewPost(data);
    },
    onError(error) {
      console.log("create Post error: ", error);
    },
  });

  const addPost = (blogObj: BlogObj) => {
    return createPost(blogObj);
  };

  useEffectOnce(() => {
    addPost(newBlog);
  });

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {admin ? (
        <div className="flex flex-col">
          <div>New Post:</div>
          <div>{newPost?.title}</div>
          <div>{newPost?.author}</div>
          <div>{newPost?.slug}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: newPost?.body.replace(/\n/g, "<br>") || "",
            }}
          />

          <div dangerouslySetInnerHTML={{ __html: newPost?.image || "" }} />
        </div>
      ) : (
        <div>
          <div>You are not authorized to view this page</div>
        </div>
      )}
      <Link href="/">
        <button className="m-5 rounded-full border-2 border-cyan-900 p-3">
          Home
        </button>
      </Link>
    </div>
  );
};

export default BlogUpload;

export const getServerSideProps: GetServerSideProps<BlogUploadProps> = async (
  context
) => {
  const session = await getSession(context);

  const admin = session?.user?.id === process.env.ADMIN_USER_ID;

  return {
    props: {
      admin,
    },
  };
};
