import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Menu from "@component/components/Menu/Menu";
import type { Post } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useState, useEffect } from "react";
import type { ObjectList } from "@component/data/types";
import FooterComponent from "@component/components/Footer/FooterComponent";
import dynamic from "next/dynamic";

export type BlogPageProps = {
  postData: Post;
  postBeforeObj: ObjectList;
  postAfterObj: ObjectList;
};

export type PostSlugPaths = {
  params: {
    slug: string;
  };
};

const BlogPageComponent = dynamic(
  () => import("@component/components/Blog/BlogPageComponent"),
  {
    ssr: true,
  }
);

const BlogPage: NextPage<BlogPageProps> = ({
  postData,
  postBeforeObj,
  postAfterObj,
}) => {
  const [createdAtDate, setCreatedAtDate] = useState<Date | null>(null);

  useEffect(() => {
    if (postData) {
      const createdAt = new Date(postData.createdAt);
      setCreatedAtDate(createdAt);
    }
  }, [postData]);

  return (
    <>
      <Head>
        <title>{postData?.title}</title>
        <meta name="description" content="Blog - Act. Sing. Dance. Repeat." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex min-h-screen flex-col justify-between bg-cyan-50 bg-opacity-80">
          <div>
            <Menu />
            {postData && (
              <BlogPageComponent
                post={postData}
                date={createdAtDate}
                nextPost={postAfterObj ? postAfterObj : null}
                prevPost={postBeforeObj ? postBeforeObj : null}
              />
            )}
          </div>
          <div className="mt-20">
            <FooterComponent bgColor="bg-cyan-900" />
          </div>
        </div>
      </main>
    </>
  );
};

const createPaths = async (): Promise<Array<PostSlugPaths>> => {
  const allPosts = await prisma.post.findMany();

  const postSlugArray = allPosts.map((post) => {
    return { params: { slug: post.slug } };
  });

  return postSlugArray;
};

export async function getStaticPaths() {
  const paths = await createPaths();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postUrl = params?.slug as string;
  const postData = await prisma.post.findFirst({ where: { slug: postUrl } });
  const createdAt = postData?.createdAt.toISOString() || "";

  const postDate = postData?.createdAt;

  const postBefore = await prisma.post.findFirst({
    where: {
      createdAt: { lt: postDate },
    },
    orderBy: { createdAt: "desc" },
  });

  const postAfter = await prisma.post.findFirst({
    where: {
      createdAt: { gt: postDate },
    },
    orderBy: { createdAt: "asc" },
  });

  const postBeforeObj = {
    title: postBefore?.title || "",
    slug: postBefore?.slug || "",
  };
  const postAfterObj = {
    title: postAfter?.title || "",
    slug: postAfter?.slug || "",
  };

  return {
    props: {
      postData: {
        ...postData,
        createdAt,
      },
      postBeforeObj,
      postAfterObj,
    },
  };
};

export default BlogPage;
