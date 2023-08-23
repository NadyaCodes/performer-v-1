import AddProgramComponent from "@component/components/AddProgram/AddProgramComponent";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

interface AddProgramProps {
  admin: boolean;
}

const AddProgram: NextPage<AddProgramProps> = ({ admin }) => {
  return <AddProgramComponent admin={admin} />;
};

export default AddProgram;

export const getServerSideProps: GetServerSideProps<AddProgramProps> = async (
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
