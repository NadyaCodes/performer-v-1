import { useEffectOnce } from "@component/components/AddProgramResult/helpers";
import { api } from "@component/utils/api";
import { NextPage } from "next";
import { useState } from "react";

export type BlogObj = {
  author: string;
  slug: string;
  title: string;
  body: string;
  image: string;
};

const newBlogObject = {
  author: "Nadya Corscadden",
  slug: "/welcome-to-ASDR",
  title: "Welcome to Act. Sing. Dance. Repeat.",
  body: "This is my new blog post. \n Does this create a new line?",
  image:
    '<a data-flickr-embed="true" href="https://www.flickr.com/photos/199087648@N03" title="" > <img src="https://live.staticflickr.com/65535/53169233397_f6eb940c00_m.jpg" width="320" height="240" alt="" /></a>',
};

const BlogUpload: NextPage = () => {
  const [newPost, setNewPost] = useState<null | BlogObj>(null);

  const { mutate: createPost } = api.post.add.useMutation({
    async onSuccess(data) {
      console.log("Created Post: ", data.title);
      setNewPost(data);
    },
    onError(error) {
      console.log("createSchool error: ", error);
    },
  });

  const addPost = (blogObj: BlogObj) => {
    return createPost(blogObj);
  };

  useEffectOnce(() => {
    addPost(newBlogObject);
  });
  return (
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
  );
};

export default BlogUpload;
