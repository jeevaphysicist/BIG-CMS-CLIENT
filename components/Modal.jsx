/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";

const Modal = ({ isOpen, onClose, children, modeltitle }) => {
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
        className="space-y-8 flex items-center justify-end no-scrollbar w-[95%] z-10"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.3 }}
      >
        <div className="xl:w-[40%] lg:w-[50%] md:w-[60%] w-[100%] h-[98%] relative rounded-[20px] bg-white">
          <div className="flex sticky px-5 bg-white  z-10 md:px-10 py-5  top-0 w-[100%]  rounded-t-[20px] bg-tertiary  border-b  items-center justify-between">
            <div className="font-bold text-[18px]">{modeltitle}</div>
            <div className="flex bold gap-5">
              <button className=" active:scale-95" onClick={onClose}>
                <CgClose
                  size={35}
                  className="p-2 border rounded-full text-black/60"
                />
              </button>
            </div>
          </div>
          <div className="h-full">{children}</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
