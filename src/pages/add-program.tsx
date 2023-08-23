import AddProgramComponent from "@component/components/AddProgram/AddProgramComponent";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

const AddProgram: NextPage = () => {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  return (
    <AddProgramComponent
      admin={
        (userId && userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID) || false
      }
    />
  );
};

export default AddProgram;
