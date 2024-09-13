import React from 'react';
import { Fragment, useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import TextEditor from "../TextEditor";

const GeneralInfo = ({handlePolicies}) => {

const [content, setContent] = useState("");

const handleProcedureContentChange = (content) => {
    // console.log("content---->", content);
    setContent(content);
  };

return (
    <Fragment>
    <section className="w-full md:px-8 px-2 space-y-6">
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="page_title"
              className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
            >
              Page Title
              <RequiredSymbol />
            </label>
            <Input
              type="text"
              id="page_title"
              placeholder="Privacy Policy"
              variant="bordered"
              size="lg"
              radius="sm"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="header"
              className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
            >
              Header
              <RequiredSymbol />
            </label>
            <Input
              type="text"
              id="header"
              placeholder="Privay Policy"
              variant="bordered"
              size="lg"
              radius="sm"
            />
          </div>
          <div className="flex flex-col gap-3 md:mb-8 mb-44">
            <label
              htmlFor="content"
              className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
            >
              Main Content
              <RequiredSymbol />
            </label>
            {/* Text editor */}
            <TextEditor handleContentChange={handleProcedureContentChange} />
          </div>
        </div>
      </div>

      {/* Save and cancel buttons */}
      <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
        <Button
          onClick={handlePolicies}
          variant="bordered"
          className="font-semibold"
        >
          Back to list
        </Button>
        <Button
          color="primary"
          type="submit"
          className="font-semibold text-white"
          startContent={<FiSave size={20} />}
        >
          Save
        </Button>
      </div>
    </section>
  </Fragment>
)
}

export default GeneralInfo