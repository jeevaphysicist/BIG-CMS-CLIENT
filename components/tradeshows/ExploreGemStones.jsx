import React, { useState } from "react";
import TextEditor from "../Content/TextEditor";
import RequiredSymbol from "../Content/RequiredSymbol";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";

const ExploreGemStones = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    sectionTitle: "",
    mainContent: "",
  });
  const [loading,setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const handleProcedureContentChange = (content) => {
    setFormData((prev) => ({ ...prev, mainContent: content }));
  };

  return (
    <div>
      <div className="w-[100%] md:px-8 px-4">
        <div className="flex flex-col  my-3 pt-2 gap-3">
          <label
            htmlFor="sectionTitle"
            className="text-[16px]  font-semibold flex gap-1"
          >
            Section Title
            <RequiredSymbol />
            {errors.sectionTitle && (
              <span className="font-regular text-[12px] text-red-600">
                {errors.sectionTitle}
              </span>
            )}
          </label>
          <Input
            type="text"
            id="sectionTitle"
            variant="bordered"
            placeholder="Meaning of Emerald Gemstone"
            size="lg"
            radius="sm"
            name="sectionTitle"
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                sectionTitle: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col gap-3 md:mb-8 mb-44">
          <label
            htmlFor="content"
            className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
          >
            Main Content
            <RequiredSymbol />
            {errors.mainContent && (
              <span className="font-regular text-[12px] text-red-600">
                {errors.mainContent}
              </span>
            )}
          </label>
          {/* Text editor */}
          <TextEditor
            value={formData.mainContent}
            handleContentChange={handleProcedureContentChange}
          />
        </div>
        {/* Save and cancel buttons */}
        <div className="w-full px-4 sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
          <Button
            type="button"
            onClick={handleClose}
            variant="bordered"
            className="font-semibold"
          >
            Back to list
          </Button>
          <Button
            color="primary"
            type="submit"
            className="font-semibold text-white disabled:opacity-40 disabled:cursor-wait"
            startContent={loading ? null : <FiSave size={20} />}
            isLoading={loading}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExploreGemStones;
