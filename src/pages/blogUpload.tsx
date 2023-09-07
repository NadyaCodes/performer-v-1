import { useEffectOnce } from "@component/components/AddProgramResult/helpers";
import { api } from "@component/utils/api";
import { NextPage } from "next";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Link from "next/link";

export type BlogObj = {
  author: string;
  slug: string;
  title: string;
  body: string;
  image: string;
};

const newBlogObject = {
  author: "Nadya Corscadden",
  slug: "welcome-to-ASDR",
  title: "Welcome to Act. Sing. Dance. Repeat.",
  body: "This is my new blog post. \n Does this create a new line?",
  image:
    '<a data-flickr-embed="true" href="https://www.flickr.com/photos/199087648@N03" title="" > <img src="https://live.staticflickr.com/65535/53169233397_f6eb940c00_m.jpg" width="320" height="240" alt="" /></a>',
};

type BlogUploadProps = {
  admin: boolean;
};

const BlogUpload: NextPage<BlogUploadProps> = ({ admin }) => {
  const [newPost, setNewPost] = useState<null | BlogObj>(null);

  const { mutate: createPost } = api.post.add.useMutation({
    async onSuccess(data) {
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
    addPost(newBlogObject);
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
