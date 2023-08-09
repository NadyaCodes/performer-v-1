import { type NextPage, GetStaticProps } from "next";
import { disciplines } from "@component/data/constants";
import { PathsArray, SelectNextProps } from "@component/data/types";
import { styles } from "@component/data/constants";
import SelectNext from "@component/components/ProgramSelector/SelectNext";
import { stylesFull } from "@component/data/constants";

const StylePage: NextPage<SelectNextProps> = ({ style }) => {
  const link = `/${style}`;
  const backLink = `/course-selector`;

  let titleString = `${stylesFull[style]} Programs in Canada` || "";

  const selectNextOptions = {
    style,
    link,
    backLink,
    nextValue: "discipline",
    buttonList: disciplines || [],
    titleString,
  };

  return <SelectNext selectNextOptions={selectNextOptions} />;
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

export async function getStaticPaths() {
  const paths = createPaths();

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
