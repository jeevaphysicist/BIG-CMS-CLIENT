/* eslint-disable react/prop-types */
import { Tab, Tabs, Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { FiSave } from "react-icons/fi";

const EditModal = ({
  isOpen,
  onClose,
  children,
  modaltitle,
  subtitle,
  handler,
  buttonname,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed z-40 top-[0px] rounded-[20px] inset-0 flex  justify-center">
      <motion.div
        className="fixed inset-0 bg-black  bg-opacity-60"
        // onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
      <motion.div
        className="space-y-8 flex items-center justify-center no-scrollbar w-[95%] z-10"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.3 }}
      >
        <div className="xl:w-[40%] md:w-[60%] w-[95%] min-h-[30%] lg:min-h-[35%] rounded-[20px] bg-white">
          <div className="flex md:flex-row flex-col h-[20%] gap-3 justify-between py-5 px-6 md:py-6 md:px-8 border-b-1 items-center ">
            <div className="font-semibold space-y-1 ">
              <h2 className="font-semibold text-black text-center text-[18px] md:text-start">
                {modaltitle}
              </h2>
              <p className="text-black/60 text-[14px] text-center md:text-start">
                {subtitle}
              </p>
            </div>
            <Tabs aria-label="Options" size="sm" radius="sm">
              <Tab key="draft" title="Draft"></Tab>
              <Tab key="publish" title="Publish"></Tab>
            </Tabs>
          </div>
          <div className="h-[65%] w-[100%] flex items-center justify-center ">
            {children}
            {/* Save and cancel buttons */}
          </div>
          <div className="w-full h-[15%] sticky bottom-0 py-3 z-30 flex justify-end gap-4 pr-5">
            <Button
              type="button"
              onClick={onClose}
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
              {buttonname}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditModal;
