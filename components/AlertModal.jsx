import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

const AlertModel = ({
  isVisible,
  message,
  modeltitle,
  onConfirm,
  onCancel,
  loading
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed z-40 top-[0px] rounded-[10px] inset-0 flex  justify-center">
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-40"
        // onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
      <motion.div
        className=" rounded-[10px] w-[100%] md:w-[450px] z-10"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-[90%] relative mt-10 rounded-[20px] bg-white flex flex-col justify-center items-center">
          <div className="mb-4 mt-6">
            <div className="bg-red-600/10 rounded-full p-1.5">
              <div className="bg-red-600/20 rounded-full p-2">
                <FiAlertCircle className="text-red-600 text-2xl font-bold" />
              </div>
            </div>
          </div>
          <div className="font-semibold text-xl py-1">{modeltitle}</div>
          <div className="text-sm font-semibold text-black/70 mb-10">
            <p className="text-center">{message}</p>
            <p className="text-center">This action cannot be undone.</p>
          </div>
          <div className="w-[90%] flex justify-center gap-2 mb-6">
            <button
              onClick={onCancel}
              className="w-[40%] bg-slate-200 hover:bg-slate-300 text-black p-2 rounded"
            >
              cancel
            </button>
            <Button
              isLoading={loading}
              onClick={onConfirm}
              className="w-[40%] bg-red-500 hover:bg-red-600 text-white p-2 rounded"
            >
              Delete
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AlertModel;
