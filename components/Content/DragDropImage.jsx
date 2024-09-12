import React, { useState } from 'react';
import './DragDropImage.css';
import { FiUploadCloud } from 'react-icons/fi';
import { PiHandGrabbing } from 'react-icons/pi';

const DragAndDropImage = ({id}) => {
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);

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

  const handleFiles = (files) => {
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file.');
    }
  };
  

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && onImageSelect) {
      onImageSelect(file);
    }
  };

  return (
    <div
      className={`drop-zone min-h-[123px] w-[100%] border border-dashed ${dragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById(`${id}`).click()}
    >
      <label
      htmlFor={`${id}`}
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
        &nbsp;or drag & drop {"label"} <br />
        <span className="text-[12px]">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </span>
      </div>
      <input
        type="file"
        accept="image/*"
        id={`${id}`}
        onChange={handleImageChange}
        className="hidden"
      />
    </label>
      {image && <img src={image} alt="Image Preview" />}
    </div>
  );
};

export default DragAndDropImage;