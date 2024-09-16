import React from "react";
import RequiredSymbol from "../RequiredSymbol";
import { Button } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import TextEditor from "../TextEditor";

const MoreAboutGemstones = ({ handleBirthStones }) => {
  return (
    <section>
      <div className="flex items-start lg:pr-5  my-5 justify-between w-[100%] lg:flex-row flex-col ">
        <div className="w-[100%] md:px-8 px-4">
          <div className="flex flex-col  my-3 pt-2 gap-3">
            <label
              htmlFor="intro"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Main Content
              <RequiredSymbol />
              {/* {errors.introduction && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.introduction}
                  </span>
                )} */}
            </label>
            <TextEditor />
          </div>
        </div>
      </div>
      {/* Save and cancel buttons */}
      <div className="w-full  sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4 pr-5">
        <Button
          type="button"
          onClick={handleBirthStones}
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
  );
};

export default MoreAboutGemstones;
