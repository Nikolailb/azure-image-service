/* eslint-disable react/prop-types */
import { useState } from "react";
import { ApiUrl } from "../const";

function UploadImage({ setMessage, getImages }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["image/png", "image/jpeg"];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Invalid file type. Only PNG and JPEG are allowed.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch(ApiUrl + "/images", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        return response.json();
      })
      .then((data) => {
        setMessage(`Success: ${data.message}`);
        getImages();
      })
      .catch((error) => {
        setMessage("Error uploading file", error);
      });
  };

  return (
    <div className="box">
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadImage;
