'use client'
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './Editor.css';

const TextEditor = ({value, handleContentChange }) => {

  const modules = {
    toolbar: [
      ['bold', 'italic'],    // Bold, Italic
      [{ 'header': 1 }, { 'header': 2 }], // Headers
      ['blockquote'],         // Blockquote
      ['link', 'image'],      // Link, Image
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Ordered, Unordered list
      [{ 'size': [] }],       // Font size
    ],
  };


  return (
    <div className="custom-editor px-3 h-[250px] w-[100%] mx-auto ">
    <ReactQuill 
      value={value} 
      onChange={handleContentChange} 
      modules={modules} 
      style={{height: '200px',width:'100%'}}
    />
  </div>
  )
}

export default TextEditor