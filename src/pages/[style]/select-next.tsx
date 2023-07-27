import { type NextPage, GetStaticProps } from "next";
import { disciplines } from "@component/data/constants";
import { PathsArray, SelectNextProps } from "@component/data/types";
import { styles } from "@component/data/constants";
import SelectNext from "@component/components/ProgramDisplay/SelectNext";

const StylePage: NextPage<SelectNextProps> = ({ style }) => {
  const link = `/${style}`;
  const backLink = `/${style}`;

  const selectNextOptions = {
    style,
    link,
    backLink,
    nextValue: "discipline",
  };

  return (
    <SelectNext
      selectNextOptions={selectNextOptions}
      buttonList={disciplines || []}
    />
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
