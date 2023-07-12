import { NextPage } from "next";
import { api } from "@component/utils/api";
import { useState } from "react";
import { Example } from "@prisma/client";

const Example: NextPage = () => {
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
    <div>
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
    </div>
  );
};

export default Example;
