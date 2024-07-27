// DragDropUpload.js
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { RxUpload } from "react-icons/rx";
// import './DragDropUpload.css';

const DragDropUpload = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="DragDropUpload" style={{ width: " 60%" }}>
      {uploadedImage ? (
        <div className="uploaded-image-container ">
          <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />

          <p
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#151E42",
              marginTop: "10px",
              marginBottom: "0px",
            }}
          >
            Remove and{" "}
            <span className="upload-link">
              {" "}
              <input {...getInputProps()} />
              upload another image
            </span>
          </p>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? "active" : ""}`}
        >
          <input {...getInputProps()} />
          <RxUpload className="fs-4" />

          <p style={{ fontSize: "12px", fontWeight: "500", color: "#151E42" }}>
            Drag Here or <span className="upload-link">Upload image</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DragDropUpload;
