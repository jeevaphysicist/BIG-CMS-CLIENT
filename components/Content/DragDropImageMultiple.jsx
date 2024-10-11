import React, { useState } from "react";
import "./DragDropImage.css";
import { FiUploadCloud } from "react-icons/fi";
import { PiHandGrabbing } from "react-icons/pi";
import { validateImageDimensions } from "@/lib/imageValidator";

const DragAndDropImageMultiple = ({
  id,
  onImageSelect,
  label,
  accept,
  width,
  height,
  multiple
}) => {
  const [dragging, setDragging] = useState(false);
  const [images, setImages] = useState([]); // Updated state to hold multiple images

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = async (files) => {
    const selectedFiles = Array.from(files); // Convert FileList to array
    const validFiles = [];

    for (const file of selectedFiles) {
      const isValid = await validateImageDimensions(file, width, height);
      if (isValid) {
        validFiles.push(file);
      } else {
        alert(`File ${file.name} does not meet the required dimensions.`);
      }
    }

    if (validFiles.length > 0) {
      setImages(validFiles); // Update state with valid files
      if (onImageSelect) {
        onImageSelect(validFiles, width, height, id); // Pass the valid files
      }
    }
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  return (
    <div
      className={`drop-zone min-h-[123px] w-[100%] border rounded-[12px] border-dashed ${
        dragging ? "dragging" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        htmlFor={`${id}`}
        className="w-[100%] image-label overflow-hidden min-h-[123px] rounded-[12px] border-2 hover:border-violet-500 flex flex-col items-center justify-center cursor-pointer relative"
      >
        <div className="border-2 p-2 w-10 h-10 rounded-[8px] grid place-content-center">
          <FiUploadCloud className="text-[#475467] hover:text-violet-500" />
        </div>
        <div className="image-icon absolute bottom-4 right-4 opacity-0 z-30">
          <img src="/images/jpg-icon.svg" alt="" className="w-10" />
        </div>
        <PiHandGrabbing className="absolute image-icon bottom-2 right-2 text-xl opacity-0 z-30" />
        <div className="text-[#475467] text-center md:text-[14px] text-[12px] ">
          <span className="text-[#434CE7] md:text-[14px] text-[12px] font-semibold hover:text-violet-500">
            Click to upload
          </span>
          &nbsp;or drag & drop the {label} <br />
          <span className="text-[12px]">
            SVG, PNG, JPG or GIF (max. {`${width} x ${height}px`})
          </span>
        </div>
        <input
          type="file"
          accept={accept}
          id={`${id}`}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
        />
      </label>
      {/* Display image previews */}
      {/* <div className="flex flex-wrap mt-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Image Preview ${index + 1}`}
            className="w-20 h-20 object-cover m-1 rounded"
          />
        ))}
      </div> */}
    </div>
  );
};

export default DragAndDropImageMultiple;
