import { api } from "@component/utils/api";
import type { NextPage } from "next";
import { useState } from "react";
import { getSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffectOnce } from "@component/components/AddProgramResult/helpers";

export type BioObj = {
  name: string;
  bio: string;
};

const newAuthorObj = {
  name: "Nadya Corscadden",
  bio: "Nadya is a Canadian musical theatre performer with small-town roots. Once she moved to a bigger city, she became increasingly aware of the unique limitations brought on by location in this huge country - if you don’t have a knowledgeable network, it’s almost impossible to find the right place to start!\nNadya hopes this site is just step 1 in helping create resources for emerging artists across our incredibly talented country.",
};

type UploadProps = {
  admin: boolean;
};

const AddAuthor: NextPage<UploadProps> = ({ admin }) => {
  const [newAuthor, setNewAuthor] = useState<null | BioObj>(null);

  const { mutate: createBio } = api.author.add.useMutation({
    onSuccess(data) {
      console.log("Created Author: ", data.name);
      setNewAuthor(data);
    },
    onError(error) {
      console.log("create Post error: ", error);
    },
  });

  const addAuthor = (bioObj: BioObj) => {
    return createBio(bioObj);
  };

  useEffectOnce(() => {
    addAuthor(newAuthorObj);
  });

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {admin ? (
        <div className="flex flex-col">
          <div>New Author:</div>
          <div>{newAuthor?.name}</div>
          <div>{newAuthor?.bio}</div>
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

export default AddAuthor;

export const getServerSideProps: GetServerSideProps<UploadProps> = async (
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
