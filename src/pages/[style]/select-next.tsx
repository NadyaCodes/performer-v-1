import type { NextPage, GetStaticProps } from "next";
import { disciplines } from "@component/data/constants";
import type { PathsArray, SelectNextProps } from "@component/data/types";
import { styles } from "@component/data/constants";
import SelectNext from "@component/components/ProgramDirectory/SelectNext";
import { stylesFull } from "@component/data/constants";
import Head from "next/head";
import dynamic from "next/dynamic";

const FooterComponent = dynamic(
  () => import("@component/components/Footer/FooterComponent"),
  {
    ssr: true,
  }
);

const StylePage: NextPage<SelectNextProps> = ({ style }) => {
  const styleText = style || "ft";
  const styleFull = stylesFull[style] || "Full Time";

  const link = `/${styleText}`;
  const backLink = `/program-directory`;

  const titleString =
    `${styleFull} Programs in Canada` || "Performance Programs in Canada";

  const selectNextOptions = {
    style,
    link,
    backLink,
    nextValue: "discipline",
    buttonList: disciplines || [],
    titleString,
  };

  return (
    <>
      <Head>
        <title>{titleString}</title>
        <meta
          name="description"
          content="Program Directory ~ Act. Sing. Dance. Repeat."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={titleString} />
        <meta
          property="og:image"
          content="https://www.actsingdancerepeat.com/ActSingDanceRepeatLogo2.png"
        />
        <meta
          name="keywords"
          content="actors, singers, dancers, musical theatre, resources, performers, canadian"
        />
      </Head>
      <main>
        <div className="flex min-h-screen flex-col justify-between bg-cyan-50 bg-opacity-80">
          <SelectNext selectNextOptions={selectNextOptions} />
          <div className="mt-20">
            <FooterComponent bgColor="bg-cyan-900" />
          </div>
        </div>
      </main>
    </>
  );
};

const createPaths = (): Array<PathsArray> => {
  const finalArray: Array<PathsArray> = [];
  styles.forEach((style) => {
    finalArray.push({
      params: {
        style: style,
      },
    });
  });
  return finalArray;
};

export function getStaticPaths() {
  const paths = createPaths();

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  const { style } = {
    ...(params || { style: "n/a" }),
    style: params?.style || "n/a",
  } as SelectNextProps;

  return {
    props: {
      style,
    },
  };
};

export default StylePage;
