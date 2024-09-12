import React from 'react'
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const TextEditor = ({ handleContentChange }) => {
  var modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
    "video",
    "code-block",
    "font",
    "clean",
  ];
  return (
    <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={handleContentChange}
        style={{
          height: "20vh",
          width: "100%",
          margin: "auto"
        }}
  />
  )
}

export default TextEditor