/* eslint-disable react/prop-types */
import { FiUploadCloud } from "react-icons/fi";
import jpgIcon from "../../assets/jpg-icon.svg";
import { PiHandGrabbing } from "react-icons/pi";

const ImageUpload = ({ onImageSelect, label }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && onImageSelect) {
      onImageSelect(file);
    }
  };

  
  return (
    <label
      htmlFor="bannerImg"
      className="w-[100%] image-label overflow-hidden min-h-[123px] rounded-[12px] border-2 hover:border-violet-500 flex flex-col items-center justify-center cursor-pointer relative"
    >
      <div className="border-2 p-2 w-10 h-10 rounded-[8px] grid place-content-center">
        <FiUploadCloud className="text-[#475467] hover:text-violet-500" />
      </div>
      <div className="image-icon absolute bottom-4 right-4 opacity-0 z-40">
        <img src='/images/jpg-icon.svg' alt="" className="w-10" />
      </div>
      <PiHandGrabbing className="absolute image-icon bottom-2 right-2 text-xl opacity-0 z-50" />
      <div className="text-[#475467] text-center md:text-[14px] text-[12px] ">
        <span className="text-[#434CE7] md:text-[14px] text-[12px] font-semibold hover:text-violet-500">
          Click to upload
        </span>
        &nbsp;or drag & drop {label} <br />
        <span className="text-[12px]">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </span>
      </div>
      <input
        type="file"
        id="bannerImg"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </label>
  );
};
export default ImageUpload;
