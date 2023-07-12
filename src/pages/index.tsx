import { type NextPage } from "next";
// import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Picker from "./Picker";
import { styles } from "@component/data/constants";
import { api } from "@component/utils/api";
import { useState } from "react";
import { Example } from "@prisma/client";

const Home: NextPage = () => {
  const utils = api.useContext();
  const { data: exampleData } = api.example.getAll.useQuery();
  const { mutate: createExample } = api.example.add.useMutation({
    async onSuccess() {
      await utils.example.getAll.invalidate();
    },
    onError(error) {
      console.log("createExample error: ", error);
    },
  });

  const addExample = () => {
    createExample({
      text: "hello",
    });
  };

  const addCustom = (value: string) => {
    createExample({
      text: value,
    });
  };

  const { mutate: deleteExample } = api.example.delete.useMutation({
    async onSuccess() {
      await utils.example.getAll.invalidate();
    },
    onError(error) {
      console.log("removeExample error: ", error);
    },
  });

  const removeExample = (value: string) => {
    deleteExample({ id: value });
  };

  const { mutate: updExample } = api.example.update.useMutation({
    async onSuccess() {
      await utils.example.getAll.invalidate();
    },
    onError(error) {
      console.log("updExample error: ", error);
    },
  });

  const updateExample = (text: string, elementID: string) => {
    updExample({ id: elementID, text: text });
  };

  const ExampleItem = ({
    element,
    updateExample,
    removeExample,
  }: {
    element: Example;
    updateExample: Function;
    removeExample: Function;
  }) => {
    const [updatedText, setUpdatedText] = useState(element.string);

    const handleUpdate = () => {
      updateExample(updatedText, element.id);
    };

    return (
      <div className="flex">
        <div className="w-10rem">{element.string}</div>
        <button
          className="w-fit rounded border-2 border-red-600 p-1"
          onClick={() => removeExample(element.id)}
        >
          X
        </button>
        <input
          type="text"
          className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
        ></input>
        <button
          className="w-fit rounded border-2 border-green-600 p-1"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    );
  };

  const exampleDisplay = exampleData?.map((element) => {
    return (
      <ExampleItem
        key={element.id}
        element={element}
        updateExample={updateExample}
        removeExample={removeExample}
      />
    );
  });

  const [text, setText] = useState("");

  return (
    <>
      <Head>
        <title>Performer 1</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col">
        <button
          onClick={addExample}
          className="w-fit rounded border-2 border-blue-400 p-1"
        >
          Add Hello
        </button>
        <div className="flex">
          <input
            type="text"
            className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
          <button
            className="w-fit rounded border-2 border-blue-400 p-1"
            onClick={() => addCustom(text)}
          >
            Add Custom
          </button>
        </div>
      </div>
      <div>{exampleDisplay}</div>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          What kind of program?
        </h1>
        <div
          style={{
            display: "flex",
            margin: "2rem",
          }}
          className="rounded border-2 border-green-300"
        >
          <Picker buttonOptions={styles} currentLink="" last={false} />
        </div>
        {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div> */}
      </main>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
