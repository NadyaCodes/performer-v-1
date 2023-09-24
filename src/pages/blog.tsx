import { type NextPage } from "next";
import Head from "next/head";
import BlogComponent from "@component/components/Blog/BlogComponent";
import { api } from "@component/utils/api";
import { useState } from "react";
import type { Post } from "@prisma/client";
import { useEffectOnce } from "@component/components/AddProgramResult/helpers";
import LoadingLines from "@component/components/Loading/LoadingLines";
import { doubleChevronDown } from "@component/data/svgs";
import dynamic from "next/dynamic";

const Menu = dynamic(() => import("@component/components/Menu/Menu"), {
  ssr: true,
});

const FooterComponent = dynamic(
  () => import("@component/components/Footer/FooterComponent"),
  {
    ssr: true,
  }
);

const Blog: NextPage = () => {
  const [postsToDisplay, setPostsToDisplay] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const utils = api.useContext();

  const lastId = "clm9n6z0d0003ul6to377pzsr";
  const pageSize = 6;
  const isLastExpansion =
    postsToDisplay && postsToDisplay[postsToDisplay.length - 1]?.id === lastId;

  const fetchPosts = async (page: number, pageSize: number) => {
    const response = await utils.post.getPaginatedPosts.fetch({
      page,
      pageSize,
    });

    return response;
  };

  useEffectOnce(() => {
    fetchPosts(currentPage, pageSize)
      .then((newPosts) => {
        setPostsToDisplay(newPosts);
      })
      .then(() => setLoading(false))
      .catch((error) => console.error("Error fetching posts: ", error));
  });

  const showNext = () => {
    if (!isLastExpansion) {
      const newCurrentPage = currentPage + 1;
      setCurrentPage(newCurrentPage);
      fetchPosts(newCurrentPage, pageSize)
        .then((newPosts) => {
          setPostsToDisplay((prev) => [...prev, ...newPosts]);
        })
        .catch((error) => console.error("Error fetching posts: ", error));
    }
  };

  return (
    <>
      <Head>
        <title>Act. Sing. Dance. Blog.</title>
        <meta
          name="description"
          content="A blog for actors, singers, dancers and musical theatre performers"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content="Act. Sing. Dance. Blog." />
        <meta
          property="og:image"
          content="https://www.actsingdancerepeat.com/ActSingDanceRepeatLogo2.png"
        />
        <meta
          name="keywords"
          content="actors, singers, dancers, musical theatre, resources, performers, canadian, blog"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between bg-cyan-50 text-cyan-950">
        <div>
          <Menu />
          <BlogComponent postArray={postsToDisplay} />
          {loading && <LoadingLines />}
          {!isLastExpansion && !loading && (
            <button
              onClick={() => showNext()}
              className="m-auto mx-5 flex w-52 justify-around rounded-md border-2 border-cyan-700 p-3 text-cyan-800 transition-all hover:scale-105 hover:shadow-md hover:shadow-cyan-800"
            >
              <span>{doubleChevronDown}</span>
              <span>More</span>
              <span>{doubleChevronDown}</span>
            </button>
          )}
        </div>
        <div className="mt-20">
          <FooterComponent bgColor="bg-cyan-900" />
        </div>
      </main>
    </>
  );
};

export default Blog;
