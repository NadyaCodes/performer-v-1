import { api } from "@component/utils/api";
import type { NextPage } from "next";
import { useState } from "react";
import { getSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { traumaPrideSchoolBlogObject } from "@component/data/InitialBlogs";
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

// const newBlogNumbered = {
//   author: "Nadya Corscadden",
//   slug: "numbered-blog-10",
//   title: `Numbered Blog 10`,
//   body: "This is blog number 10. \n Hopefully it's in the right order!",
//   image: `<a data-flickr-embed="true" href="https://www.flickr.com/photos/199087648@N03/53171766840/in/dateposted-public/" title="Acting Mask"><img src="https://live.staticflickr.com/65535/53171766840_057427d0fe_c.jpg" width="600" height="800" alt="Acting Mask"/></a>`,
// };

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
    addPost(traumaPrideSchoolBlogObject);
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
