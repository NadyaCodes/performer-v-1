import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Menu from "@component/components/Menu/Menu";
import type { Post } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { useState, useEffect } from "react";
import type { ObjectList } from "@component/data/types";
import FooterComponent from "@component/components/Footer/FooterComponent";
import dynamic from "next/dynamic";
import Link from "next/link";

const prisma = new PrismaClient();

export type BlogPageProps = {
  postData: Post;
  postBeforeObj: ObjectList;
  postAfterObj: ObjectList;
  bio: string;
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
  bio,
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
        <title>{postData.title}</title>
        <meta
          name="description"
          content={`${postData.title} ~ Blog Post by Act. Sing. Dance. Repeat.`}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={postData?.title} />
        <meta
          property="og:image"
          content="https://www.actsingdancerepeat.com/ActSingDanceRepeatLogo2.png"
        />
        <meta
          name="keywords"
          content="actors, singers, dancers, musical theatre, resources, performers, canadian, blog"
        />
        <meta name="author" content={`${postData.author}`} />
      </Head>
      <main>
        <div className="flex min-h-screen flex-col justify-between bg-cyan-50 bg-opacity-80">
          <div>
            <Menu />
            {postData && postData.published && (
              <BlogPageComponent
                post={postData}
                date={createdAtDate}
                nextPost={postAfterObj ? postAfterObj : null}
                prevPost={postBeforeObj ? postBeforeObj : null}
                bio={bio || null}
              />
            )}
            {postData && !postData.published && (
              <div className="m-2 flex flex-col items-center pb-10 text-cyan-900 mobileMenu:m-0">
                <div
                  className="absolute left-0 right-0 hidden h-10 bg-cyan-900 mobileMenu:block"
                  style={{
                    boxShadow:
                      "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
                  }}
                ></div>
                <div
                  className="text-bold flex w-full flex-col content-center items-center p-3 text-center text-lg mobileMenu:mt-10"
                  style={{ animation: "fadeIn .7s linear" }}
                ></div>
                <div className="text-2xl font-semibold">
                  Article Coming Soon!
                </div>
                <Link
                  href="/blog"
                  className="m-5 rounded-lg border-2 border-cyan-600 p-5 hover:bg-cyan-700 hover:text-cyan-50"
                >
                  Back to Blog
                </Link>
              </div>
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

  let bio;

  try {
    const bioData = await prisma.author.findFirst({
      where: { name: postData?.author },
      select: {
        bio: true,
      },
    });

    if (!bioData) {
      throw new Error("Author not found");
    }

    bio = bioData.bio || "";
  } catch (error) {
    console.error("Error fetching author bio:", error);
  }

  return {
    props: {
      postData: {
        ...postData,
        createdAt,
      },
      postBeforeObj,
      postAfterObj,
      bio,
    },
  };
};

export default BlogPage;
