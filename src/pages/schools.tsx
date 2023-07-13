import { NextPage } from "next";
import { api } from "@component/utils/api";
import { useState } from "react";
import { School } from "@prisma/client";

const Schools: NextPage = () => {
  const utils = api.useContext();
  const { data: schoolData } = api.school.getAll.useQuery();
  const { mutate: createSchool } = api.school.add.useMutation({
    async onSuccess() {
      await utils.school.getAll.invalidate();
    },
    onError(error) {
      console.log("createSchool error: ", error);
    },
  });

  const addSchool = () => {
    createSchool({
      text: "hello",
    });
  };

  const addCustom = (value: string) => {
    createSchool({
      text: value,
    });
  };

  const { mutate: deleteSchool } = api.school.delete.useMutation({
    async onSuccess() {
      await utils.school.getAll.invalidate();
    },
    onError(error) {
      console.log("removeSchool error: ", error);
    },
  });

  const removeSchool = (value: string) => {
    deleteSchool({ id: value });
  };

  const { mutate: updSchool } = api.school.update.useMutation({
    async onSuccess() {
      await utils.school.getAll.invalidate();
    },
    onError(error) {
      console.log("updSchool error: ", error);
    },
  });

  const updateSchool = (text: string, elementID: string) => {
    updSchool({ id: elementID, text: text });
  };

  const SchoolItem = ({
    element,
    updateSchool,
    removeSchool,
  }: {
    element: School;
    updateSchool: Function;
    removeSchool: Function;
  }) => {
    const [updatedText, setUpdatedText] = useState(element.name);

    const handleUpdate = () => {
      updateSchool(updatedText, element.id);
    };

    return (
      <div className="flex">
        <div className="w-10rem">{element.name}</div>
        <button
          className="w-fit rounded border-2 border-red-600 p-1"
          onClick={() => removeSchool(element.id)}
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

  const schoolDisplay = schoolData?.map((element) => {
    return (
      <SchoolItem
        key={element.id}
        element={element}
        updateSchool={updateSchool}
        removeSchool={removeSchool}
      />
    );
  });

  const [text, setText] = useState("");
  return (
    <div>
      <div className="flex flex-col">
        <button
          onClick={addSchool}
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
            className="roundSed w-fit border-2 border-blue-400 p-1"
            onClick={() => addCustom(text)}
          >
            Add Custom
          </button>
        </div>
      </div>
      <div>{schoolDisplay}</div>
    </div>
  );
};

export default Schools;
